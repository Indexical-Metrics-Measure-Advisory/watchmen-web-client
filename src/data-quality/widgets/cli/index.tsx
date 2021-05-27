import {Greeting} from '../greeting';
import React, {ChangeEvent, KeyboardEvent, ReactNode, useRef, useState} from 'react';
import {
	CLIContainer,
	CommandArea,
	CommandLine,
	CommandLineButton,
	CommandLineInput,
	CommandLineSeparator,
	CommandLineShortcutFilter,
	CommandLineShortcutFilterInput,
	CommandLineShortcuts,
	PickedCommand,
	PickedCommandLine,
	ShortcutEmptyIcon,
	ShortcutMenu,
	ShortcutMenus,
	WorkingArea
} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH, ICON_SEND, ICON_SHORTCUT} from '../../../basic-widgets/constants';
import {TooltipAlignment} from '../../../basic-widgets/types';
import {Command, CommandPublishedBehaviour, ExecutionCommand} from './types';
import {useCollapseFixedThing} from '../../../basic-widgets/utils';

const DEFAULT_PLACEHOLDER = 'Send a command...';

export const CLI = (props: {
	greeting: string;
	shortcuts: Array<Command>;
	executeCommand: (command: ExecutionCommand) => void;
	executions: ((props: any) => ReactNode) | ReactNode
}) => {
	const {greeting, shortcuts, executeCommand, executions} = props;

	// noinspection TypeScriptValidateTypes
	const shortcutsContainerRef = useRef<HTMLDivElement>(null);
	// noinspection TypeScriptValidateTypes
	const shortcutsFilterInputRef = useRef<HTMLInputElement>(null);
	// noinspection TypeScriptValidateTypes
	const commandInputRef = useRef<HTMLInputElement>(null);
	const [shortcutTransition, setShortcutTransition] = useState(true);
	const [filterText, setFilterText] = useState('');
	const [filteredShortcuts, setFilteredShortcuts] = useState<Array<Command>>(shortcuts);
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
	const onShortcutClicked = (shortcut: Command) => () => {
		if (shortcut.standalone) {
			setPickedCommand([shortcut]);
			setCommandText('');
		} else {
			setPickedCommand([...pickedCommands, shortcut]);
		}
		setShortcutsVisible(false);
		setPlaceholder(shortcut.reminder || DEFAULT_PLACEHOLDER);
		commandInputRef.current?.focus();
		setFilterText('');
		setFilteredShortcuts(shortcuts);
	};
	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setFilterText(value);
		setFilteredShortcuts(value.trim().length === 0 ? shortcuts : shortcuts.filter(shortcut => shortcut.label.toLowerCase().includes(value.trim().toLowerCase())));
	};
	const onCommandTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setCommandText(value);
	};
	const doExecuteCommand = () => {
		const text = commandText.trim();
		if (text.length === 0) {
			return;
		}

		executeCommand([...pickedCommands, {text}]);
		const command = pickedCommands[pickedCommands.length - 1];
		switch (command.publishedBehaviour) {
			case CommandPublishedBehaviour.KEEP:
				// do nothing
				break;
			case CommandPublishedBehaviour.CLEAR_ALL:
				setPickedCommand([]);
				setCommandText('');
				break;
			case CommandPublishedBehaviour.CLEAR_ARGUMENT:
				setCommandText('');
				break;
		}
	};
	const onCommandTextKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		doExecuteCommand();
	};
	const onSendCommandClicked = () => {
		doExecuteCommand();
	};

	return <CLIContainer>
		<WorkingArea>
			<Greeting>{greeting}</Greeting>
			{executions}
		</WorkingArea>
		<CommandArea>
			<CommandLine pickedCount={pickedCommands.length}>
				<div ref={shortcutsContainerRef}>
					<CommandLineShortcuts itemCount={filteredShortcuts.length} visible={shortcutsVisible}
					                      transition={shortcutTransition} onTransitionEnd={onShortcutTransitionEnd}>
						<ShortcutMenus itemCount={filteredShortcuts.length}>
							{filteredShortcuts.map(shortcut => {
								return <ShortcutMenu onClick={onShortcutClicked(shortcut)}
								                     key={shortcut.command}>
									{shortcut.icon ? <FontAwesomeIcon icon={shortcut.icon}/> : <ShortcutEmptyIcon/>}
									{shortcut.label}
								</ShortcutMenu>;
							})}
						</ShortcutMenus>
						<CommandLineShortcutFilter>
							<FontAwesomeIcon icon={ICON_SEARCH}/>
							<CommandLineShortcutFilterInput value={filterText} onChange={onFilterTextChanged}
							                                placeholder="Search shortcuts"
							                                ref={shortcutsFilterInputRef}/>
						</CommandLineShortcutFilter>
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
				<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Send Command'}}
				                   onClick={onSendCommandClicked}>
					<FontAwesomeIcon icon={ICON_SEND}/>
				</CommandLineButton>
			</CommandLine>
		</CommandArea>
	</CLIContainer>;
};