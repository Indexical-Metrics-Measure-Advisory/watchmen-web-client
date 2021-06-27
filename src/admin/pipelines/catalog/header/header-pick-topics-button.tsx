import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, useState} from 'react';
import {ICON_TOPIC} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {useCatalogEventBus} from '../catalog-event-bus';
import {AssembledPipelinesGraphics} from '../types';
import {EventTypes} from '../../../../events/types';
import {useEventBus} from '../../../../events/event-bus';
import styled from 'styled-components';
import {DialogBody, DialogFooter, DialogLabel} from '../../../../dialog/widgets';
import {ButtonInk} from '../../../../basic-widgets/types';
import {Button} from '../../../../basic-widgets/button';
import {Topic} from '../../../../services/tuples/topic-types';
import {CheckBox} from '../../../../basic-widgets/checkbox';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {createInitTopicRect} from '../graphics-utils';
import {Input} from '../../../../basic-widgets/input';

interface Filter {
	value: string;
	handler?: number;
}

const SwitchDialogBody = styled(DialogBody)`
	flex-direction: column;
	margin-bottom: var(--margin);
`;
const TopicTableHeader = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: 40px 60px 1fr;
`;
const HeaderCell = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	font-weight: var(--font-bold);
	font-variant: petite-caps;
	padding: 0 calc(var(--margin) / 4);
	> input {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-radius: 0;
		height: calc(var(--height) * 0.8);
		width: 100%;
		padding: 0;
		margin-bottom: -1px;
		margin-left: calc(var(--margin) / 2);
	}
`;
const TopicTableBody = styled.div.attrs({'data-v-scroll': ''})`
	display: block;
	position: relative;
	overflow-y: auto;
	max-height: calc(100% - var(--margin) - var(--line-height));
`;
const BodyRow = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: 40px 60px 1fr;
	&:nth-child(2n) {
		background-color: var(--grid-rib-bg-color);
	}
	&:hover {
		background-color: var(--hover-color);
	}
`;
const BodyCell = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	padding: 0 calc(var(--margin) / 4);
`;

const TopicPicker = (props: {
	topics: Array<Topic>;
	graphics: AssembledPipelinesGraphics;
	onConfirm: (topics: Array<Topic>) => void
}) => {
	const {topics, graphics, onConfirm} = props;

	const {fire} = useEventBus();
	const [items, setItems] = useState(topics);
	const [selection, setSelection] = useState(graphics.topics.map(({topic}) => topic));
	const [filter, setFilter] = useState<Filter>({value: ''});

	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (filter.handler) {
			clearTimeout(filter.handler);
		}
		setFilter({
			value, handler: window.setTimeout(() => {
				delete filter.handler;
				const text = value.trim().toLowerCase();
				if (text === '') {
					setItems(topics);
				} else {
					setItems(topics.filter(topic => (topic.name || '').toLowerCase().includes(text)));
				}
			}, 300)
		});
	};

	const onSelectionChange = (topic: Topic) => (value: boolean) => {
		if (value) {
			setSelection([topic, ...selection]);
		} else {
			setSelection(selection.filter(t => t !== topic));
		}
	};
	const onConfirmClicked = () => {
		onConfirm(selection);
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<SwitchDialogBody>
			<DialogLabel>Please select topics</DialogLabel>
			<TopicTableHeader>
				<HeaderCell>#</HeaderCell>
				<HeaderCell>View</HeaderCell>
				<HeaderCell>
					<span>Topic</span>
					<Input placeholder="Filter by name..."
					       value={filter.value} onChange={onFilterTextChanged}/>
				</HeaderCell>
			</TopicTableHeader>
			<TopicTableBody>
				{items.map((topic, index) => {
					return <BodyRow key={topic.topicId}>
						<BodyCell>{index + 1}</BodyCell>
						<BodyCell>
							<CheckBox value={selection.includes(topic)} onChange={onSelectionChange(topic)}/>
						</BodyCell>
						<BodyCell>{topic.name || 'Noname Topic'}</BodyCell>
					</BodyRow>;
				})}
			</TopicTableBody>
		</SwitchDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>Confirm</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>Cancel</Button>
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
		}, {} as { [key in string]: Topic });
		const exists = graphics.topics.reduce((map, {topic}) => {
			map[topic.topicId] = topic;
			return map;
		}, {} as { [key in string]: Topic });
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
				height: '50vh'
			});
	};

	return <PageHeaderButton tooltip="Pick Topics"
	                         onClick={onPickClicked}>
		<FontAwesomeIcon icon={ICON_TOPIC}/>
	</PageHeaderButton>;
};