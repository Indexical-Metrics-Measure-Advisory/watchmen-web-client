import {listAllEnums} from '@/services/data/tuples/enum';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {Fragment, useEffect, useState} from 'react';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {useTupleEventBus} from './tuple-event-bus';
import {TupleEventTypes} from './tuple-event-bus-types';

export const EnumStore = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useTupleEventBus();
	const [enums, setEnums] = useState<Array<QueryEnum>>([]);
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

	return <Fragment/>;
};