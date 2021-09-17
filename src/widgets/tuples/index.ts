import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ReactNode} from 'react';

export const buildTopicOptions = (options: {
	topics: Array<Topic>;
	extraTopic?: Topic | null;
	toExtraNode: (topic: Topic) => ReactNode
}) => {
	const {topics, extraTopic, toExtraNode} = options;

	return ([...topics, extraTopic].filter(x => !!x) as Array<Topic>)
		.sort((t1, t2) => t1.name.toLowerCase().localeCompare(t2.name.toLowerCase()))
		.map(topic => {
			return {
				value: topic,
				label: ({value}: { value: Topic }) => {
					if (value === extraTopic) {
						return {
							node: toExtraNode(value),
							label: value.name
						};
					} else {
						return value.name;
					}
				},
				key: topic.topicId
			};
		});
};

export const buildFactorOptions = (options: {
	topic?: Topic | null;
	extraFactor?: Factor | null;
	isValid?: (factor: Factor) => boolean;
	toExtraNode: (factor: Factor) => ReactNode;
}) => {
	const {topic, extraFactor, isValid = () => true, toExtraNode} = options;

	return ([...(topic?.factors || []), extraFactor].filter(x => !!x) as Array<Factor>)
		.sort((f1, f2) => (f1.label || f1.name).toLowerCase().localeCompare((f2.label || f2.name).toLowerCase()))
		.map(factor => {
			return {
				value: factor,
				label: ({value}: { value: Factor }) => {
					if (value === extraFactor || !isValid(value)) {
						return {
							node: toExtraNode(value),
							label: value.label || value.name
						};
					} else {
						return value.label || value.name;
					}
				},
				key: factor.factorId
			};
		});
};