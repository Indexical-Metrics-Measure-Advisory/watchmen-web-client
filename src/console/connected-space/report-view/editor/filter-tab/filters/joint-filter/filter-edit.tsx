import React from 'react';
import {ExpressionFilterEdit} from '../expression-filter';
import {JointFilterEdit} from './index';
import {Subject} from '@/services/tuples/subject-types';
import {Report, ReportFilter, ReportFilterJoint} from '@/services/tuples/report-types';
import {isExpressionFilter, isJointFilter} from '@/services/tuples/report-utils';

export const FilterEdit = (props: {
	subject: Subject;
	report: Report;
	parentJoint: ReportFilterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	filter: ReportFilter;
}) => {
	const {
		subject, report,
		parentJoint, onRemoveMe, notifyChangeToParent,
		filter
	} = props;

	if (isJointFilter(filter)) {
		return <JointFilterEdit subject={subject} report={report} joint={filter}
		                        parentJoint={parentJoint} onRemoveMe={onRemoveMe}
		                        notifyChangeToParent={notifyChangeToParent}/>;
	} else if (isExpressionFilter(filter)) {
		return <ExpressionFilterEdit subject={subject} report={report} filter={filter}
		                             parentJoint={parentJoint} onRemoveMe={onRemoveMe}
		                             notifyChangeToParent={notifyChangeToParent}/>;
	} else {
		return null;
	}
};