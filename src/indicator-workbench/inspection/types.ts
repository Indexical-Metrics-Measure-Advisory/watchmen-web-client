import {Indicator} from '@/services/data/tuples/indicator-types';
import {EnumForIndicator, TopicForIndicator} from '@/services/data/tuples/query-indicator-types';

export interface InspectingIndicator {
	indicator: Indicator;
	topic?: TopicForIndicator;
	enums?: Array<EnumForIndicator>;
}