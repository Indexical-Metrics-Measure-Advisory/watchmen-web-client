import {MappedTopicsMap} from '@/services/data/pipeline/pipeline-relations';
import {Factor} from '@/services/data/tuples/factor-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic, TopicType} from '@/services/data/tuples/topic-types';
import {getCurrentTheme} from '@/widgets/theme/theme-wrapper';
import {Theme} from '@/widgets/theme/types';
import {DQCMaps, DQCRelations} from '../../cache/types';
import {getPipelineName, getTopicName} from '../../utils';

enum LinkType {
	TRIGGER = 'trigger',
	INCOMING = 'incoming',
	OUTGOING = 'outgoing',

	// use in topic to factor
	OWN = 'own'
}

interface Link {
	topic?: Topic;
	pipeline?: Pipeline;
	factor?: Factor;
	sourceId: string;   // topic id or pipeline id, depends on link type
	targetId: string;   // topic id or pipeline id, depends on link type
	size: number;
	type: LinkType;
}

const computeSymbolSize = (size: number): number => Math.max(10, Math.min(Math.sqrt(size) * 10, 50));
const computeNodeItemStyle = (topic: Topic, theme: Theme) => {
	switch (topic.type) {
		case TopicType.RAW:
			return {
				color: theme.warnColor,
				opacity: 0.9,
				borderColor: theme.bgColor,
				borderWidth: 2,
				borderType: 'solid',
				shadowColor: theme.fontColor,
				shadowBlur: 5
			};
		case TopicType.DISTINCT:
			return {
				color: theme.successColor,
				borderColor: theme.bgColor,
				borderWidth: 1,
				borderType: 'dashed',
				shadowColor: theme.successColor,
				shadowBlur: 10
			};
		default:
			return {
				color: theme.infoColor,
				borderColor: theme.bgColor,
				borderWidth: 2,
				shadowColor: theme.fontColor,
				shadowBlur: 10
			};
	}
};

const putIntoProceedFactors = (map: MappedTopicsMap, topic: Topic, factor: Factor, factorNodeId: string) => {
	let mappedTopic = map[topic.topicId];
	if (!mappedTopic) {
		map[topic.topicId] = {topic, factors: {[factorNodeId]: factor}};
	} else {
		mappedTopic.factors[factorNodeId] = factor;
	}
};

const computePipelineNodeId = (pipeline: Pipeline) => `p-${pipeline.pipelineId}`;
const computeTopicNodeId = (topic: Topic) => `t-${topic.topicId}`;
const computeFactorNodeId = (topicNodeId: string, factor: Factor) => `${topicNodeId}-f-${factor.factorId}`;

const build = (options: {
	processedTopics: Array<Topic>;
	factorsMap: MappedTopicsMap;
	links: Array<Link>;
	linkTimes: Record<string, number>

	pipeline: Pipeline;
	pipelineNodeId: string;
	topic: Topic;
	factors: Array<Factor>;

	showFactor: boolean;
	linkType: LinkType;
	switchDirection?: boolean;
}) => {
	const {
		processedTopics, factorsMap, links, linkTimes,
		pipeline, pipelineNodeId, topic, factors,
		showFactor, linkType, switchDirection = false
	} = options;

	processedTopics.push(topic);
	const topicNodeId = computeTopicNodeId(topic);

	if (showFactor) {
		// link between pipeline and factor
		factors.forEach(factor => {
			const factorNodeId = computeFactorNodeId(topicNodeId, factor);
			putIntoProceedFactors(factorsMap, topic, factor, factorNodeId);
			links.push({
				factor,
				topic,
				pipeline,
				sourceId: switchDirection ? pipelineNodeId : computeFactorNodeId(topicNodeId, factor),
				targetId: switchDirection ? computeFactorNodeId(topicNodeId, factor) : pipelineNodeId,
				size: 1,
				type: linkType
			});
		});
	} else {
		// link between topic & pipeline
		links.push({
			topic: topic,
			pipeline,
			sourceId: switchDirection ? pipelineNodeId : topicNodeId,
			targetId: switchDirection ? topicNodeId : pipelineNodeId,
			size: factors.length,
			type: linkType
		});
		linkTimes[topicNodeId] = (linkTimes[topicNodeId] || 0) + factors.length;
	}
	linkTimes[pipelineNodeId] = (linkTimes[pipelineNodeId] || 0) + factors.length;
};

