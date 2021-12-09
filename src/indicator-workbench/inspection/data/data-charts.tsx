import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {RowOfAny} from '@/services/data/types';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {Columns} from '../types';
import {Bar} from './charts/bar';
import {DataChartsContainer} from './widgets';

interface ChartsDataState {
	initialized: boolean;
	columns: Columns;
	data: Array<RowOfAny>;
	buckets: Array<QueryBucket>;
}

export const DataCharts = (props: { inspection: Inspection; indicator: IndicatorForInspection }) => {
	const {inspection} = props;

	const {on, off} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [state, setState] = useState<ChartsDataState>({
		initialized: false,
		columns: [],
		data: [],
		buckets: []
	});
	useEffect(() => {
		const onSetVisibility = (anInspection: Inspection, visible: boolean) => {
			if (anInspection !== inspection) {
				return;
			}
			setVisible(visible);
		};
		on(InspectionEventTypes.SET_CHARTS_VISIBILITY, onSetVisibility);
		return () => {
			off(InspectionEventTypes.SET_CHARTS_VISIBILITY, onSetVisibility);
		};
	}, [on, off, inspection]);
	useEffect(() => {
		const onDisplayDataReady = (anInspection: Inspection, data: Array<RowOfAny>, buckets: Array<QueryBucket>, columns: Columns) => {
			if (anInspection !== inspection) {
				return;
			}
			setState({initialized: true, data, buckets, columns});
		};
		on(InspectionEventTypes.DISPLAY_DATA_READY, onDisplayDataReady);
		return () => {
			off(InspectionEventTypes.DISPLAY_DATA_READY, onDisplayDataReady);
		};
	});

	if (!state.initialized || !visible) {
		return null;
	}

	// use first aggregate arithmetics to render the thumbnails
	// supporting first 3 types: bar/line/pie
	// 1. bar/line:
	// 1.1. bucket: bucket as x axis, value as y axis
	// 1.2. time group: time as x axis, value as y axis
	// 1.3. bucket + time group: time as x axis, bucket + value as y axis
	// 1.4. multiple time filter: apply increment ratio
	// 2. pie:
	// 2.1 bucket: simple pie
	// 2.2 time group: simple pie
	// 2.3 bucket + time group: sunburst, first is time group, secondary is bucket, and value

	// hide charts anyway if there is no data found.
	return <DataChartsContainer>
		<Bar inspection={inspection} data={state.data} columns={state.columns}/>
	</DataChartsContainer>;
};