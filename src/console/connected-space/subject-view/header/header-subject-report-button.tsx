import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_SUBJECT_REPORT } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { ButtonInk } from '../../../../basic-widgets/types';
import { Lang } from '../../../../langs';
import { toSubjectReport } from '../../../../routes/utils';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { isSubjectReportNow } from './utils';

export const HeaderSubjectReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const history = useHistory();

	const onCatalogClicked = () => {
		if (isSubjectReportNow()) {
			return;
		}
		history.push(toSubjectReport(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_REPORT}
	                         ink={isSubjectReportNow() ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onCatalogClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT_REPORT}/>
	</PageHeaderButton>;
};