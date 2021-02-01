import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_REPORT } from '../../basic-widgets/constants';
import { PageHeaderButton } from '../../basic-widgets/page-header-buttons';
import { Lang } from '../../langs';
import { Dashboard } from '../../services/tuples/dashboard-types';

export const HeaderAddReportButton = (props: { dashboard: Dashboard }) => {
	const onAddReportClicked = () => {
		// TODO add report into dashboard
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_REPORT} onClick={onAddReportClicked}>
		<FontAwesomeIcon icon={ICON_REPORT}/>
	</PageHeaderButton>;
};