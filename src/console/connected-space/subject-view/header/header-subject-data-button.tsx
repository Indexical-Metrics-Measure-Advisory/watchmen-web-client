import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_SUBJECT_DATA } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { ButtonInk } from '../../../../basic-widgets/types';
import { Lang } from '../../../../langs';
import { toSubjectData } from '../../../../routes/utils';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { isSubjectDataNow } from './utils';

export const HeaderSubjectDataButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const history = useHistory();

	const onDataClicked = () => {
		if (isSubjectDataNow()) {
			return;
		}
		history.push(toSubjectData(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DATA}
	                         ink={isSubjectDataNow() ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onDataClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT_DATA}/>
	</PageHeaderButton>;
};