import {fetchEnum, listAllEnums} from '@/services/data/tuples/enum';
import {Enum, EnumId} from '@/services/data/tuples/enum-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {Fragment, useEffect, useState} from 'react';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {useTupleEventBus} from './tuple-event-bus';
import {TupleEventTypes} from './tuple-event-bus-types';

type EnumData = Record<EnumId, Enum>;

export const EnumStore = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useTupleEventBus();
	const [enums, setEnums] = useState<Array<QueryEnum>>([]);
	const [enumData] = useState<EnumData>({});
	useEffect(() => {
		const onAskEnums = (onData: (enums: Array<QueryEnum>) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					if (enums.length !== 0) {
						return enums;
					} else {
						return await listAllEnums();
					}
				},
				(enums: Array<QueryEnum>) => {
					setEnums(enums);
					onData(enums);
				},
				() => {
					setEnums([]);
					onData([]);
				});
		};
		on(TupleEventTypes.ASK_ENUMS, onAskEnums);
		return () => {
			off(TupleEventTypes.ASK_ENUMS, onAskEnums);
		};
	}, [on, off, fireGlobal, enums]);
	useEffect(() => {
		const onAskEnumData = (enumId: EnumId, onData: (enumeration?: Enum) => void) => {
			if (enumData[enumId] == null) {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchEnum(enumId),
					(enumeration: Enum) => {
						enumData[enumId] = enumeration;
						onData(enumeration);
					},
					() => onData());
			} else {
				onData(enumData[enumId]);
			}
		};
		on(TupleEventTypes.ASK_ENUM_DATA, onAskEnumData);
		return () => {
			off(TupleEventTypes.ASK_ENUM_DATA, onAskEnumData);
		};
	}, [on, off, fireGlobal, enumData]);

	return <Fragment/>;
};