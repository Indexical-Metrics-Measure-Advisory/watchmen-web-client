import {ParameterJoint} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FilterEventBusProvider} from '../filter-event-bus';
import {HierarchicalFilterEventBridge} from '../hierarchical-filter-event-bridge';
import {JointEdit} from './joint-edit';
import {NonTopJointFilterContainer} from './widgets';

export const JointFilterEdit = (props: {
	topic: Topic;
	parentJoint: ParameterJoint;
	onRemoveMe: () => void;
	joint: ParameterJoint;
	notifyChangeToParent: () => void;
}) => {
	const {topic, parentJoint, onRemoveMe, joint, notifyChangeToParent} = props;

	return <FilterEventBusProvider>
		<NonTopJointFilterContainer>
			<JointEdit parentJoint={parentJoint} onRemoveMe={onRemoveMe}
			           topic={topic} joint={joint}/>
			<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
		</NonTopJointFilterContainer>
	</FilterEventBusProvider>;
};