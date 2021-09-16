import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ICON_SUBJECT} from '@/basic-widgets/constants';
import {PageHeaderButton} from '@/basic-widgets/page-header-buttons';
import {Lang} from '@/langs';
import {toSubjectReports} from '@/routes/utils';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';

export const HeaderSubjectButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();

	const onSubjectClicked = () => {
		history.push(toSubjectReports(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_REPORTS}
	                         onClick={onSubjectClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT}/>
	</PageHeaderButton>;
};