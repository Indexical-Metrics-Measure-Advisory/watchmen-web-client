import {MappedTopic, MappedTopicsMap} from '@/services/data/pipeline/pipeline-relations';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {isRawTopic} from '@/services/data/tuples/topic-utils';
import {getCurrentTheme} from '@/widgets/theme/theme-wrapper';
import {DQCMaps, DQCRelations} from '../../cache/types';
import {getPipelineName, getTopicName} from '../../utils';

interface Link {
	source: Topic;
	target: Topic;
	size: number;
	pipeline: Pipeline;
}

const findTopic = (topicsMap: MappedTopicsMap, idOrName?: string): Topic | undefined => {
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
	links: Array<Link>;
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

			links.push({source, target, size: factors.length || 1, pipeline});
			if (target === stops) {
				// stops here
				processedTopics.push(target);
				return;
			}
			buildLinks({source: target, processedTopics, relations, links, stops});
		});
	});
};

const filterByTargets = (links: Array<Link>, targets: Array<Topic>) => {
	const linkMap = links.reduce((map, link) => {
		const topicId = link.target.topicId;
		let exists = map[topicId];
		if (!exists) {
			exists = [];
			map[topicId] = exists;
		}
		exists.push(link);
		return map;
	}, {} as Record<string, Array<Link>>);

	const pickedLinks: Array<Link> = [];
	const findLinksToTargets = (targets: Array<Topic>) => {
		return targets.map<Array<Link>>(target => linkMap[target.topicId]).filter(x => !!x).flat();
	};
	let linksToTargets = findLinksToTargets(targets);
	while (linksToTargets.length !== 0) {
		linksToTargets.forEach(link => {
			if (!pickedLinks.includes(link)) {
				pickedLinks.push(link);
			}
		});
		// use sources as target
		linksToTargets = findLinksToTargets(linksToTargets.map(link => link.source));
	}

	return pickedLinks;
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
	let links: Array<Link> = [];
	Object.values(maps.topics).filter(({topic}: MappedTopic) => {
		// no start topic given then use all raw topics
		return (!startTopic && isRawTopic(topic)) || topic === startTopic;
	}).forEach(({topic}) => {
		buildLinks({source: topic, processedTopics, relations, links, stops: stopTopic});
	});

	// when there is a stop topic, removed the branches which are not the stop topic directed
	if (stopTopic) {
		links = filterByTargets(links, [stopTopic]);
	}

	// remove useless
	const existsMap = links.reduce((map, {source, target}) => {
		map[source.topicId] = source;
		map[target.topicId] = target;
		return map;
	}, {} as Record<TopicId, Topic>);
	processedTopics = processedTopics.filter(topic => !!existsMap[topic.topicId]);

	if (!processedTopics || processedTopics.length === 0) {
		return (void 0);
	}

	const theme = getCurrentTheme();

	return {
		// title: {
		// 	text: 'Topic Data Flow'
		// },
		tooltip: {
			trigger: 'item',
			triggerOn: 'mousemove',
			formatter: ({
				            data: {name, source, target, value, pipeline}
			            }: { data: { name: string, source: string, target: string, value: number, pipeline: string } }) => {
				if (name) {
					// noinspection CssUnresolvedCustomProperty
					return `<span style="font-variant: petite-caps;font-weight: bold;color:var(--info-color)">${name}</span>`;
				} else {
					// noinspection CssUnresolvedCustomProperty
					return '<div style="display:grid;grid-template-columns:auto 1fr;grid-column-gap:var(--margin)">' + [
						['From', source],
						['To', target],
						['Through', pipeline],
						['Touched Factors', value]
					].map(x => {
						// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
						return `<span style="font-variant:petite-caps;font-family:var(--title-font-family);color:var(--info-color)">${x[0]}:</span>`
							+ `<span style="font-family:var(--title-font-family)">${x[1]}</span>`;
					}).join('') + '</div>';
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
				links: links.map(({source, target, size, pipeline}) => {
					return {
						source: getTopicName(source),
						target: getTopicName(target),
						value: size,
						pipeline: getPipelineName(pipeline)
					};
				}),
				label: {
					color: theme.fontColor,
					textBorderColor: theme.bgColor,
					textBorderWidth: 1
				},
				lineStyle: {color: 'source'}
			}
		]
	};
};