import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { matchPath, useHistory } from 'react-router-dom';
import { ICON_SUBJECT_DEF } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { ButtonInk } from '../../../../basic-widgets/types';
import { Lang } from '../../../../langs';
import { Router } from '../../../../routes/types';
import { toSubject } from '../../../../routes/utils';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';

const isSubjectDefNow = () => !!matchPath(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF);

export const HeaderSubjectDefButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const history = useHistory();

	const onCatalogClicked = () => {
		if (isSubjectDefNow()) {
			return;
		}
		history.push(toSubject(connectedSpace.connectId, subject.subjectId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.CATALOG}
	                         ink={isSubjectDefNow() ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onCatalogClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT_DEF}/>
	</PageHeaderButton>;
};