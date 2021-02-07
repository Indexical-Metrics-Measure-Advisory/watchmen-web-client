import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { ICON_DELETE } from '../../../../../basic-widgets/constants';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { Parameter, ParameterFrom } from '../../../../../services/tuples/factor-calculator-types';
import { isComputedParameter } from '../../../../../services/tuples/factor-calculator-utils';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ParameterCalculatorTypeEdit } from './parameter-calculator-type';
import { useParameterEventBus } from './parameter-event-bus';
import { ParameterEventTypes } from './parameter-event-bus-types';
import {
	ComputedEditBody,
	ComputedEditContainer,
	ComputedEditor,
	ConstantValueEditor,
	DeleteMeButton,
	ParameterContainer,
	ParameterTypeEditor,
	TopicFactorEditor
} from './widgets';

export const ComputedEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: Parameter
}) => {
	const { availableTopics, pickedTopics, parameter, ...rest } = props;

	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	if (!isComputedParameter(parameter)) {
		return null;
	}

	const onDeleteClicked = () => {
	};

	return <ComputedEditContainer {...rest}>
		<ParameterCalculatorTypeEdit parameter={parameter}/>
		<ComputedEditBody>
			{parameter.parameters.map(sub => {
				return <ParameterContainer shorten={sub.from === ParameterFrom.COMPUTED} key={v4()}>
					<ParameterTypeEditor parameter={sub}/>
					<ConstantValueEditor parameter={sub}/>
					<TopicFactorEditor parameter={sub}
					                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
					<DeleteMeButton onClick={onDeleteClicked}>
						<FontAwesomeIcon icon={ICON_DELETE}/>
					</DeleteMeButton>
					<ComputedEditor parameter={sub} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
				</ParameterContainer>;
			})}
		</ComputedEditBody>
	</ComputedEditContainer>;
};