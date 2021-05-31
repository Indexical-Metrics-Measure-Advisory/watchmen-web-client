import {HintBarContainer, HintButton} from './widgets';
import React, {useEffect, useState} from 'react';
import {useCliEventBus} from '../events/cli-event-bus';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {Command} from '../../../command/types';

export const HintBar = (props: { commands: Array<Command> }) => {
	const {commands} = props;

	const [hints, setHints] = useState<Array<Command>>(commands);

	const {on, off} = useCliEventBus();
	useEffect(() => {
		const onWorkbenchChanged = (pickedCommands: Array<Command>, argument?: string) => {
			const text = (argument || '').trim();
			if (text === '/') {
				setHints(commands);
			} else if (text.startsWith('/')) {
				setHints(commands.filter(command => command.command.startsWith(text)));
			} else if (pickedCommands.length === 0) {
				setHints(commands);
			} else {
				const hints = pickedCommands[pickedCommands.length - 1].trails;
				if (hints.length === 0) {
					setHints([]);
				} else {
					setHints(hints.filter(hint => hint.command !== ''));
				}
			}
		};
		on(CliEventTypes.WORKBENCH_CHANGED, onWorkbenchChanged);
		return () => {
			off(CliEventTypes.WORKBENCH_CHANGED, onWorkbenchChanged);
		};
	}, [on, off, commands]);

	return <HintBarContainer>
		{hints.map(hint => {
			return <HintButton key={hint.label}>
				{hint.label}
			</HintButton>;
		})}
	</HintBarContainer>;
};