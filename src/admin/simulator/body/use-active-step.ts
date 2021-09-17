import {useEffect} from 'react';
import {useSimulatorEventBus} from '../simulator-event-bus';
import {SimulatorEventTypes} from '../simulator-event-bus-types';
import {ActiveStep} from './state/types';

export const useActiveStep = (onChange: (step: ActiveStep) => void) => {
	const {on, off} = useSimulatorEventBus();
	useEffect(() => {
		on(SimulatorEventTypes.ACTIVE_STEP_CHANGED, onChange);
		return () => {
			off(SimulatorEventTypes.ACTIVE_STEP_CHANGED, onChange);
		};
	}, [on, off, onChange]);
};