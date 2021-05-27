import {Greeting} from '../greeting';
import React, {ChangeEvent, KeyboardEvent, ReactNode, useRef, useState} from 'react';
import {
	CLIContainer,
	CommandArea,
	CommandLine,
	CommandLineButton,
	CommandLineButtons,
	CommandLineInput,
	CommandLineSeparator,
	CommandLineShortcuts,
	CommandShortcutFilter,
	CommandShortcutFilterInput,
	CommandShortcutMenu,
	CommandShortcutsMenu,
	PickedCommand,
	PickedCommandLine,
	ShortcutEmptyIcon,
	WorkingArea
} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_HELP, ICON_SEARCH, ICON_SEND, ICON_SHORTCUT} from '../../../basic-widgets/constants';
import {ButtonInk, TooltipAlignment} from '../../../basic-widgets/types';
import {Command, CommandPublishedBehaviour, ExecutionCommand} from './types';
import {useCollapseFixedThing} from '../../../basic-widgets/utils';
import {CMD_CLEAR} from './commands';

const DEFAULT_PLACEHOLDER = 'Send a command...';

export const CLI = (props: {
	greeting: string;
	commands: Array<Command>;
	publish: (command: ExecutionCommand) => void;
	executions: ((props: any) => ReactNode) | ReactNode
}) => {
	const {greeting, commands, publish, executions} = props;

	// noinspection TypeScriptValidateTypes
	const shortcutsContainerRef = useRef<HTMLDivElement>(null);
	// noinspection TypeScriptValidateTypes
	const shortcutsFilterInputRef = useRef<HTMLInputElement>(null);
	// noinspection TypeScriptValidateTypes
	const commandInputRef = useRef<HTMLInputElement>(null);
	const [shortcutTransition, setShortcutTransition] = useState(true);
	const [filterText, setFilterText] = useState('');
	const [filteredCommands, setFilteredCommands] = useState<Array<Command>>(commands);
	const [pickedCommands, setPickedCommand] = useState<Array<Command>>([]);
	const [commandText, setCommandText] = useState('');
	const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
	const [shortcutsVisible, setShortcutsVisible] = useState(false);
	useCollapseFixedThing({
		containerRef: shortcutsContainerRef,
		visible: shortcutsVisible,
		hide: () => {
			setShortcutTransition(true);
			setShortcutsVisible(false);
		}
	});

	const onShortcutTransitionEnd = () => {
		setShortcutTransition(!shortcutsVisible);
	};
	const onShortcutsClicked = () => {
		setShortcutsVisible(!shortcutsVisible);
		if (!shortcutsVisible) {
			shortcutsFilterInputRef.current?.focus();
		}
	};
	const onShortcutCommandClicked = (command: Command, text: string = '') => () => {
		if (command.standalone) {
			setPickedCommand([command]);
			setCommandText(text);
		} else {
			setPickedCommand([...pickedCommands, command]);
		}
		setShortcutsVisible(false);
		setPlaceholder(command.reminder || DEFAULT_PLACEHOLDER);
		commandInputRef.current?.focus();
		setFilterText('');
		setFilteredCommands(commands);
	};
	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setFilterText(value);
		setFilteredCommands(value.trim().length === 0 ? commands : commands.filter(shortcut => shortcut.label.toLowerCase().includes(value.trim().toLowerCase())));
	};
	// make sure the parameter text IS trimmed before call this
	const handleCommandText = (text: string, publish: boolean) => {
		if (text.startsWith('/') && !text.includes(' ')) {
			// check what if it is a command
			const command = commands.find(command => command.command === text);
			if (command) {
				onShortcutCommandClicked(command)();
			}
		} else if (publish) {
			// treat as arguments
			if (pickedCommands.length === 0) {
				// no command
				return;
			} else {
				publishCommand();
			}
		}
	};
	const onCommandTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setCommandText(value);
		if (value.trim() === '/') {
			// TODO show command help
		}
	};
	const clearAll = () => {
		setPickedCommand([]);
		setCommandText('');
		setPlaceholder(DEFAULT_PLACEHOLDER);
	};
	const publishCommand = () => {
		const text = commandText.trim();
		if (text.length === 0) {
			return;
		}

		publish([...pickedCommands, {text}]);
		const command = pickedCommands[pickedCommands.length - 1];
		switch (command.published) {
			case CommandPublishedBehaviour.KEEP:
				// do nothing
				break;
			case CommandPublishedBehaviour.CLEAR_ALL:
				clearAll();
				break;
			case CommandPublishedBehaviour.CLEAR_ARGUMENT:
				setCommandText('');
				break;
		}
	};
	const onCommandTextKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		const text = input.value;
		if (event.key === 'Enter') {
			if (text.trim() === CMD_CLEAR) {
				clearAll();
			} else {
				handleCommandText(text.trim(), true);
			}
		} else if (event.key === ' ') {
			const before = text.substring(0, input.selectionStart || 0).trim();
			const after = text.substring(input.selectionStart || 0);
			if (before.startsWith('/') && !before.includes(' ')) {
				// check what if it is a command
				const command = commands.find(command => command.command === before.trim());
				if (command) {
					onShortcutCommandClicked(command)();
					setCommandText(after);
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}
	};
	const onSendCommandClicked = () => {
		publishCommand();
	};
	const onHelpClicked = () => {

	};

	const commandValid = pickedCommands.length !== 0;

	return <CLIContainer>
		<WorkingArea>
			<Greeting>{greeting}</Greeting>
			{executions}
		</WorkingArea>
		<CommandArea>
			<CommandLine pickedCount={pickedCommands.length}>
				<div ref={shortcutsContainerRef}>
					<CommandLineShortcuts itemCount={filteredCommands.length} visible={shortcutsVisible}
					                      transition={shortcutTransition} onTransitionEnd={onShortcutTransitionEnd}>
						<CommandShortcutsMenu itemCount={filteredCommands.length}>
							{filteredCommands.map(shortcut => {
								return <CommandShortcutMenu onClick={onShortcutCommandClicked(shortcut)}
								                            key={shortcut.command}>
									{shortcut.icon ? <FontAwesomeIcon icon={shortcut.icon}/> : <ShortcutEmptyIcon/>}
									{shortcut.label}
								</CommandShortcutMenu>;
							})}
						</CommandShortcutsMenu>
						<CommandShortcutFilter>
							<FontAwesomeIcon icon={ICON_SEARCH}/>
							<CommandShortcutFilterInput value={filterText} onChange={onFilterTextChanged}
							                            placeholder="Search shortcuts"
							                            ref={shortcutsFilterInputRef}/>
						</CommandShortcutFilter>
					</CommandLineShortcuts>
					<CommandLineButton
						tooltip={{alignment: TooltipAlignment.LEFT, offsetX: -5, label: 'Command Shortcuts'}}
						onClick={onShortcutsClicked}>
						<FontAwesomeIcon icon={ICON_SHORTCUT}/>
					</CommandLineButton>
				</div>
				<CommandLineSeparator/>
				{pickedCommands.length !== 0
					? <PickedCommandLine>
						{pickedCommands.map(({command, label}) => {
							return <PickedCommand key={command}>
								{label}
							</PickedCommand>;
						})}
					</PickedCommandLine>
					: null}
				<CommandLineInput value={commandText}
				                  onChange={onCommandTextChanged} onKeyPress={onCommandTextKeyPressed}
				                  ref={commandInputRef}
				                  placeholder={placeholder}/>
				<CommandLineSeparator/>
				<CommandLineButtons>
					<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Send Command'}}
					                   disabled={!commandValid}
					                   ink={commandValid ? ButtonInk.SUCCESS : ButtonInk.WAIVE}
					                   onClick={onSendCommandClicked}>
						<FontAwesomeIcon icon={ICON_SEND}/>
					</CommandLineButton>
					<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Help'}}
					                   onClick={onHelpClicked}>
						<FontAwesomeIcon icon={ICON_HELP}/>
					</CommandLineButton>
				</CommandLineButtons>
			</CommandLine>
		</CommandArea>
	</CLIContainer>;
};