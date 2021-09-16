import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {DwarfButton} from '@/basic-widgets/button';
import {ICON_UPLOAD} from '@/basic-widgets/constants';
import {ButtonInk} from '@/basic-widgets/types';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {Topic} from '@/services/tuples/topic-types';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {parseFromCsv, parseFromJson} from './topic-import-from-file';

export const FactorsImportButton = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useTopicEventBus();

	const onFileSelected = (input: HTMLInputElement) => async () => {
		if (!input.files || input.files.length === 0) {
			return;
		}
		const file = input.files.item(0);
		if (!file) {
			return;
		}
		const name = file.name;
		switch (true) {
			case name.endsWith('.txt'):
			case name.endsWith('.csv'): {
				const content = await file.text();
				topic.factors = await parseFromCsv(content);
				fire(TopicEventTypes.FACTORS_IMPORTED, topic.factors);
				break;
			}
			case name.endsWith('.json'): {
				const content = await file.text();
				topic.factors = await parseFromJson(content);
				fire(TopicEventTypes.FACTORS_IMPORTED, topic.factors);
				break;
			}
			default:
				fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
		}
	};
	const onImportClicked = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = false;
		input.accept = '.txt,.csv,.json';
		input.onchange = onFileSelected(input);
		input.click();
	};

	return <DwarfButton ink={ButtonInk.INFO} onClick={onImportClicked}>
		<FontAwesomeIcon icon={ICON_UPLOAD}/>
		<span>Import from File</span>
	</DwarfButton>;
};