import {PickedCommand, PickedCommands, WorkbenchContainer, WorkbenchInput} from './widgets';
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {isClearCommand, isClearScreenCommand, isFirstCommand, isHelpCommand} from '../../../command';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {useCliEventBus} from '../events/cli-event-bus';
import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../../command/types';

interface MatchedCommand {
	command?: Command;
	// left text which
	// 1. cannot match command or
	// 2. not ends with a space (in not greedy mode)
	left: string;
}

interface MatchedCommands {
	commands: Array<Command>;
	// left text which
	// 1. cannot match command or
	// 2. not ends with a space (in not greedy mode)
	left: string;
}

const DEFAULT_PLACEHOLDER = 'Send a command...';

const findNextQuote = (text: string, quote: string, startPosition: number): number => {
	const index = text.indexOf(quote, startPosition);
	if (index === -1) {
		return index;
	} else if (text.substr(index - 1, 1) === '\\') {
		return findNextQuote(text, quote, index + 1);
	} else {
		return index;
	}
};

const matchFreeTextCommandUnderQuotes = (commandText: string, freeTextCommand: Command, quote: string): MatchedCommand => {
	const index = findNextQuote(commandText, quote, 1);
	if (index === -1) {
		return {command: {...freeTextCommand, command: commandText.trim()}, left: ''};
	} else {
		let realCommand = commandText.substring(0, index);
		if (realCommand.startsWith(quote)) {
			realCommand = realCommand.substring(1, realCommand.length - 2);
		}
		return {
			command: {...freeTextCommand, command: realCommand},
			left: commandText.substring(index + 1)
		};
	}
};
const matchFreeTextCommand = (commandText: string, startCommand: Command): MatchedCommand => {
	// only one free text command is defined, or not
	const freeTextCommand = startCommand.trails.find(cmd => cmd.command === '');
	if (freeTextCommand) {
		if (commandText.startsWith('"')) {
			return matchFreeTextCommandUnderQuotes(commandText, freeTextCommand, '"');
		} else if (commandText.startsWith('\'')) {
			return matchFreeTextCommandUnderQuotes(commandText, freeTextCommand, '"');
		} else {
			return {command: {...freeTextCommand, command: commandText.trim()}, left: ''};
		}
	} else {
		return {left: commandText};
	}
};
const findFirstCommand = (startCommand: Command, commandText: string, greedy: boolean): MatchedCommand => {
	const fixCommands = startCommand.trails.filter(cmd => cmd.command !== '');
	if (greedy) {
		// try to match each part
		let found = fixCommands.find(cmd => commandText === cmd.command);
		if (found) {
			return {command: found, left: ''};
		}
		found = fixCommands.find(cmd => commandText.startsWith(`${cmd.command} `));
		if (found) {
			return {
				command: found,
				left: found ? commandText.substring(found.command.length).trimLeft() : commandText
			};
		}
		return matchFreeTextCommand(commandText, startCommand);
	} else {
		// each command must follow a blank
		const found = fixCommands.find(cmd => commandText.startsWith(`${cmd.command} `));
		if (found) {
			return {
				command: found,
				left: found ? commandText.substring(found.command.length).trimLeft() : commandText
			};
		}
		if (commandText.endsWith(' ')) {
			// last character is a space, free text command is open to match
			return matchFreeTextCommand(commandText, startCommand);
		} else {
			// leave it as text
			return {left: commandText};
		}
	}
};

const matchCommand = (options: {
	matched: MatchedCommands;
	startCommand: Command;
	commandText: string;
	greedy: boolean;
}) => {
	const {matched, startCommand, commandText, greedy} = options;

	let found = findFirstCommand(startCommand, commandText, greedy);
	if (found.command) {
		// command matched
		matched.commands.push(found.command);
		const leftText = found.left;
		if (leftText.trim().length !== 0 && found.command.trails.length !== 0) {
			// there is text left and matched command has trails
			matchCommand({
				matched,
				startCommand: found.command,
				commandText: leftText,
				greedy
			});
		} else if (leftText.trim().length === 0) {
			// no text left
			matched.left = '';
		} else if (found.command.trails.length === 0) {
			// matched command has no trail
			matched.left = leftText;
		}
	} else {
		// no command matched
		matched.left = found.left;
	}
};

