import {Enum} from './enum-types';
import {Indicator} from './indicator-types';
import {Topic} from './topic-types';

export type QueryIndicator = Pick<Indicator, 'indicatorId' | 'name'>;
export type TopicForIndicator = Pick<Topic, 'topicId' | 'name' | 'type' | 'factors'>;
export type EnumForIndicator = Pick<Enum, 'enumId' | 'name'>;

export type QueryIndicatorCategoryParams = [] | [string] | [string, string];