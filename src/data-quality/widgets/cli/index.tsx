import {Greeting} from '../greeting';
import React, {ChangeEvent, useRef, useState} from 'react';
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
	CommandReminder,
	CommandReminderLine,
	ShortcutEmptyIcon,
	ShortcutMenu,
	ShortcutMenus,
	WorkingArea
} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH, ICON_SEND, ICON_SHORTCUT} from '../../../basic-widgets/constants';
import {TooltipAlignment} from '../../../basic-widgets/types';
import {CommandShortcut} from './types';
import {useCollapseFixedThing} from '../../../basic-widgets/utils';

const DEFAULT_PLACEHOLDER = 'Send a command...';

export const CLI = (props: {
	greeting: string;
	shortcuts: Array<CommandShortcut>
}) => {
	const {greeting, shortcuts} = props;

	// noinspection TypeScriptValidateTypes
	const shortcutsContainerRef = useRef<HTMLDivElement>(null);
	// noinspection TypeScriptValidateTypes
	const shortcutsFilterInputRef = useRef<HTMLInputElement>(null);
	// noinspection TypeScriptValidateTypes
	const commandInputRef = useRef<HTMLInputElement>(null);
	const [shortcutTransition, setShortcutTransition] = useState(true);
	const [filterText, setFilterText] = useState('');
	const [filteredShortcuts, setFilteredShortcuts] = useState<Array<CommandShortcut>>(shortcuts);
	const [pickedCommands, setPickedCommand] = useState<Array<CommandShortcut>>([]);
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
	const onShortcutClicked = (shortcut: CommandShortcut) => () => {
		if (shortcut.standalone) {
			setPickedCommand([shortcut]);
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

	return <CLIContainer>
		<WorkingArea>
			<Greeting>{greeting}</Greeting>
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
					? <CommandReminderLine>
						{pickedCommands.map(({command, label}) => {
							return <CommandReminder key={command}>
								{label}
							</CommandReminder>;
						})}
					</CommandReminderLine>
					: null}
				<CommandLineInput value={commandText} onChange={onCommandTextChanged}
				                  ref={commandInputRef}
				                  placeholder={placeholder}/>
				<CommandLineSeparator/>
				<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Send Command'}}>
					<FontAwesomeIcon icon={ICON_SEND}/>
				</CommandLineButton>
			</CommandLine>
		</CommandArea>
	</CLIContainer>;
};