import {Inspection} from '@/services/data/tuples/inspection-types';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {DataChartsContainer} from './widgets';

export const DataCharts = (props: { inspection: Inspection; indicator: IndicatorForInspection }) => {
	const {inspection} = props;

	const {on, off} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
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

	return <DataChartsContainer visible={visible}>
	</DataChartsContainer>;
};