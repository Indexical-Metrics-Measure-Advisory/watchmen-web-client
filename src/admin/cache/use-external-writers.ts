import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {AdminCacheData} from '@/services/local-persist/types';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useAdminCacheEventBus} from './cache-event-bus';
import {AdminCacheEventTypes} from './cache-event-bus-types';

export const useExternalWriters = (): [Array<ExternalWriter>, Dispatch<SetStateAction<Array<ExternalWriter>>>] => {
	const {fire} = useAdminCacheEventBus();
	const [externalWriters, setExternalWriters] = useState<Array<ExternalWriter>>([]);
	useEffect(() => {
		const askData = () => {
			fire(AdminCacheEventTypes.ASK_DATA_LOADED, (loaded) => {
				if (loaded) {
					fire(AdminCacheEventTypes.ASK_DATA, (data?: AdminCacheData) => {
						setExternalWriters(data?.externalWriters || []);
					});
				} else {
					setTimeout(() => askData(), 100);
				}
			});
		};
		askData();
	}, [fire]);

	return [externalWriters, setExternalWriters];
};