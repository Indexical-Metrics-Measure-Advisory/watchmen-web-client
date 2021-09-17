import {GraphicsPosition, GraphicsSize} from '@/services/data/graphics/graphics-types';
import {Paragraph} from '@/services/data/tuples/paragraph';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MDEditor from '@uiw/react-md-editor';
import React, {useRef, useState} from 'react';
import {ICON_CONFIRM, ICON_DELETE, ICON_DRAG_HANDLE, ICON_EDIT} from '../../basic/constants';
import {useForceUpdate} from '../../basic/utils';
import {useDragAndResize} from '../drag-and-resize/use-drag-and-resize';
import {useReportEventBus} from '../report-event-bus';
import {ReportEventTypes} from '../report-event-bus-types';
import {DragType} from '../types';
import {ChartButton, ChartButtons, ChartContainer, ChartDragHandle, ChartDragHandlePart} from '../widgets';

export const Container = (props: {
	paragraph: Paragraph;
	fixed: boolean;
	editable: boolean;
	removable: boolean;
}) => {
	const {paragraph, fixed, editable, removable} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const dndRef = useRef<HTMLDivElement>(null);
	const {fire} = useReportEventBus();
	const [editing, setEditing] = useState(false);
	const forceUpdate = useForceUpdate();

	const writeToRect = (rect: GraphicsSize & GraphicsPosition) => paragraph.rect = rect;
	const onDrop = () => fire(ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, paragraph);
	const {onMouseUp, onMouseLeave, onMouseDown, onMouseMove, dragState} = useDragAndResize({
		containerRef,
		dndRef,
		writeToRect,
		onDrop
	});

	const onContentChange = (content?: string) => {
		paragraph.content = content || '';
		forceUpdate();
	};
	const onEditClicked = () => setEditing(true);
	const onEditConfirmClicked = () => setEditing(false);
	const onRemoveClicked = () => fire(ReportEventTypes.DO_DELETE_PARAGRAPH, paragraph);

	return <ChartContainer rect={paragraph.rect} fixed={fixed} ref={containerRef}>
		{editing
			? <MDEditor preview="edit" height={-1} visiableDragbar={false}
			            fullscreen={false}
			            value={paragraph.content} onChange={onContentChange}/>
			: <MDEditor.Markdown source={paragraph.content}/>}
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
					<ChartDragHandlePart data-part-type="dragging" data-position={dragState.type}/>
					<ChartDragHandlePart data-position={DragType.DND} ref={dndRef}>
						<FontAwesomeIcon icon={ICON_DRAG_HANDLE}/>
					</ChartDragHandlePart>
					{editable || removable
						? <ChartButtons>
							{editable && !editing
								? <ChartButton onClick={onEditClicked}>
									<FontAwesomeIcon icon={ICON_EDIT}/>
								</ChartButton>
								: null}
							{editable && editing
								? <ChartButton onClick={onEditConfirmClicked}>
									<FontAwesomeIcon icon={ICON_CONFIRM}/>
								</ChartButton>
								: null}
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