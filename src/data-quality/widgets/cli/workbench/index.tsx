import {PickedCommand, PickedCommands, WorkbenchContainer, WorkbenchInput} from './widgets';
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {isClearCommand, isClearScreenCommand, isFirstCommand, isHelpCommand} from '../../../command';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {useCliEventBus} from '../events/cli-event-bus';
import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../../command/types';
import {MatchedCommands} from '../types';
import {matchCommand} from '../utils';

const DEFAULT_PLACEHOLDER = 'Send a command...';

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
	const doAfterPublished = (commands: Array<Command>) => {
		commands = [...commands];
		const command = commands[commands.length - 1];
		switch (command.published.type) {
			case CommandPublishedBehaviorType.BACKWARD:
				const backwardSteps = (command.published as CommandPublishedBehaviorBackward).steps;
				const picked = commands.reverse().slice(backwardSteps).reverse();
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
				const [first, ...rest] = commands.reverse();
				const picked = rest.reverse();
				setPickedCommand(picked);
				setCommandText(first.command);
				fire(CliEventTypes.WORKBENCH_CHANGED, picked, first.command);
				break;
			}
			case CommandPublishedBehaviorType.CLEAR_ARGUMENT: {
				// clear argument
				const [, ...rest] = commands.reverse();
				const picked = rest.reverse();
				setPickedCommand(picked);
				setCommandText('');
				fire(CliEventTypes.WORKBENCH_CHANGED, picked, '');
				break;
			}
		}
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

		doAfterPublished(commandsWillSend);
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