import {isDataQualityCenterEnabled} from '@/feature-switch';
import {MonitorRuleGrade} from '@/services/data/data-quality/rule-types';
import {fetchMonitorRules} from '@/services/data/data-quality/rules';
import {
	buildPipelinesRelation,
	buildTopicsMap,
	buildTopicsRelation,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from '@/services/data/pipeline/pipeline-relations';
import {listConnectedSpacesForExport} from '@/services/data/tuples/connected-space';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {DataSource} from '@/services/data/tuples/data-source-types';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {listSpacesForExport} from '@/services/data/tuples/space';
import {Space} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {isNotNull} from '@/services/data/utils';
import {AdminCacheData} from '@/services/local-persist/types';
import {Button} from '@/widgets/basic/button';
import {CheckBox} from '@/widgets/basic/checkbox';
import {ICON_EXPORT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {downloadAsZip} from '@/widgets/basic/utils';
import {DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, {useState} from 'react';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {generateMarkdown} from '../markdown';
import {DataSourcesMap, ExternalWritersMap, MonitorRulesMap} from '../markdown/types';
import {AssembledPipelinesGraphics} from '../types';
import {TopicPickerTable} from './topic-picker-table';
import {SpaceCandidate, TopicCandidate} from './types';
import {isSpaceCandidate, isTopicCandidate} from './utils';
import {ExportOptionBar, ExportOptionLabel, PICKER_DIALOG_HEIGHT, PickerDialogBody} from './widgets';

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
	pipelineRelations: PipelineRelationMap;
	selectionOnly: boolean;
}) => {
	const {topics, finalTopicMap, finalPipelineMap, topicRelations, pipelineRelations, selectionOnly} = options;

	topics.forEach(topic => {
		if (!finalTopicMap[topic.topicId]) {
			finalTopicMap[topic.topicId] = topic;
		}
	});
	const writeMe = findPipelinesWriteMe(topics, topicRelations);
	if (writeMe.length !== 0) {
		if (selectionOnly) {
			// pipelines write topic which not in given topics collection will be excluded
			writeMe.map(pipeline => {
				// find topics related with given pipeline, and not included by given topics
				const relatedTopics = findTopicsOnMe([pipeline], pipelineRelations).filter(topic => {
					return !finalTopicMap[topic.topicId];
				});
				return relatedTopics.length !== 0 ? null : pipeline;
			}).filter(isNotNull).forEach(pipeline => {
				finalPipelineMap[pipeline.pipelineId] = pipeline;
			});
		} else {
			// find topics which also written by the pipelines which wrote me
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
				findByTopics({
					topics: relatedTopics,
					finalTopicMap, finalPipelineMap,
					topicRelations, pipelineRelations,
					selectionOnly
				});
			}
		}
	}
};

