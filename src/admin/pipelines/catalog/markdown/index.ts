import {
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '@/services/data/pipeline/pipeline-relations';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {listAllEnums} from '@/services/data/tuples/enum';
import {Space} from '@/services/data/tuples/space-types';
import dayjs from 'dayjs';
import {generateGraphics} from './graphics';
import {generatePipelineMarkdown} from './pipeline';
import {generateTopicMarkdown} from './topic';
import {DataSourceMap, EnumsMap, ExternalWriterMap} from './types';

export const generateMarkdown = async (options: {
	topicsMap: TopicsMap; pipelinesMap: PipelinesMap;
	dataSourceMap: DataSourceMap; externalWriterMap: ExternalWriterMap;
	topicRelations: TopicRelationMap; pipelineRelations: PipelineRelationMap;
	spaces: Array<Space>; connectedSpaces: Array<ConnectedSpace>;
	selectedSvg: string; allSvg: string;
}): Promise<string> => {
	const {
		topicsMap, pipelinesMap, dataSourceMap, externalWriterMap,
		topicRelations, pipelineRelations,
		spaces, connectedSpaces,
		selectedSvg, allSvg
	} = options;

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
		return generateTopicMarkdown({
			topic,
			pipelinesMap,
			dataSourceMap,
			enumsMap,
			index,
			topicRelations,
			pipelineRelations
		});
	}).join('\n')}

# 2. Pipelines
${Object.values(pipelinesMap).sort((p1, p2) => {
		return (p1.name || '').toLowerCase().localeCompare((p2.name || '').toLowerCase());
	}).map((pipeline, index) => generatePipelineMarkdown({
		pipeline,
		topicsMap,
		externalWriterMap,
		index,
		topicRelations,
		pipelineRelations
	})).join('\n')}

# 3. Relations
${generateGraphics(selectedSvg, allSvg)}
`;
};
