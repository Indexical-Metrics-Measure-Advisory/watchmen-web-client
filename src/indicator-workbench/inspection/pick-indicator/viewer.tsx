import {Inspection} from '@/services/data/tuples/inspection-types';
import {Lang} from '@/widgets/langs';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {IndicatorForInspection, InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectionEntityLabel, InspectionLabel} from '../widgets';
import {PickIndicatorContainer} from './widgets';

export const PickIndicatorViewer = () => {
	const {on, off} = useInspectionEventBus();
	const [visible, setVisible] = useState(false);
	const [, setInspection] = useState<Inspection | null>(null);
	const [indicator, setIndicator] = useState<IndicatorForInspection | null>(null);
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection, indicator?: IndicatorForInspection) => {
			setInspection(inspection);
			if (indicator) {
				setIndicator(indicator);
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

	if (!visible) {
		return null;
	}

	return <PickIndicatorContainer>
		<InspectionLabel>{Lang.INDICATOR_WORKBENCH.INSPECTION.INSPECTING_ON_INDICATOR_LABEL}</InspectionLabel>
		<InspectionEntityLabel>{indicator?.indicator.name || 'Noname Indicator'}</InspectionEntityLabel>
	</PickIndicatorContainer>;
};
