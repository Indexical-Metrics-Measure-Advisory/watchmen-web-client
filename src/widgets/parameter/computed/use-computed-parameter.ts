import {Parameter} from '@/services/data/tuples/factor-calculator-types';
import {useEffect} from 'react';
import {useForceUpdate} from '../../basic/utils';
import {useParameterEventBus} from '../parameter-event-bus';
import {ParameterEventTypes} from '../parameter-event-bus-types';

export const useComputedParameterFromChanged = () => {
	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);
};

export const useDelegateComputedParameterChildChangedToMe = (parameter: Parameter): (() => void) => {
	const {on, off, fire} = useParameterEventBus();
	// all changes occurred in children, will be translated to content change event
	useEffect(() => {
		const onComputeChanged = (param: Parameter) => {
			if (param !== parameter) {
				// my children, proxy to my content change event and fire
				fire(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter);
			}
		};
		on(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, onComputeChanged);
		return () => {
			off(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, onComputeChanged);
		};
	}, [on, off, fire, parameter]);

	return () => fire(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter);
};

export const useSubParameterChanged = () => {
	const {on, off, fire} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.COMPUTE_TYPE_CHANGED, forceUpdate);
		on(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, forceUpdate);
		on(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, forceUpdate);
		return () => {
			off(ParameterEventTypes.COMPUTE_TYPE_CHANGED, forceUpdate);
			off(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, forceUpdate);
			off(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return {
		onDeleted: (sub: Parameter) => {
			return () => {
				fire(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, sub);
			};
		},
		onAdded: () => {
			return (sub: Parameter) => {
				fire(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, sub);
			};
		}
	};
};
