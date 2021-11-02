import {FactorId} from '../tuples/factor-types';
import {TopicId} from '../tuples/topic-types';
import {Page} from '../types';

export enum MeasureMethod {

}

export type IndicatorId = string;

export interface Indicator {
	indicatorId: IndicatorId;
	topicId: TopicId;
	factorId: FactorId;
	measures: Array<MeasureMethod>;
}

export interface IndicatorsPage extends Page<Indicator> {
}