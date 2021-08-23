import React from 'react';
import {FilterEventBusProvider} from '../filter-event-bus';
import {HierarchicalFilterEventBridge} from '../hierarchical-filter-event-bridge';
import {JointEdit} from './joint-edit';
import {NonTopJointFilterContainer} from './widgets';
import {Subject} from '../../../../../../../services/tuples/subject-types';
import {Report, ReportFilterJoint} from '../../../../../../../services/tuples/report-types';

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