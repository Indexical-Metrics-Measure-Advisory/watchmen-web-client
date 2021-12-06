import {Inspection} from '@/services/data/tuples/inspection-types';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from './inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from './inspection-event-bus-types';

export const useVisibleOnII = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection, indicator?: IndicatorForInspection) => {
			if (indicator == null) {
				setVisible(false);
			}
			setInspection(inspection);
			setIndicator(indicator ?? null);
			if (indicator != null) {
				setVisible(true);
			}
		};
		const onIndicatorPicked = (indicator: IndicatorForInspection) => {
			setIndicator(indicator);
			setVisible(true);
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		};
	}, [on, off, fire]);
	useEffect(() => {
		const onInspectionCleared = () => {
			setVisible(false);
			setIndicator(null);
			setInspection(null);
		};
		on(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		return () => {
			off(InspectionEventTypes.INSPECTION_CLEARED, onInspectionCleared);
		};
	}, [on, off]);

	return {visible, inspection, indicator};
};