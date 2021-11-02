import React, {ForwardedRef, forwardRef, useEffect, useState} from 'react';
import {useGridEventBus} from '../grid-event-bus';
import {GridEventTypes} from '../grid-event-bus-types';
import {DataColumnDef, DataSetState, DragColumnState} from '../types';
import {
	DragColumnBody,
	DragColumnBodyCell,
	DragColumnContainer,
	DragColumnHeader,
	DragColumnHeaderCell
} from './drag-widgets';

export const GridDragColumn = forwardRef((props: {
	column?: DataColumnDef;
	data: DataSetState;
}, ref: ForwardedRef<HTMLDivElement>) => {
	const {column, data: {data}} = props;

	const {on, off, fire} = useGridEventBus();

	const [visible, setVisible] = useState(false);
	const [state, setState] = useState<DragColumnState>({
		left: 0,
		height: 0,
		startRowIndex: 0,
		endRowIndex: 0,
		firstRowOffsetY: 0,
		movementX: 0
	});
	useEffect(() => {
		const onAskVisible = (onVisibleGet: (visible: boolean) => void) => onVisibleGet(visible);
		const onStateChanged = (newState: Partial<DragColumnState>) => {
			setState((previous) => {
				return {...previous, ...newState};
			});
		};

		on(GridEventTypes.DRAG_COLUMN_VISIBLE_CHANGED, setVisible);
		on(GridEventTypes.DRAG_COLUMN_STATE_CHANGED, onStateChanged);
		on(GridEventTypes.ASK_DRAG_COLUMN_VISIBLE, onAskVisible);

		return () => {
			off(GridEventTypes.DRAG_COLUMN_VISIBLE_CHANGED, setVisible);
			off(GridEventTypes.DRAG_COLUMN_STATE_CHANGED, onStateChanged);
			off(GridEventTypes.ASK_DRAG_COLUMN_VISIBLE, onAskVisible);
		};
	}, [on, off, fire, visible]);

	if (!column || !state) {
		return null;
	}

	const {width} = column;
	const {left, height, startRowIndex, endRowIndex, firstRowOffsetY, movementX} = state;

	return <DragColumnContainer left={left} width={width} height={height} movementX={movementX}
	                            visible={visible}
	                            ref={ref}>
		<DragColumnHeader>
			<DragColumnHeaderCell>
				<span>{column.name}</span>
			</DragColumnHeaderCell>
		</DragColumnHeader>
		<DragColumnBody firstRowOffsetY={firstRowOffsetY}>
			{data.map((row, rowIndex) => {
				if (rowIndex < startRowIndex || rowIndex > endRowIndex) {
					return null;
				}

				return <DragColumnBodyCell key={`${rowIndex}`}>
					<span>{`${row[column!.index]}`}</span>
				</DragColumnBodyCell>;
			})}
		</DragColumnBody>
	</DragColumnContainer>;
});