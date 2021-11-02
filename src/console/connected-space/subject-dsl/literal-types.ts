import {ParameterComputeType, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';

export interface PrettyConstant {
	is: ParameterKind.CONSTANT;
	value: string;
	data: string;
}

export interface PrettyFactor {
	is: ParameterKind.TOPIC;
	topicId: TopicId;
	factorId: FactorId;
	data: {
		topic?: Topic;
		topicPicked: boolean;
		factor?: Factor;
	};
}

export interface PrettyComputed {
	is: ParameterKind.COMPUTED;
	type: ParameterComputeType;
	data: Array<PrettyConstant | PrettyFactor | PrettyComputed | null>;
}
