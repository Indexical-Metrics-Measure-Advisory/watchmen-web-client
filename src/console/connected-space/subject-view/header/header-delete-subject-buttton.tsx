import {toConnectedSpace} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {deleteSubject} from '@/services/data/tuples/subject';
import {Subject} from '@/services/data/tuples/subject-types';
import {Button} from '@/widgets/basic/button';
import {ICON_THROW_AWAY} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useConnectedSpaceEventBus} from '../../connected-space-event-bus';
import {ConnectedSpaceEventTypes} from '../../connected-space-event-bus-types';

const DeleteDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const NameUrl = styled.div`
	color       : var(--info-color);
	font-weight : var(--font-bold);
	padding-top : calc(var(--margin) / 2);
	word-break  : break-all;
	line-height : var(--line-height);
`;

const SubjectDelete = (props: { subject: Subject, onRemoved: () => void }) => {
	const {subject, onRemoved} = props;

	const {fire} = useEventBus();

	const onDeleteClicked = async () => {
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await deleteSubject(subject),
			() => {
				fire(EventTypes.HIDE_DIALOG);
				onRemoved();
			});
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DeleteDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.DELETE_SUBJECT_DIALOG_LABEL}</DialogLabel>
			<NameUrl>{subject.name}</NameUrl>
		</DeleteDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderDeleteSubjectButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConnectedSpaceEventBus();

	const onDeleted = async () => {
		// eslint-disable-next-line
		const index = connectedSpace.subjects.findIndex(s => s.subjectId == subject.subjectId);
		if (index !== -1) {
			connectedSpace.subjects.splice(index, 1);
		}
		fire(ConnectedSpaceEventTypes.SUBJECT_REMOVED, subject);
		// back to catalog
		history.replace(toConnectedSpace(connectedSpace.connectId));
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<SubjectDelete subject={subject} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DELETE_ME} onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};