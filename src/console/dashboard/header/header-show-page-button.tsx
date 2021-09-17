import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ICON_PAGE_SIZE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
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