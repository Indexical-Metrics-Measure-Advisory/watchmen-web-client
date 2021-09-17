import {ComputedParameter, Parameter, ValueTypes} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {useSubParamDelete} from '@/widgets/parameter/sub-param/use-sub-param-delete';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ComputedEditor} from '../computed';
import {ConstantEditor} from '../constant';
import {TopicFactorEditor} from '../topic-factor';
import {RemoveMeButton} from './widgets';

export const SubParameterEditBody = (props: {
	parentParameter: ComputedParameter;
	parameter: Parameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	expectArray: boolean;
	onDeleted: () => void;
}) => {
	const {
		parameter, parentParameter,
		topics, expectedTypes, expectArray,
		onDeleted
	} = props;

	const onDeleteClicked = useSubParamDelete(parentParameter, parameter, onDeleted,
		'Cannot delete this because of reach minimum parameter(s).');

	// sub parameters valid factor types should be defined according to compute type
	return <>
		<ConstantEditor parameter={parameter} expectedTypes={expectedTypes} expectArray={expectArray}/>
		<TopicFactorEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes}/>
		<RemoveMeButton onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</RemoveMeButton>
		<ComputedEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes} expectArray={expectArray}/>
	</>;

};
