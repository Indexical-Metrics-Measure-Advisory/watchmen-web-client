import {isConnectedSpaceOpened, toConnectedSpace} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {ICON_CONNECTED_SPACE} from '@/widgets/basic/constants';
import {SideMenuItem} from '@/widgets/basic/side-menu/side-menu-item';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';

const SideMenuSpacesContainer = styled.div.attrs({
	'data-widget': 'side-menu-spaces',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	max-height     : calc(var(--side-menu-icon-size) * 8);
	overflow-y     : scroll;
	overflow-x     : hidden;
	direction      : rtl;
	> div {
		margin-left : -4px;
	}
`;
const SpaceMenu = styled(SideMenuItem)`
	direction : ltr;
`;

export const SideMenuSpaces = (props: { showTooltip: boolean }) => {
	const {showTooltip} = props;

	const history = useHistory();
	const {fire, on, off} = useConsoleEventBus();
	const [spaces, setSpaces] = useState<Array<ConnectedSpace>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		fire(ConsoleEventTypes.ASK_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			setSpaces(connectedSpaces || []);
		});
	}, [fire]);
	useEffect(() => {
		const onConnectedSpaceCreated = (connectedSpace: ConnectedSpace) => {
			setSpaces(spaces => Array.from(new Set([...spaces, connectedSpace])));
		};
		// noinspection JSUnusedLocalSymbols
		const onConnectedSpaceRenamed = (connectedSpace: ConnectedSpace) => {
			forceUpdate();
		};
		const onConnectedSpaceRemoved = (connectedSpace: ConnectedSpace) => {
			setSpaces(spaces => spaces.filter(space => space !== connectedSpace));
		};
		on(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
		on(ConsoleEventTypes.CONNECTED_SPACE_RENAMED, onConnectedSpaceRenamed);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
			off(ConsoleEventTypes.CONNECTED_SPACE_RENAMED, onConnectedSpaceRenamed);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		};
	}, [on, off, forceUpdate]);

	const onSpaceClicked = (space: ConnectedSpace) => () => {
		if (isConnectedSpaceOpened(space.connectId)) {
			return;
		}

		history.push(toConnectedSpace(space.connectId));
	};

	return <SideMenuSpacesContainer>
		{spaces
			.sort((s1, s2) => s1.name.toLowerCase().localeCompare(s2.name.toLowerCase()))
			.map(space => {
				return <SpaceMenu icon={ICON_CONNECTED_SPACE} label={space.name} showTooltip={showTooltip}
				                  onClick={onSpaceClicked(space)}
				                  key={space.connectId}/>;
			})}
	</SideMenuSpacesContainer>;
};
