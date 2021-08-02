import React, {useState} from 'react';
import styled from 'styled-components';
import {DialogBody, DialogFooter, DialogLabel} from '../../../../dialog/widgets';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic, TopicType} from '../../../../services/tuples/topic-types';
import {
	buildPipelinesRelation,
	buildTopicsMap,
	buildTopicsRelation,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '../../../../services/pipeline/pipeline-relations';
import {QueryEnum} from '../../../../services/tuples/query-enum-types';
import {Factor} from '../../../../services/tuples/factor-types';
import {AssembledPipelinesGraphics} from '../types';
import {useEventBus} from '../../../../events/event-bus';
import JSZip from 'jszip';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import dayjs from 'dayjs';
import {listEnums} from '../../../../services/tuples/enum';
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
import {ICON_EXPORT} from '../../../../basic-widgets/constants';
import {AdminCacheData} from '../../../../local-persist/types';
import {Button} from '../../../../basic-widgets/button';
import {ButtonInk} from '../../../../basic-widgets/types';
import {EventTypes} from '../../../../events/types';
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {TopicPickerTable} from './topic-picker-table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

type EnumsMap = { [key in string]: QueryEnum };

const DownloadDialogBody = styled(DialogBody)`
	flex-direction: column;
	margin-bottom: var(--margin);
`;

const findPipelinesWriteMe = (topics: Array<Topic>, topicRelations: TopicRelationMap): Array<Pipeline> => {
	return topics.reduce((found, topic) => {
		const {writeMe} = topicRelations[topic.topicId];
		return [...new Set([...writeMe, ...found])];
	}, [] as Array<Pipeline>);
};
const findTopicsOnMe = (pipelines: Array<Pipeline>, pipelineRelation: PipelineRelationMap): Array<Topic> => {
	return pipelines.reduce((found, pipeline) => {
		const {trigger, incoming, outgoing} = pipelineRelation[pipeline.pipelineId];
		if (trigger?.topic) {
			return [...new Set([trigger.topic!, ...incoming.map(({topic}) => topic), ...outgoing.map(({topic}) => topic), ...found])];
		} else {
			return [...new Set([...incoming.map(({topic}) => topic), ...outgoing.map(({topic}) => topic), ...found])];
		}
	}, [] as Array<Topic>);
};

const findByTopics = (options: {
	topics: Array<Topic>;
	finalTopicMap: TopicsMap;
	finalPipelineMap: PipelinesMap
	topicRelations: TopicRelationMap;
	pipelineRelations: PipelineRelationMap
}) => {
	const {topics, finalTopicMap, finalPipelineMap, topicRelations, pipelineRelations} = options;

	topics.forEach(topic => {
		if (!finalTopicMap[topic.topicId]) {
			finalTopicMap[topic.topicId] = topic;
		}
	});
	const writeMe = findPipelinesWriteMe(topics, topicRelations);
	if (writeMe.length !== 0) {
		const relatedPipelines = writeMe.filter(pipeline => {
			if (!finalPipelineMap[pipeline.pipelineId]) {
				finalPipelineMap[pipeline.pipelineId] = pipeline;
				return true;
			} else {
				return false;
			}
		});
		const relatedTopics = findTopicsOnMe(relatedPipelines, pipelineRelations).filter(topic => {
			return !finalTopicMap[topic.topicId];
		});
		if (relatedTopics.length !== 0) {
			findByTopics({topics: relatedTopics, finalTopicMap, finalPipelineMap, topicRelations, pipelineRelations});
		}
	}
};

const canBeFlatten = (topic: Topic, factor?: Factor) => {
	return topic.type === TopicType.RAW && (factor ? (factor.name || '').indexOf('.') !== -1 : true);
};
const generateTopicMarkdown = (options: {
	topic: Topic, pipelinesMap: PipelinesMap, enumsMap: EnumsMap, index: number,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap
}): string => {
	const {topic, enumsMap, index, pipelineRelations} = options;

	return `## 1.${index + 1}. ${topic.name || 'Noname Topic'} #${topic.topicId}<span id="topic-${topic.topicId}"/>
${topic.description || ''}

<a href="data:application/json;base64,${window.btoa(JSON.stringify(topic))}" target="_blank" download="${topic.name || 'Noname Topic'}-${topic.topicId}.json">Download Meta File</a>

### 1.${index + 1}.1. Basic Information
- Kind: ${topic.kind?.toUpperCase() ?? ''}
- Type: ${topic.type?.toUpperCase() ?? ''}

### 1.${index + 1}.2. Factors
${['Name', 'Type', 'Label', 'Enumeration', 'Default Value', canBeFlatten(topic) ? 'Flatten' : null, 'Description'].filter(x => x != null).join(' | ')}
${new Array(canBeFlatten(topic) ? 7 : 6).fill('--').join(' | ')}
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
const generatePipelineMarkdown = (options: {
	pipeline: Pipeline, topicsMap: TopicsMap, index: number,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap
}): string => {
	const {pipeline, topicsMap, index} = options;

	return `## 2.${index + 1}. ${pipeline.name || 'Noname Pipeline'} #${pipeline.pipelineId}<span id="pipeline-${pipeline.pipelineId}"/>

<a href="data:application/json;base64,${window.btoa(JSON.stringify(pipeline))}" target="_blank" download="${pipeline.name || 'Noname Pipeline'}-${pipeline.pipelineId}.json">Download Meta File</a>

### 1.${index + 1}.1. Definition
`;
};

const generateMarkdown = (options: {
	topicsMap: TopicsMap, pipelinesMap: PipelinesMap, enumsMap: EnumsMap,
	topicRelations: TopicRelationMap, pipelineRelations: PipelineRelationMap
}): string => {
	const {topicsMap, pipelinesMap, enumsMap, topicRelations, pipelineRelations} = options;
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

`;
};

const PipelinesDownload = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: AssembledPipelinesGraphics;
}) => {
	const {pipelines, topics, graphics} = props;

	const {fire} = useEventBus();
	const [candidates] = useState(() => {
		const inGraphicsTopics = graphics.topics.map(t => t.topic);
		return topics.map(topic => {
			return {topic, picked: inGraphicsTopics.includes(topic)};
		});
	});

	const onDownloadClicked = async () => {
		const selectedTopics = candidates.filter(c => c.picked).map(({topic}) => topic);

		// use these topics to find upstream
		const topicsMap = buildTopicsMap(topics);
		// const pipelinesMap = buildPipelinesMap(pipelines);
		const pipelineRelations = buildPipelinesRelation(pipelines, topicsMap);
		const topicRelations = buildTopicsRelation(topics, pipelineRelations);

		const finalTopicMap: TopicsMap = selectedTopics.reduce((map, topic) => {
			map[topic.topicId] = topic;
			return map;
		}, {} as TopicsMap);
		const finalPipelineMap: PipelinesMap = {};
		findByTopics({topics: selectedTopics, finalTopicMap, finalPipelineMap, topicRelations, pipelineRelations});

		const {data: enums} = await listEnums({search: '', pageNumber: 1, pageSize: 9999});
		const enumsMap: EnumsMap = enums.reduce((map, enumeration) => {
			map[enumeration.enumId] = enumeration;
			return map;
		}, {} as EnumsMap);
		const markdown = generateMarkdown({
			topicsMap: finalTopicMap,
			pipelinesMap: finalPipelineMap,
			enumsMap,
			topicRelations,
			pipelineRelations
		});

		const zip = new JSZip();
		zip.file(`${graphics.name || 'Noname Pipelines Group'}.md`, markdown);
		const base64 = await zip.generateAsync({type: 'base64'});
		const link = document.createElement('a');
		link.href = 'data:application/zip;base64,' + base64;
		link.target = '_blank';
		//provide the name for the CSV file to be downloaded
		link.download = `export-${graphics.name || 'Noname Pipelines Group'}-${dayjs().format('YYYYMMDD')}.zip`;
		link.click();

		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DownloadDialogBody>
			<DialogLabel>Picked topics to download, related pipelines will be included as well.</DialogLabel>
			<TopicPickerTable candidates={candidates}/>
		</DownloadDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDownloadClicked}>Download</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};

export const HeaderExportButton = (props: { graphics: AssembledPipelinesGraphics }) => {
	const {graphics} = props;
	const {fire: fireGlobal} = useEventBus();
	const {once: onceCache} = useAdminCacheEventBus();

	const onExportClicked = () => {
		onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
			const {pipelines, topics} = data!;
			fireGlobal(EventTypes.SHOW_DIALOG,
				<PipelinesDownload pipelines={pipelines} topics={topics} graphics={graphics}/>);
		}).fire(AdminCacheEventTypes.ASK_DATA);
	};

	return <PageHeaderButton tooltip="Export" onClick={onExportClicked}>
		<FontAwesomeIcon icon={ICON_EXPORT}/>
	</PageHeaderButton>;
};