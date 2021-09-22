import {ReportFilterJoint} from '@/services/data/tuples/report-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FilterEventBusProvider} from '../filter-event-bus';
import {HierarchicalFilterEventBridge} from '../hierarchical-filter-event-bridge';
import {JointEdit} from './joint-edit';
import {NonTopJointFilterContainer} from './widgets';

export const JointFilterEdit = (props: {
	topics: Array<Topic>;
	parentJoint: ReportFilterJoint;
	onRemoveMe: () => void;
	joint: ReportFilterJoint;
	notifyChangeToParent: () => void;
}) => {
	const {topics, parentJoint, onRemoveMe, joint, notifyChangeToParent} = props;

	return <FilterEventBusProvider>
		<NonTopJointFilterContainer>
			<JointEdit parentJoint={parentJoint} onRemoveMe={onRemoveMe}
			           topics={topics} joint={joint}/>
			<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
		</NonTopJointFilterContainer>
	</FilterEventBusProvider>;
};