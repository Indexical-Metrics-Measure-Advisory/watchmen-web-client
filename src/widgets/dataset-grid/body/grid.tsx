import React, {ForwardedRef, forwardRef, Fragment, MouseEvent} from 'react';
import {useGridEventBus} from '../grid-event-bus';
import {GridEventTypes} from '../grid-event-bus-types';
import {ColumnDef, DataColumnDef, DataSetState, SequenceColumnDef} from '../types';
import {GridDatColumnHeaderCell} from './grid-data-column-header-cell';
import {GridBody, GridBodyCell, GridContainer, GridHeader, GridHeaderCell} from './grid-widgets';

export const Grid = forwardRef((props: {
	displayColumns: Array<DataColumnDef>;
	data: DataSetState;
	isFixTable: boolean;
	rowNoColumnWidth: number;
	onColumnFixChange: (column: DataColumnDef, fix: boolean) => void;
	onColumnSort: (column: DataColumnDef, asc: boolean) => void;
	dragColumn?: DataColumnDef;
	languagesSupport: boolean;
}, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		displayColumns,
		isFixTable,
		rowNoColumnWidth,
		data: {data, pageNumber, pageSize},
		onColumnFixChange, onColumnSort,
		dragColumn, languagesSupport
	} = props;

	const {fire} = useGridEventBus();
	const onSelectionChanged = (rowIndex: number, columnIndex: number) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		fire(GridEventTypes.SELECTION_CHANGED, isFixTable, rowIndex, columnIndex);
	};
	const fixColumn = (fix: boolean, column: DataColumnDef) => (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		onColumnFixChange(column, fix);
	};
	const sortColumn = (asc: boolean, column: DataColumnDef) => (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		onColumnSort(column, asc);
	};

	const allDisplayColumns: Array<ColumnDef> = [...displayColumns];
	if (isFixTable) {
		allDisplayColumns.unshift({fixed: true, width: rowNoColumnWidth} as SequenceColumnDef);
	}
	const autoFill = !isFixTable;

	return <GridContainer columns={allDisplayColumns} autoFill={autoFill} rowCount={data.length}
	                      data-scrollable={!dragColumn}
	                      ref={ref}>
		<GridHeader columns={allDisplayColumns} autoFill={autoFill}>
			{isFixTable
				? <GridHeaderCell lastColumn={displayColumns.length === 0}
				                  column={2}
				                  data-rowno={true}>
					<span>#</span>
				</GridHeaderCell>
				: null}
			{displayColumns.map((column, columnIndex, columns) => {
				const lastColumn = isFixTable && columnIndex === columns.length - 1;
				return <GridDatColumnHeaderCell column={column}
				                                isFixTable={isFixTable}
				                                last={lastColumn}
				                                gridColumnIndex={(columnIndex + (isFixTable ? 1 : 0) + 1) * 2}
				                                selectColumn={onSelectionChanged(-1, columnIndex)}
				                                fixColumn={fixColumn(true, column)}
				                                unfixColumn={fixColumn(false, column)}
				                                sortColumnAsc={sortColumn(true, column)}
				                                sortColumnDesc={sortColumn(false, column)}
				                                dragging={column === dragColumn}
				                                languagesSupport={languagesSupport}
				                                key={`0-${columnIndex}`}/>;
			})}
			{autoFill
				? <GridHeaderCell lastColumn={false}
				                  column={allDisplayColumns.length * 2 + 2}
				                  data-filler={true}/>
				: null}
		</GridHeader>
		<GridBody columns={allDisplayColumns} autoFill={autoFill}>
			{data.map((row, rowIndex, rows) => {
				const lastRow = rows.length - 1 === rowIndex;
				return <Fragment key={`${rowIndex}`}>
					{isFixTable
						? <GridBodyCell lastRow={lastRow} lastColumn={displayColumns.length === 0}
						                column={2}
						                onClick={onSelectionChanged(rowIndex, -1)}
						                data-last-row={lastRow}
						                data-rowno={true}>
							<span>{pageSize * (pageNumber - 1) + rowIndex + 1}</span>
						</GridBodyCell>
						: null}
					{displayColumns.map((def, columnIndex, columns) => {
						const lastColumn = isFixTable && columnIndex === columns.length - 1;
						return <GridBodyCell lastRow={lastRow} lastColumn={lastColumn}
						                     column={(columnIndex + (isFixTable ? 1 : 0) + 1) * 2}
						                     onClick={onSelectionChanged(rowIndex, columnIndex)}
						                     data-dragging={def === dragColumn}
						                     data-last-row={lastRow} data-last-column={lastColumn}
						                     key={`${rowIndex}-${columnIndex}`}>
							<span>{`${row[def.index]}`}</span>
						</GridBodyCell>;
					})}
					{autoFill
						? <GridBodyCell lastRow={lastRow} lastColumn={false}
						                column={allDisplayColumns.length * 2 + 2}
						                data-last-row={lastRow}
						                data-filler={true}/>
						: null}
				</Fragment>;
			})}
		</GridBody>
	</GridContainer>;
});
