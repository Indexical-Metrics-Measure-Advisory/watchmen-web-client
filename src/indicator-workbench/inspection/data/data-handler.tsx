import {fetchInspectionData} from '@/services/data/tuples/inspection';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {Fragment, useEffect, useState} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';
import {InspectionEventTypes} from '../inspection-event-bus-types';
import {validateInspection} from '../utils';

export const DataHandler = (props: { inspection: Inspection }) => {
	const {inspection} = props;

	const {on, off, fire} = useInspectionEventBus();
	const [askData] = useState(() => {
		return (inspection: Inspection) => {
			validateInspection({
				inspection,
				success: async (inspection: Inspection) => {
					const data = await fetchInspectionData(inspection.inspectionId);
					fire(InspectionEventTypes.DATA_LOADED, inspection, data);
				},
				fail: () => {
					fire(InspectionEventTypes.DATA_LOADED, inspection, []);
				}
			});
		};
	});
	useEffect(() => {
		const onRefreshData = async (anInspection: Inspection) => {
			if (anInspection !== inspection) {
				return;
			}

			askData(inspection);
		};
		on(InspectionEventTypes.REFRESH_DATA, onRefreshData);
		on(InspectionEventTypes.AGGREGATE_ARITHMETICS_CHANGED, onRefreshData);
		on(InspectionEventTypes.BUCKET_ON_CHANGED, onRefreshData);
		on(InspectionEventTypes.TIME_MEASURE_CHANGED, onRefreshData);
		on(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onRefreshData);
		return () => {
			off(InspectionEventTypes.REFRESH_DATA, onRefreshData);
			off(InspectionEventTypes.AGGREGATE_ARITHMETICS_CHANGED, onRefreshData);
			off(InspectionEventTypes.BUCKET_ON_CHANGED, onRefreshData);
			off(InspectionEventTypes.TIME_MEASURE_CHANGED, onRefreshData);
			off(InspectionEventTypes.TIME_RANGE_ON_CHANGED, onRefreshData);
		};
	}, [on, off, fire, askData, inspection]);
	useEffect(() => {
		askData(inspection);
	}, [fire, askData, inspection]);

	return <Fragment/>;
};