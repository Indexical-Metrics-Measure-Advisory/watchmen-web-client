import {fetchIndicator, fetchIndicatorsForSelection} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {fetchInspection, listInspections, saveInspection} from '@/services/data/tuples/inspection';
import {Inspection, InspectionId} from '@/services/data/tuples/inspection-types';
import {EnumForIndicator, QueryIndicator, TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {QueryInspection} from '@/services/data/tuples/query-inspection-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect, useState} from 'react';
import {useInspectionEventBus} from './inspection-event-bus';
import {InspectionEventTypes} from './inspection-event-bus-types';

interface LoadedInspections {
	loaded: boolean;
	data: Array<QueryInspection>;
}

interface LoadedIndicators {
	loaded: boolean;
	data: Array<QueryIndicator>;
}

export const InspectionState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useInspectionEventBus();
	const [inspections, setInspections] = useState<LoadedInspections>({loaded: false, data: []});
	const [indicators, setIndicators] = useState<LoadedIndicators>({loaded: false, data: []});
	// inspection related
	useEffect(() => {
		const onAskInspections = (onData: (inspections: Array<QueryInspection>) => void) => {
			if (inspections.loaded) {
				onData(inspections.data);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await listInspections(),
					(inspections: Array<QueryInspection>) => {
						const sorted = inspections.sort((i1, i2) => {
							return (i1.name || '').localeCompare(i2.name || '', void 0, {
								sensitivity: 'base',
								caseFirst: 'upper'
							});
						});
						setInspections({loaded: true, data: sorted});
						onData(sorted);
					});
			}
		};
		on(InspectionEventTypes.ASK_INSPECTIONS, onAskInspections);
		return () => {
			off(InspectionEventTypes.ASK_INSPECTIONS, onAskInspections);
		};
	}, [on, off, fireGlobal, inspections.loaded, inspections.data]);
	useEffect(() => {
		const onAskInspection = (inspectionId: InspectionId, onData: (inspection: Inspection) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => fetchInspection(inspectionId),
				(inspection: Inspection) => {
					onData(inspection);
				});
		};
		on(InspectionEventTypes.ASK_INSPECTION, onAskInspection);
		return () => {
			off(InspectionEventTypes.ASK_INSPECTION, onAskInspection);
		};
	}, [on, off, fireGlobal]);
	useEffect(() => {
		const onSaveInspection = (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveInspection(inspection),
				() => {
					// eslint-disable-next-line
					const index = inspections.data.findIndex(existing => existing.inspectionId == inspection.inspectionId);
					if (index !== -1) {
						inspections.data.splice(index, 1, inspection);
					} else {
						inspections.data.push(inspection);
					}
					fire(InspectionEventTypes.INSPECTION_SAVED, inspection);
					onSaved(inspection, true);
				},
				() => onSaved(inspection, false));
		};
		on(InspectionEventTypes.SAVE_INSPECTION, onSaveInspection);
		return () => {
			off(InspectionEventTypes.SAVE_INSPECTION, onSaveInspection);
		};
	}, [on, off, fire, fireGlobal, inspections.data]);
	// indicator related
	useEffect(() => {
		const onAskIndicators = (onData: (indicators: Array<QueryIndicator>) => void) => {
			if (indicators.loaded) {
				onData(indicators.data);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchIndicatorsForSelection(''),
					(indicators: Array<QueryIndicator>) => {
						const sorted = indicators.sort((i1, i2) => {
							return (i1.name || '').localeCompare(i2.name || '', void 0, {
								sensitivity: 'base',
								caseFirst: 'upper'
							});
						});
						setIndicators({loaded: true, data: sorted});
						onData(sorted);
					});
			}
		};
		on(InspectionEventTypes.ASK_INDICATORS, onAskIndicators);
		return () => {
			off(InspectionEventTypes.ASK_INDICATORS, onAskIndicators);
		};
	}, [on, off, fireGlobal, indicators.loaded, indicators.data]);
	useEffect(() => {
		const onAskIndicator = (indicatorId: IndicatorId, onData: (indicator: Indicator, topic?: TopicForIndicator, enums?: Array<EnumForIndicator>) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const {indicator, topic, enums} = await fetchIndicator(indicatorId);
					return {indicator, topic, enums};
				},
				({indicator, topic, enums}) => {
					onData(indicator, topic, enums);
				});
		};
		on(InspectionEventTypes.ASK_INDICATOR, onAskIndicator);
		return () => {
			off(InspectionEventTypes.ASK_INDICATOR, onAskIndicator);
		};
	}, [on, off, fireGlobal]);

	return <Fragment/>;
};