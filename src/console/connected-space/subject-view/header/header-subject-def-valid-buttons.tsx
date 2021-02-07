import React, { useState } from 'react';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { useSubjectValid } from '../data-validator';
import { HeaderSubjectDataButton } from './header-subject-data-button';
import { HeaderSubjectReportButton } from './header-subject-report-button';

export const HeaderSubjectDefValidButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const [ checked, setChecked ] = useState<{ valid: boolean, subject?: Subject }>({ valid: false });
	useSubjectValid({ connectedSpace, subject, setValid: setChecked, detectSubjectDefChange: true });

	if (!checked.subject || checked.subject !== subject || !checked.valid) {
		return null;
	}

	return <>
		<HeaderSubjectDataButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectReportButton connectedSpace={connectedSpace} subject={subject}/>
	</>
}