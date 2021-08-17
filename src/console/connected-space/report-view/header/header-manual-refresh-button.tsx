import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_REFRESH} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {Lang} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';
import {Report} from '../../../../services/tuples/report-types';

export const HeaderManualRefreshButton = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {report} = props;

	const {fire} = useReportViewEventBus();
	const onManualRefreshClicked = () => {
		fire(ReportViewEventTypes.REFRESH_REPORTS, report);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.REFRESH}
	                         onClick={onManualRefreshClicked}>
		<FontAwesomeIcon icon={ICON_REFRESH}/>
	</PageHeaderButton>;
};