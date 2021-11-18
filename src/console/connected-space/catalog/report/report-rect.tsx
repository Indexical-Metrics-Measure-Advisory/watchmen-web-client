import {toSubjectReport} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ICON_EDIT} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {MouseEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {findSvgRoot} from '../../../utils/in-svg';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledReportGraphics, GraphicsRole} from '../types';
import {OpenSubjectButton, OpenSubjectButtonIcon, ReportBlock, ReportContainer, ReportNameText} from './widgets';

export const ReportRect = (props: { connectedSpace: ConnectedSpace; subject: Subject, report: AssembledReportGraphics }) => {
	const {connectedSpace, subject, report: reportGraphics} = props;
	const {report, rect} = reportGraphics;
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
				fire(CatalogEventTypes.REPORT_MOVED, report, reportGraphics);
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

	const onReportOpenClicked = () => {
		history.push(toSubjectReport(connectedSpace.connectId, subject.subjectId, report.reportId));
	};

	return <ReportContainer onMouseDown={onMouseDown} coordinate={coordinate}
	                        data-subject-id={subject.subjectId}
	                        data-report-id={report.reportId}
	                        data-role={GraphicsRole.REPORT}>
		<ReportBlock frame={frameRect} dnd={dnd}
		             data-subject-id={subject.subjectId}
		             data-report-id={report.reportId}
		             data-role={GraphicsRole.REPORT_FRAME}/>
		<ReportNameText pos={namePos} dnd={dnd} data-role={GraphicsRole.REPORT_NAME}>
			{report.name}
		</ReportNameText>
		<OpenSubjectButton frame={frameRect} onClick={onReportOpenClicked}/>
		<OpenSubjectButtonIcon d={ICON_EDIT.icon[4] as any} frame={frameRect}/>
	</ReportContainer>;
};