import {Greeting} from '../greeting';
import React, {ChangeEvent, useRef, useState} from 'react';
import {
	CLIContainer,
	CommandArea,
	CommandLine,
	CommandLineButton,
	CommandLineInput,
	CommandLineSeparator,
	CommandLineShortcuts,
	CommandReminder,
	CommandReminderLine,
	ShortcutEmptyIcon,
	ShortcutMenu,
	WorkingArea
} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEND, ICON_SHORTCUT} from '../../../basic-widgets/constants';
import {TooltipAlignment} from '../../../basic-widgets/types';
import {CommandShortcut} from './types';
import {useCollapseFixedThing} from '../../../basic-widgets/utils';

export const CLI = (props: {
	greeting: string;
	shortcuts: Array<CommandShortcut>
}) => {
	const {greeting, shortcuts} = props;

	// noinspection TypeScriptValidateTypes
	const shortcutsContainerRef = useRef<HTMLDivElement>(null);
	const [pickedCommands, setPickedCommand] = useState<Array<CommandShortcut>>([]);
	const [commandText, setCommandText] = useState('');
	const [shortcutsVisible, setShortcutsVisible] = useState(false);
	useCollapseFixedThing({
		containerRef: shortcutsContainerRef,
		visible: shortcutsVisible,
		hide: () => setShortcutsVisible(false)
	});

	const onShortcutsClicked = () => setShortcutsVisible(!shortcutsVisible);
	const onShortcutClicked = (shortcut: CommandShortcut) => () => {
		setPickedCommand([...pickedCommands, shortcut]);
		setShortcutsVisible(false);
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
					<CommandLineShortcuts itemCount={shortcuts.length} visible={shortcutsVisible}>
						{shortcuts.map(shortcut => {
							return <ShortcutMenu onClick={onShortcutClicked(shortcut)}
							                     key={shortcut.command}>
								{shortcut.icon ? <FontAwesomeIcon icon={shortcut.icon}/> : <ShortcutEmptyIcon/>}
								{shortcut.label}
							</ShortcutMenu>;
						})}
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
				                  placeholder={`Send a command...`}/>
				<CommandLineSeparator/>
				<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Send Command'}}>
					<FontAwesomeIcon icon={ICON_SEND}/>
				</CommandLineButton>
			</CommandLine>
		</CommandArea>
	</CLIContainer>;
};