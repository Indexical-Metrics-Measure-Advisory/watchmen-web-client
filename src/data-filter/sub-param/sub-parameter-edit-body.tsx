import {ICON_DELETE} from '@/basic-widgets/constants';
import {Lang} from '@/langs';
import {ComputedParameter, Parameter} from '@/services/tuples/factor-calculator-types';
import {Topic} from '@/services/tuples/topic-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ComputedEditor} from '../computed';
import {ConstantValueEditor} from '../constant';
import {TopicFactorEditor} from '../topic-factor';
import {DeleteMeButton} from '../widgets';
import {useSubParamDelete} from './use-sub-param-delete';

export const SubParameterEditBody = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parentParameter: ComputedParameter;
	parameter: Parameter;
	onDeleted: () => void;
}) => {
	const {
		availableTopics, pickedTopics,
		parameter, parentParameter,
		onDeleted
	} = props;

	const onDeleteClicked = useSubParamDelete(parentParameter, parameter, onDeleted,
		Lang.CONSOLE.CONNECTED_SPACE.CAN_NOT_DELETE_CHILD_FROM_COMPUTED);

	return <>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<DeleteMeButton onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</DeleteMeButton>
		<ComputedEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</>;

};
