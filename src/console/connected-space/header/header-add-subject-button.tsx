import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_SUBJECT } from '../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../langs';
import { toSubject } from '../../../routes/utils';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { saveSubject } from '../../../services/tuples/subject';
import { createSubject } from '../../utils/tuples';

export const HeaderAddSubjectButton = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const history = useHistory();
	const onAddSubjectClicked = async () => {
		const subject = createSubject();
		await saveSubject(subject, connectedSpace.connectId);
		connectedSpace.subjects.push(subject);
		history.push(toSubject(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_SUBJECT} onClick={onAddSubjectClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT}/>
	</PageHeaderButton>;
};