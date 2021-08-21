import {
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '../../../../services/pipeline/pipeline-relations';
import {EnumsMap} from './types';
import dayjs from 'dayjs';
import {generateTopicMarkdown} from './topic';
import {generatePipelineMarkdown} from './pipeline';
import {listAllEnums} from '../../../../services/tuples/enum';
import {generateGraphics} from './graphics';

export const generateMarkdown = async (options: {
	topicsMap: TopicsMap, pipelinesMap: PipelinesMap,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap,
	selectedSvg: string, allSvg: string
}): Promise<string> => {
	const {topicsMap, pipelinesMap, topicRelations, pipelineRelations, selectedSvg, allSvg} = options;

	const enums = await listAllEnums();
	const enumsMap: EnumsMap = enums.reduce((map, enumeration) => {
		map[enumeration.enumId] = enumeration;
		return map;
	}, {} as EnumsMap);

	return `Exported Topics & Pipelines on ${dayjs().format('YYYY/MM/DD')}
------------------------------------------

# 1. Topics
${Object.values(topicsMap).sort((t1, t2) => {
		return (t1.name || '').toLowerCase().localeCompare((t2.name || '').toLowerCase());
	}).map((topic, index) => {
		return generateTopicMarkdown({topic, pipelinesMap, enumsMap, index, topicRelations, pipelineRelations});
	}).join('\n')}

# 2. Pipelines
${Object.values(pipelinesMap).sort((p1, p2) => {
		return (p1.name || '').toLowerCase().localeCompare((p2.name || '').toLowerCase());
	}).map((pipeline, index) => generatePipelineMarkdown({
		pipeline,
		topicsMap,
		index,
		topicRelations,
		pipelineRelations
	})).join('\n')}

# 3. Relations
${generateGraphics(selectedSvg, allSvg)}
`;
};