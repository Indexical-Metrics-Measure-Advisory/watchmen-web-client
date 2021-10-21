import {isMultipleDataSourcesEnabled} from '@/feature-switch';
import {
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '@/services/data/pipeline/pipeline-relations';
import {Factor, FactorEncryptMethod, FactorEncryptMethodLabels} from '@/services/data/tuples/factor-types';
import {isRawTopic} from '@/services/data/tuples/topic';
import {Topic} from '@/services/data/tuples/topic-types';
import {DataSourcesMap, EnumsMap} from './types';

const canBeFlatten = (topic: Topic, factor?: Factor) => {
	return isRawTopic(topic) && (factor ? (factor.name || '').indexOf('.') !== -1 : true);
};

const generateTopicMarkdown = (options: {
	topic: Topic, pipelinesMap: PipelinesMap, dataSourcesMap: DataSourcesMap, enumsMap: EnumsMap, index: number,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap;
	sectionIndex: number;
}): string => {
	const {topic, dataSourcesMap, enumsMap, index, pipelineRelations, sectionIndex} = options;

	return `## ${sectionIndex}.${index + 1}. ${topic.name || 'Noname Topic'} #${topic.topicId}<span id="topic-${topic.topicId}"/>
${topic.description || ''}

<a href="data:application/json;base64,${window.btoa(JSON.stringify(topic))}" target="_blank" download="${topic.name || 'Noname Topic'}-${topic.topicId}.json">Download Meta File</a>

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
			enumsMap[factor.enumId || ''] ?? '',
			factor.defaultValue || '',
			canBeFlatten(topic, factor) ? (factor.flatten ? 'Y' : 'N') : null,
			FactorEncryptMethodLabels[factor.encrypt || FactorEncryptMethod.NONE] || FactorEncryptMethodLabels[FactorEncryptMethod.NONE],
			factor.description || ''
		].filter(x => x != null).join(' | ');
	}).join('\n')}

### ${sectionIndex}.${index + 1}.3. Pipelines
### ${sectionIndex}.${index + 1}.3.1 Triggered
${Object.values(pipelineRelations).filter(relation => relation.trigger?.topic === topic).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}

### ${sectionIndex}.${index + 1}.3.2 Write Data to Me
${Object.values(pipelineRelations).filter(relation => relation.outgoing.filter(relevant => relevant.topic === topic).length !== 0).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}

### ${sectionIndex}.${index + 1}.3.3 Read Data from Me
${Object.values(pipelineRelations).filter(relation => relation.incoming.filter(relevant => relevant.topic === topic).length !== 0).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}
`;
};

export const generateTopics = (options: {
	topicsMap: TopicsMap; pipelinesMap: PipelinesMap; dataSourcesMap: DataSourcesMap; enumsMap: EnumsMap;
	topicRelations: TopicRelationMap; pipelineRelations: PipelineRelationMap;
	sectionIndex: number;
}): string => {
	const {
		topicsMap, pipelinesMap, dataSourcesMap, enumsMap,
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
			pipelinesMap, dataSourcesMap, enumsMap,
			index,
			topicRelations, pipelineRelations,
			sectionIndex
		});
	}).join('\n');
};
