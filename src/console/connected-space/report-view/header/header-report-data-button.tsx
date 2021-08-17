import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_REPORT_DATA} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {Lang} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';

export const HeaderReportDataButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const onDataClicked = async () => {
		// TODO
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DATA}
		// ink={isSubjectDataNow() ? ButtonInk.PRIMARY : (void 0)}
		                     onClick={onDataClicked}>
		<FontAwesomeIcon icon={ICON_REPORT_DATA}/>
	</PageHeaderButton>;
};