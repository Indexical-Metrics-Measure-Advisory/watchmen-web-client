import {toDashboard} from '@/routes/utils';
import {saveDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ICON_ADD, ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL, ICON_SORT} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {createDashboard} from '../utils/tuples';
import {DashboardCard} from './dashboard-card';
import {SortType, ViewType} from './types';
import {useMaxHeight} from './use-max-height';
import {
	HeaderButton,
	HomeSection,
	HomeSectionBody,
	HomeSectionHeader,
	HomeSectionHeaderOperators,
	HomeSectionTitle
} from './widgets';

export const DashboardsSection = () => {
	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();
	const bodyRef = useRef<HTMLDivElement>(null);
	const [sortType, setSortType] = useState<SortType>(SortType.BY_VISIT_TIME);
	const [viewType, setViewType] = useState<ViewType>(ViewType.ALL);
	const [dashboards, setDashboards] = useState<Array<Dashboard>>([]);
	useEffect(() => {
		fire(ConsoleEventTypes.ASK_DASHBOARDS, (newDashboards) => {
			if (newDashboards !== dashboards) {
				setDashboards(newDashboards);
			}
		});
	}, [dashboards, fire]);
	const maxHeight = useMaxHeight(bodyRef);

	const onCreateDashboardClicked = async () => {
		const dashboard = createDashboard();
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveDashboard(dashboard),
			() => {
				fire(ConsoleEventTypes.DASHBOARD_CREATED, dashboard);
				history.push(toDashboard(dashboard.dashboardId));
			});
	};
	const onSortClicked = () => {
		setSortType(sortType === SortType.BY_NAME ? SortType.BY_VISIT_TIME : SortType.BY_NAME);
	};
	const onViewClicked = () => {
		setViewType(viewType === ViewType.COLLAPSE ? ViewType.ALL : ViewType.COLLAPSE);
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
				<HeaderButton ink={ButtonInk.PRIMARY} onClick={onCreateDashboardClicked}>
					<FontAwesomeIcon icon={ICON_ADD}/>
					<span>{Lang.CONSOLE.HOME.CREATE_DASHBOARD_BUTTON}</span>
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
			{sortedDashboards.map(dashboard => {
				return <DashboardCard dashboard={dashboard} key={dashboard.dashboardId}/>;
			})}
		</HomeSectionBody>
	</HomeSection>;
};