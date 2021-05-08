import {SubjectDataSetFilter, SubjectDataSetFilterExpression, SubjectDataSetFilterJoint} from './subject-types';

export const isJointFilter = (filter: SubjectDataSetFilter): filter is SubjectDataSetFilterJoint => {
	return !!(filter as any).jointType;
};
export const isExpressionFilter = (filter: SubjectDataSetFilter): filter is SubjectDataSetFilterExpression => {
	return !!(filter as any).operator;
};