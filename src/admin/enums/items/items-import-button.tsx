import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {DwarfButton} from '@/basic-widgets/button';
import {ICON_UPLOAD} from '@/basic-widgets/constants';
import {ButtonInk} from '@/basic-widgets/types';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {Enum} from '@/services/tuples/enum-types';
import {useEnumEventBus} from '../enum-event-bus';
import {EnumEventTypes} from '../enum-event-bus-types';
import {parseFromCsv, parseFromJson} from './enum-import-from-file';

export const ItemsImportButton = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useEnumEventBus();

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
				enumeration.items = await parseFromCsv(content);
				fire(EnumEventTypes.ITEMS_IMPORTED, enumeration);
				break;
			}
			case name.endsWith('.json'): {
				const content = await file.text();
				enumeration.items = await parseFromJson(content);
				fire(EnumEventTypes.ITEMS_IMPORTED, enumeration);
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