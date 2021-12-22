import {fetchInspectionData} from '@/services/data/tuples/inspection';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {noop} from '@/services/utils';
import {useThrottler} from '@/widgets/throttler';
import {Fragment, useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {validateInspection} from '../utils';

export const DataHandler = (props: { inspection: Inspection }) => {
	const {inspection} = props;

	const {on, off, fire} = useInspectionEventBus();
	const saveQueue = useThrottler();
	const [askData] = useState(() => {
		return (inspection: Inspection) => {
			validateInspection({
				inspection,
				success: async (inspection: Inspection) => {
					fire(InspectionEventTypes.SAVE_INSPECTION, inspection, async (inspection, saved) => {
						if (saved) {
							const data = await fetchInspectionData(inspection);
							fire(InspectionEventTypes.DATA_LOADED, inspection, data);
						} else {
							fire(InspectionEventTypes.DATA_LOADED, inspection, []);
						}
					});
				},
				fail: () => {
					fire(InspectionEventTypes.DATA_LOADED, inspection, []);
				}
			});
		};
	});
	useEffect(() => {
		const onRefreshData = (anInspection: Inspection) => {
			if (anInspection !== inspection) {
				return;
			}
			saveQueue.replace(() => askData(inspection), 2000);
		};
		const onInspectionChanged = (anInspection: Inspection) => {
			if (anInspection !== inspection) {
				return;
			}
			validateInspection({
				inspection,
				success: () => fire(InspectionEventTypes.REFRESH_DATA, inspection),
				fail: noop
			});
		};
		on(InspectionEventTypes.REFRESH_DATA, onRefreshData);
		on(InspectionEventTypes.AGGREGATE_ARITHMETIC_CHANGED, onInspectionChanged);
		on(InspectionEventTypes.BUCKET_ON_CHANGED, onInspectionChanged);
		on(InspectionEventTypes.TIME_MEASURE_CHANGED, onInspectionChanged);
		on(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onInspectionChanged);
		on(InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, onInspectionChanged);
		return () => {
			off(InspectionEventTypes.REFRESH_DATA, onRefreshData);
			off(InspectionEventTypes.AGGREGATE_ARITHMETIC_CHANGED, onInspectionChanged);
			off(InspectionEventTypes.BUCKET_ON_CHANGED, onInspectionChanged);
			off(InspectionEventTypes.TIME_MEASURE_CHANGED, onInspectionChanged);
			off(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onInspectionChanged);
			off(InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, onInspectionChanged);
		};
	}, [on, off, fire, saveQueue, askData, inspection]);
	useEffect(() => {
		askData(inspection);
	}, [fire, askData, inspection]);

	return <Fragment/>;
};