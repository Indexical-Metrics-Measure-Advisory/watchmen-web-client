import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_REPORT } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';

export const HeaderAddReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	// const { connectedSpace } = props;

	const onAddReportClicked = async () => {
		// const subject = createSubject();
		// await saveSubject(subject, connectedSpace.connectId);
		// connectedSpace.subjects.push(subject);
		// fire(ConnectedSpaceEventTypes.SUBJECT_ADDED, subject);
		// history.push(toSubject(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_REPORT} onClick={onAddReportClicked}>
		<FontAwesomeIcon icon={ICON_REPORT}/>
	</PageHeaderButton>;
};