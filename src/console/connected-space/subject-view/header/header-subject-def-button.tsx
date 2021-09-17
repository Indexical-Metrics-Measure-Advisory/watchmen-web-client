import {toSubjectDef} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ICON_SUBJECT_DEF} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
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