import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ICON_SUBJECT} from '@/basic-widgets/constants';
import {PageHeaderButton} from '@/basic-widgets/page-header-buttons';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {Lang} from '@/langs';
import {toSubject} from '@/routes/utils';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {saveSubject} from '@/services/tuples/subject';
import {createSubject} from '../../../utils/tuples';
import {useConnectedSpaceEventBus} from '../../connected-space-event-bus';
import {ConnectedSpaceEventTypes} from '../../connected-space-event-bus-types';

export const HeaderAddSubjectButton = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConnectedSpaceEventBus();
	const onAddSubjectClicked = async () => {
		const subject = createSubject();
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveSubject(subject, connectedSpace.connectId),
			() => {
				connectedSpace.subjects.push(subject);
				fire(ConnectedSpaceEventTypes.SUBJECT_ADDED, subject);
				history.push(toSubject(connectedSpace.connectId, subject.subjectId));
			});
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_SUBJECT} onClick={onAddSubjectClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT}/>
	</PageHeaderButton>;
};