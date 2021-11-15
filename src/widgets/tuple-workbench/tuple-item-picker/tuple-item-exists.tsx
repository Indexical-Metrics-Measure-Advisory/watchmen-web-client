import {QueryTupleForHolder, TupleHolder} from '@/services/data/tuples/tuple-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import {ICON_DELETE} from '../../basic/constants';
import {useForceUpdate} from '../../basic/utils';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes, TupleState} from '../tuple-event-bus-types';
import {useTupleItemPickerEventBus} from './tuple-item-picker-event-bus';
import {TupleItemPickerEventTypes} from './tuple-item-picker-event-bus-types';
import {
	TupleItemPickerPickedItem,
	TupleItemPickerPickedItemIcon,
	TupleItemPickerPickedItemLabel,
	TupleItemPickerPickedItems
} from './widgets';

export const TupleItemExists = <TH extends TupleHolder, QTH extends QueryTupleForHolder>(props: {
	holder: TH,
	codes: Array<QTH>,
	getHoldIds: (holder: TH) => Array<string>,
	getNameOfHold: (holdId: string, hold: Array<QTH>) => string,
	removeHold: (holdId: string) => void;
}) => {
	const {holder, codes, getHoldIds, getNameOfHold, removeHold} = props;

	const {fire} = useTupleEventBus();
	const {on, off} = useTupleItemPickerEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(TupleItemPickerEventTypes.ITEM_ADDED, forceUpdate);
		on(TupleItemPickerEventTypes.ITEM_REMOVED, forceUpdate);
		return () => {
			off(TupleItemPickerEventTypes.ITEM_ADDED, forceUpdate);
			off(TupleItemPickerEventTypes.ITEM_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const onRemoveHold = (holdId: string) => () => {
		removeHold(holdId);
		fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
		forceUpdate();
	};

	return <TupleItemPickerPickedItems>
		{getHoldIds(holder).map(holdId => {
			return [holdId, getNameOfHold(holdId, codes)];
		}).sort(([, aName], [, bName]) => {
			return aName.toLowerCase().localeCompare(bName.toLowerCase());
		}).map(([holdId, holdName]) => {
			return <TupleItemPickerPickedItem key={holdId}>
				<TupleItemPickerPickedItemLabel>{holdName}</TupleItemPickerPickedItemLabel>
				<TupleItemPickerPickedItemIcon onClick={onRemoveHold(holdId)}>
					<FontAwesomeIcon icon={ICON_DELETE}/>
				</TupleItemPickerPickedItemIcon>
			</TupleItemPickerPickedItem>;
		})}
	</TupleItemPickerPickedItems>;
};
