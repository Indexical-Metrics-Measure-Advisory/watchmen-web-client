import {PickedCommand, PickedCommands, WorkbenchContainer, WorkbenchInput} from './widgets';
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {Command, CommandPublishedBehaviour} from '../types';
import {CMD_ARGUMENT_CLEAR_SCREEN, CMD_CLEAR} from '../commands';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {useCliEventBus} from '../events/cli-event-bus';

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
			if (command.standalone) {
				setPickedCommand([command]);
				setCommandText('');
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
	useEffect(() => {
		const onSendCommand = () => {
			const text = commandText.trim();
			if (text.length === 0) {
				return;
			}

			const command = pickedCommands[pickedCommands.length - 1];
			switch (command.published) {
				case CommandPublishedBehaviour.KEEP:
					// do nothing
					break;
				case CommandPublishedBehaviour.CLEAR_ALL:
					setPickedCommand([]);
					setCommandText('');
					fire(CliEventTypes.COMMAND_SOLVABLE_CHANGED, false);
					break;
				case CommandPublishedBehaviour.CLEAR_ARGUMENT:
					setCommandText('');
					fire(CliEventTypes.COMMAND_SOLVABLE_CHANGED, false);
					break;
			}
			fire(CliEventTypes.EXECUTE_COMMAND, [...pickedCommands, {text}]);
		};
		on(CliEventTypes.SEND_COMMAND, onSendCommand);
		return () => {
			off(CliEventTypes.SEND_COMMAND, onSendCommand);
		};
	}, [on, off, fire, pickedCommands, commandText]);

	const clearAll = () => {
		setPickedCommand([]);
		setCommandText('');
		fire(CliEventTypes.COMMAND_SOLVABLE_CHANGED, false);
	};
	const clearScreen = () => {
		fire(CliEventTypes.CLEAR_SCREEN);
		setCommandText('');
		fire(CliEventTypes.COMMAND_SOLVABLE_CHANGED, false);
	};
	const onCommandTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setCommandText(value);
		if (pickedCommands.length !== 0) {
			fire(CliEventTypes.COMMAND_SOLVABLE_CHANGED, pickedCommands[0].isValid(value));
		}
		if (value.trim() === '/') {
			// TODO show command help
			fire(CliEventTypes.COMMAND_SOLVABLE_CHANGED, false);
		}
	};
	const onCommandTextKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		const text = input.value;
		if (event.key === 'Enter') {
			const trimmedText = text.trim();
			if (trimmedText.startsWith('/') && !trimmedText.includes(' ')) {
				// check what if it is a command
				const command = commands.find(command => command.command === trimmedText);
				if (command) {
					fire(CliEventTypes.SELECT_COMMAND, command);
				}
			} else if (trimmedText.startsWith('/')) {
				const parts = trimmedText.split(' ').map(part => part.trim());
				if (parts[0] === CMD_CLEAR) {
					if (parts[1] === CMD_ARGUMENT_CLEAR_SCREEN) {
						clearScreen();
					} else {
						clearAll();
					}
				} else {
					// TODO other standard commands
				}
			} else {
				// treat as arguments
				if (pickedCommands.length !== 0) {
					fire(CliEventTypes.SEND_COMMAND);
				}
			}
		} else if (event.key === ' ') {
			const before = text.substring(0, input.selectionStart || 0).trim();
			const after = text.substring(input.selectionStart || 0);
			if (before.startsWith('/') && !before.includes(' ')) {
				// check what if it is a command
				const command = commands.find(command => command.command === before.trim());
				if (command) {
					fire(CliEventTypes.SELECT_COMMAND, command);
					fire(CliEventTypes.COMMAND_SOLVABLE_CHANGED, command.isValid(after));
					setCommandText(after);
					event.stopPropagation();
					event.preventDefault();
				}
			}
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
			: null}
		<WorkbenchInput value={commandText}
		                onChange={onCommandTextChanged} onKeyPress={onCommandTextKeyPressed}
		                ref={commandInputRef}
		                placeholder={commandPlaceholder}/>
	</WorkbenchContainer>;
};