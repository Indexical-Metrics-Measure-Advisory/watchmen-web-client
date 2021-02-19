import React from 'react';
import { ConnectedSpace } from '../../../../../../services/tuples/connected-space-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { SettingsContainer } from './widgets';

export const ReportSettings = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const { connectedSpace, subject, report } = props;

	return <SettingsContainer>

	</SettingsContainer>;
};