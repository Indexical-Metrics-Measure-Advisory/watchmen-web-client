import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_UPLOAD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {uploadFile, UploadFileAcceptsTxtCsvJson} from '@/widgets/basic/utils';
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

	const onFileSelected = async (file: File) => {
		const name = file.name;
		try {
			switch (true) {
				case name.endsWith('.txt'):
				case name.endsWith('.csv'): {
					const content = await file.text();
					topic.factors = await parseFromCsv(topic, content);
					fire(TopicEventTypes.FACTORS_IMPORTED, topic.factors);
					break;
				}
				case name.endsWith('.json'): {
					const content = await file.text();
					topic.factors = await parseFromJson(topic, content);
					fire(TopicEventTypes.FACTORS_IMPORTED, topic.factors);
					break;
				}
				default:
					fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
			}
		} catch {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				Failed to import factors, check file format please.
			</AlertLabel>);
		}
	};
	const onImportClicked = () => {
		uploadFile(UploadFileAcceptsTxtCsvJson, onFileSelected);
	};

	return <DwarfButton ink={ButtonInk.INFO} onClick={onImportClicked}>
		<FontAwesomeIcon icon={ICON_UPLOAD}/>
		<span>Import from File</span>
	</DwarfButton>;
};