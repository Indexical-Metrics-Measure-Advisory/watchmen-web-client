import {Report, ReportFilterJoint} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {FilterEventBusProvider} from '../filter-event-bus';
import {HierarchicalFilterEventBridge} from '../hierarchical-filter-event-bridge';
import {JointEdit} from './joint-edit';
import {NonTopJointFilterContainer} from './widgets';

export const JointFilterEdit = (props: {
	subject: Subject;
	report: Report;
	parentJoint: ReportFilterJoint;
	onRemoveMe: () => void;
	joint: ReportFilterJoint;
	notifyChangeToParent: () => void;
}) => {
	const {
		subject, report,
		parentJoint, onRemoveMe,
		joint,
		notifyChangeToParent
	} = props;

	return <FilterEventBusProvider>
		<NonTopJointFilterContainer>
			<JointEdit parentJoint={parentJoint} onRemoveMe={onRemoveMe}
			           subject={subject} report={report} joint={joint}/>
			<HierarchicalFilterEventBridge notifyChangeToParent={notifyChangeToParent}/>
		</NonTopJointFilterContainer>
	</FilterEventBusProvider>;
};