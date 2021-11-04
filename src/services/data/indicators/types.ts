import {FactorId} from '../tuples/factor-types';
import {TopicId} from '../tuples/topic-types';

export enum MeasureMethod {
	YEAR = 'year',
	MONTH = 'month',
	WEEK_OF_YEAR = 'week-of-year'
}

export type IndicatorId = string;

export interface Indicator {
	indicatorId: IndicatorId;
	name: string;
	topicId: TopicId;
	factorId?: FactorId;
	measures: Array<MeasureMethod>;
}

export type QueryIndicator = Pick<Indicator, 'indicatorId' | 'name'>