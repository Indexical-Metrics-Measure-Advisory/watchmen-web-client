import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {ICON_REPORT_DATA} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {Lang} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';
import {Report} from '../../../../services/tuples/report-types';
import {ButtonInk} from '../../../../basic-widgets/types';

export const HeaderReportDataButton = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {report} = props;

	const {fire} = useReportViewEventBus();
	const [datasetShown, setDatasetShown] = useState(false);

	const onDataClicked = async () => {
		setDatasetShown(!datasetShown);
		fire(ReportViewEventTypes.SHOW_DATASET, report, !datasetShown);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DATA}
	                         ink={datasetShown ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onDataClicked}>
		<FontAwesomeIcon icon={ICON_REPORT_DATA}/>
	</PageHeaderButton>;
};