import {HintBarContainer, HintButton} from './widgets';
import React, {useEffect, useState} from 'react';
import {useCliEventBus} from '../events/cli-event-bus';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {Command} from '../../../command/types';

interface Hints {
	commands: Array<Command>;
	back: boolean;
}

export const HintBar = (props: { commands: Array<Command> }) => {
	const {commands} = props;

	const {on, off, fire} = useCliEventBus();
	const [hints, setHints] = useState<Hints>({commands, back: false});
	useEffect(() => {
		const onWorkbenchChanged = (pickedCommands: Array<Command>, argument?: string) => {
			const text = (argument || '').trim();
			if (text === '/') {
				setHints({commands, back: pickedCommands.length !== 0});
			} else if (text.startsWith('/')) {
				setHints({
					commands: commands.filter(command => command.command.startsWith(text)),
					back: pickedCommands.length !== 0
				});
			} else if (pickedCommands.length === 0) {
				setHints({commands, back: false});
			} else {
				const hints = pickedCommands[pickedCommands.length - 1].trails;
				if (hints.length === 0) {
					setHints({commands: [], back: true});
				} else {
					setHints({commands: hints.filter(hint => hint.command !== ''), back: true});
				}
			}
		};
		on(CliEventTypes.WORKBENCH_CHANGED, onWorkbenchChanged);
		return () => {
			off(CliEventTypes.WORKBENCH_CHANGED, onWorkbenchChanged);
		};
	}, [on, off, commands]);

	const onHintClicked = (command: Command) => () => {
		fire(CliEventTypes.SELECT_COMMAND, command);
	};

	return <HintBarContainer>
		{hints.commands.length !== 0
			? hints.commands.map(hint => {
				return <HintButton onClick={onHintClicked(hint)} key={hint.label}>
					{hint.command}
				</HintButton>;
			})
			: <span>No further command found.</span>}
	</HintBarContainer>;
};