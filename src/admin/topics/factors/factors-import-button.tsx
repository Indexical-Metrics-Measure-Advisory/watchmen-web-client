import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_UPLOAD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {uploadFile, UploadFileAcceptsJson, UploadFileAcceptsTxtCsvJson} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {parseFromInstanceJson, parseFromStructureCsv, parseFromStructureJson} from './topic-import-from-file';

export const FactorsImportButton = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useTopicEventBus();

	const onInstanceFileSelected = async (file: File) => {
		const name = file.name;
		try {
			switch (true) {
				case name.endsWith('.json'): {
					const content = await file.text();
					// TODO
					topic.factors = await parseFromInstanceJson(topic, content);
					fire(TopicEventTypes.FACTORS_IMPORTED, topic.factors);
					break;
				}
				default:
					fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
			}
		} catch (e: any) {
			console.groupCollapsed('Failed to import factors from instance json file.');
			console.error(e);
			console.groupEnd();
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{e.message ?? 'Failed to import factors, check file format please.'}
			</AlertLabel>);
		}
	};
	const onImportByInstanceClicked = () => {
		uploadFile(UploadFileAcceptsJson, onInstanceFileSelected);
	};
	const onStructureFileSelected = async (file: File) => {
		const name = file.name;
		try {
			switch (true) {
				case name.endsWith('.txt'):
				case name.endsWith('.csv'): {
					const content = await file.text();
					topic.factors = await parseFromStructureCsv(topic, content);
					fire(TopicEventTypes.FACTORS_IMPORTED, topic.factors);
					break;
				}
				case name.endsWith('.json'): {
					const content = await file.text();
					topic.factors = await parseFromStructureJson(topic, content);
					fire(TopicEventTypes.FACTORS_IMPORTED, topic.factors);
					break;
				}
				default:
					fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
			}
		} catch (e: any) {
			console.groupCollapsed('Failed to import factors from structure file.');
			console.error(e);
			console.groupEnd();
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{e.message ?? 'Failed to import factors, check file format please.'}
			</AlertLabel>);
		}
	};
	const onImportByStructureClicked = () => {
		uploadFile(UploadFileAcceptsTxtCsvJson, onStructureFileSelected);
	};

	return <>
		<DwarfButton ink={ButtonInk.INFO} onClick={onImportByInstanceClicked}>
			<FontAwesomeIcon icon={ICON_UPLOAD}/>
			<span>Import by Instance</span>
		</DwarfButton>
		<DwarfButton ink={ButtonInk.INFO} onClick={onImportByStructureClicked}>
			<FontAwesomeIcon icon={ICON_UPLOAD}/>
			<span>Import by Structure</span>
		</DwarfButton>
	</>;
};