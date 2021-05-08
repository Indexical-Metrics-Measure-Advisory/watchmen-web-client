import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {ICON_PAGE_SIZE} from '../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {ButtonInk} from '../../../basic-widgets/types';
import {Lang} from '../../../langs';
import {Dashboard} from '../../../services/tuples/dashboard-types';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';

export const HeaderShowPageButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire} = useDashboardEventBus();
	const [showPage, setShowPage] = useState(false);
	useEffect(() => {
		setShowPage(false);
	}, [dashboard]);

	const onShowPageClicked = () => {
		setShowPage(!showPage);
		fire(DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, !showPage);
	};

	return <PageHeaderButton
		tooltip={showPage ? Lang.CONSOLE.DASHBOARD.HIDE_PRINT_PAGE : Lang.CONSOLE.DASHBOARD.SHOW_PRINT_PAGE}
		ink={showPage ? ButtonInk.PRIMARY : (void 0)}
		onClick={onShowPageClicked}>
		<FontAwesomeIcon icon={ICON_PAGE_SIZE}/>
	</PageHeaderButton>;
};