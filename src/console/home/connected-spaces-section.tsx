import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ICON_ADD, ICON_CUT, ICON_SORT } from '../../basic-widgets/constants';
import { ButtonInk } from '../../basic-widgets/types';
import { Lang } from '../../langs';
import { ConnectedSpace } from '../../services/console/connected-space-types';
import { ConsoleSettings } from '../../services/console/settings-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { useConsoleSettings } from '../data-initializer';
import { ConnectedSpaceCard } from './connected-space-card';
import { SortType, ViewType } from './types';
import {
	HeaderButton,
	HomeSection,
	HomeSectionBody,
	HomeSectionHeader,
	HomeSectionHeaderOperators,
	HomeSectionTitle
} from './widgets';

export const ConnectedSpacesSection = () => {
	const { once } = useConsoleEventBus();
	const [ sortType, setSortType ] = useState<SortType>(SortType.BY_VISIT_TIME);
	const [ viewType, setViewType ] = useState<ViewType>(ViewType.TOP_6);
	const [ connectedSpaces, setConnectedSpaces ] = useState<Array<ConnectedSpace>>([]);
	useConsoleSettings({
		onSettingsLoaded: (({ connectedSpaces }: ConsoleSettings) => {
			setConnectedSpaces(connectedSpaces);
		}),
		onSettingsInitialized: () => {
			once(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (newConnectedSpaces) => {
				if (newConnectedSpaces !== connectedSpaces) {
					setConnectedSpaces(newConnectedSpaces);
				}
			}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
		}
	});

	const onConnectSpaceClicked = () => {
		// TODO connect space
	}
	const onSortClicked = () => {
		setSortType(sortType === SortType.BY_NAME ? SortType.BY_VISIT_TIME : SortType.BY_NAME);
	};
	const onViewClicked = () => {
		setViewType(viewType === ViewType.TOP_6 ? ViewType.ALL : ViewType.TOP_6);
	};

	let sortedConnectedSpaces;
	if (sortType === SortType.BY_VISIT_TIME) {
		sortedConnectedSpaces = connectedSpaces.sort((cs1, cs2) => {
			return (cs2.lastVisitTime || '').localeCompare(cs1.lastVisitTime || '');
		});
	} else {
		sortedConnectedSpaces = connectedSpaces.sort((cs1, cs2) => {
			return cs1.name.toLowerCase().localeCompare(cs2.name.toLowerCase());
		});
	}

	if (viewType === ViewType.TOP_6) {
		sortedConnectedSpaces = [ ...sortedConnectedSpaces ];
		sortedConnectedSpaces.length = Math.min(6, sortedConnectedSpaces.length);
	}

	return <HomeSection>
		<HomeSectionHeader>
			<HomeSectionTitle>{Lang.CONSOLE.HOME.CONNECTED_SPACE_TITLE}</HomeSectionTitle>
			<HomeSectionHeaderOperators>
				<HeaderButton ink={ButtonInk.PRIMARY} onClick={onConnectSpaceClicked}>
					<FontAwesomeIcon icon={ICON_ADD}/>
					<span>{Lang.CONSOLE.HOME.CREATE_CONNECTED_SPACE_BUTTON}</span>
				</HeaderButton>
				<HeaderButton ink={ButtonInk.PRIMARY} onClick={onSortClicked}>
					<FontAwesomeIcon icon={ICON_SORT}/>
					<span>{sortType === SortType.BY_NAME ? Lang.CONSOLE.HOME.SORT_BY_VISIT_TIME : Lang.CONSOLE.HOME.SORT_BY_NAME}</span>
				</HeaderButton>
				<HeaderButton ink={ButtonInk.PRIMARY} onClick={onViewClicked}>
					<FontAwesomeIcon icon={ICON_CUT}/>
					<span>{viewType === ViewType.ALL ? Lang.CONSOLE.HOME.VIEW_TOP_6 : Lang.CONSOLE.HOME.VIEW_ALL}</span>
				</HeaderButton>
			</HomeSectionHeaderOperators>
		</HomeSectionHeader>
		<HomeSectionBody>
			{sortedConnectedSpaces.map(connectedSpace => {
				return <ConnectedSpaceCard connectedSpace={connectedSpace} key={connectedSpace.connectId}/>;
			})}
		</HomeSectionBody>
	</HomeSection>;
};