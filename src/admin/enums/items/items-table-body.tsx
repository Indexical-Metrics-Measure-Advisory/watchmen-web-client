import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { fetchEnum } from '../../../services/tuples/enum';
import { Enum, EnumItem } from '../../../services/tuples/enum-types';
import { useEnumEventBus } from '../enum-event-bus';
import { EnumEventTypes } from '../enum-event-bus-types';
import { ItemsTableBodyCell, ItemsTableBodyContainer, ItemsTableBodyRow } from './widgets';

export const ItemsTableBody = (props: { enumeration: Enum }) => {
	const { enumeration } = props;

	const { on, off } = useEnumEventBus();
	const [ parent, setParent ] = useState<Enum | null>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(EnumEventTypes.ITEMS_IMPORTED, forceUpdate);
		return () => {
			off(EnumEventTypes.ITEMS_IMPORTED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);
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
	}, [ on, off ]);

	const parentItemMap: Map<string, string> = ((parent || { items: [] }).items as Array<EnumItem>).reduce((map, item) => {
		map.set(item.code, item.label);
		return map;
	}, new Map<string, string>());

	return <ItemsTableBodyContainer>
		{(enumeration.items || []).map((item, itemIndex) => {
			const parentLabel = (item.parentCode && parent) ? `${item.parentCode} - ${(parentItemMap.get(item.parentCode) || '')}` : item.parentCode;

			return <ItemsTableBodyRow key={v4()}>
				<ItemsTableBodyCell>{itemIndex + 1}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.code}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.label}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{parentLabel}</ItemsTableBodyCell>
			</ItemsTableBodyRow>;
		})}
	</ItemsTableBodyContainer>;
};