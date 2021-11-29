import {Inspection} from '@/services/data/tuples/inspection-types';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {SelectMeasureContainer} from './widgets';

export const SelectMeasure = () => {
	const {on, off} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [, setInspection] = useState<Inspection | null>(null);
	const [, setIndicator] = useState<IndicatorForInspection | null>(null);
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection) => {
			setInspection(inspection);
			if (inspection.indicatorId != null) {
				setVisible(true);
			}
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	});
	useEffect(() => {
		const onIndicatorPicked = (indicator: IndicatorForInspection) => {
			setIndicator(indicator);
			setVisible(true);
		};
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		return () => {
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		};
	});

	if (!visible) {
		return null;
	}

	return <SelectMeasureContainer>

	</SelectMeasureContainer>;
};