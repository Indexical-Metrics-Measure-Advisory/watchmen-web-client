import {Parameter, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {ICON_COLLAPSE_CONTENT, ICON_EDIT} from '@/widgets/basic/constants';
import {useParamFrom} from '@/widgets/parameter/param-from/use-param-from';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ParameterFromEditContainer, ParameterFromIcon, ParameterTypeButton} from './widgets';

const OptionsLabel: Record<ParameterKind, string> = {
	[ParameterKind.TOPIC]: 'Topic',
	[ParameterKind.CONSTANT]: 'Constant',
	[ParameterKind.COMPUTED]: 'Compute'
};

export const ParameterFromEditor = (props: { parameter: Parameter }) => {
	const {parameter} = props;

	const {onFromChanged, onIconClicked, onStartEditing, onBlur, editing} = useParamFrom(parameter);

	const candidates = [ParameterKind.TOPIC, ParameterKind.CONSTANT, ParameterKind.COMPUTED].filter(candidate => candidate !== parameter.kind);

	return <ParameterFromEditContainer onClick={onStartEditing} tabIndex={0} onBlur={onBlur}>
		<ParameterTypeButton active={true} edit={editing}
		                     onClick={onFromChanged(parameter.kind)}>
			From {OptionsLabel[parameter.kind]}
		</ParameterTypeButton>
		{candidates.map(candidate => {
			return <ParameterTypeButton active={false} edit={editing}
			                            onClick={onFromChanged(candidate)}
			                            key={candidate}>
				{OptionsLabel[candidate]}
			</ParameterTypeButton>;
		})}
		<ParameterFromIcon onClick={onIconClicked} data-expanded={editing}>
			{editing ? <FontAwesomeIcon icon={ICON_COLLAPSE_CONTENT}/> : <FontAwesomeIcon icon={ICON_EDIT}/>}
		</ParameterFromIcon>
	</ParameterFromEditContainer>;
};
