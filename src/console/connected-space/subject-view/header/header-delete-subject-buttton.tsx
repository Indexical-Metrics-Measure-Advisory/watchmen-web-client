import {toConnectedSpace} from '@/routes/utils';
import {SAVE_TIMEOUT} from '@/services/constants';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {deleteSubject, renameSubject, saveSubject} from '@/services/data/tuples/subject';
import {Subject} from '@/services/data/tuples/subject-types';
import {Button} from '@/widgets/basic/button';
import {ICON_THROW_AWAY} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useThrottler} from '@/widgets/throttler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useConnectedSpaceEventBus} from '../../connected-space-event-bus';
import {ConnectedSpaceEventTypes} from '../../connected-space-event-bus-types';
import {useSubjectEventBus} from '../subject-event-bus';
import {SubjectEventTypes} from '../subject-event-bus-types';

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
		fire(EventTypes.HIDE_DIALOG);
		onRemoved();
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
	const {fire: fireSpace} = useConnectedSpaceEventBus();
	const {on, off} = useSubjectEventBus();
	const saveQueue = useThrottler();
	useEffect(() => saveQueue.clear(true), [subject, saveQueue]);
	useEffect(() => {
		const onSubjectDefChanged = (subject: Subject) => {
			saveQueue.replace(() => {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => await saveSubject(subject, connectedSpace.connectId));
			}, SAVE_TIMEOUT);
		};
		const onSubjectRenamed = async (subject: Subject) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => await renameSubject(subject));
		};
		on(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
		on(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		return () => {
			off(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
			off(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		};
	}, [on, off, fireGlobal, connectedSpace, subject, saveQueue]);

	const onDeleted = async () => {
		saveQueue.clear(false);
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => {
				await deleteSubject(subject);
			},
			() => {
				// eslint-disable-next-line
				const index = connectedSpace.subjects.findIndex(s => s.subjectId == subject.subjectId);
				if (index !== -1) {
					connectedSpace.subjects.splice(index, 1);
				}
				fireSpace(ConnectedSpaceEventTypes.SUBJECT_REMOVED, subject);
				// back to catalog
				history.replace(toConnectedSpace(connectedSpace.connectId));
			});
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<SubjectDelete subject={subject} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DELETE_ME} onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};