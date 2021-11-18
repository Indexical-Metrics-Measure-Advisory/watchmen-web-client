import {Enum} from '@/services/data/tuples/enum-types';
import {ICON_SEARCH} from '@/widgets/basic/constants';
import {Input} from '@/widgets/basic/input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useEnumEventBus} from '../enum-event-bus';
import {EnumEventTypes} from '../enum-event-bus-types';
import {ItemsTableHeaderCell, ItemsTableHeaderContainer} from './widgets';

export const ItemsTableHeader = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const {fire} = useEnumEventBus();
	const [handle, setHandle] = useState<number | null>(null);
	const [text, setText] = useState('');

	const onSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === text) {
			return;
		}
		setText(value);
		if (handle) {
			window.clearTimeout(handle);
		}
		setHandle(window.setTimeout(() => {
			fire(EnumEventTypes.ITEM_SEARCH_TEXT_CHANGED, enumeration, value.trim());
		}, 300));
	};
	const onSearchKeyPressed = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		if (handle) {
			window.clearTimeout(handle);
			setHandle(null);
		}
		fire(EnumEventTypes.ITEM_SEARCH_TEXT_CHANGED, enumeration, text.trim());
	};

	return <ItemsTableHeaderContainer>
		<FontAwesomeIcon icon={ICON_SEARCH}/>
		<Input value={text}
		       placeholder='Filter by text, or use "c:code" to filter by code only; "l:label" for label; "n:newcode" for new code; "p:text" for parent enum.'
		       onKeyPress={onSearchKeyPressed}
		       onChange={onSearchTextChange}/>
		<ItemsTableHeaderCell>#</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Code</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Label</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>New Code</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Parent Enum</ItemsTableHeaderCell>
	</ItemsTableHeaderContainer>;
};