export const Workbench = (props: { commands: Array<Command> }) => {
	const {commands} = props;

	const {on, off, fire} = useCliEventBus();
	// noinspection TypeScriptValidateTypes
	const commandInputRef = useRef<HTMLInputElement>(null);
	const [pickedCommands, setPickedCommand] = useState<Array<Command>>([]);
	const [commandText, setCommandText] = useState('');
	useEffect(() => {
		const onSelectCommand = (command: Command) => {
			if (isFirstCommand(command)) {
				setPickedCommand([command]);
				fire(CliEventTypes.WORKBENCH_CHANGED, [command], commandText);
			} else {
				setPickedCommand(pickedCommands => {
					const commands = [...pickedCommands, command];
					fire(CliEventTypes.WORKBENCH_CHANGED, commands, commandText);
					return commands;
				});
			}
			commandInputRef.current?.focus();
		};
		const onSuggestCommand = (commands: Array<Command>, argument?: string) => {
			setPickedCommand(commands);
			setCommandText(argument || '');
			fire(CliEventTypes.WORKBENCH_CHANGED, commands, argument || '');
			commandInputRef.current?.focus();
		};
		on(CliEventTypes.SELECT_COMMAND, onSelectCommand);
		on(CliEventTypes.SUGGEST_COMMAND, onSuggestCommand);
		return () => {
			off(CliEventTypes.SELECT_COMMAND, onSelectCommand);
			off(CliEventTypes.SUGGEST_COMMAND, onSuggestCommand);
		};
	}, [on, off, fire, commandText]);

	const clearAll = () => {
		setPickedCommand([]);
		setCommandText('');
	};
	const clearScreen = () => {
		fire(CliEventTypes.CLEAR_SCREEN);
		setCommandText('');
	};
	const sendCommand = () => {
		const matched = matchCommandText(commandText.trimLeft(), true);
		if (matched.left) {
			// something not matched
			if (matched.commands.length !== 0) {
				if (commandText.trimLeft().startsWith('/')) {
					// replace picked commands
					setPickedCommand(matched.commands);
				} else {
					// follow the picked commands
					setPickedCommand([...pickedCommands, ...matched.commands]);
				}
			}
			setCommandText(matched.left);

			// cannot execute, return
			return;
		}

		// exactly matched, no left text
		let commandsWillSend: Array<Command>;
		if (commandText.trimLeft().startsWith('/')) {
			// replace current picked command
			commandsWillSend = matched.commands;
		} else {
			commandsWillSend = [...pickedCommands, ...matched.commands];
		}

		if (commandsWillSend.length === 0) {
			// no valid command needs to be sent
			return;
		}

		const command = commandsWillSend[commandsWillSend.length - 1];
		switch (command.published.type) {
			case CommandPublishedBehaviorType.BACKWARD:
				const backwardSteps = (command.published as CommandPublishedBehaviorBackward).steps;
				const picked = commandsWillSend.reverse().slice(backwardSteps).reverse();
				setPickedCommand(picked);
				setCommandText('');
				fire(CliEventTypes.WORKBENCH_CHANGED, picked, '');
				break;
			case CommandPublishedBehaviorType.CLEAR_ALL:
				setPickedCommand([]);
				setCommandText('');
				fire(CliEventTypes.WORKBENCH_CHANGED, [], '');
				break;
			case CommandPublishedBehaviorType.KEEP: {
				// just keep the last command as text
				const [first, ...rest] = commandsWillSend.reverse();
				const picked = rest.reverse();
				setPickedCommand(picked);
				setCommandText(first.command);
				fire(CliEventTypes.WORKBENCH_CHANGED, picked, first.command);
				break;
			}
			case CommandPublishedBehaviorType.CLEAR_ARGUMENT: {
				// clear argument
				const [, ...rest] = commandsWillSend.reverse();
				const picked = rest.reverse();
				setPickedCommand(picked);
				setCommandText('');
				fire(CliEventTypes.WORKBENCH_CHANGED, picked, '');
				break;
			}
		}

		if (isClearCommand(commandsWillSend[0])) {
			if (commandsWillSend.length > 1 && isClearScreenCommand(commandsWillSend[1])) {
				clearScreen();
			} else {
				clearAll();
			}
		} else if (isHelpCommand(commandsWillSend[0])) {
			// TODO handle help
		} else {
			fire(CliEventTypes.EXECUTE_COMMAND, commandsWillSend, commandText);
		}
	};

	const matchCommandText = (text: string, greedy: boolean) => {
		let startCommand: Command;
		if (text.trimLeft().startsWith('/')) {
			startCommand = {trails: commands} as Command;
		} else if (pickedCommands.length === 0) {
			startCommand = {trails: commands} as Command;
		} else {
			startCommand = pickedCommands[pickedCommands.length - 1];
		}

		const matched: MatchedCommands = {commands: [], left: ''};
		if (text.trim()) {
			matchCommand({matched, startCommand, commandText: text.trimLeft(), greedy});
		}
		return matched;
	};
	const onCommandTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		const matched = matchCommandText(value, false);

		if (matched.commands.length !== 0) {
			if (value.trimLeft().startsWith('/')) {
				setPickedCommand(matched.commands);
			} else {
				setPickedCommand([...pickedCommands, ...matched.commands]);
			}
			setCommandText(matched.left);
			fire(CliEventTypes.WORKBENCH_CHANGED, [...pickedCommands, ...matched.commands], matched.left);
		} else {
			setCommandText(value);
			fire(CliEventTypes.WORKBENCH_CHANGED, pickedCommands, value);
		}
	};
	const onCommandTextKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			sendCommand();
		}
		if (event.key === 'Backspace' && commandInputRef.current?.value === '') {
			if (pickedCommands.length !== 0) {
				const [first, ...rest] = pickedCommands.reverse();
				setPickedCommand(rest.reverse);
				setCommandText(first.command);
			}
		}
	};

	const commandPlaceholder = pickedCommands.length === 0 ? DEFAULT_PLACEHOLDER : (pickedCommands[pickedCommands.length - 1].reminder || DEFAULT_PLACEHOLDER);

	return <WorkbenchContainer>
		{pickedCommands.length !== 0
			? <PickedCommands>
				{pickedCommands.map(({command, label}) => {
					return <PickedCommand key={command}>
						{label || command}
					</PickedCommand>;
				})}
			</PickedCommands>
			: <span/>}
		<WorkbenchInput value={commandText}
		                onChange={onCommandTextChanged}
		                onKeyPress={onCommandTextKeyPressed}
		                ref={commandInputRef}
		                placeholder={commandPlaceholder}/>
	</WorkbenchContainer>;
};