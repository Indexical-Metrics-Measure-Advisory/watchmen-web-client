import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ICON_SPACE } from '../../basic-widgets/constants';
import { SideMenuItem } from '../../basic-widgets/side-menu/side-menu-item';
import { isConnectedSpaceOpened, toConnectedSpace } from '../../routes/utils';
import { ConnectedSpace } from '../../services/console/connected-space-types';
import { ConsoleSettings } from '../../services/console/settings-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';

const SideMenuSpacesContainer = styled.div.attrs({
	'data-widget': 'side-menu-spaces',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	max-height     : calc(var(--side-menu-icon-size) * 5);
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
	const { showTooltip } = props;

	const history = useHistory();
	const { on, off } = useConsoleEventBus();
	const [ spaces, setSpaces ] = useState<Array<ConnectedSpace>>([]);
	useEffect(() => {
		const onSettingsLoaded = ({ connectedSpaces }: ConsoleSettings) => {
			setSpaces(connectedSpaces || []);
		};
		on(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		return () => {
			off(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		};
	}, [ on, off ]);

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
				return <SpaceMenu icon={ICON_SPACE} label={space.name} showTooltip={showTooltip}
				                  onClick={onSpaceClicked(space)}
				                  key={space.connectId}/>;
			})}
	</SideMenuSpacesContainer>;
};
