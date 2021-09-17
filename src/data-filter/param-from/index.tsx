import {ICON_COLLAPSE_CONTENT, ICON_EDIT} from '@/basic-widgets/constants';
import {Lang} from '@/langs';
import {Parameter, ParameterKind} from '@/services/tuples/factor-calculator-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {useParamFrom} from './use-param-from';
import {ParameterFromEditContainer, ParameterFromIcon, ParameterFromLabel, ParameterTypeButton} from './widgets';

export const ParameterFromEdit = (props: { parameter: Parameter; availableKinds?: Array<ParameterKind> }) => {
	const {
		parameter,
		availableKinds = [ParameterKind.TOPIC, ParameterKind.CONSTANT, ParameterKind.COMPUTED],
		...rest
	} = props;

	const {onFromChanged, onIconClicked, onStartEditing, onBlur, editing} = useParamFrom(parameter);

	const fromTopicAllowed = availableKinds.includes(ParameterKind.TOPIC);
	const fromConstantAllowed = availableKinds.includes(ParameterKind.CONSTANT);
	const fromComputedAllowed = availableKinds.includes(ParameterKind.COMPUTED);

	return <ParameterFromEditContainer onClick={onStartEditing} tabIndex={0} onBlur={onBlur} {...rest}>
		<ParameterFromLabel>{Lang.PARAM.FROM}</ParameterFromLabel>
		{fromTopicAllowed
			? <ParameterTypeButton active={parameter.kind === ParameterKind.TOPIC} edit={editing}
			                       onClick={onFromChanged(ParameterKind.TOPIC)}>
				{Lang.PARAM.FROM_TOPIC}
			</ParameterTypeButton>
			: null}
		{fromConstantAllowed
			? <ParameterTypeButton active={parameter.kind === ParameterKind.CONSTANT} edit={editing}
			                       onClick={onFromChanged(ParameterKind.CONSTANT)}>
				{Lang.PARAM.FROM_CONSTANT}
			</ParameterTypeButton>
			: null}
		{fromComputedAllowed
			? <ParameterTypeButton active={parameter.kind === ParameterKind.COMPUTED} edit={editing}
			                       onClick={onFromChanged(ParameterKind.COMPUTED)}>
				{Lang.PARAM.FROM_COMPUTED}
			</ParameterTypeButton>
			: null}
		{availableKinds.length !== 1
			? <ParameterFromIcon onClick={onIconClicked}>
				{editing ? <FontAwesomeIcon icon={ICON_COLLAPSE_CONTENT}/> : <FontAwesomeIcon icon={ICON_EDIT}/>}
			</ParameterFromIcon>
			: null}
	</ParameterFromEditContainer>;
};

export const ParameterFromEditor = styled(ParameterFromEdit).attrs<{ shorten: boolean }>(({shorten}) => {
	return {
		style: {
			borderTopRightRadius: shorten ? 'calc(var(--param-height) / 2)' : (void 0),
			borderBottomRightRadius: shorten ? 'calc(var(--param-height) / 2)' : (void 0)
		}
	};
})<{ shorten: boolean }>`
`;