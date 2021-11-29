import {useEffect} from 'react';
import {useInspectionEventBus} from '../inspection-event-bus';

export const SetName = () => {
	const {on, off} = useInspectionEventBus();
	useEffect(() => {
		// const onIndicatorPicked = (inspection: Inspection) => {
		//
		// };
		// on(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		// return () => {
		// 	off(InspectionEventTypes.INDICATOR_PICKED, onIndicatorPicked);
		// };
	}, [on, off]);

	return <></>;
};