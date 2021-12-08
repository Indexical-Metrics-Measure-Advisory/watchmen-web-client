import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {RowOfAny} from '@/services/data/types';
import {Lang} from '@/widgets/langs';
import {MouseEvent, useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {Columns, ColumnType} from '../types';
import {buildBucketsAskingParams} from '../utils';
import {buildColumnDefs, formatCellValue} from './utils';
import {
	DataGridBodyRow,
	DataGridBodyRowCell,
	DataGridBodyRowIndexCell,
	DataGridContainer,
	DataGridHeader,
	DataGridHeaderCell,
	DataGridNoData
} from './widgets';

interface CellSelection {
	row: RowOfAny;
	columnIndex: number;
}

interface GridDataState {
	initialized: boolean;
	columns: Columns;
	data: Array<RowOfAny>;
	buckets: Array<QueryBucket>;
	selection: Array<CellSelection>;
}

export const DataGrid = (props: { inspection: Inspection; indicator: IndicatorForInspection }) => {
	const {inspection, indicator} = props;

	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(true);
	const [state, setState] = useState<GridDataState>({
		initialized: false,
		columns: [],
		data: [],
		buckets: [],
		selection: []
	});
	useEffect(() => {
		const onDataLoaded = async (anInspection: Inspection, data: Array<RowOfAny>) => {
			if (anInspection !== inspection) {
				return;
			}

			const askBuckets = async ({indicator, topic}: IndicatorForInspection): Promise<Array<QueryBucket>> => {
				return new Promise(resolve => {
					fire(InspectionEventTypes.ASK_BUCKETS, buildBucketsAskingParams(indicator, topic), (buckets: Array<QueryBucket>) => {
						resolve(buckets);
					});
				});
			};

			const buckets = await askBuckets(indicator);
			const columns = buildColumnDefs({inspection, indicator, buckets});
			setState({initialized: true, columns, data, buckets, selection: []});
		};
		on(InspectionEventTypes.DATA_LOADED, onDataLoaded);
		return () => {
			off(InspectionEventTypes.DATA_LOADED, onDataLoaded);
		};
	}, [on, off, fire, inspection, indicator]);
	useEffect(() => {
		const onSetVisibility = (anInspection: Inspection, visible: boolean) => {
			if (anInspection !== inspection) {
				return;
			}
			setVisible(visible);
		};
		on(InspectionEventTypes.SET_DATA_GRID_VISIBILITY, onSetVisibility);
		return () => {
			off(InspectionEventTypes.SET_DATA_GRID_VISIBILITY, onSetVisibility);
		};
	}, [on, off, inspection]);
	useEffect(() => {
		if (state.initialized) {
			fire(InspectionEventTypes.DISPLAY_DATA_READY, inspection, state.data, state.buckets, state.columns);
		}
	}, [fire, state.initialized, state.data, state.buckets, state.columns, inspection]);

	if (!state.initialized) {
		return null;
	}

	const isColumnSelected = (columnIndex: number) => {
		return state.selection.filter(s => s.columnIndex === columnIndex).length === state.data.length;
	};
	const isRowSelected = (row: RowOfAny) => {
		return state.selection.filter(s => s.row === row).length === state.columns.length;
	};
	const isCellSelected = (row: RowOfAny, columnIndex: number) => {
		return state.selection.some(s => s.row === row && s.columnIndex === columnIndex);
	};
	const onColumnClicked = (columnIndex: number) => (event: MouseEvent<HTMLDivElement>) => {
		if (!event.metaKey) {
			setState(state => {
				return {...state, selection: state.data.map(row => ({row, columnIndex}))};
			});
		} else if (isColumnSelected(columnIndex)) {
			setState(state => {
				return {...state, selection: state.selection.filter(s => s.columnIndex !== columnIndex)};
			});
		} else {
			setState(state => {
				return {
					...state,
					selection: [
						...state.selection.filter(s => s.columnIndex !== columnIndex),
						...state.data.map(row => ({row, columnIndex}))
					]
				};
			});
		}
	};
	const onRowClicked = (row: RowOfAny) => (event: MouseEvent<HTMLDivElement>) => {
		if (!event.metaKey) {
			setState(state => {
				return {...state, selection: state.columns.map((_, columnIndex) => ({row, columnIndex}))};
			});
		} else if (isRowSelected(row)) {
			setState(state => {
				return {...state, selection: state.selection.filter(s => s.row !== row)};
			});
		} else {
			setState(state => {
				return {
					...state,
					selection: [
						...state.selection.filter(s => s.row !== row),
						...state.columns.map((_, columnIndex) => ({row, columnIndex}))
					]
				};
			});
		}
	};
	const onCellClicked = (row: RowOfAny, columnIndex: number) => (event: MouseEvent<HTMLDivElement>) => {
		if (!event.metaKey) {
			setState(state => {
				return {...state, selection: [{row, columnIndex}]};
			});
		} else if (isCellSelected(row, columnIndex)) {
			setState(state => {
				return {
					...state,
					selection: state.selection.filter(s => s.row !== row || s.columnIndex !== columnIndex)
				};
			});
		} else {
			setState(state => {
				return {...state, selection: [...state.selection, {row, columnIndex}]};
			});
		}
	};

	// show data grid anyway if there is no data found.
	return <DataGridContainer visible={visible || state.data.length === 0}>
		<DataGridHeader columns={state.columns}>
			<DataGridHeaderCell/>
			{state.columns.map((column, index) => {
				return <DataGridHeaderCell onClick={onColumnClicked(index)}
				                           isSelected={isColumnSelected(index)}
				                           key={`${column.name}-${index}`}>
					{column.name}
				</DataGridHeaderCell>;
			})}
		</DataGridHeader>
		{state.data.length === 0
			? <DataGridNoData>{Lang.INDICATOR_WORKBENCH.INSPECTION.NO_DATA}</DataGridNoData>
			: state.data.map((row, rowIndex) => {
				const rowSelected = isRowSelected(row);
				return <DataGridBodyRow columns={state.columns} isSelected={isRowSelected(row)} key={v4()}>
					<DataGridBodyRowIndexCell onClick={onRowClicked(row)}>{rowIndex + 1}</DataGridBodyRowIndexCell>
					{row.map((cell, columnIndex) => {
						const column = state.columns[columnIndex];
						return <DataGridBodyRowCell isNumeric={column.type === ColumnType.NUMERIC}
						                            isSelected={!rowSelected && isCellSelected(row, columnIndex)}
						                            onClick={onCellClicked(row, columnIndex)}
						                            key={`${cell}-${columnIndex}`}>
							{formatCellValue(cell, column)}
						</DataGridBodyRowCell>;
					})}
				</DataGridBodyRow>;
			})}
	</DataGridContainer>;
};