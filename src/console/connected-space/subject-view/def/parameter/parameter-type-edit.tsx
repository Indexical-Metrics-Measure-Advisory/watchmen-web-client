import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState } from 'react';
import { ICON_COLLAPSE_CONTENT, ICON_EDIT } from '../../../../../basic-widgets/constants';
import { Lang } from '../../../../../langs';
import {
	Parameter,
	ParameterComputeType,
	ParameterFrom
} from '../../../../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isConstantParameter,
	isTopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-utils';
import { createTopicFactorParameter } from '../data-utils';
import { useParameterEventBus } from './parameter-event-bus';
import { ParameterEventTypes } from './parameter-event-bus-types';
import { ParameterTypeEditContainer, ParameterTypeFromLabel, ParameterTypeIcon, ParameterTypeLabel } from './widgets';

const initParameter = (parameter: Parameter) => {
	if (isTopicFactorParameter(parameter)) {
		const old = parameter as any;
		delete old.value;
		delete old.type;
		delete old.parameters;
		old.topicId = old.topicId || '';
		old.factorId = old.factorId || '';
	} else if (isConstantParameter(parameter)) {
		const old = parameter as any;
		delete old.topicId;
		delete old.factorId;
		delete old.type;
		delete old.parameters;
		old.value = old.value || '';
	} else if (isComputedParameter(parameter)) {
		const old = parameter as any;
		delete old.topicId;
		delete old.factorId;
		delete old.value;
		old.type = old.type || ParameterComputeType.ADD;
		old.parameters = old.parameters || [ createTopicFactorParameter(), createTopicFactorParameter() ];
	}
};

export const ParameterTypeEdit = (props: { parameter: Parameter }) => {
	const { parameter, ...rest } = props;

	const { fire } = useParameterEventBus();
	const [ editing, setEditing ] = useState(false);

	const onStartEditing = () => setEditing(true);
	const onBlur = () => setEditing(false);
	const onFromChange = (from: ParameterFrom) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (from === parameter.from) {
			// do nothing, discard or start editing
			setEditing(!editing);
		} else {
			parameter.from = from;
			initParameter(parameter);
			setEditing(false);
			fire(ParameterEventTypes.FROM_CHANGED, parameter);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setEditing(!editing);
	};

	return <ParameterTypeEditContainer onClick={onStartEditing} tabIndex={0} onBlur={onBlur} {...rest}>
		<ParameterTypeFromLabel>{Lang.PARAM.FROM}</ParameterTypeFromLabel>
		<ParameterTypeLabel active={parameter.from === ParameterFrom.TOPIC} edit={editing}
		                    onClick={onFromChange(ParameterFrom.TOPIC)}>
			{Lang.PARAM.FROM_TOPIC}
		</ParameterTypeLabel>
		<ParameterTypeLabel active={parameter.from === ParameterFrom.CONSTANT} edit={editing}
		                    onClick={onFromChange(ParameterFrom.CONSTANT)}>
			{Lang.PARAM.FROM_CONSTANT}
		</ParameterTypeLabel>
		<ParameterTypeLabel active={parameter.from === ParameterFrom.COMPUTED} edit={editing}
		                    onClick={onFromChange(ParameterFrom.COMPUTED)}>
			{Lang.PARAM.FROM_COMPUTED}
		</ParameterTypeLabel>
		<ParameterTypeIcon onClick={onIconClicked}>
			{editing ? <FontAwesomeIcon icon={ICON_COLLAPSE_CONTENT}/> : <FontAwesomeIcon icon={ICON_EDIT}/>}
		</ParameterTypeIcon>
	</ParameterTypeEditContainer>;
};