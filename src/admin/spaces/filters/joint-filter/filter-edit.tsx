import {ReportFilter, ReportFilterJoint} from '@/services/data/tuples/report-types';
import {isExpressionFilter, isJointFilter} from '@/services/data/tuples/report-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {ExpressionFilterEdit} from '../expression-filter';
import {JointFilterEdit} from './index';

export const FilterEdit = (props: {
	topics: Array<Topic>;
	parentJoint: ReportFilterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	filter: ReportFilter;
}) => {
	const {topics, parentJoint, onRemoveMe, notifyChangeToParent, filter} = props;

	if (isJointFilter(filter)) {
		return <JointFilterEdit topics={topics} joint={filter}
		                        parentJoint={parentJoint} onRemoveMe={onRemoveMe}
		                        notifyChangeToParent={notifyChangeToParent}/>;
	} else if (isExpressionFilter(filter)) {
		return <ExpressionFilterEdit topics={topics} expression={filter}
		                             parentJoint={parentJoint} onRemoveMe={onRemoveMe}
		                             notifyChangeToParent={notifyChangeToParent}/>;
	} else {
		return null;
	}
};