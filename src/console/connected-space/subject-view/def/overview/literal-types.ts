import { ParameterComputeType, ParameterFrom } from '../../../../../services/tuples/factor-calculator-types';
import { Factor } from '../../../../../services/tuples/factor-types';
import { Topic } from '../../../../../services/tuples/topic-types';

export interface PrettyConstant {
	is: ParameterFrom.CONSTANT;
	value: string;
	data: string;
}

export interface PrettyFactor {
	is: ParameterFrom.TOPIC;
	topicId: string;
	factorId: string;
	data: {
		topic?: Topic;
		topicPicked: boolean;
		factor?: Factor;
	}
}

export interface PrettyComputed {
	is: ParameterFrom.COMPUTED;
	type: ParameterComputeType;
	data: Array<PrettyConstant | PrettyFactor | PrettyComputed | null>
}
