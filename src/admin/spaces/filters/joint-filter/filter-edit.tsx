import {ParameterCondition, ParameterJoint} from '@/services/data/tuples/factor-calculator-types';
import {isExpressionParameter, isJointParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {ExpressionFilterEdit} from '../expression-filter';
import {JointFilterEdit} from './index';

export const FilterEdit = (props: {
	topics: Array<Topic>;
	parentJoint: ParameterJoint;
	onRemoveMe: () => void;
	notifyChangeToParent: () => void;
	filter: ParameterCondition;
}) => {
	const {topics, parentJoint, onRemoveMe, notifyChangeToParent, filter} = props;

	if (isJointParameter(filter)) {
		return <JointFilterEdit topics={topics} joint={filter}
		                        parentJoint={parentJoint} onRemoveMe={onRemoveMe}
		                        notifyChangeToParent={notifyChangeToParent}/>;
	} else if (isExpressionParameter(filter)) {
		return <ExpressionFilterEdit topics={topics} expression={filter}
		                             parentJoint={parentJoint} onRemoveMe={onRemoveMe}
		                             notifyChangeToParent={notifyChangeToParent}/>;
	} else {
		return null;
	}
};