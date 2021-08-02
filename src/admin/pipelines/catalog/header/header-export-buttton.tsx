import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import styled from 'styled-components';
import {DialogBody, DialogFooter, DialogLabel} from '../../../../dialog/widgets';
import {AssembledPipelinesGraphics} from '../types';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {Button} from '../../../../basic-widgets/button';
import {ButtonInk} from '../../../../basic-widgets/types';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {ICON_EXPORT} from '../../../../basic-widgets/constants';
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {AdminCacheData} from '../../../../local-persist/types';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {TopicPickerTable} from './topic-picker-table';
import {
	buildPipelinesRelation,
	buildTopicsMap,
	buildTopicsRelation,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '../../../../services/pipeline/pipeline-relations';
import dayjs from 'dayjs';
import JSZip from 'jszip';

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

const generateTopicMarkdown = (topic: Topic, pipelinesMap: PipelinesMap, index: number): string => {
	return `## 1.${index + 1}. ${topic.name || 'Noname Topic'} #${topic.topicId}

<a href="data:application/json;base64,${window.btoa(JSON.stringify(topic))}" target="_blank" download="${topic.name || 'Noname Topic'}-${topic.topicId}.json">Download Meta File</a>
`;
};
const generatePipelineMarkdown = (pipeline: Pipeline, topicsMap: TopicsMap, index: number): string => {
	return `## 2.${index + 1}. ${pipeline.name || 'Noname Pipeline'} #${pipeline.pipelineId}

<a href="data:application/json;base64,${window.btoa(JSON.stringify(pipeline))}" target="_blank" download="${pipeline.name || 'Noname Pipeline'}-${pipeline.pipelineId}.json">Download Meta File</a>
`;
};

const generateMarkdown = (topicsMap: TopicsMap, pipelinesMap: PipelinesMap): string => {
	return `Exported Topics & Pipelines on ${dayjs().format('YYYY/MM/DD')}
------------------------------------------

# 1. Topics
${Object.values(topicsMap).sort((t1, t2) => {
		return (t1.name || '').toLowerCase().localeCompare(t2.name || '');
	}).map((topic, index) => generateTopicMarkdown(topic, pipelinesMap, index)).join('\n')}

# 2. Pipelines
${Object.values(pipelinesMap).sort((p1, p2) => {
		return (p1.name || '').toLowerCase().localeCompare(p2.name || '');
	}).map((pipeline, index) => generatePipelineMarkdown(pipeline, topicsMap, index)).join('\n')}

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

		const markdown = generateMarkdown(finalTopicMap, finalPipelineMap);

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