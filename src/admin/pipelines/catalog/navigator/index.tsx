import {isDataQualityCenterEnabled, isWriteExternalEnabled} from '@/feature-switch';
import {toPipeline} from '@/routes/utils';
import {savePipeline} from '@/services/data/tuples/pipeline';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {
	findExternalWriterIds,
	findPipelinesTriggerByTopic,
	findPipelinesWriteToTopic
} from '@/services/data/tuples/pipeline-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {isNotRawTopic} from '@/services/data/tuples/topic-utils';
import {ICON_ADD, ICON_CLOSE, ICON_TOPIC_PROFILE} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, {MouseEvent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
// noinspection ES6PreferShortImport
import {useTopicProfileEventBus} from '../../../topic-profile/topic-profile-event-bus';
// noinspection ES6PreferShortImport
import {TopicProfileEventTypes} from '../../../topic-profile/topic-profile-event-bus-types';
import {createPipeline} from '../../data-utils';
import {usePipelinesEventBus} from '../../pipelines-event-bus';
import {PipelinesEventTypes} from '../../pipelines-event-bus-types';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {ExternalWriterBody} from './external-writer-body';
import {PipelinesBody} from './pipelines-body';
import {TopicBody} from './topic-body';
import {CountBadge, NavigatorContainer, NavigatorHeader, NavigatorHeaderButton, NavigatorHeaderTitle} from './widgets';

enum OpenPanel {
	TOPIC, INCOMING, OUTGOING, EXTERNAL_WRITER
}

export const Navigator = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const {pipelines, topics} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireProfile} = useTopicProfileEventBus();
	const {fire: firePipelines} = usePipelinesEventBus();
	const {on, off} = useCatalogEventBus();
	const [visible, setVisible] = useState(false);
	const [topic, setTopic] = useState<Topic | null>(null);
	const [openPanel, setOpenPanel] = useState<OpenPanel>(OpenPanel.TOPIC);
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setTopic(topic);
			setVisible(true);
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		};
	}, [on, off]);

	const onHeaderClicked = (nextOpenPanel: OpenPanel) => () => {
		if (openPanel === nextOpenPanel) {
			return;
		}
		setOpenPanel(nextOpenPanel);
	};
	const onProfileClicked = async () => {
		if (topic == null) {
			return;
		}
		fireProfile(TopicProfileEventTypes.SHOW_PROFILE, topic, dayjs());
	};
	const onCloseClicked = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setVisible(false);
	};
	const onCreateClicked = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (!topic) {
			return;
		}

		const pipeline = createPipeline(topic.topicId);
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await savePipeline(pipeline),
			() => {
				// will not trigger add into cache
				// see SettingsHolder of pipelines for more detail
				firePipelines(PipelinesEventTypes.PIPELINE_ADDED, pipeline);
				history.push(toPipeline(pipeline.pipelineId));
			});
	};

	let name = '';
	if (topic == null) {
	} else {
		name = topic.name;
	}

	return <NavigatorContainer visible={visible}>
		<NavigatorHeader>
			<NavigatorHeaderTitle>{name}</NavigatorHeaderTitle>
			{isDataQualityCenterEnabled() && topic != null && isNotRawTopic(topic)
				? <NavigatorHeaderButton tooltip={{label: 'Profile', alignment: TooltipAlignment.CENTER}}
				                         onClick={onProfileClicked}>
					<FontAwesomeIcon icon={ICON_TOPIC_PROFILE}/>
				</NavigatorHeaderButton>
				: null
			}
			<NavigatorHeaderButton tooltip={{label: 'Close', alignment: TooltipAlignment.RIGHT, offsetX: 4}}
			                       onClick={onCloseClicked}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
			</NavigatorHeaderButton>
		</NavigatorHeader>
		<NavigatorHeader onClick={onHeaderClicked(OpenPanel.INCOMING)}>
			<NavigatorHeaderTitle>
				<span>Incoming Pipelines</span>
				{topic != null ? <CountBadge>{findPipelinesWriteToTopic(pipelines, topic).length}</CountBadge> : null}
			</NavigatorHeaderTitle>
		</NavigatorHeader>
		<PipelinesBody pipelines={pipelines} topics={topics} topic={topic}
		               incoming={true}
		               visible={openPanel === OpenPanel.INCOMING}/>
		<NavigatorHeader onClick={onHeaderClicked(OpenPanel.OUTGOING)}>
			<NavigatorHeaderTitle>
				<span>Outgoing Pipelines</span>
				{topic != null ? <CountBadge>{findPipelinesTriggerByTopic(pipelines, topic).length}</CountBadge> : null}
			</NavigatorHeaderTitle>
			<NavigatorHeaderButton
				tooltip={{label: 'Create Outgoing Pipeline', alignment: TooltipAlignment.RIGHT, offsetX: 4}}
				onClick={onCreateClicked}>
				<FontAwesomeIcon icon={ICON_ADD}/>
			</NavigatorHeaderButton>
		</NavigatorHeader>
		<PipelinesBody pipelines={pipelines} topics={topics} topic={topic}
		               incoming={false}
		               visible={openPanel === OpenPanel.OUTGOING}/>
		{isWriteExternalEnabled() && topic != null
			? <>
				<NavigatorHeader onClick={onHeaderClicked(OpenPanel.EXTERNAL_WRITER)}>
					<NavigatorHeaderTitle>
						<span>External Writers</span>
						<CountBadge>{findExternalWriterIds(pipelines, topic).length}</CountBadge>
					</NavigatorHeaderTitle>
				</NavigatorHeader>
				<ExternalWriterBody pipelines={pipelines} topic={topic}
				                    visible={openPanel === OpenPanel.EXTERNAL_WRITER}/>
			</>
			: null}
		{topic != null
			? <>
				<NavigatorHeader onClick={onHeaderClicked(OpenPanel.TOPIC)}>
					<NavigatorHeaderTitle>
						<span>Factors</span>
						<CountBadge>{topic.factors.length}</CountBadge>
					</NavigatorHeaderTitle>
				</NavigatorHeader>
				<TopicBody topic={topic} visible={openPanel === OpenPanel.TOPIC}/>
			</>
			: null}
	</NavigatorContainer>;
};