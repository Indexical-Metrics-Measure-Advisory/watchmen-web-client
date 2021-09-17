import {Report, ReportFilter, ReportFilterJoint} from '@/services/data/tuples/report-types';
import {isExpressionFilter, isJointFilter} from '@/services/data/tuples/report-utils';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {ExpressionFilterEdit} from '../expression-filter';
import {JointFilterEdit} from './index';

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