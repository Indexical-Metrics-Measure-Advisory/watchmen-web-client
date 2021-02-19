import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_CLOSE } from '../../../../../../basic-widgets/constants';
import { TooltipAlignment } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import { useReportEventBus } from '../../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../../report/report-event-bus-types';
import { ConnectedSpace } from '../../../../../../services/tuples/connected-space-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { SettingsContainer, SettingsHeader, SettingsHeaderButton, SettingsHeaderTitle } from './widgets';

export const ReportSettings = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const { connectedSpace, subject, report } = props;

	const { fire } = useReportEventBus();

	const onCloseClicked = () => fire(ReportEventTypes.EDIT_COMPLETED, report);

	return <SettingsContainer>
		<SettingsHeader>
			<SettingsHeaderTitle>{report.name || 'Report Edit'}</SettingsHeaderTitle>
			<SettingsHeaderButton tooltip={{ label: Lang.ACTIONS.CLOSE, alignment: TooltipAlignment.RIGHT }}
			                      onClick={onCloseClicked}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
			</SettingsHeaderButton>
		</SettingsHeader>
	</SettingsContainer>;
};