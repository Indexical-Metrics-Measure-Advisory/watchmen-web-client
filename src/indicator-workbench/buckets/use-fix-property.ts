import {Bucket} from '@/services/data/tuples/bucket-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import {useEffect} from 'react';

export const useFixProperty = (bucket: Bucket): boolean => {
	const {on, off} = useTupleEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTupleStateChanged = (state: TupleState) => {
			if (state !== TupleState.SAVED) {
				return;
			}

			forceUpdate();
		};

		on(TupleEventTypes.CHANGE_TUPLE_STATE, onTupleStateChanged);
		return () => {
			off(TupleEventTypes.CHANGE_TUPLE_STATE, onTupleStateChanged);
		};
	});

	return isFakedUuid(bucket);
};