import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {isClearCommand, isClearScreenCommand, isFirstCommand, isHelpCommand} from '../../../command';
import {Command, CommandPublishedBehaviorBackward, CommandPublishedBehaviorType} from '../../../command/types';
import {useCliEventBus} from '../events/cli-event-bus';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {matchCommandText} from '../utils';
import {PickedCommand, PickedCommands, WorkbenchContainer, WorkbenchInput} from './widgets';

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
					// cannot repaint another component when still in set state of this
					setTimeout(() => fire(CliEventTypes.WORKBENCH_CHANGED, commands, commandText), 10);
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
	useEffect(() => {
		const onRemoveLastCommand = () => {
			setPickedCommand(pickedCommands => {
				const commands = [...pickedCommands];
				commands.length = commands.length - 1;
				// cannot repaint another component when still in set state of this
				setTimeout(() => fire(CliEventTypes.WORKBENCH_CHANGED, commands, commandText), 10);
				commandInputRef.current?.focus();
				return commands;
			});
		};
		const onClearCommand = () => {
			setPickedCommand([]);
			fire(CliEventTypes.WORKBENCH_CHANGED, [], commandText);
			commandInputRef.current?.focus();
		};
		on(CliEventTypes.REMOVE_LAST_COMMAND, onRemoveLastCommand);
		on(CliEventTypes.CLEAR_COMMAND, onClearCommand);
		return () => {
			off(CliEventTypes.REMOVE_LAST_COMMAND, onRemoveLastCommand);
			off(CliEventTypes.CLEAR_COMMAND, onClearCommand);
		};
	}, [on, off, fire, commandText]);
	useEffect(() => {
		const clearAll = () => {
			setPickedCommand([]);
			setCommandText('');
		};
		const doAfterPublished = (commands: Array<Command>) => {
			commands = [...commands];
			const command = commands[commands.length - 1];
			switch (command.published.type) {
				case CommandPublishedBehaviorType.BACKWARD:
					const backwardSteps = (command.published as CommandPublishedBehaviorBackward).steps;
					const picked = commands;
					picked.length = Math.max(0, picked.length - backwardSteps);
					setPickedCommand(picked);
					setCommandText('');
					fire(CliEventTypes.WORKBENCH_CHANGED, picked, '');
					break;
				case CommandPublishedBehaviorType.CLEAR_ALL:
					clearAll();
					fire(CliEventTypes.WORKBENCH_CHANGED, [], '');
					break;
				case CommandPublishedBehaviorType.KEEP: {
					// just keep the last command as text
					setPickedCommand(commands);
					setCommandText('');
					fire(CliEventTypes.WORKBENCH_CHANGED, commands, '');
					break;
				}
			}
		};
		const onSendCommand = () => {
			const matched = matchCommandText({
				text: commandText.trimLeft(),
				greedy: true,
				pickedCommands,
				allCommands: commands
			});
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
			} else if (!commandsWillSend[commandsWillSend.length - 1].executableOnNoTrail) {
				// the last command says it cannot be execute on no trail
				setPickedCommand([...pickedCommands, ...matched.commands]);
				setCommandText('');
				return;
			}

			doAfterPublished(commandsWillSend);
			if (isClearCommand(commandsWillSend[0])) {
				if (commandsWillSend.length > 1 && isClearScreenCommand(commandsWillSend[1])) {
					fire(CliEventTypes.CLEAR_SCREEN);
				} else {
					clearAll();
				}
			} else if (isHelpCommand(commandsWillSend[0])) {
				fire(CliEventTypes.EXECUTE_COMMAND, commandsWillSend, commandText);
			} else {
				fire(CliEventTypes.EXECUTE_COMMAND, commandsWillSend, commandText);
			}
		};
		on(CliEventTypes.SEND_COMMAND, onSendCommand);
		return () => {
			off(CliEventTypes.SEND_COMMAND, onSendCommand);
		};
	}, [on, off, fire, pickedCommands, commandText, commands]);

	const onCommandTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		const matched = matchCommandText({text: value, greedy: false, pickedCommands, allCommands: commands});

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
			fire(CliEventTypes.SEND_COMMAND);
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