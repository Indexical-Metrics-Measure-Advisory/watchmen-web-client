import React from 'react';
import { Subject, SubjectDataSetFilter } from '../../../../../../services/tuples/subject-types';
import { isExpressionFilter, isJointFilter } from '../../../../../../services/tuples/subject-utils';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ExpressionFilterEdit } from '../expression-filter';
import { JointFilterEdit } from './index';

export const FilterEdit = (props: {
	subject: Subject;
	filter: SubjectDataSetFilter;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, filter, availableTopics, pickedTopics } = props;

	if (isJointFilter(filter)) {
		return <JointFilterEdit subject={subject} joint={filter}
		                        availableTopics={availableTopics} pickedTopics={pickedTopics}/>;
	} else if (isExpressionFilter(filter)) {
		return <ExpressionFilterEdit subject={subject} filter={filter}
		                             availableTopics={availableTopics} pickedTopics={pickedTopics}/>;
	} else {
		return null;
	}
};