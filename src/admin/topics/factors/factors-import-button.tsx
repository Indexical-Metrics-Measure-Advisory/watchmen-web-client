import {Topic} from '@/services/data/tuples/topic-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_UPLOAD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
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