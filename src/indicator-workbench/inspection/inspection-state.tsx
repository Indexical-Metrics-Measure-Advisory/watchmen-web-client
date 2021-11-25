import {saveInspection} from '@/services/data/tuples/inspection';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect} from 'react';
import {useInspectionEventBus} from './inspection-event-bus';
import {InspectionEventTypes} from './inspection-event-bus-types';

export const InspectionState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useInspectionEventBus();
	useEffect(() => {
		const onSaveInspection = (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveInspection(inspection),
				() => {
					fire(InspectionEventTypes.INSPECTION_SAVED, inspection);
					onSaved(inspection, true);
				},
				() => onSaved(inspection, false));
		};
		on(InspectionEventTypes.SAVE_INSPECTION, onSaveInspection);
		return () => {
			off(InspectionEventTypes.SAVE_INSPECTION, onSaveInspection);
		};
	}, [on, off, fire, fireGlobal]);

	return <Fragment/>;
};