import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {RowOfAny} from '@/services/data/types';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {buildBucketsAskingParams} from '../utils';
import {buildColumnDefs, Columns} from './utils';
import {DataGridBody, DataGridContainer, DataGridHeader} from './widgets';

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
		<DataGridHeader>

		</DataGridHeader>
		<DataGridBody>

		</DataGridBody>
	</DataGridContainer>;
};