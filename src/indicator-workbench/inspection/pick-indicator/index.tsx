import {Inspection} from '@/services/data/tuples/inspection-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {InspectingIndicator} from '../types';
import {Editor} from './editor';
import {Viewer} from './viewer';

export const PickIndicator = () => {
	const {on, off, fire} = useInspectionEventBus();
	const [readOnly, setReadOnly] = useState(false);
	const [inspection, setInspection] = useState<Inspection | null>(null);
	const [inspectingIndicator, setInspectingIndicator] = useState<InspectingIndicator | null>(null);
	useEffect(() => {
		const onInspectionPicked = (inspection: Inspection) => {
			if (!isFakedUuid(inspection)) {
				fire(InspectionEventTypes.ASK_INDICATOR, inspection.indicatorId!, (indicator, topic, enums) => {
					setInspectingIndicator({indicator, topic, enums});
					setReadOnly(true);
					setInspection(inspection);
				});
			} else {
				setInspection(inspection);
			}
		};
		on(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		return () => {
			off(InspectionEventTypes.INSPECTION_PICKED, onInspectionPicked);
		};
	}, [on, off, fire]);
	useEffect(() => {
		const onIndicatorPicked = (inspection: Inspection) => {
			fire(InspectionEventTypes.ASK_INDICATOR, inspection.indicatorId!, (indicator, topic, enums) => {
				setInspectingIndicator({indicator, topic, enums});
				setReadOnly(true);
			});
		};
		on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		return () => {
			off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		};
	}, [on, off, fire]);

	if (inspection == null) {
		return null;
	}

	return readOnly
		? <Viewer inspection={inspection} indicator={inspectingIndicator?.indicator}/>
		: <Editor inspection={inspection}/>;
};