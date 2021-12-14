import {fetchEnum} from '@/services/data/tuples/enum';
import {Enum, EnumId} from '@/services/data/tuples/enum-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect, useState} from 'react';
import {useInspectionEventBus} from './inspection-event-bus';
import {InspectionEventTypes} from './inspection-event-bus-types';

export const EnumsState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useInspectionEventBus();
	const [enums, setEnums] = useState<Array<Enum>>([]);
	useEffect(() => {
		const onAskEnum = async (enumId: EnumId, onData: (enumeration?: Enum) => void) => {
			// eslint-disable-next-line
			const existing = enums.find(e => e.enumId == enumId);
			if (existing == null) {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchEnum(enumId),
					(enumeration: Enum) => {
						setEnums(enums => [...enums, enumeration]);
						onData(enumeration);
					}, () => onData());
			} else {
				onData(existing);
			}
		};
		on(InspectionEventTypes.ASK_ENUM, onAskEnum);
		return () => {
			off(InspectionEventTypes.ASK_ENUM, onAskEnum);
		};
	}, [fireGlobal, on, off, enums]);
	return <Fragment/>;
};