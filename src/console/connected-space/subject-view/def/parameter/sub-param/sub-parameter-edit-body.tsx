import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AlertLabel } from '../../../../../../alert/widgets';
import { ICON_DELETE } from '../../../../../../basic-widgets/constants';
import { useEventBus } from '../../../../../../events/event-bus';
import { EventTypes } from '../../../../../../events/types';
import { Lang } from '../../../../../../langs';
import { ComputedParameter, Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { canDeleteAnyParameter } from '../../data-utils';
import { ComputedEditor } from '../computed';
import { ConstantValueEditor } from '../constant';
import { TopicFactorEditor } from '../topic-factor';
import { DeleteMeButton } from '../widgets';

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

	const { fire: fireGlobal } = useEventBus();

	const onDeleteClicked = () => {
		const canDelete = canDeleteAnyParameter(parentParameter);
		if (!canDelete) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.CAN_NOT_DELETE_CHILD_FROM_COMPUTED}</AlertLabel>);
		} else {
			const index = parentParameter.parameters.findIndex(child => child === parameter);
			if (index !== -1) {
				parentParameter.parameters.splice(index, 1);
				onDeleted();
			}
		}
	};

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
