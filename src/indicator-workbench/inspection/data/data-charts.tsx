import {Inspection} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {RowOfAny} from '@/services/data/types';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {Columns} from '../types';
import {ArithmeticChart} from './charts';
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

	return <DataChartsContainer>
		{(inspection.aggregateArithmetics || []).map(arithmetic => {
			return <ArithmeticChart inspection={inspection} data={state.data} columns={state.columns}
			                        arithmetic={arithmetic}
			                        key={arithmetic}/>;
		})}
	</DataChartsContainer>;
};