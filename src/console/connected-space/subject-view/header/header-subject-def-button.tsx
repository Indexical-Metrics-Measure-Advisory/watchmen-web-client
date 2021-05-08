import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ICON_SUBJECT_DEF} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {ButtonInk} from '../../../../basic-widgets/types';
import {Lang} from '../../../../langs';
import {toSubjectDef} from '../../../../routes/utils';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {isSubjectDefNow} from './utils';

export const HeaderSubjectDefButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();

	const onDefClicked = () => {
		if (isSubjectDefNow()) {
			return;
		}
		history.push(toSubjectDef(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF}
	                         ink={isSubjectDefNow() ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onDefClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT_DEF}/>
	</PageHeaderButton>;
};