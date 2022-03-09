import {MonitorRuleDef, MonitorRuleParameterType, RuleDefs} from '@/data-quality/rule-defs';
import {isDataQualityCenterEnabled, isMultipleDataSourcesEnabled} from '@/feature-switch';
import {
	MonitorRule,
	MonitorRuleCompareOperator,
	MonitorRules,
	MonitorRuleSeverity
} from '@/services/data/data-quality/rule-types';
import {isRuleOnFactor} from '@/services/data/data-quality/rules';
import {
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '@/services/data/pipeline/pipeline-relations';
import {Factor, FactorEncryptMethod, FactorEncryptMethodLabels} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {isRawTopic} from '@/services/data/tuples/topic-utils';
import {base64Encode} from '@/services/utils';
import {DataSourcesMap, EnumsMap, MonitorRulesMap} from './types';

const canBeFlatten = (topic: Topic, factor?: Factor) => {
	return isRawTopic(topic) && (factor ? (factor.name || '').indexOf('.') !== -1 : true);
};
const generateTopicMonitorRulesMarkdown = (options: {
	topic: Topic, monitorRules: MonitorRules,
	topicsMap: TopicsMap, sectionIndex: number, index: number
}): string => {
	if (!isDataQualityCenterEnabled()) {
		return '';
	}

	const {topic, monitorRules, topicsMap, sectionIndex, index} = options;

	const rules = monitorRules
		.filter(rule => rule.code != null && rule.code.trim().length !== 0)
		.filter(rule => rule.enabled)
		.map(rule => {
			if (isRuleOnFactor(rule)) {
				// eslint-disable-next-line
				const factor = (topic.factors || []).find(factor => factor.factorId == rule.factorId);
				if (factor == null) {
					// factor not found
					return {rule, dropped: true};
				} else {
					return {rule, factor, dropped: false};
				}
			} else {
				return {rule, dropped: false};
			}
		}).filter(x => !x.dropped);

	if (rules.length === 0) {
		return `
### ${sectionIndex}.${index + 1}.4. Monitor Rules
No monitor rules defined. 
`;
	}

	const compareOperators: Record<string, string> = {
		[MonitorRuleCompareOperator.EQUAL]: 'equal',
		[MonitorRuleCompareOperator.LESS_THAN]: 'less than',
		[MonitorRuleCompareOperator.LESS_THAN_OR_EQUAL]: 'less than or equal',
		[MonitorRuleCompareOperator.GREATER_THAN]: 'greater than',
		[MonitorRuleCompareOperator.GREATER_THAN_EQUAL]: 'greater than or equal'
	};
	const generateParams = (rule: MonitorRule, def: MonitorRuleDef): string => {
		const params = rule.params;
		return (def.parameters || []).map(param => {
			switch (param) {
				case MonitorRuleParameterType.AGGREGATION:
					return `Aggregation = ${params?.aggregation ? `${params?.aggregation}%` : ''}`;
				case MonitorRuleParameterType.COVERAGE_RATE:
					return `Coverage = ${params?.coverageRate ? `${params?.coverageRate}%` : ''}`;
				case MonitorRuleParameterType.QUANTILE:
					return `Quantile = ${params?.quantile ? `${params?.quantile}%` : ''}`;
				case MonitorRuleParameterType.COMPARE_OPERATOR:
					return `Compare Operator = ${compareOperators[params?.compareOperator || ''] || ''}`;
				case MonitorRuleParameterType.LENGTH:
					return `Length = ${params?.length || ''}`;
				case MonitorRuleParameterType.MAX_LENGTH:
				case MonitorRuleParameterType.MAX_NUMBER:
					return `Max = ${params?.max || ''}`;
				case MonitorRuleParameterType.MIN_LENGTH:
				case MonitorRuleParameterType.MIN_NUMBER:
					return `Min = ${params?.min || ''}`;
				case MonitorRuleParameterType.REGEXP:
					return `Regexp = ${params?.regexp || ''}`;
				case MonitorRuleParameterType.STATISTICAL_INTERVAL:
					return `Statistical Interval = ${params?.statisticalInterval || ''}`;
				case MonitorRuleParameterType.TOPIC:
					// eslint-disable-next-line
					const anotherTopic = params?.topicId == null ? null : topicsMap[params.topicId];
					return `Topic = ${anotherTopic ? (anotherTopic.name || 'Noname Topic') : ''}`;
				case MonitorRuleParameterType.FACTOR:
					const factorId = params?.factorId;
					// eslint-disable-next-line
					const factor = (topic?.factors || []).find(factor => factor.factorId == factorId);
					return `Factor = ${factor ? (factor.name || 'Noname Factor') : ''}`;
				default:
					throw new Error(`Parameter[${param}] not supported.`);
			}
		}).filter(x => x).join('<br/>');
	};

	return `
### ${sectionIndex}.${index + 1}.4. Monitor Rules
	
| Code | Grade | Factor | Severity | Parameters |
| ---- | ----- | ------ | -------- | ---------- |
${rules.map(({rule, factor}) => {
		const def: MonitorRuleDef = RuleDefs[rule.code]!;
		return '| '
			+ [
				def.name,
				factor == null ? 'Topic' : `Factor`,
				factor == null ? '' : (factor.name || 'Noname Factor'),
				(rule.severity || MonitorRuleSeverity.TRACE).toUpperCase(),
				generateParams(rule, def)
			].join(' | ')
			+ ' |';
	}).join('\n')}
	
<a href="data:application/json;base64,${base64Encode(JSON.stringify(rules.map(({rule}) => rule)))}" target="_blank" download="MointorRules-${topic.name || 'Noname Topic'}-${topic.topicId}.json">Download Meta File</a>
`;
};

const generateTopicPipelinesMarkdown = (options: {
	topic: Topic, pipelineRelations: PipelineRelationMap;
	sectionIndex: number, index: number
}): string => {
	const {topic, pipelineRelations, sectionIndex, index} = options;

	return `### ${sectionIndex}.${index + 1}.3. Pipelines
#### ${sectionIndex}.${index + 1}.3.1 Triggered
${Object.values(pipelineRelations).filter(relation => relation.trigger?.topic === topic).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}

#### ${sectionIndex}.${index + 1}.3.2 Write Data to Me
${Object.values(pipelineRelations).filter(relation => relation.outgoing.filter(relevant => relevant.topic === topic).length !== 0).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}

#### ${sectionIndex}.${index + 1}.3.3 Read Data from Me
${Object.values(pipelineRelations).filter(relation => relation.incoming.filter(relevant => relevant.topic === topic).length !== 0).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}`;
};

const generateTopicMarkdown = (options: {
	topic: Topic,
	pipelinesMap: PipelinesMap, topicsMap: TopicsMap,
	dataSourcesMap: DataSourcesMap, enumsMap: EnumsMap, monitorRulesMap: MonitorRulesMap,
	index: number,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap;
	sectionIndex: number;
}): string => {
	const {
		topic,
		topicsMap, dataSourcesMap, enumsMap, monitorRulesMap,
		index, pipelineRelations, sectionIndex
	} = options;

	return `## ${sectionIndex}.${index + 1}. ${topic.name || 'Noname Topic'} #${topic.topicId}<span id="topic-${topic.topicId}"/>
${(topic.description || '').replace(/\n/g, '  ').replace(/</g, '&lt;')}

<a href="data:application/json;base64,${base64Encode(JSON.stringify(topic))}" target="_blank" download="${topic.name || 'Noname Topic'}-${topic.topicId}.json">Download Meta File</a>

### ${sectionIndex}.${index + 1}.1. Basic Information
- Kind: ${topic.kind?.toUpperCase() ?? ''}
- Type: ${topic.type?.toUpperCase() ?? ''}
${isMultipleDataSourcesEnabled() ? `- Data Source: ${dataSourcesMap[topic.dataSourceId ?? '']?.dataSourceCode ?? ''}` : ''}

### ${sectionIndex}.${index + 1}.2. Factors
${['Name', 'Type', 'Label', 'Enumeration', 'Default Value', canBeFlatten(topic) ? 'Flatten' : null, 'Encryption & Mask', 'Description'].filter(x => x != null).join(' | ')}
${new Array(canBeFlatten(topic) ? 8 : 7).fill('---').join(' | ')}
${topic.factors.sort((f1, f2) => {
		return (f1.name || '').toUpperCase().localeCompare((f2.name || '').toUpperCase());
	}).map(factor => {
		return [
			factor.name || 'Noname Factor',
			(factor.type || '`Unknown Type`').toUpperCase().replaceAll('-', ' '),
			factor.label || '',
			enumsMap[factor.enumId || '']?.name ?? '',
			factor.defaultValue || '',
			canBeFlatten(topic, factor) ? (factor.flatten ? 'Y' : 'N') : null,
			FactorEncryptMethodLabels[factor.encrypt || FactorEncryptMethod.NONE] || FactorEncryptMethodLabels[FactorEncryptMethod.NONE],
			(factor.description || '').replace(/</g, '&lt;').replace(/\n/g, '<br/>')
		].filter(x => x != null).join(' | ');
	}).join('\n')}

${generateTopicPipelinesMarkdown({topic, pipelineRelations, sectionIndex, index})}
${generateTopicMonitorRulesMarkdown({
		topic, monitorRules: monitorRulesMap[topic.topicId] || [], topicsMap,
		sectionIndex, index
	})}
`;
};

export const generateTopics = (options: {
	topicsMap: TopicsMap; pipelinesMap: PipelinesMap; dataSourcesMap: DataSourcesMap; enumsMap: EnumsMap; monitorRulesMap: MonitorRulesMap;
	topicRelations: TopicRelationMap; pipelineRelations: PipelineRelationMap;
	sectionIndex: number;
}): string => {
	const {
		topicsMap, pipelinesMap, dataSourcesMap, enumsMap, monitorRulesMap,
		topicRelations, pipelineRelations,
		sectionIndex
	} = options;

	if (Object.values(topicsMap).length === 0) {
		return '> No topics.';
	}

	return Object.values(topicsMap).sort((t1, t2) => {
		return (t1.name || '').toLowerCase().localeCompare((t2.name || '').toLowerCase());
	}).map((topic, index) => {
		return generateTopicMarkdown({
			topic,
			pipelinesMap, topicsMap, dataSourcesMap, enumsMap, monitorRulesMap,
			index,
			topicRelations, pipelineRelations,
			sectionIndex
		});
	}).join('\n');
};
