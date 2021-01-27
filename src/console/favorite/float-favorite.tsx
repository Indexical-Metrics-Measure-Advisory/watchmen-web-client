import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_CONNECTED_SPACE, ICON_DASHBOARD } from '../../basic-widgets/constants';
import { useCollapseFixedThing } from '../../basic-widgets/utils';
import { Lang } from '../../langs';
import { isConnectedSpaceOpened, isDashboardOpened, toConnectedSpace, toDashboard } from '../../routes/utils';
import { ConnectedSpace } from '../../services/console/connected-space-types';
import { Dashboard } from '../../services/console/dashboard-types';
import { ConsoleSettings } from '../../services/console/settings-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes, FavoriteState } from '../console-event-bus-types';
import {
	FloatFavoriteBody,
	FloatFavoriteContainer,
	FloatFavoriteItem,
	FloatFavoriteNoData,
	FloatFavoriteTitle
} from './widgets';

interface StateData {
	connectedSpaces: Array<ConnectedSpace>;
	dashboards: Array<Dashboard>;
	connectedSpaceIds: Array<string>;
	dashboardIds: Array<string>;
}

interface RenderItem {
	id: string;
	name: string;
	icon: typeof ICON_CONNECTED_SPACE | typeof ICON_DASHBOARD;
	type: 'dashboard' | 'connected-space'
}

export const FloatFavorite = (props: {
	state: FavoriteState;
	top: number;
	left: number;
}) => {
	const { state, top, left } = props;

	const history = useHistory();
	const { on, off, fire } = useConsoleEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const [ data, setData ] = useState<StateData>({
		connectedSpaces: [],
		dashboards: [],
		connectedSpaceIds: [],
		dashboardIds: []
	});
	useEffect(() => {
		const onSettingsLoaded = (({ connectedSpaces, dashboards, favorite }: ConsoleSettings) => {
			const { connectedSpaceIds, dashboardIds } = favorite;
			setData({ connectedSpaces, dashboards, connectedSpaceIds, dashboardIds });
		});
		on(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		return () => {
			off(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		};
	}, [ on, off ]);
	useCollapseFixedThing({ containerRef, hide: () => fire(ConsoleEventTypes.HIDE_FAVORITE) });

	const onItemClicked = (id: string, type: 'dashboard' | 'connected-space') => () => {
		if (type === 'dashboard') {
			if (!isDashboardOpened(id)) {
				history.push(toDashboard(id));
			}
		} else if (type === 'connected-space') {
			if (!isConnectedSpaceOpened(id)) {
				history.push(toConnectedSpace(id));
			}
		}
		fire(ConsoleEventTypes.HIDE_FAVORITE);
	};

	const items = [
		...data.connectedSpaceIds.map(connectedSpaceId => {
			// eslint-disable-next-line
			const connectedSpace = data.connectedSpaces.find(space => space.connectId == connectedSpaceId);
			if (connectedSpace) {
				return {
					id: connectedSpace.connectId,
					name: connectedSpace.name,
					icon: ICON_CONNECTED_SPACE,
					type: 'connected-space'
				};
			} else {
				return null;
			}
		}).filter(x => !!x) as Array<RenderItem>,
		...data.dashboardIds.map(dashboardId => {
			// eslint-disable-next-line
			const dashboard = data.dashboards.find(dashboard => dashboard.dashboardId == dashboardId);
			if (dashboard) {
				return { id: dashboard.dashboardId, name: dashboard.name, icon: ICON_DASHBOARD, type: 'dashboard' };
			} else {
				return null;
			}
		}).filter(x => !!x) as Array<RenderItem>
	].sort((i1, i2) => i1.name.toLowerCase().localeCompare(i2.name.toLowerCase()));

	const visible = state === FavoriteState.SHOWN;

	return <FloatFavoriteContainer visible={visible} top={top} left={left} ref={containerRef}>
		<FloatFavoriteTitle>{Lang.CONSOLE.FAVORITE.FLOAT_TITLE}</FloatFavoriteTitle>
		<FloatFavoriteBody>
			{items.length !== 0
				? items.map(({ id, name, icon, type }) => {
					return <FloatFavoriteItem key={`${type}-${id}`}
					                          onClick={onItemClicked(id, type)}>
						<FontAwesomeIcon icon={icon}/>
						<span>{name}</span>
					</FloatFavoriteItem>;
				})
				: <FloatFavoriteNoData>{Lang.CONSOLE.FAVORITE.NO_DATA}</FloatFavoriteNoData>
			}
		</FloatFavoriteBody>
	</FloatFavoriteContainer>;
};