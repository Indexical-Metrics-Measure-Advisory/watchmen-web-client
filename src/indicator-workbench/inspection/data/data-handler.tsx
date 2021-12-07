import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {useGridEventBus} from '@/widgets/dataset-grid/grid-event-bus';
import {GridEventTypes} from '@/widgets/dataset-grid/grid-event-bus-types';
import {DataPage} from '@/widgets/dataset-grid/types';
import {Fragment, useEffect} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {buildBucketsAskingParams, validateInspection} from '../utils';
import {buildColumnDefs} from './utils';

export const DataHandler = (props: { inspection: Inspection; indicator: IndicatorForInspection }) => {
	const {inspection, indicator} = props;

	const {on, off, fire} = useInspectionEventBus();
	const {fire: fireGrid} = useGridEventBus();
	useEffect(() => {
		const onRefreshData = (anInspection: Inspection) => {
			if (anInspection !== inspection) {
				return;
			}
		};
		on(InspectionEventTypes.REFRESH_DATA, onRefreshData);
		return () => {
			off(InspectionEventTypes.REFRESH_DATA, onRefreshData);
		};
	}, [on, off, inspection]);
	useEffect(() => {
		const onChanged = () => {

		};
		on(InspectionEventTypes.AGGREGATE_ARITHMETICS_CHANGED, onChanged);
		on(InspectionEventTypes.BUCKET_ON_CHANGED, onChanged);
		on(InspectionEventTypes.TIME_MEASURE_CHANGED, onChanged);
		on(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onChanged);
		return () => {
			off(InspectionEventTypes.AGGREGATE_ARITHMETICS_CHANGED, onChanged);
			off(InspectionEventTypes.BUCKET_ON_CHANGED, onChanged);
			off(InspectionEventTypes.TIME_MEASURE_CHANGED, onChanged);
			off(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onChanged);
		};
	}, [on, off]);
	useEffect(() => {
		const askBuckets = async ({indicator, topic}: IndicatorForInspection): Promise<Array<QueryBucket>> => {
			return new Promise(resolve => {
				fire(InspectionEventTypes.ASK_BUCKETS, buildBucketsAskingParams(indicator, topic), (buckets: Array<QueryBucket>) => {
					resolve(buckets);
				});
			});
		};

		(async () => {
			const buckets = await askBuckets(indicator);
			const columnDefs = buildColumnDefs({inspection, indicator, buckets});
			validateInspection({
				inspection,
				success: (inspection: Inspection) => {
					const page: DataPage = {
						data: [],
						itemCount: 0,
						pageNumber: 1,
						pageCount: 1,
						pageSize: 0
					};
					fireGrid(GridEventTypes.DATA_LOADED, page, columnDefs);
				},
				fail: () => {
					const page: DataPage = {
						data: [],
						itemCount: 0,
						pageNumber: 1,
						pageCount: 1,
						pageSize: 0
					};
					fireGrid(GridEventTypes.DATA_LOADED, page, columnDefs);
				}
			});
		})();
	}, [fire, fireGrid, inspection, indicator]);

	return <Fragment/>;
};