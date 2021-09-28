import {isMultipleDataSourcesEnabled} from '@/feature-switch';
import {PipelineRelationMap, PipelinesMap, TopicRelationMap} from '@/services/data/pipeline/pipeline-relations';
import {Factor, FactorEncryptMethod, FactorEncryptMethodLabels} from '@/services/data/tuples/factor-types';
import {isRawTopic} from '@/services/data/tuples/topic';
import {Topic} from '@/services/data/tuples/topic-types';
import {DataSourceMap, EnumsMap} from './types';

const canBeFlatten = (topic: Topic, factor?: Factor) => {
	return isRawTopic(topic) && (factor ? (factor.name || '').indexOf('.') !== -1 : true);
};

export const generateTopicMarkdown = (options: {
	topic: Topic, pipelinesMap: PipelinesMap, dataSourceMap: DataSourceMap, enumsMap: EnumsMap, index: number,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap
}): string => {
	const {topic, dataSourceMap, enumsMap, index, pipelineRelations} = options;

	return `## 1.${index + 1}. ${topic.name || 'Noname Topic'} #${topic.topicId}<span id="topic-${topic.topicId}"/>
${topic.description || ''}

<a href="data:application/json;base64,${window.btoa(JSON.stringify(topic))}" target="_blank" download="${topic.name || 'Noname Topic'}-${topic.topicId}.json">Download Meta File</a>

### 1.${index + 1}.1. Basic Information
- Kind: ${topic.kind?.toUpperCase() ?? ''}
- Type: ${topic.type?.toUpperCase() ?? ''}
${isMultipleDataSourcesEnabled() ? `- Data Source: ${dataSourceMap[topic.dataSourceId ?? '']?.dataSourceCode ?? ''}` : ''}

### 1.${index + 1}.2. Factors
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

### 1.${index + 1}.3. Pipelines
### 1.${index + 1}.3.1 Triggered
${Object.values(pipelineRelations).filter(relation => relation.trigger?.topic === topic).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}

### 1.${index + 1}.3.2 Write Data to Me
${Object.values(pipelineRelations).filter(relation => relation.outgoing.filter(relevant => relevant.topic === topic).length !== 0).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}

### 1.${index + 1}.3.3 Read Data from Me
${Object.values(pipelineRelations).filter(relation => relation.incoming.filter(relevant => relevant.topic === topic).length !== 0).map(relation => {
		return `- <a href="#pipeline-${relation.pipeline.pipelineId}">${relation.pipeline.name || 'Noname Pipeline'}</a>`;
	}).join('\n')}
`;
};
