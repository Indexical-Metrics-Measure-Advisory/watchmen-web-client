import React from 'react';
import {InspectionState} from './inspection-state';
import {InspectionContainer} from './widgets';

export const Inspection = () => {
	// const {fire} = useInspectionEventBus();
	// useEffect(() => {
	// 	fire(InspectionEventTypes.SWITCH_STEP, PrepareStep.CREATE_OR_FIND);
	// }, [fire]);

	return <InspectionContainer>
		<InspectionState/>
	</InspectionContainer>;
};