import {ICON_SEND} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Command} from '../../../command/types';
import {useCliEventBus} from '../events/cli-event-bus';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {MatchedCommands} from '../types';
import {matchCommand} from '../utils';
import {
	HintBarContainer,
	HintCommandButton,
	HintNoCommandButton,
	HintOperateButton,
	HintSendButton,
	Placeholder
} from './widgets';

interface Hints {
	commands: Array<Command>;
	executable: boolean;
	clearable: boolean;
	message?: string;
}

export const HintBar = (props: { commands: Array<Command> }) => {
	const {commands} = props;

	const {on, off, fire} = useCliEventBus();
	const [hints, setHints] = useState<Hints>({commands, executable: false, clearable: false});
	useEffect(() => {
		const onWorkbenchChanged = (pickedCommands: Array<Command>, argument?: string) => {
			const text = (argument || '').trim();
			const hasText = text.length !== 0;
			if (text === '/') {
				setHints({commands, executable: false, clearable: pickedCommands.length !== 0});
			} else if (text.startsWith('/')) {
				setHints({
					commands: commands.filter(command => command.command.startsWith(text)),
					executable: false,
					clearable: pickedCommands.length !== 0
				});
			} else if (pickedCommands.length === 0) {
				setHints({commands, executable: false, clearable: false});
			} else {
				const lastPicked = pickedCommands[pickedCommands.length - 1];
				const hintCandidates = lastPicked.trails;
				if (hintCandidates.length === 0) {
					// no more hints, it must be executable
					setHints({
						commands: [],
						message: !hasText ? lastPicked?.reminder : 'No more arguments are required now',
						executable: !hasText,
						clearable: true
					});
				} else {
					let executable = false;
					if ((!argument || argument.trim().length === 0) && lastPicked.executableOnNoTrail) {
						// no argument, see last picked command is executable or not
						executable = true;
					} else if (argument && argument.trim().length !== 0) {
						// has argument, try to match
						const matched: MatchedCommands = {commands: [], left: ''};
						matchCommand({
							matched,
							startCommand: lastPicked,
							commandText: (argument || '').trimLeft(),
							greedy: true
						});
						if (!matched.left && matched.commands.length === 1 && matched.commands[0].executableOnNoTrail) {
							executable = true;
						}
					}

					const standardCommands = hintCandidates.filter(hint => hint.command !== '');
					if (standardCommands.length !== 0) {
						// there is some standard command
						setHints({
							commands: hintCandidates.filter(hint => hint.command !== ''),
							executable,
							clearable: true
						});
					} else {
						// no standard command
						setHints({
							commands: [],
							message: hasText ? lastPicked?.reminder : (void 0),
							executable,
							clearable: true
						});
					}
				}
			}
		};
		on(CliEventTypes.WORKBENCH_CHANGED, onWorkbenchChanged);
		return () => {
			off(CliEventTypes.WORKBENCH_CHANGED, onWorkbenchChanged);
		};
	}, [on, off, commands]);

	const onHintClicked = (command: Command) => () => fire(CliEventTypes.SELECT_COMMAND, command);
	const onRemoveLastCommandClicked = () => fire(CliEventTypes.REMOVE_LAST_COMMAND);
	const onClearCommandClicked = () => fire(CliEventTypes.CLEAR_COMMAND);
	const onSendClicked = () => fire(CliEventTypes.SEND_COMMAND);

	return <HintBarContainer>
		{hints.commands.length !== 0
			? hints.commands.map(hint => {
				return <HintCommandButton onClick={onHintClicked(hint)} key={hint.label}>
					{hint.command}
				</HintCommandButton>;
			})
			: <HintNoCommandButton>{hints.message || 'No further suggestion found.'}</HintNoCommandButton>}
		<Placeholder/>
		{hints.clearable ?
			<HintOperateButton onClick={onRemoveLastCommandClicked}>Remove Last Command</HintOperateButton> : null}
		{hints.clearable ?
			<HintOperateButton onClick={onClearCommandClicked}>Clear Command(s)</HintOperateButton> : null}
		<HintSendButton onClick={onSendClicked} disabled={!hints.executable}>
			<FontAwesomeIcon icon={ICON_SEND}/>
			<span>Send</span>
		</HintSendButton>
	</HintBarContainer>;
};