export const compute = (options: {
	maps: DQCMaps;
	relations: DQCRelations;
	showFactor: boolean;
}) => {
	const {relations, showFactor} = options;

	const processPipelines: Array<Pipeline> = [];
	let processedTopics: Array<Topic> = [];
	const factorsMap: MappedTopicsMap = {};
	const links: Array<Link> = [];
	const linkTimes: Record<string, number> = {};

	Object.values(relations.pipelines).forEach(pipelineRelation => {
		const {pipeline, trigger, incoming, outgoing} = pipelineRelation;
		processPipelines.push(pipeline);
		const pipelineNodeId = computePipelineNodeId(pipeline);

		if (trigger) {
			build({
				processedTopics, factorsMap, links, linkTimes,
				pipeline, pipelineNodeId, topic: trigger.topic, factors: trigger.factors,
				showFactor, linkType: LinkType.TRIGGER
			});
		}
		incoming.forEach(({topic, factors}) => {
			build({
				processedTopics, factorsMap, links, linkTimes,
				pipeline, pipelineNodeId, topic, factors,
				showFactor, linkType: LinkType.INCOMING
			});
		});
		outgoing.forEach(({topic, factors}) => {
			build({
				processedTopics, factorsMap, links, linkTimes,
				pipeline, pipelineNodeId, topic, factors,
				showFactor, linkType: LinkType.OUTGOING, switchDirection: true
			});
		});
	});

	if (processPipelines.length === 0 || processedTopics.length === 0) {
		return (void 0);
	}
	processedTopics = [...new Set(processedTopics)];
	const processFactors: Array<Factor & { factorNodeId: string }> = showFactor
		? Object.values(factorsMap).map(({topic, factors}) => {
			const topicNodeId = `t-${topic.topicId}`;
			linkTimes[topicNodeId] = (linkTimes[topicNodeId] || 0) + Object.keys(factors).length;
			return Object.values(factors).map(factor => {
				const factorNodeId = `${topicNodeId}-f-${factor.factorId}`;
				links.push({
					factor, topic, sourceId: topicNodeId, targetId: factorNodeId, size: 1, type: LinkType.OWN
				});
				return {factorNodeId, ...factor};
			});
		}).flat()
		: [];

	const theme = getCurrentTheme();

	return {
		tooltip: {
			trigger: 'item',
			triggerOn: 'mousemove',
			formatter: ({
				            data: {name, factor, topic, pipeline, value, linkType}
			            }: { data: { name: string, factor: Factor, topic: Topic, pipeline: Pipeline, value: number, linkType: LinkType } }) => {
				if (name) {
					// noinspection CssUnresolvedCustomProperty
					return `<span style="font-variant: petite-caps;font-weight: bold;color:var(--info-color)">${name}</span>`;
				} else if (pipeline && factor) {
					// noinspection CssUnresolvedCustomProperty
					return '<div style="display:grid;grid-template-columns:auto 1fr;grid-column-gap:var(--margin)">' + [
						['Pipeline', getPipelineName(pipeline)],
						[linkType === LinkType.TRIGGER ? 'Triggered By' : (linkType === LinkType.INCOMING ? 'Read From' : 'Write To'), ''],
						['Topic/Factor', `${getTopicName(topic)}.${factor.name || 'Noname Factor'}`]
					].map(x => {
						// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
						return `<span style="font-variant:petite-caps;font-family:var(--title-font-family);color:var(--info-color)">${x[0]}:</span>`
							+ `<span style="font-family:var(--title-font-family)">${x[1]}</span>`;
					}).join('') + '</div>';
				} else if (topic && factor) {
					// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
					return `<span style="font-family:var(--title-font-family)">${getTopicName(topic)}.${factor.name || 'Noname Factor'}</span>`;
				} else if (pipeline && topic) {
					// noinspection CssUnresolvedCustomProperty
					return '<div style="display:grid;grid-template-columns:auto 1fr;grid-column-gap:var(--margin)">' + [
						['Pipeline', getPipelineName(pipeline)],
						[linkType === LinkType.TRIGGER ? 'Triggered By' : (linkType === LinkType.INCOMING ? 'Read From' : 'Write To'), ''],
						['Topic', getTopicName(topic)],
						['Touched Factors', value]
					].map(x => {
						// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
						return `<span style="font-variant:petite-caps;font-family:var(--title-font-family);color:var(--info-color)">${x[0]}:</span>`
							+ `<span style="font-family:var(--title-font-family)">${x[1]}</span>`;
					}).join('') + '</div>';
				} else {
					return (void 0);
				}
			}
		},
		animation: true,
		series: [
			{
				type: 'graph',
				layout: 'force',
				force: {
					repulsion: 500
				},
				draggable: true,
				roam: true,
				data: [
					...processFactors.map(({factorNodeId, name}) => {
						return {
							id: factorNodeId,
							name: name || 'Noname Factor',
							symbolSize: 8,
							category: 0,
							itemStyle: {
								color: theme.primaryColor,
								borderColor: theme.fontColor,
								borderWidth: 1,
								shadowColor: theme.fontColor,
								shadowBlur: 3
							}
						};
					}),
					...processedTopics.map(topic => {
						const topicNodeId = `t-${topic.topicId}`;
						return {
							id: topicNodeId,
							name: getTopicName(topic),
							symbolSize: computeSymbolSize(linkTimes[topicNodeId]),
							itemStyle: computeNodeItemStyle(topic, theme)
						};
					}),
					...processPipelines.map((pipeline) => {
						const pipelineNodeId = `p-${pipeline.pipelineId}`;
						return {
							id: pipelineNodeId,
							name: getPipelineName(pipeline),
							symbolSize: computeSymbolSize(linkTimes[pipelineNodeId]),
							itemStyle: {
								color: theme.dangerColor,
								borderColor: theme.fontColor,
								borderWidth: 2,
								shadowColor: theme.fontColor,
								shadowBlur: 5
							}
						};
					})
				],
				links: links.map((
					{sourceId, targetId, size, factor, topic, pipeline, type}) => {
					return {
						source: sourceId, target: targetId, value: size,
						lineStyle: {
							color: type === LinkType.TRIGGER ? theme.dangerColor : (type === LinkType.INCOMING ? theme.successColor : theme.warnColor),
							curveness: (Math.random() * 4 + 3) / 10
						},
						factor, topic, pipeline, linkType: type
					};
				}),
				label: {
					show: true,
					position: 'right',
					formatter: '{b}',
					color: theme.fontColor,
					textBorderColor: theme.bgColor,
					textBorderWidth: 1
				},
				labelLayout: {
					hideOverlap: false
				},
				lineStyle: {color: 'source'}
			}
		]
	};
};