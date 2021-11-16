import React, {ForwardedRef, forwardRef, RefObject, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {HEADER_HEIGHT, ROW_HEIGHT} from '../constants';
import {useGridEventBus} from '../grid-event-bus';
import {GridEventTypes} from '../grid-event-bus-types';
import {ColumnDefs, DataSetState, SelectionRef, TableSelection} from '../types';
import {ColumnSelection, RowSelection} from './widgets';

const computeRowSelectionPosition = (options: {
	rowIndex: number;
	scrollTop: number;
	clientHeight: number
}) => {
	const {rowIndex} = options;
	if (rowIndex === -1) {
		return {rowTop: 0, rowHeight: 0};
	}

	const {scrollTop, clientHeight} = options;

	const top = 32 - 1;
	let rowTop = rowIndex === -1 ? 0 : top + 24 * rowIndex - scrollTop;
	let rowHeight = ROW_HEIGHT;
	if (rowTop + rowHeight <= top || rowTop > clientHeight) {
		return {rowTop: 0, rowHeight: 0};
	}
	if (rowTop < top) {
		rowHeight -= top - rowTop;
		rowHeight = Math.max(0, rowHeight);
		rowTop = top;
	}
	if (rowTop + rowHeight > clientHeight) {
		rowHeight = clientHeight - rowTop;
	}
	return {rowTop, rowHeight};
};

const computeColumnSelectionPosition = (options: {
	inFixTable: boolean;
	columnIndex: number;
	scrollLeft: number;
	dataTableClientWidth: number;
	verticalScroll: boolean;
	data: DataSetState;
	columnDefs: ColumnDefs;
	rowNoColumnWidth: number;
}) => {
	const {columnIndex} = options;
	if (columnIndex === -1) {
		return {columnLeft: 0, columnWidth: 0, columnHeight: 0};
	}

	const {
		inFixTable,
		scrollLeft,
		dataTableClientWidth,
		verticalScroll,
		data,
		columnDefs,
		rowNoColumnWidth
	} = options;

	const selectColumnDef = inFixTable ? columnDefs.fixed[columnIndex] : columnDefs.data[columnIndex];
	const selectColumnWidth = selectColumnDef?.width || 0;
	// compute left in my table, total width of previous columns
	const selectColumnLeft = (inFixTable ? columnDefs.fixed : columnDefs.data).reduce((left, columnDef, index) => {
		if (index < columnIndex) {
			left += columnDef.width;
		}
		return left;
	}, 0);

	let columnWidth = selectColumnWidth;
	let columnLeft;
	const fixTableWidth = columnDefs.fixed.reduce((left, column) => left + column.width, rowNoColumnWidth);
	const totalWidth = fixTableWidth + dataTableClientWidth;
	if (inFixTable) {
		columnLeft = selectColumnLeft + rowNoColumnWidth;
	} else {
		columnLeft = fixTableWidth + selectColumnLeft - scrollLeft;
		if (columnLeft + columnWidth <= fixTableWidth || columnLeft >= totalWidth) {
			// column is hide in fix table
			// or column is beyond total width
			return {columnLeft: 0, columnWidth: 0, columnHeight: 0};
		}
		if (columnLeft < fixTableWidth) {
			columnWidth -= fixTableWidth - columnLeft;
			columnWidth = Math.max(0, columnWidth);
			columnLeft = fixTableWidth;
		}
	}
	if (columnWidth + columnLeft > totalWidth) {
		columnWidth = totalWidth - columnLeft;
	}
	return {
		columnLeft,
		columnWidth,
		columnHeight: verticalScroll ? 0 : data.data.length * ROW_HEIGHT + HEADER_HEIGHT
	};
};

const buildDefaultSelection = () => ({
	row: -1,
	rowTop: 0,
	rowHeight: 0,
	column: -1,
	columnLeft: 0,
	columnWidth: 0,
	columnHeight: 0,
	inFixTable: false,
	verticalScroll: 0,
	horizontalScroll: 0
});

const useSelection = (options: {
	data: DataSetState;
	columnDefs: ColumnDefs;
	dataTableRef: RefObject<HTMLDivElement>;
	rowNoColumnWidth: number;
	rowSelectionRef: RefObject<HTMLDivElement>;
	columnSelectionRef: RefObject<HTMLDivElement>;
}) => {
	const {
		data, columnDefs, rowNoColumnWidth,
		dataTableRef, rowSelectionRef, columnSelectionRef
	} = options;

	const {on, off} = useGridEventBus();
	const [selection, setSelection] = useState<TableSelection>(buildDefaultSelection());
	const select = (inFixTable: boolean, rowIndex: number, columnIndex: number) => {
		if (!dataTableRef.current) {
			return;
		}

		const dataTable = dataTableRef.current;
		const {offsetWidth, offsetHeight, clientWidth, clientHeight, scrollTop, scrollLeft} = dataTable;
		const scroll = {
			verticalScroll: offsetWidth - clientWidth,
			horizontalScroll: offsetHeight - clientHeight
		};

		const rowPos = computeRowSelectionPosition({rowIndex, scrollTop, clientHeight});
		const colPos = computeColumnSelectionPosition({
			inFixTable,
			columnIndex,
			scrollLeft,
			dataTableClientWidth: clientWidth,
			verticalScroll: offsetWidth !== clientWidth,
			data,
			columnDefs,
			rowNoColumnWidth
		});

		setSelection({
			row: rowIndex,
			...rowPos,
			column: columnIndex,
			...colPos,
			inFixTable,
			...scroll
		});
	};

	useEffect(() => {
		// compute and set new positions of row and column selection here.
		// in case of handle scroll, transition is not needed; in the meantime, refresh by state change is not as fast as hoped.
		// therefore, use plain javascript to clear transition css and set positions.
		// and synchronize selection state after a short time (setTimeout on several milliseconds), and remove the transition clearing.
		// selection state synchronization is required, otherwise cannot response click cell/row header/column header correctly.
		const repaintSelection = () => {
			if (!dataTableRef.current) {
				return;
			}
			const dataTable = dataTableRef.current;

			let {
				inFixTable,
				row: rowIndex,
				column: columnIndex,
				rowTop,
				rowHeight,
				columnLeft,
				columnWidth
			} = selection;

			if (rowIndex !== -1 && rowSelectionRef.current) {
				const {scrollTop, clientHeight} = dataTable;
				const {rowTop: top, rowHeight: height} = computeRowSelectionPosition({
					rowIndex,
					scrollTop,
					clientHeight
				});
				const bar = rowSelectionRef.current;
				bar.style.transition = 'none';
				bar.style.top = `${top}px`;
				bar.style.height = `${height}px`;
				rowTop = top;
				rowHeight = height;
			}
			if (columnIndex !== -1 && columnSelectionRef.current) {
				const {scrollLeft, clientWidth: dataTableClientWidth, offsetHeight, clientHeight} = dataTable;
				const {columnLeft: left, columnWidth: width} = computeColumnSelectionPosition({
					inFixTable,
					columnIndex,
					scrollLeft,
					dataTableClientWidth,
					verticalScroll: offsetHeight !== clientHeight,
					data,
					columnDefs,
					rowNoColumnWidth
				});
				const bar = columnSelectionRef.current;
				bar.style.transition = 'none';
				bar.style.left = `${left}px`;
				bar.style.width = `${width}px`;
				columnLeft = left;
				columnWidth = width;
			}
			if (rowIndex !== -1 || columnIndex !== -1) {
				setTimeout(() => {
					setSelection(selection => {
						return {...selection, rowTop, rowHeight, columnLeft, columnWidth};
					});
					rowSelectionRef.current && (rowSelectionRef.current.style.transition = '');
					columnSelectionRef.current && (columnSelectionRef.current.style.transition = '');
				}, 5);
			}
		};
		const dataTable = dataTableRef.current;
		// @ts-ignore
		dataTable?.addEventListener('scroll', repaintSelection);
		on(GridEventTypes.REPAINT_SELECTION, repaintSelection);
		return () => {
			// @ts-ignore
			dataTable?.removeEventListener('scroll', repaintSelection);
			off(GridEventTypes.REPAINT_SELECTION, repaintSelection);
		};
		// do not use dependencies here
	});

	return {selection, select};
};

export const GridSelection = forwardRef((props: {
	data: DataSetState;
	columnDefs: ColumnDefs;
	dataTableRef: RefObject<HTMLDivElement>;
	rowNoColumnWidth: number;
}, ref: ForwardedRef<SelectionRef>) => {
	const {
		data, columnDefs, dataTableRef,
		rowNoColumnWidth
	} = props;

	const {on, off} = useGridEventBus();
	const rowSelectionRef = useRef<HTMLDivElement>(null);
	const columnSelectionRef = useRef<HTMLDivElement>(null);
	const {selection, select} = useSelection({
		data,
		columnDefs,
		rowNoColumnWidth,
		dataTableRef,
		rowSelectionRef,
		columnSelectionRef
	});
	useImperativeHandle(ref, () => ({selection: () => selection}));
	useEffect(() => {
		const onFixColumnChange = (fix: boolean, columnCount: number) => {
			const {column: selectionColumnIndex, inFixTable} = selection;
			if (selectionColumnIndex === -1) {
				// no selection column
				return;
			}
			if (inFixTable) {
				// current selection column in fix table
				if (fix) {
					// append columns to fix table, do nothing
					return;
				} else {
					// move columns from fix table to data table
					if (selectionColumnIndex < columnDefs.fixed.length) {
						// selection column still in fix table, do nothing
						return;
					} else {
						// selection column move to data table
						select(false, selection.row, selectionColumnIndex - columnDefs.fixed.length);
					}
				}
			} else {
				// current selection column in data table
				if (fix) {
					// move columns from data table to fix table
					if (selectionColumnIndex >= columnCount) {
						// selection column remains in data table
						select(false, selection.row, selectionColumnIndex - columnCount);
					} else {
						// selection column moves to fix table
						// index starts from original fix columns count
						select(true, selection.row, columnDefs.fixed.length - columnCount + selectionColumnIndex);
					}
				} else {
					// move columns from fix table to data table
					// index always be increased, because of columns prepended
					select(false, selection.row, selectionColumnIndex + columnCount);
				}
			}
		};
		on(GridEventTypes.SELECTION_CHANGED, select);
		on(GridEventTypes.FIX_COLUMN_CHANGED, onFixColumnChange);
		return () => {
			off(GridEventTypes.SELECTION_CHANGED, select);
			off(GridEventTypes.FIX_COLUMN_CHANGED, onFixColumnChange);
		};
		// do not use dependencies here
	});

	return <>
		<RowSelection index={selection.row}
		              top={selection.rowTop} height={selection.rowHeight}
		              scroll={selection.verticalScroll}
		              ref={rowSelectionRef}/>
		<ColumnSelection index={selection.column}
		                 left={selection.columnLeft} width={selection.columnWidth} height={selection.columnHeight}
		                 scroll={selection.horizontalScroll}
		                 ref={columnSelectionRef}/>
	</>;
});