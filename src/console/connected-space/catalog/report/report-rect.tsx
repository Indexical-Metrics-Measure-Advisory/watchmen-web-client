import React, { useState } from 'react';
import { useForceUpdate } from '../../../../basic-widgets/utils';
import { findSvgRoot } from '../../../utils/in-svg';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import { AssembledReportGraphics, GraphicsRole } from '../types';
import { ReportBlock, ReportContainer, ReportNameText } from './widgets';

export const ReportRect = (props: { report: AssembledReportGraphics }) => {
	const { report: reportGraphics } = props;
	const { report, rect } = reportGraphics;
	const { coordinate, frame: frameRect, name: namePos } = rect;

	const { fire } = useCatalogEventBus();
	const forceUpdate = useForceUpdate();
	const [ dnd, setDnd ] = useState<boolean>(false);

	const onMouseDown = (event: React.MouseEvent) => {
		if (event.button === 0) {
			const { clientX, clientY } = event;
			const [ offsetX, offsetY ] = [ clientX - coordinate.x, clientY - coordinate.y ];
			const onMove = ({ clientX: x, clientY: y }: MouseEvent) => {
				rect.coordinate = { x: x - offsetX, y: y - offsetY };
				forceUpdate();
				fire(CatalogEventTypes.REPORT_MOVED, report);
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

	return <ReportContainer onMouseDown={onMouseDown} coordinate={coordinate}
	                        data-report-id={report.reportId}
	                        data-role={GraphicsRole.REPORT}>
		<ReportBlock frame={frameRect} dnd={dnd}
		             data-report-id={report.reportId}
		             data-role={GraphicsRole.REPORT_FRAME}/>
		<ReportNameText pos={namePos} dnd={dnd} data-role={GraphicsRole.REPORT_NAME}>
			{report.name}
		</ReportNameText>
	</ReportContainer>;
};