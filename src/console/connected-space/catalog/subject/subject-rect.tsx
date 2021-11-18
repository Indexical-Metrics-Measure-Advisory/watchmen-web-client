import {toSubject} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {ICON_EDIT} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {MouseEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {findSvgRoot} from '../../../utils/in-svg';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledSubjectGraphics, GraphicsRole} from '../types';
import {OpenSubjectButton, OpenSubjectButtonIcon, SubjectBlock, SubjectContainer, SubjectNameText} from './widgets';

export const SubjectRect = (props: { connectedSpace: ConnectedSpace; subject: AssembledSubjectGraphics }) => {
	const {connectedSpace, subject: subjectGraphics} = props;
	const {subject, rect} = subjectGraphics;
	const {coordinate, frame: frameRect, name: namePos} = rect;

	const history = useHistory();
	const {fire} = useCatalogEventBus();
	const forceUpdate = useForceUpdate();
	const [dnd, setDnd] = useState<boolean>(false);

	const onMouseDown = (event: MouseEvent) => {
		if (event.button === 0) {
			const {clientX, clientY} = event;
			const [offsetX, offsetY] = [clientX - coordinate.x, clientY - coordinate.y];
			const onMove = ({clientX: x, clientY: y}: { clientX: number; clientY: number }) => {
				rect.coordinate = {x: x - offsetX, y: y - offsetY};
				forceUpdate();
				fire(CatalogEventTypes.SUBJECT_MOVED, subject, subjectGraphics);
			};
			const root = findSvgRoot(event.target as SVGGraphicsElement);
			const onEnd = () => {
				root.removeEventListener('mousemove', onMove);
				root.removeEventListener('mouseleave', onEnd);
				root.removeEventListener('mouseup', onEnd);
				setDnd(false);
			};
			root.addEventListener('mousemove', onMove);
			root.addEventListener('mouseleave', onEnd);
			root.addEventListener('mouseup', onEnd);
			setDnd(true);
		}
	};

	const onSubjectOpenClicked = () => {
		history.push(toSubject(connectedSpace.connectId, subject.subjectId));
	};

	return <SubjectContainer onMouseDown={onMouseDown} coordinate={coordinate}
	                         data-subject-id={subject.subjectId}
	                         data-role={GraphicsRole.SUBJECT}>
		<SubjectBlock frame={frameRect} dnd={dnd}
		              data-subject-id={subject.subjectId}
		              data-role={GraphicsRole.SUBJECT_FRAME}/>
		<SubjectNameText pos={namePos} dnd={dnd} data-role={GraphicsRole.SUBJECT_NAME}>
			{subject.name}
		</SubjectNameText>
		<OpenSubjectButton frame={frameRect} onClick={onSubjectOpenClicked}/>
		<OpenSubjectButtonIcon d={ICON_EDIT.icon[4] as any} frame={frameRect}/>
	</SubjectContainer>;
};