import {
	ShortcutEmptyIcon,
	ShortcutFilter,
	ShortcutFilterInput,
	ShortcutMenu,
	ShortcutsContainer,
	ShortcutsMenuContainer,
	ShortcutsPopupContainer
} from './widgets';
import {CommandLineButton} from '../widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH, ICON_SHORTCUT} from '../../../../basic-widgets/constants';
import {TooltipAlignment} from '../../../../basic-widgets/types';
import React, {ChangeEvent, useRef, useState} from 'react';
import {Command} from '../types';
import {useCollapseFixedThing} from '../../../../basic-widgets/utils';
import {useCliEventBus} from '../events/cli-event-bus';
import {CliEventTypes} from '../events/cli-event-bus-types';

export const Shortcuts = (props: {
	commands: Array<Command>;
}) => {
	const {commands} = props;

	const {fire} = useCliEventBus();
	// noinspection TypeScriptValidateTypes
	const shortcutsContainerRef = useRef<HTMLDivElement>(null);
	// noinspection TypeScriptValidateTypes
	const shortcutsFilterInputRef = useRef<HTMLInputElement>(null);
	const [shortcutTransition, setShortcutTransition] = useState(true);
	const [shortcutsVisible, setShortcutsVisible] = useState(false);
	const [filteredCommands, setFilteredCommands] = useState<Array<Command>>([]);
	const [filterText, setFilterText] = useState('');
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
	const onShortcutCommandClicked = (command: Command) => () => {
		fire(CliEventTypes.SELECT_COMMAND, command);
		setShortcutsVisible(false);
		setFilterText('');
		setFilteredCommands(commands);
	};
	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setFilterText(value);
		setFilteredCommands(value.trim().length === 0 ? commands : commands.filter(shortcut => shortcut.label.toLowerCase().includes(value.trim().toLowerCase())));
	};
	const onShortcutsClicked = () => {
		setShortcutsVisible(!shortcutsVisible);
		if (!shortcutsVisible) {
			shortcutsFilterInputRef.current?.focus();
		}
	};

	return <ShortcutsContainer ref={shortcutsContainerRef}>
		<ShortcutsPopupContainer itemCount={filteredCommands.length} visible={shortcutsVisible}
		                         transition={shortcutTransition} onTransitionEnd={onShortcutTransitionEnd}>
			<ShortcutsMenuContainer itemCount={filteredCommands.length}>
				{filteredCommands.map(shortcut => {
					return <ShortcutMenu onClick={onShortcutCommandClicked(shortcut)}
					                     key={shortcut.command}>
						{shortcut.icon ? <FontAwesomeIcon icon={shortcut.icon}/> : <ShortcutEmptyIcon/>}
						{shortcut.label}
					</ShortcutMenu>;
				})}
			</ShortcutsMenuContainer>
			<ShortcutFilter>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
				<ShortcutFilterInput value={filterText} onChange={onFilterTextChanged}
				                     placeholder="Search shortcuts"
				                     ref={shortcutsFilterInputRef}/>
			</ShortcutFilter>
		</ShortcutsPopupContainer>
		<CommandLineButton
			tooltip={{alignment: TooltipAlignment.LEFT, offsetX: -5, label: 'Command Shortcuts'}}
			onClick={onShortcutsClicked}>
			<FontAwesomeIcon icon={ICON_SHORTCUT}/>
		</CommandLineButton>
	</ShortcutsContainer>;
};
