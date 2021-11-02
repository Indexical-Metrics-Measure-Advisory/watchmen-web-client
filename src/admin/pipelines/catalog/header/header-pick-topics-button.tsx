import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {Button} from '@/widgets/basic/button';
import {ICON_TOPIC} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {createInitTopicRect} from '../graphics-utils';
import {AssembledPipelinesGraphics} from '../types';
import {TopicPickerTable} from './topic-picker-table';
import {PICKER_DIALOG_HEIGHT, PickerDialogBody} from './widgets';

const TopicPicker = (props: {
	topics: Array<Topic>;
	graphics: AssembledPipelinesGraphics;
	onConfirm: (topics: Array<Topic>) => void
}) => {
	const {topics, graphics, onConfirm} = props;

	const {fire} = useEventBus();
	const [candidates] = useState(() => {
		const inGraphicsTopics = graphics.topics.map(t => t.topic);
		return topics.map(topic => {
			return {topic, picked: inGraphicsTopics.includes(topic)};
		});
	});

	const onConfirmClicked = () => {
		onConfirm(candidates.filter(c => c.picked).map(({topic}) => topic));
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<PickerDialogBody>
			<DialogLabel>Please select topics</DialogLabel>
			<TopicPickerTable candidates={candidates}/>
		</PickerDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>Confirm</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};

export const HeaderPickTopicsButton = (props: {
	topics: Array<Topic>;
	graphics: AssembledPipelinesGraphics;
}) => {
	const {topics, graphics} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useCatalogEventBus();

	const onConfirm = (topics: Array<Topic>) => {
		const selection = topics.reduce((map, topic) => {
			map[topic.topicId] = topic;
			return map;
		}, {} as Record<TopicId, Topic>);
		const exists = graphics.topics.reduce((map, {topic}) => {
			map[topic.topicId] = topic;
			return map;
		}, {} as Record<TopicId, Topic>);
		graphics.topics = [
			// remove unpicked
			...graphics.topics.filter(({topic}) => selection[topic.topicId]),
			// picked, but not exists
			...topics.filter(topic => !exists[topic.topicId]).map(topic => {
				return {topic, rect: createInitTopicRect()};
			})
		];
		fire(CatalogEventTypes.TOPICS_SELECTED, graphics);
	};
	const onPickClicked = () => {
		// eslint-disable-next-line
		const candidates = topics.sort((g1, g2) => {
			return (g1.name || '').toLowerCase().localeCompare((g2.name || '').toLowerCase());
		});
		fireGlobal(EventTypes.SHOW_DIALOG,
			<TopicPicker topics={candidates} graphics={graphics} onConfirm={onConfirm}/>,
			{
				marginTop: '10vh',
				marginLeft: '20%',
				width: '60%',
				height: PICKER_DIALOG_HEIGHT
			});
	};

	return <PageHeaderButton tooltip="Pick Topics" onClick={onPickClicked}>
		<FontAwesomeIcon icon={ICON_TOPIC}/>
	</PageHeaderButton>;
};