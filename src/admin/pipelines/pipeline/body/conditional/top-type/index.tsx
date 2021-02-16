import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState } from 'react';
import { ICON_COLLAPSE_CONTENT, ICON_EDIT } from '../../../../../../basic-widgets/constants';
import { ParameterJointType } from '../../../../../../services/tuples/factor-calculator-types';
import { Conditional } from '../../../../../../services/tuples/pipeline-super-types';
import { createTopicEqualsConstantParameter } from '../../../../data-utils';
import { useConditionalEventBus } from '../conditional-event-bus';
import { ConditionalEventTypes } from '../conditional-event-bus-types';
import { useJointEventBus } from '../event-bus/joint-event-bus';
import { JointEventTypes } from '../event-bus/joint-event-bus-types';
import { TopTypeButton, TopTypeContainer, TopTypeOption } from './top-type-widgets';

type TopTypeCandidate = ParameterJointType.AND | ParameterJointType.OR | 'anyway';
const OptionsLabel = {
	[ParameterJointType.AND]: 'And',
	[ParameterJointType.OR]: 'Or',
	'anyway': 'Anyway'
};

const defectConditionOn = (conditional: Conditional, jointType?: ParameterJointType) => {
	if (!conditional.on) {
		conditional.on = {
			jointType: jointType || ParameterJointType.AND,
			filters: []
		};
	} else {
		conditional.on.jointType = jointType || conditional.on.jointType || ParameterJointType.AND;
		conditional.on.filters = conditional.on.filters || [];
	}
};
const defendConditional = (conditional: Conditional) => {
	if (!conditional.conditional) {
		conditional.conditional = false;
		delete conditional.on;
	} else {
		conditional.conditional = true;
		defectConditionOn(conditional);
	}
};

export const TopType = (props: { conditional: Conditional }) => {
	const { conditional } = props;

	const { fire: fireConditional } = useConditionalEventBus();
	const { fire } = useJointEventBus();
	const [ expanded, setExpanded ] = useState(false);

	defendConditional(conditional);
	const type = conditional.conditional ? conditional.on?.jointType! : 'anyway';

	const onExpandedClicked = () => setExpanded(true);
	const onBlur = () => setExpanded(false);
	const onTopTypeClicked = (newType: TopTypeCandidate) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (newType === type) {
			if (!expanded) {
				setExpanded(true);
			}
		} else if (newType === 'anyway') {
			conditional.conditional = false;
			delete conditional.on;
			setExpanded(false);
			fireConditional(ConditionalEventTypes.TOP_TYPE_CHANGED, conditional);
		} else {
			conditional.conditional = true;
			defectConditionOn(conditional, newType);
			conditional.on?.filters.push(createTopicEqualsConstantParameter());
			setExpanded(false);
			fireConditional(ConditionalEventTypes.TOP_TYPE_CHANGED, conditional);
			fire(JointEventTypes.JOINT_TYPE_CHANGED, conditional.on!);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setExpanded(!expanded);
	};

	const candidates: Array<TopTypeCandidate> = [ 'anyway', ParameterJointType.AND, ParameterJointType.OR ].filter(candidate => candidate !== type) as Array<TopTypeCandidate>;

	return <TopTypeContainer tabIndex={0} onClick={onExpandedClicked} onBlur={onBlur}>
		<TopTypeOption active={true} expanded={expanded}
		               onClick={onTopTypeClicked(type)}>
			{OptionsLabel[type]}
		</TopTypeOption>
		{candidates.map(candidate => {
			return <TopTypeOption active={false} expanded={expanded}
			                      onClick={onTopTypeClicked(candidate)}
			                      key={candidate}>
				{OptionsLabel[candidate]}
			</TopTypeOption>;
		})}
		<TopTypeButton data-expanded={expanded} onClick={onIconClicked}>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EDIT}/>
		</TopTypeButton>
	</TopTypeContainer>;
};