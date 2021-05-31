import {PickedCommand, PickedCommands, WorkbenchContainer, WorkbenchInput} from './widgets';
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {isClearCommand, isClearScreenCommand, isFirstCommand, isHelpCommand} from '../../../command';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {useCliEventBus} from '../events/cli-event-bus';
import {Command, CommandPublishedBehaviorType} from '../../../command/types';

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
			} else {
				setPickedCommand(pickedCommands => [...pickedCommands, command]);
			}
			commandInputRef.current?.focus();
		};
		const onSuggestCommand = (commands: Array<Command>, argument?: string) => {
			setPickedCommand(commands);
			setCommandText(argument || '');
			commandInputRef.current?.focus();
		};
		on(CliEventTypes.SELECT_COMMAND, onSelectCommand);
		on(CliEventTypes.SUGGEST_COMMAND, onSuggestCommand);
		return () => {
			off(CliEventTypes.SELECT_COMMAND, onSelectCommand);
			off(CliEventTypes.SUGGEST_COMMAND, onSuggestCommand);
		};
	}, [on, off]);

	const clearAll = () => {
		setPickedCommand([]);
		setCommandText('');
	};
	const clearScreen = () => {
		fire(CliEventTypes.CLEAR_SCREEN);
		setCommandText('');
	};
	const sendCommand = () => {
		if (pickedCommands.length === 0) {
			// no valid command needs to be sent
			return;
		}
		if (isClearCommand(pickedCommands[0])) {
			if (isClearScreenCommand(pickedCommands[1])) {
				clearScreen();
			} else {
				clearAll();
			}
			setPickedCommand([]);
			setCommandText('');
			fire(CliEventTypes.WORKBENCH_CHANGED, [], '');
			return;
		}
		if (isHelpCommand(pickedCommands[0])) {
			return;
		}

		const command = pickedCommands[pickedCommands.length - 1];
		switch (command.published.type) {
			case CommandPublishedBehaviorType.KEEP:
				// do nothing
				break;
			case CommandPublishedBehaviorType.BACKWARD:
				break;
			case CommandPublishedBehaviorType.CLEAR_ALL:
				setPickedCommand([]);
				setCommandText('');
				break;
			case CommandPublishedBehaviorType.CLEAR_ARGUMENT:
				setCommandText('');
				break;
		}
		fire(CliEventTypes.EXECUTE_COMMAND, pickedCommands, commandText);
	};

	const findCommand = (options: {
		startCommand: Command;
		first: string;
		rest: Array<string>;
		matched: { commands: Array<Command>, text: string }
	}) => {
		const {startCommand, first, rest, matched} = options;
		let foundCommand = startCommand.trails.find(cmd => cmd.command === first.trim());
		if (foundCommand) {
			matched.commands.push(foundCommand);
			if (rest.length !== 0 && foundCommand.trails.length !== 0) {
				const [nextFirst, ...nextRest] = rest;
				findCommand({startCommand: foundCommand, first: nextFirst, rest: nextRest, matched});
			} else if (rest.length === 0) {
				matched.text = '';
			} else if (foundCommand.trails.length === 0) {
				matched.text = rest.join(' ');
			}
		} else {
			matched.text = rest.join(' ');
		}
	};
	const onCommandTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		const text = value.trim();
		let startCommand: Command;
		if (text.startsWith('/')) {
			startCommand = {trails: commands} as Command;
		} else if (pickedCommands.length === 0) {
			startCommand = {trails: commands} as Command;
		} else {
			startCommand = pickedCommands[pickedCommands.length - 1];
		}

		const matched: { commands: Array<Command>, text: string } = {commands: [], text: ''};
		const [first, ...rest] = text.split(' ').filter(x => !!x);
		if (first) {
			findCommand({startCommand, first, rest, matched});
		}

		if (matched.commands.length !== 0) {
			if (text.startsWith('/')) {
				setPickedCommand(matched.commands);
			} else {
				setPickedCommand([...pickedCommands, ...matched.commands]);
			}
			setCommandText(matched.text);
			fire(CliEventTypes.WORKBENCH_CHANGED, [...pickedCommands, ...matched.commands], matched.text);
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
						{label}
					</PickedCommand>;
				})}
			</PickedCommands>
			: <span/>}
		<WorkbenchInput value={commandText}
		                onChange={onCommandTextChanged} onKeyPress={onCommandTextKeyPressed}
		                ref={commandInputRef}
		                placeholder={commandPlaceholder}/>
	</WorkbenchContainer>;
};