import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { ICON_DELETE, ICON_DRAG_HANDLE } from '../../basic-widgets/constants';
import { useForceUpdate } from '../../basic-widgets/utils';
import { GraphicsPosition, GraphicsSize } from '../../services/graphics/graphics-types';
import { Paragraph } from '../../services/tuples/paragraph';
import { useDragAndResize } from '../drag-and-resize/use-drag-and-resize';
import { useReportEventBus } from '../report-event-bus';
import { ReportEventTypes } from '../report-event-bus-types';
import { DragType } from '../types';
import { ChartButton, ChartButtons, ChartContainer, ChartDragHandle, ChartDragHandlePart } from '../widgets';

export const Container = (props: {
	paragraph: Paragraph;
	fixed: boolean;
	editable: boolean;
	editing: boolean;
	removable: boolean;
}) => {
	const { paragraph, fixed, editable, editing, removable } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const dndRef = useRef<HTMLDivElement>(null);
	const { fire, on, off } = useReportEventBus();
	const forceUpdate = useForceUpdate();

	const writeToRect = (rect: GraphicsSize & GraphicsPosition) => paragraph.rect = rect;
	const onDrop = () => fire(ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, paragraph);
	const { onMouseUp, onMouseLeave, onMouseDown, onMouseMove, dragState } = useDragAndResize({
		containerRef,
		dndRef,
		writeToRect,
		onDrop
	});

	const onRemoveClicked = () => fire(ReportEventTypes.DO_DELETE_PARAGRAPH, paragraph);

	return <ChartContainer rect={paragraph.rect} fixed={fixed} ref={containerRef}>
			{/*<Diagram report={report} dataset={diagramState.dataset!}/>*/}
		{
			fixed
				? null
				: <ChartDragHandle onMouseDown={onMouseDown} onMouseUp={onMouseUp}
				                   onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
				                   dragging={dragState.type !== DragType.NONE}>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_RIGHT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP_RIGHT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM_RIGHT}/>
					<ChartDragHandlePart data-part-type='dragging' data-position={dragState.type}/>
					<ChartDragHandlePart data-position={DragType.DND} ref={dndRef}>
						<FontAwesomeIcon icon={ICON_DRAG_HANDLE}/>
					</ChartDragHandlePart>
					{editable || removable
						? <ChartButtons>
							{removable
								? <ChartButton onClick={onRemoveClicked}>
									<FontAwesomeIcon icon={ICON_DELETE}/>
								</ChartButton>
								: null}
						</ChartButtons>
						: null}
				</ChartDragHandle>
		}
	</ChartContainer>;
};