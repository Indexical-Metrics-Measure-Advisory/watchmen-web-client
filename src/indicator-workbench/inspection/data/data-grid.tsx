import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {RowOfAny} from '@/services/data/types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {buildBucketsAskingParams} from '../utils';
import {buildColumnDefs, Columns} from './utils';
import {
	DataGridBodyRow,
	DataGridBodyRowCell,
	DataGridContainer,
	DataGridHeader,
	DataGridHeaderCell,
	DataGridNoData
} from './widgets';

interface GridDataState {
	columns: Columns;
	data: Array<RowOfAny>;
}

export const DataGrid = (props: { inspection: Inspection; indicator: IndicatorForInspection }) => {
	const {inspection, indicator} = props;

	const {on, off, fire} = useInspectionEventBus();
	const [state, setState] = useState<GridDataState>({columns: [], data: []});
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
			setState({columns, data});
		};
		on(InspectionEventTypes.DATA_LOADED, onDataLoaded);
		return () => {
			off(InspectionEventTypes.DATA_LOADED, onDataLoaded);
		};
	}, [on, off, fire, inspection, indicator]);

	return <DataGridContainer>
		<DataGridHeader columns={state.columns}>
			<DataGridHeaderCell/>
			{state.columns.map((column, index) => {
				return <DataGridHeaderCell key={`${column.name}-${index}`}>{column.name}</DataGridHeaderCell>;
			})}
		</DataGridHeader>
		{state.data.length === 0
			? <DataGridNoData>{Lang.INDICATOR_WORKBENCH.INSPECTION.NO_DATA}</DataGridNoData>
			: state.data.map((row, rowIndex) => {
				return <DataGridBodyRow columns={state.columns}>
					<DataGridBodyRowCell>{rowIndex + 1}</DataGridBodyRowCell>
					{row.map((cell, columnIndex) => {
						return <DataGridBodyRowCell key={`${cell}-${columnIndex}`}>
							{cell}
						</DataGridBodyRowCell>;
					})}
				</DataGridBodyRow>;
			})}
	</DataGridContainer>;
};