const PipelinesDownload = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: AssembledPipelinesGraphics;
	dataSources: Array<DataSource>;
	externalWriters: Array<ExternalWriter>;
	spaces: Array<Space>;
	connectedSpaces: Array<ConnectedSpace>;
	askSvg: (topics: Array<Topic>) => Promise<string>
}) => {
	const {pipelines, topics, graphics, dataSources, externalWriters, spaces, connectedSpaces, askSvg} = props;

	const {fire} = useEventBus();
	const [selectionOnly, setSelectionOnly] = useState(true);
	const [candidates] = useState(() => {
		const inGraphicsTopics = graphics.topics.map(t => t.topic);
		const selectedTopics = topics.map(topic => ({topic, picked: inGraphicsTopics.includes(topic)}));
		const selectedSpaces = spaces.map(space => {
			return {
				space,
				picked: (space.topicIds || []).every(topicId => {
					// eslint-disable-next-line
					return selectedTopics.some(({topic, picked}) => picked && topic.topicId == topicId);
				})
			};
		});
		return [...selectedTopics, ...selectedSpaces];
	});

	const onSelectionOnlyChanged = (value: boolean) => {
		setSelectionOnly(value);
	};
	const onDownloadClicked = async () => {
		const selectedTopics = candidates.filter<TopicCandidate>(isTopicCandidate).filter(c => c.picked).map(({topic}) => topic);
		const selectedSpaces = candidates.filter<SpaceCandidate>(isSpaceCandidate).filter(c => c.picked).map(({space}) => space);
		// eslint-disable-next-line
		const selectedConnectedSpaces = connectedSpaces.filter(connectedSpace => selectedSpaces.some(space => space.spaceId == connectedSpace.spaceId));

		// use these topics to find upstream
		const topicsMap = buildTopicsMap(topics);
		const pipelineRelations = buildPipelinesRelation(pipelines, topicsMap);
		const topicRelations = buildTopicsRelation(topics, pipelineRelations);

		const finalTopicMap: TopicsMap = selectedTopics.reduce((map, topic) => {
			map[topic.topicId] = topic;
			return map;
		}, {} as TopicsMap);
		const finalPipelineMap: PipelinesMap = {};
		findByTopics({
			topics: selectedTopics,
			finalTopicMap, finalPipelineMap,
			topicRelations, pipelineRelations,
			selectionOnly
		});

		const selectedSvg = await askSvg(selectedTopics);
		const allTopics = Object.values(finalTopicMap);
		const allSvg = allTopics.length === selectedTopics.length ? '' : await askSvg(Object.values(finalTopicMap));

		const monitorRules = isDataQualityCenterEnabled() ? await Promise.all(selectedTopics.map(async topic => {
			return {
				topicId: topic.topicId,
				rules: await fetchMonitorRules({criteria: {grade: MonitorRuleGrade.TOPIC, topicId: topic.topicId}})
			};
		})) : [];

		const markdown = await generateMarkdown({
			topicsMap: finalTopicMap,
			pipelinesMap: finalPipelineMap,
			dataSourcesMap: dataSources.reduce((map, dataSource) => {
				map[dataSource.dataSourceId] = dataSource;
				return map;
			}, {} as DataSourcesMap),
			externalWritersMap: externalWriters.reduce((map, writer) => {
				map[writer.writerId] = writer;
				return map;
			}, {} as ExternalWritersMap),
			monitorRulesMap: monitorRules.map(({topicId, rules}) => {
				return {
					topicId, rules: rules.filter(rule => {
						if (rule.params?.topicId == null) {
							// this rule is not about another topic
							return true;
						} else {
							// or another topic of this rule is also selected
							// eslint-disable-next-line
							return selectedTopics.some(topic => topic.topicId == rule.params?.topicId);
						}
					})
				};
			}).reduce((map, {topicId, rules}) => {
				map[topicId] = rules;
				return map;
			}, {} as MonitorRulesMap),
			topicRelations, pipelineRelations,
			spaces: selectedSpaces, connectedSpaces: selectedConnectedSpaces,
			selectedSvg, allSvg
		});

		await downloadAsZip({
			[`${graphics.name || 'Noname Pipelines Group'}.md`]: markdown
		}, `export-${graphics.name || 'Noname Pipelines Group'}-${dayjs().format('YYYYMMDD')}.zip`);

		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<PickerDialogBody>
			<DialogLabel>Pick topics/spaces to export, related pipelines will be included as well.</DialogLabel>
			<TopicPickerTable candidates={candidates}/>
		</PickerDialogBody>
		<DialogFooter>
			<ExportOptionBar>
				<ExportOptionLabel>Export Selection Only</ExportOptionLabel>
				<CheckBox value={selectionOnly} onChange={onSelectionOnlyChanged}/>
			</ExportOptionBar>
			<Button ink={ButtonInk.PRIMARY} onClick={onDownloadClicked}>Export</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};

export const HeaderExportButton = (props: { graphics: AssembledPipelinesGraphics }) => {
	const {graphics} = props;
	const {fire: fireGlobal} = useEventBus();
	const {once} = useCatalogEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();

	const askSvg = async (topics: Array<Topic>) => {
		return new Promise<string>(resolve => {
			once(CatalogEventTypes.REPLY_GRAPHICS_SVG, (html: string) => {
				resolve(html);
			}).fire(CatalogEventTypes.ASK_GRAPHICS_SVG, topics);
		});
	};
	const onExportClicked = () => {
		fireCache(AdminCacheEventTypes.ASK_DATA, (data?: AdminCacheData) => {
			const {pipelines, topics, dataSources, externalWriters} = data!;

			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
				const [spaces, connectedSpaces] = await Promise.all([listSpacesForExport(), listConnectedSpacesForExport()]);
				// drop spaces has no topic
				const availableSpaces = spaces.filter(space => space.topicIds != null && space.topicIds.length !== 0);
				// drop connected spaces is not template, has no subject, and not belongs to available spaces
				const availableConnectedSpaces = connectedSpaces.filter(connectedSpace => connectedSpace.isTemplate)
					.filter(connectedSpace => connectedSpace.subjects != null && connectedSpace.subjects.length !== 0)
					// eslint-disable-next-line
					.filter(connectedSpace => availableSpaces.some(space => space.spaceId == connectedSpace.spaceId));

				return {spaces: availableSpaces, connectedSpaces: availableConnectedSpaces};
			}, ({spaces, connectedSpaces}: { spaces: Array<Space>, connectedSpaces: Array<ConnectedSpace> }) => {
				fireGlobal(EventTypes.SHOW_DIALOG,
					<PipelinesDownload pipelines={pipelines} topics={topics} graphics={graphics}
					                   dataSources={dataSources} externalWriters={externalWriters}
					                   spaces={spaces} connectedSpaces={connectedSpaces}
					                   askSvg={askSvg}/>, {
						marginTop: '10vh',
						marginLeft: '20%',
						width: '60%',
						height: PICKER_DIALOG_HEIGHT
					});
			}, () => {
				fireGlobal(EventTypes.SHOW_DIALOG,
					<PipelinesDownload pipelines={pipelines} topics={topics} graphics={graphics}
					                   dataSources={dataSources} externalWriters={externalWriters}
					                   spaces={[]} connectedSpaces={[]}
					                   askSvg={askSvg}/>, {
						marginTop: '10vh',
						marginLeft: '20%',
						width: '60%',
						height: PICKER_DIALOG_HEIGHT
					});
			});

		});
	};

	return <PageHeaderButton tooltip="Export" onClick={onExportClicked}>
		<FontAwesomeIcon icon={ICON_EXPORT}/>
	</PageHeaderButton>;
};