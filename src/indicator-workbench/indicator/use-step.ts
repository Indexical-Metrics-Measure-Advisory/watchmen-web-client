import {useEffect, useState} from 'react';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from './indicators-event-bus-types';
import {IndicatorDeclarationStep} from './types';

export interface StepState {
	activeStep?: IndicatorDeclarationStep;
	active: boolean;
	done: boolean;
	data?: IndicatorsData;
}

export const useStep = (options: { step: IndicatorDeclarationStep, active?: () => void, done?: () => void, dropped?: () => void }): StepState => {
	const {step, active, done, dropped} = options;

	const {on, off} = useIndicatorsEventBus();
	const [state, setState] = useState<StepState>({active: false, done: false});
	useEffect(() => {
		const onSwitchStep = (toStep: IndicatorDeclarationStep, data?: IndicatorsData) => {
			setState({activeStep: toStep, active: toStep === step, done: step < toStep, data});
			if (toStep === step) {
				active && active();
			} else if (step < toStep) {
				done && done();
			} else {
				dropped && dropped();
			}
		};
		on(IndicatorsEventTypes.SWITCH_STEP, onSwitchStep);
		return () => {
			off(IndicatorsEventTypes.SWITCH_STEP, onSwitchStep);
		};
	}, [on, off, step, active, done, dropped]);

	return state;
};
