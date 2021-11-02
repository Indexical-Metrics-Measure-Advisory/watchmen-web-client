import {FactorId} from '../tuples/factor-types';
import {TopicId} from '../tuples/topic-types';
import {Page} from '../types';

export enum MeasureMethod {

}

export interface IndicatorMeasure {
	factorId: FactorId;
	methods: Array<MeasureMethod>;
}

export type IndicatorId = string;

export interface Indicator {
	indicatorId: IndicatorId;
	topicId: TopicId;
	measures: Array<IndicatorMeasure>;
}

export interface IndicatorsPage extends Page<Indicator> {
}