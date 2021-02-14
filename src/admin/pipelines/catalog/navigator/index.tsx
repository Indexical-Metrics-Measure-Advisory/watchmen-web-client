import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useEffect, useState } from 'react';
import { ICON_CLOSE } from '../../../../basic-widgets/constants';
import { TooltipAlignment } from '../../../../basic-widgets/types';
import { Lang } from '../../../../langs';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import { PipelinesBody } from './pipelines-body';
import { TopicBody } from './topic-body';
import { NavigatorContainer, NavigatorHeader, NavigatorHeaderButton, NavigatorHeaderTitle } from './widgets';

enum OpenPanel {
	TOPIC, INCOMING, OUTGOING
}

export const Navigator = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}) => {
	const { pipelines, topics } = props;

	const { on, off } = useCatalogEventBus();
	const [ visible, setVisible ] = useState(false);
	const [ topic, setTopic ] = useState<Topic | null>(null);
	const [ openPanel, setOpenPanel ] = useState<OpenPanel>(OpenPanel.TOPIC);
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setTopic(topic);
			setVisible(true);
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		};
	}, [ on, off ]);

	const onHeaderClicked = (nextOpenPanel: OpenPanel) => () => {
		if (openPanel === nextOpenPanel) {
			return;
		}
		setOpenPanel(nextOpenPanel);
	};
	const onCloseClicked = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setVisible(false);
	};

	let name = '';
	if (topic == null) {
	} else {
		name = topic.name;
	}

	return <NavigatorContainer visible={visible}>
		<NavigatorHeader onClick={onHeaderClicked(OpenPanel.TOPIC)}>
			<NavigatorHeaderTitle>{name}</NavigatorHeaderTitle>
			<NavigatorHeaderButton tooltip={{ label: Lang.ACTIONS.CLOSE, alignment: TooltipAlignment.RIGHT }}
			                       onClick={onCloseClicked}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
			</NavigatorHeaderButton>
		</NavigatorHeader>
		{topic != null
			? <TopicBody topic={topic} visible={openPanel === OpenPanel.TOPIC}/>
			: null}
		<NavigatorHeader onClick={onHeaderClicked(OpenPanel.INCOMING)}>
			<NavigatorHeaderTitle>Incoming Pipelines</NavigatorHeaderTitle>
		</NavigatorHeader>
		<PipelinesBody pipelines={pipelines} topics={topics} topic={topic}
		               incoming={true}
		               visible={openPanel === OpenPanel.INCOMING}/>
		<NavigatorHeader onClick={onHeaderClicked(OpenPanel.OUTGOING)}>
			<NavigatorHeaderTitle>Outgoing Pipelines</NavigatorHeaderTitle>
		</NavigatorHeader>
		<PipelinesBody pipelines={pipelines} topics={topics} topic={topic}
		               incoming={false}
		               visible={openPanel === OpenPanel.OUTGOING}/>
	</NavigatorContainer>;
};