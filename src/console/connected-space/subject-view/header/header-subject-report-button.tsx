import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_SUBJECT_REPORT } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { ButtonInk } from '../../../../basic-widgets/types';
import { Lang } from '../../../../langs';
import { toSubjectReport } from '../../../../routes/utils';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { useSubjectValid } from '../data-validator';
import { isSubjectReportNow } from './utils';

export const HeaderSubjectReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const history = useHistory();
	const [ checked, setChecked ] = useState<{ valid: boolean, subject?: Subject }>({ valid: false });
	useSubjectValid({ connectedSpace, subject, setValid: setChecked, detectSubjectDefChange: true });

	if (!checked.subject || checked.subject !== subject || !checked.valid) {
		return null;
	}

	const onReportClicked = () => {
		if (isSubjectReportNow()) {
			return;
		}
		history.push(toSubjectReport(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_REPORT}
	                         ink={isSubjectReportNow() ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onReportClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT_REPORT}/>
	</PageHeaderButton>;
};