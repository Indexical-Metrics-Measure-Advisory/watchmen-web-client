import {FactorId} from './factor-types';
import {TopicId} from './topic-types';
import {Tuple} from './tuple-types';

export enum MeasureMethod {
	YEAR = 'year',
	MONTH = 'month',
	WEEK_OF_YEAR = 'week-of-year'
}

export type IndicatorId = string;

export interface Indicator extends Tuple {
	indicatorId: IndicatorId;
	name: string;
	topicId: TopicId;
	factorId?: FactorId;
	measures: Array<MeasureMethod>;
}

export type QueryIndicator = Pick<Indicator, 'indicatorId' | 'name'>