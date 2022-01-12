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
import {generatePipelines} from './pipeline';
import {generateSpaces} from './space';
import {generateTopics} from './topic';
import {DataSourcesMap, EnumsMap, ExternalWritersMap, MonitorRulesMap} from './types';

export const generateMarkdown = async (options: {
	topicsMap: TopicsMap; pipelinesMap: PipelinesMap;
	dataSourcesMap: DataSourcesMap; externalWritersMap: ExternalWritersMap; monitorRulesMap: MonitorRulesMap;
	topicRelations: TopicRelationMap; pipelineRelations: PipelineRelationMap;
	spaces: Array<Space>; connectedSpaces: Array<ConnectedSpace>;
	selectedSvg: string; allSvg: string;
}): Promise<string> => {
	const {
		topicsMap, pipelinesMap, dataSourcesMap, externalWritersMap, monitorRulesMap,
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
# 1. Relations
${generateGraphics(selectedSvg, allSvg, 1)}

# 2. Topics
${generateTopics({
		topicsMap, pipelinesMap, dataSourcesMap, enumsMap, monitorRulesMap,
		topicRelations, pipelineRelations,
		sectionIndex: 2
	})}

# 3. Pipelines
${generatePipelines({topicsMap, pipelinesMap, externalWritersMap, topicRelations, pipelineRelations, sectionIndex: 3})}

# 4. Spaces
${generateSpaces({spaces, connectedSpaces, topicsMap, sectionIndex: 4})}
`;
};
