import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { fetchEnum } from '../../../services/tuples/enum';
import { Enum, EnumItem } from '../../../services/tuples/enum-types';
import { useEnumEventBus } from '../enum-event-bus';
import { EnumEventTypes } from '../enum-event-bus-types';
import { ItemsTableBodyCell, ItemsTableBodyContainer, ItemsTableBodyRow } from './widgets';

const filterBy = (
	items: Array<EnumItem & { parentLabel?: string }>,
	text: string,
	getValue: (item: EnumItem & { parentLabel?: string }) => string
): Array<EnumItem & { parentLabel?: string }> => {
	if (text.length === 0) {
		return items;
	}

	return items.filter(item => {
		const value = getValue(item);
		if (value == null || value.trim().length === 0) {
			return false;
		} else {
			return value.toLowerCase().includes(text);
		}
	});
};
const filterItems = (items: Array<EnumItem & { parentLabel?: string }>, search: string): Array<EnumItem & { parentLabel?: string }> => {
	items = items || [];
	const text = (search || '').trim();
	switch (true) {
		case (text.length === 0):
			// do nothing
			break;
		case text.startsWith('c:') :
			// in name
			items = filterBy(items, text.substr(2).trim().toLowerCase(), (item: EnumItem) => item.code);
			break;
		case text.startsWith('l:') :
			// in label
			items = filterBy(items, text.substr(2).trim().toLowerCase(), (item: EnumItem) => item.label);
			break;
		case text.startsWith('n:'):
			// in type
			items = filterBy(items, text.substr(2).trim().toLowerCase(), (item: EnumItem) => item.replaceCode || '');
			break;
		case text.startsWith('p:'):
			// in index
			items = filterBy(items, text.substr(2).trim().toLowerCase(), ({ parentLabel }) => parentLabel || '');
			break;
		default:
			items = filterBy(items, text.trim().toLowerCase(), (item: EnumItem) => `${item.code}\t${item.label}`);
			break;
	}

	return items;
};

export const ItemsTableBody = (props: { enumeration: Enum }) => {
	const { enumeration } = props;

	const { on, off } = useEnumEventBus();
	const [ searchText, setSearchText ] = useState('');
	const [ parent, setParent ] = useState<Enum | null>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSearchTextChanged = (changedEnumeration: Enum, searchText: string) => {
			if (changedEnumeration !== enumeration) {
				return;
			}
			setSearchText(searchText);
		};
		on(EnumEventTypes.ITEM_SEARCH_TEXT_CHANGED, onSearchTextChanged);

		on(EnumEventTypes.ITEMS_IMPORTED, forceUpdate);
		return () => {
			off(EnumEventTypes.ITEM_SEARCH_TEXT_CHANGED, onSearchTextChanged);

			off(EnumEventTypes.ITEMS_IMPORTED, forceUpdate);
		};
	}, [ on, off, forceUpdate, enumeration ]);
	useEffect(() => {
		const onParentChanged = async () => {
			const parentEnumId = enumeration.parentEnumId;
			if (parentEnumId) {
				const { enumeration: parent } = await fetchEnum(parentEnumId);
				setParent(parent);
			} else {
				setParent(null);
			}
		};
		on(EnumEventTypes.ENUM_PARENT_CHANGED, onParentChanged);
		return () => {
			off(EnumEventTypes.ENUM_PARENT_CHANGED, onParentChanged);
		};
	}, [ on, off, enumeration.parentEnumId ]);
	useEffect(() => {
		(async () => {
			const parentEnumId = enumeration.parentEnumId;
			if (parentEnumId) {
				const { enumeration: parent } = await fetchEnum(parentEnumId);
				setParent(parent);
			} else {
				setParent(null);
			}
		})();
	}, [ enumeration ]);

	const parentItemMap: Map<string, string> = ((parent || { items: [] }).items as Array<EnumItem>).reduce((map, item) => {
		map.set(item.code, item.label);
		return map;
	}, new Map<string, string>());

	return <ItemsTableBodyContainer>
		{filterItems((enumeration.items || []).map<EnumItem & { parentLabel?: string }>((item: EnumItem) => {
			return {
				...item,
				parentLabel: (item.parentCode && parent) ? `${item.parentCode} - ${(parentItemMap.get(item.parentCode) || '')}` : item.parentCode
			};
		}), searchText).map((item, itemIndex) => {
			return <ItemsTableBodyRow key={v4()}>
				<ItemsTableBodyCell>{itemIndex + 1}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.code}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.label}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.replaceCode}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.parentLabel}</ItemsTableBodyCell>
			</ItemsTableBodyRow>;
		})}
	</ItemsTableBodyContainer>;
};