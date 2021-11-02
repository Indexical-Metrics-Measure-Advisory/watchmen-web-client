import {DateTime} from '../types';
import {Parameter, ParameterCondition, ParameterExpression, ParameterJoint} from './factor-calculator-types';
import {FactorId} from './factor-types';
import {Report} from './report-types';
import {TopicId} from './topic-types';
import {Tuple} from './tuple-types';

export type SubjectDataSetColumnId = string;

/** column */
export interface SubjectDataSetColumn {
	columnId: SubjectDataSetColumnId;
	parameter: Parameter;
	alias?: string;
}

/** filter */
export interface SubjectDataSetFilter extends ParameterCondition {
}

export interface SubjectDataSetFilterJoint extends SubjectDataSetFilter, ParameterJoint {
	filters: Array<SubjectDataSetFilter>;
}

export interface SubjectDataSetFilterExpression extends SubjectDataSetFilter, ParameterExpression {
}

/** topic join */
export enum TopicJoinType {
	LEFT = 'left',
	RIGHT = 'right',
	INNER = 'inner',
}

export interface SubjectDataSetJoin {
	topicId: TopicId;
	factorId: FactorId;
	secondaryTopicId: TopicId;
	secondaryFactorId: FactorId;
	type: TopicJoinType;
}

export interface SubjectDataSet {
	filters: SubjectDataSetFilterJoint;
	columns: Array<SubjectDataSetColumn>;
	joins: Array<SubjectDataSetJoin>;
}

export type SubjectId = string;

export interface Subject extends Tuple {
	subjectId: SubjectId;
	name: string;
	autoRefreshInterval?: number;
	reports?: Array<Report>;
	dataset: SubjectDataSet;
	lastVisitTime: DateTime;
}
