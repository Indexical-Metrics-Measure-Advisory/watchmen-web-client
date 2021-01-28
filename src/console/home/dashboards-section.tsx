import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ICON_ADD, ICON_SORT } from '../../basic-widgets/constants';
import { ButtonInk } from '../../basic-widgets/types';
import { Lang } from '../../langs';
import { Dashboard } from '../../services/console/dashboard-types';
import { ConsoleSettings } from '../../services/console/settings-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { useConsoleSettings } from '../data-initializer';
import { DashboardCard } from './dashboard-card';
import { SortType } from './types';
import {
	HeaderButton,
	HomeSection,
	HomeSectionBody,
	HomeSectionHeader,
	HomeSectionHeaderOperators,
	HomeSectionTitle
} from './widgets';

export const DashboardsSection = () => {
	const { once } = useConsoleEventBus();
	const [ sortType, setSortType ] = useState<SortType>(SortType.BY_VISIT_TIME);
	const [ dashboards, setDashboards ] = useState<Array<Dashboard>>([]);
	useConsoleSettings({
		onSettingsLoaded: (({ dashboards }: ConsoleSettings) => {
			setDashboards(dashboards);
		}),
		onSettingsInitialized: () => {
			once(ConsoleEventTypes.REPLY_DASHBOARDS, (newDashboards) => {
				if (newDashboards !== dashboards) {
					setDashboards(newDashboards);
				}
			}).fire(ConsoleEventTypes.ASK_DASHBOARDS);
		}
	});

	const onSortClicked = () => {
		setSortType(sortType === SortType.BY_NAME ? SortType.BY_VISIT_TIME : SortType.BY_NAME);
	};

	let sortedDashboards;
	if (sortType === SortType.BY_VISIT_TIME) {
		sortedDashboards = dashboards.sort((cs1, cs2) => {
			return (cs2.lastVisitTime || '').localeCompare(cs1.lastVisitTime || '');
		});
	} else {
		sortedDashboards = dashboards.sort((cs1, cs2) => {
			return cs1.name.toLowerCase().localeCompare(cs2.name.toLowerCase());
		});
	}

	return <HomeSection>
		<HomeSectionHeader>
			<HomeSectionTitle>{Lang.CONSOLE.HOME.DASHBOARD_TITLE}</HomeSectionTitle>
			<HomeSectionHeaderOperators>
				<HeaderButton ink={ButtonInk.PRIMARY}>
					<FontAwesomeIcon icon={ICON_ADD}/>
					<span>{Lang.CONSOLE.HOME.CREATE_DASHBOARD_BUTTON}</span>
				</HeaderButton>
				<HeaderButton ink={ButtonInk.PRIMARY} onClick={onSortClicked}>
					<FontAwesomeIcon icon={ICON_SORT}/>
					<span>{sortType === SortType.BY_NAME ? Lang.CONSOLE.HOME.SORT_BY_VISIT_TIME : Lang.CONSOLE.HOME.SORT_BY_NAME}</span>
				</HeaderButton>
			</HomeSectionHeaderOperators>
		</HomeSectionHeader>
		<HomeSectionBody>
			{sortedDashboards.map(dashboard => {
				return <DashboardCard dashboard={dashboard} key={dashboard.dashboardId}/>;
			})}
		</HomeSectionBody>
	</HomeSection>;
};