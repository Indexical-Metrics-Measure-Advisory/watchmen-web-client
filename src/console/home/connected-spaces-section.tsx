import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { ICON_ADD, ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL, ICON_SORT } from '../../basic-widgets/constants';
import { ButtonInk } from '../../basic-widgets/types';
import { Lang } from '../../langs';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { useConnectSpace } from '../widgets/use-connect-space';
import { ConnectedSpaceCard } from './connected-space-card';
import { SortType, ViewType } from './types';
import { useMaxHeight } from './use-max-height';
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
	const bodyRef = useRef<HTMLDivElement>(null);
	const [ sortType, setSortType ] = useState<SortType>(SortType.BY_VISIT_TIME);
	const [ viewType, setViewType ] = useState<ViewType>(ViewType.ALL);
	const [ connectedSpaces, setConnectedSpaces ] = useState<Array<ConnectedSpace>>([]);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (newConnectedSpaces) => {
			if (newConnectedSpaces !== connectedSpaces) {
				setConnectedSpaces(newConnectedSpaces);
			}
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	}, [ once, connectedSpaces ]);
	const maxHeight = useMaxHeight(bodyRef);

	const onConnectSpaceClicked = useConnectSpace();
	const onSortClicked = () => {
		setSortType(sortType === SortType.BY_NAME ? SortType.BY_VISIT_TIME : SortType.BY_NAME);
	};
	const onViewClicked = () => {
		setViewType(viewType === ViewType.COLLAPSE ? ViewType.ALL : ViewType.COLLAPSE);
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
					<FontAwesomeIcon icon={viewType === ViewType.ALL ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
					<span>{viewType === ViewType.ALL ? Lang.CONSOLE.HOME.VIEW_COLLAPSE : Lang.CONSOLE.HOME.VIEW_ALL}</span>
				</HeaderButton>
			</HomeSectionHeaderOperators>
		</HomeSectionHeader>
		<HomeSectionBody collapse={viewType !== ViewType.ALL} maxHeight={maxHeight} ref={bodyRef}>
			{sortedConnectedSpaces.map(connectedSpace => {
				return <ConnectedSpaceCard connectedSpace={connectedSpace} key={connectedSpace.connectId}/>;
			})}
		</HomeSectionBody>
	</HomeSection>;
};