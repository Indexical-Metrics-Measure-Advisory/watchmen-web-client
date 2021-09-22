import {Parameter} from '@/services/data/tuples/factor-calculator-types';
import {isConstantParameter} from '@/services/data/tuples/parameter-utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {ChangeEvent, useEffect} from 'react';
import styled from 'styled-components';
import {ConstantInput} from './widgets';

const ConstantEdit = (props: { parameter: Parameter }) => {
	const {parameter, ...rest} = props;

	const {on, off, fire} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (!isConstantParameter(parameter)) {
		return null;
	}

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === parameter.value) {
			return;
		}
		parameter.value = value;
		forceUpdate();
		fire(ParameterEventTypes.CONSTANT_VALUE_CHANGED, parameter);
	};

	return <ConstantInput placeholder="Constant value please..."
	                      value={parameter.value || ''} onChange={onValueChange}
	                      {...rest}/>;
};

export const ConstantValueEditor = styled(ConstantEdit)`
	border-radius : 0 calc(var(--param-height) / 2) calc(var(--param-height) / 2) 0;
	box-shadow    : var(--param-top-border), var(--param-right-border), var(--param-bottom-border);
	// redefine since box-shadow overridden
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;
