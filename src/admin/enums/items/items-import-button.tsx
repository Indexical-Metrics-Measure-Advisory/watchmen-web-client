import {Enum} from '@/services/data/tuples/enum-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_UPLOAD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
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