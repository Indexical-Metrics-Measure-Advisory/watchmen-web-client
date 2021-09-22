import {ComputedParameter, Parameter} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {useSubParamDelete} from '@/widgets/parameter/sub-param/use-sub-param-delete';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ComputedEditor} from '../computed';
import {ConstantValueEditor} from '../constant';
import {TopicFactorEditor} from '../topic-factor';
import {DeleteMeButton} from '../widgets';

export const SubParameterEditBody = (props: {
	topic: Topic;
	parentParameter: ComputedParameter;
	parameter: Parameter;
	onDeleted: () => void;
}) => {
	const {topic, parameter, parentParameter, onDeleted} = props;

	const onDeleteClicked = useSubParamDelete(parentParameter, parameter, onDeleted,
		'Cannot delete this because of reach minimum parameter(s).');

	return <>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} topic={topic}/>
		<DeleteMeButton onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</DeleteMeButton>
		<ComputedEditor parameter={parameter} topic={topic}/>
	</>;
};
