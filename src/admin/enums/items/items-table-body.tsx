import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Enum } from '../../../services/tuples/enum-types';
import { useEnumEventBus } from '../enum-event-bus';
import { EnumEventTypes } from '../enum-event-bus-types';
import { ItemsTableBodyCell, ItemsTableBodyContainer, ItemsTableBodyRow } from './widgets';

export const ItemsTableBody = (props: { enumeration: Enum }) => {
	const { enumeration } = props;

	const { on, off } = useEnumEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(EnumEventTypes.ITEMS_IMPORTED, forceUpdate);
		return () => {
			off(EnumEventTypes.ITEMS_IMPORTED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <ItemsTableBodyContainer>
		{(enumeration.items || []).map((item, itemIndex) => {
			return <ItemsTableBodyRow key={v4()}>
				<ItemsTableBodyCell>{itemIndex + 1}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.code}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.label}</ItemsTableBodyCell>
				<ItemsTableBodyCell>{item.parentCode}</ItemsTableBodyCell>
			</ItemsTableBodyRow>;
		})}
	</ItemsTableBodyContainer>;
};