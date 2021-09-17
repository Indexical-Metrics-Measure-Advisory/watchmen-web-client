import {
	buildPipelinesRelation,
	buildTopicsMap,
	buildTopicsRelation,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '@/services/data/pipeline/pipeline-relations';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AdminCacheData} from '@/services/local-persist/types';
import {Button} from '@/widgets/basic/button';
import {ICON_EXPORT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import JSZip from 'jszip';
import React, {useState} from 'react';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {generateMarkdown} from '../markdown';
import {AssembledPipelinesGraphics} from '../types';
import {TopicPickerTable} from './topic-picker-table';
import {PickerDialogBody} from './widgets';

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

const PipelinesDownload = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: AssembledPipelinesGraphics;
	askSvg: (topics: Array<Topic>) => Promise<string>
}) => {
	const {pipelines, topics, graphics, askSvg} = props;

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

		const selectedSvg = await askSvg(selectedTopics);
		const allTopics = Object.values(finalTopicMap);
		const allSvg = allTopics.length === selectedTopics.length ? '' : await askSvg(Object.values(finalTopicMap));

		const markdown = await generateMarkdown({
			topicsMap: finalTopicMap,
			pipelinesMap: finalPipelineMap,
			topicRelations, pipelineRelations,
			selectedSvg, allSvg
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
		<PickerDialogBody>
			<DialogLabel>Picked topics to download, related pipelines will be included as well.</DialogLabel>
			<TopicPickerTable candidates={candidates}/>
		</PickerDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDownloadClicked}>Download</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};

export const HeaderExportButton = (props: { graphics: AssembledPipelinesGraphics }) => {
	const {graphics} = props;
	const {fire: fireGlobal} = useEventBus();
	const {once} = useCatalogEventBus();
	const {once: onceCache} = useAdminCacheEventBus();

	const askSvg = async (topics: Array<Topic>) => {
		return new Promise<string>(resolve => {
			once(CatalogEventTypes.REPLY_GRAPHICS_SVG, (html: string) => {
				resolve(html);
			}).fire(CatalogEventTypes.ASK_GRAPHICS_SVG, topics);
		});
	};
	const onExportClicked = () => {
		onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
			const {pipelines, topics} = data!;
			fireGlobal(EventTypes.SHOW_DIALOG,
				<PipelinesDownload pipelines={pipelines} topics={topics} graphics={graphics}
				                   askSvg={askSvg}/>);
		}).fire(AdminCacheEventTypes.ASK_DATA);
	};

	return <PageHeaderButton tooltip="Export" onClick={onExportClicked}>
		<FontAwesomeIcon icon={ICON_EXPORT}/>
	</PageHeaderButton>;
};