import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ICON_ADD, ICON_SORT } from '../../basic-widgets/constants';
import { ButtonInk } from '../../basic-widgets/types';
import { Lang } from '../../langs';
import { ConnectedSpace } from '../../services/console/connected-space-types';
import { ConsoleSettings } from '../../services/console/settings-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { useConsoleSettings } from '../data-initializer';
import { ConnectedSpaceCard } from './connected-space-card';
import { SortType } from './types';
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

	const onSortClicked = () => {
		setSortType(sortType === SortType.BY_NAME ? SortType.BY_VISIT_TIME : SortType.BY_NAME);
	};

	return <HomeSection>
		<HomeSectionHeader>
			<HomeSectionTitle>{Lang.CONSOLE.HOME.CONNECTED_SPACE_TITLE}</HomeSectionTitle>
			<HomeSectionHeaderOperators>
				<HeaderButton ink={ButtonInk.PRIMARY}>
					<FontAwesomeIcon icon={ICON_ADD}/>
					<span>{Lang.CONSOLE.HOME.CREATE_CONNECTED_SPACE_BUTTON}</span>
				</HeaderButton>
				<HeaderButton ink={ButtonInk.PRIMARY} onClick={onSortClicked}>
					<FontAwesomeIcon icon={ICON_SORT}/>
					<span>{sortType === SortType.BY_NAME ? Lang.CONSOLE.HOME.SORT_BY_VISIT_TIME : Lang.CONSOLE.HOME.SORT_BY_NAME}</span>
				</HeaderButton>
			</HomeSectionHeaderOperators>
		</HomeSectionHeader>
		<HomeSectionBody>
			{connectedSpaces.map(connectedSpace => {
				return <ConnectedSpaceCard connectedSpace={connectedSpace} key={connectedSpace.connectId}/>;
			})}
		</HomeSectionBody>
	</HomeSection>;
};