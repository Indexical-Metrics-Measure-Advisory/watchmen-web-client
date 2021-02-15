import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AlertLabel } from '../../../../../../../alert/widgets';
import { ICON_DELETE } from '../../../../../../../basic-widgets/constants';
import { useEventBus } from '../../../../../../../events/event-bus';
import { EventTypes } from '../../../../../../../events/types';
import { ComputedParameter, Parameter } from '../../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../../services/tuples/topic-types';
import { RemoveMeButton } from '../../widgets';
import { ComputedEditor } from '../compute';
import { ConstantEditor } from '../constant';
import { canDeleteAnyParameter } from '../data-utils';
import { TopicFactorEditor } from '../topic-factor';

export const SubParameterEditBody = (props: {
	parentParameter: ComputedParameter;
	parameter: Parameter;
	topics: Array<Topic>;
	onDeleted: () => void;
}) => {
	const {
		parameter, parentParameter,
		topics,
		onDeleted
	} = props;

	const { fire: fireGlobal } = useEventBus();

	const onDeleteClicked = () => {
		const canDelete = canDeleteAnyParameter(parentParameter);
		if (!canDelete) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>Cannot delete this because of reach minimum parameter(s).</AlertLabel>);
		} else {
			const index = parentParameter.parameters.findIndex(child => child === parameter);
			if (index !== -1) {
				parentParameter.parameters.splice(index, 1);
				onDeleted();
			}
		}
	};

	return <>
		<ConstantEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} topics={topics}/>
		<RemoveMeButton onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</RemoveMeButton>
		<ComputedEditor parameter={parameter} topics={topics}/>
	</>;

};
