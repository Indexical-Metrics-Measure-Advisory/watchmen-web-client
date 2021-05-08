import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_REFRESH} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {Lang} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {useSubjectEventBus} from '../subject-event-bus';
import {SubjectEventTypes} from '../subject-event-bus-types';

export const HeaderManualRefreshButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {subject} = props;

	const {fire} = useSubjectEventBus();
	const onManualRefreshClicked = () => {
		fire(SubjectEventTypes.REFRESH_REPORTS, subject);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.REFRESH}
	                         onClick={onManualRefreshClicked}>
		<FontAwesomeIcon icon={ICON_REFRESH}/>
	</PageHeaderButton>;
};