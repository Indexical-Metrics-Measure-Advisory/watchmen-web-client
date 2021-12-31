import {fetchEnumAndParents} from '@/services/data/tuples/enum';
import {Enum, EnumItem} from '@/services/data/tuples/enum-types';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useEnumEventBus} from '../enum-event-bus';
import {EnumEventTypes} from '../enum-event-bus-types';
import {
	ItemsTableBodyCell,
	ItemsTableBodyContainer,
	ItemsTableBodyPageableContainer,
	ItemsTableBodyRow
} from './widgets';

interface EnumItemDelegate extends EnumItem {
	parentLabel?: string;
	original: EnumItem;
}

const PAGE_SIZE = 100;

const filterBy = (
	items: Array<EnumItemDelegate>,
	text: string,
	getValue: (item: EnumItemDelegate) => string
): Array<EnumItemDelegate> => {
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
const filterItems = (items: Array<EnumItemDelegate>, search: string): Array<EnumItemDelegate> => {
	items = items || [];
	const text = (search || '').trim().toLowerCase();
	switch (true) {
		case (text.length === 0):
			// do nothing
			break;
		case text.startsWith('c:') :
			// in name
			items = filterBy(items, text.substring(2).trim(), (item: EnumItem) => item.code);
			break;
		case text.startsWith('l:') :
			// in label
			items = filterBy(items, text.substring(2).trim(), (item: EnumItem) => item.label);
			break;
		case text.startsWith('n:'):
			// in type
			items = filterBy(items, text.substring(2).trim(), (item: EnumItem) => item.replaceCode || '');
			break;
		case text.startsWith('p:'):
			// in index
			items = filterBy(items, text.substring(2).trim(), ({parentLabel}) => parentLabel || '');
			break;
		default:
			items = filterBy(items, text, (item: EnumItem) => `${item.code}\t${item.label}`);
			break;
	}

	return items;
};

export const ItemsTableBody = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const {on, off} = useEnumEventBus();
	const [pageNumber, setPageNumber] = useState(1);
	const [searchText, setSearchText] = useState('');
	const [parent, setParent] = useState<Enum | null>(null);
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
	}, [on, off, forceUpdate, enumeration]);
	useEffect(() => {
		const onParentChanged = async () => {
			const parentEnumId = enumeration.parentEnumId;
			if (parentEnumId) {
				const {enumeration: parent} = await fetchEnumAndParents(parentEnumId);
				setParent(parent);
			} else {
				setParent(null);
			}
		};
		on(EnumEventTypes.ENUM_PARENT_CHANGED, onParentChanged);
		return () => {
			off(EnumEventTypes.ENUM_PARENT_CHANGED, onParentChanged);
		};
	}, [on, off, enumeration.parentEnumId]);
	useEffect(() => {
		(async () => {
			const parentEnumId = enumeration.parentEnumId;
			if (parentEnumId) {
				const {enumeration: parent} = await fetchEnumAndParents(parentEnumId);
				setParent(parent);
			} else {
				setParent(null);
			}
		})();
	}, [enumeration]);

	const onPageNumberChange = (option: DropdownOption) => {
		const {value} = option;
		setPageNumber(value);
	};

	const parentItemMap: Map<string, string> = ((parent || {items: []}).items as Array<EnumItem>).reduce((map, item) => {
		map.set(item.code, item.label);
		return map;
	}, new Map<string, string>());

	let items = filterItems((enumeration.items || []).map<EnumItemDelegate>((item: EnumItem) => {
		return {
			...item,
			parentLabel: (item.parentCode && parent) ? `${item.parentCode} - ${(parentItemMap.get(item.parentCode) || '')}` : item.parentCode,
			original: item
		};
	}), searchText);
	const count = items.length;
	// get items of current page
	items = items.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
	const pages = Math.ceil(count / PAGE_SIZE);
	const pageOptions: Array<DropdownOption> = new Array(pages).fill(1).map((value, index) => {
		return {value: index + 1, label: `${index + 1}`};
	});

	return <ItemsTableBodyContainer>
		{items.map(item => {
			return <ItemsTableBodyRow key={v4()}>
				<ItemsTableBodyCell>{enumeration.items.indexOf(item.original) + 1}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.code}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.label}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.replaceCode}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.parentLabel}</ItemsTableBodyCell>
			</ItemsTableBodyRow>;
		})}
		{pages > 1
			? <ItemsTableBodyPageableContainer>
				<span>Page: </span>
				<Dropdown value={pageNumber} options={pageOptions} onChange={onPageNumberChange}/>
			</ItemsTableBodyPageableContainer>
			: null}
	</ItemsTableBodyContainer>;
};