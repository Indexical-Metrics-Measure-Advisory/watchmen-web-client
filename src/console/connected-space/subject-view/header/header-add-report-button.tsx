import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_REPORT } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';

export const HeaderAddReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const onAddReportClicked = async () => {
		// TODO add report into subject
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_REPORT} onClick={onAddReportClicked}>
		<FontAwesomeIcon icon={ICON_REPORT}/>
	</PageHeaderButton>;
};