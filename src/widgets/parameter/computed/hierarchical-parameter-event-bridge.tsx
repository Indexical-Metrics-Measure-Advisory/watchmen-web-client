import React, {Fragment, useEffect} from 'react';
import {useParameterEventBus} from '../parameter-event-bus';
import {ParameterEventTypes} from '../parameter-event-bus-types';

/**
 * gather all changes in parameter, and notify to parent
 */
export const HierarchicalParameterEventBridge = (props: { notifyChangeToParent: () => void }) => {
	const {notifyChangeToParent} = props;
	const {on, off} = useParameterEventBus();
	useEffect(() => {
		const onParamChanged = () => notifyChangeToParent();
		on(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		return () => {
			off(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		};
	}, [on, off, notifyChangeToParent]);

	return <Fragment/>;
};
