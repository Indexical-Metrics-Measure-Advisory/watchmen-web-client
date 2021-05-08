import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, useState} from 'react';
import {ICON_SEARCH} from '../../../basic-widgets/constants';
import {Input} from '../../../basic-widgets/input';
import {Topic} from '../../../services/tuples/topic-types';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorsTableHeaderContainer} from './widgets';

export const FactorsTableHeader = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire} = useTopicEventBus();
	const [handle, setHandle] = useState<number | null>(null);
	const [text, setText] = useState('');

	const onSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === text) {
			return;
		}
		setText(value);
		if (handle) {
			clearTimeout(handle);
		}
		setHandle(window.setTimeout(() => {
			fire(TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED, topic, value.trim());
		}, 300));
	};
	const onSearchKeyPressed = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		if (handle) {
			clearTimeout(handle);
			setHandle(null);
		}
		fire(TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED, topic, text.trim());
	};

	return <FactorsTableHeaderContainer>
		<FontAwesomeIcon icon={ICON_SEARCH}/>
		<Input value={text}
		       placeholder='Filter by text, or use "n:name" to filter by name only; "t:type" for type; "l:label" for label; "v:boolean" for default value; "i:index", "u:index" for index group.'
		       onKeyPress={onSearchKeyPressed}
		       onChange={onSearchTextChange}/>
	</FactorsTableHeaderContainer>;
};