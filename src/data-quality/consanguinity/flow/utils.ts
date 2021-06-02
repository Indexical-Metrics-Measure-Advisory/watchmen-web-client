import {DQCMaps, DQCRelations, MappedTopic, TopicsMap} from '../../cache/types';
import {Topic, TopicType} from '../../../services/tuples/topic-types';
import {getTopicName} from '../../utils';

const findTopic = (topicsMap: TopicsMap, idOrName?: string): Topic | undefined => {
	if (idOrName) {
		let topic: MappedTopic | undefined = topicsMap[idOrName];
		if (!topic) {
			topic = Object.values(topicsMap).find(({topic}) => topic.name === idOrName);
		}
		return topic ? topic.topic : (void 0);
	}
	return (void 0);
};

const buildLinks = (options: {
	source: Topic;
	processedTopics: Array<Topic>;
	relations: DQCRelations;
	links: Array<{ source: Topic, target: Topic, size: number }>;
	stops?: Topic;
}) => {
	const {source, processedTopics, relations, links, stops} = options;
	processedTopics.push(source);
	const topicRelation = relations.topics[source.topicId];
	topicRelation.trigger.forEach(pipeline => {
		const pipelineRelation = relations.pipelines[pipeline.pipelineId];
		pipelineRelation.outgoing.forEach(({topic: target, factors}) => {
			if (processedTopics.includes(target)) {
				// break circle
				return;
			}

			links.push({source, target, size: factors.length || 1});
			if (target === stops) {
				// stops here
				processedTopics.push(target);
				return;
			}
			buildLinks({source: target, processedTopics, relations, links, stops});
		});
	});
};

export const compute = (options: {
	maps: DQCMaps;
	relations: DQCRelations;
	starts?: string;
	stops?: string;
}) => {
	const {starts, stops, maps, relations} = options;
	const startTopic = findTopic(maps.topics, starts);
	const stopTopic = findTopic(maps.topics, stops);

	let processedTopics: Array<Topic> = [];
	const links: Array<{ source: Topic, target: Topic, size: number }> = [];
	Object.values(maps.topics).filter(({topic}: MappedTopic) => {
		// no start topic given then use all raw topics
		return (!startTopic && topic.type === TopicType.RAW) || topic === startTopic;
	}).forEach(({topic}) => {
		buildLinks({source: topic, processedTopics, relations, links, stops: stopTopic});
	});

	// remove useless
	const existsMap = links.reduce((map, {source, target}) => {
		map[source.topicId] = source;
		map[target.topicId] = target;
		return map;
	}, {} as { [key in string]: Topic });
	processedTopics = processedTopics.filter(topic => !!existsMap[topic.topicId]);

	if (!processedTopics) {
		return (void 0);
	}

	return {
		// title: {
		// 	text: 'Topic Data Flow'
		// },
		tooltip: {
			trigger: 'item',
			triggerOn: 'mousemove',
			formatter: ({
				            data: {name, source, target, value}
			            }: { data: { name: string, source: string, target: string, value: number } }) => {
				if (name) {
					// noinspection CssUnresolvedCustomProperty
					return `<span style="font-variant: petite-caps;font-weight: bold;color:var(--info-color)">${name}</span>`;
				} else {
					return [
						['From', source],
						['To', target],
						['Touched Factors', value]
					].map(x => {
						// noinspection CssUnresolvedCustomProperty
						return `<span style="font-variant: petite-caps;font-weight: bold;color:var(--info-color)">${x[0]}: ${x[1]}</span>`;
					}).join('<br/>');
				}
			}
		},
		animation: true,
		series: [
			{
				type: 'sankey',
				emphasis: {
					focus: 'adjacency'
				},
				nodeAlign: 'right',
				data: processedTopics.map((topic) => {
					return {name: getTopicName(topic)};
				}),
				links: links.map(({source, target, size}) => {
					return {
						source: getTopicName(source),
						target: getTopicName(target),
						value: size
					};
				}),
				label: {
					color: 'var(--primary-color)',
				},
				lineStyle: {color: 'source'}
			}
		]
	};
};