import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {AdminCacheData} from '@/services/local-persist/types';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useAdminCacheEventBus} from './cache-event-bus';
import {AdminCacheEventTypes} from './cache-event-bus-types';

export const useExternalWriters = (): [Array<ExternalWriter>, Dispatch<SetStateAction<Array<ExternalWriter>>>] => {
	const {once: onceCache} = useAdminCacheEventBus();
	const [externalWriters, setExternalWriters] = useState<Array<ExternalWriter>>([]);
	useEffect(() => {
		const askData = () => {
			onceCache(AdminCacheEventTypes.REPLY_DATA_LOADED, (loaded) => {
				if (loaded) {
					onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
						setExternalWriters(data?.externalWriters || []);
					}).fire(AdminCacheEventTypes.ASK_DATA);
				} else {
					setTimeout(() => askData(), 100);
				}
			}).fire(AdminCacheEventTypes.ASK_DATA_LOADED);
		};
		askData();
	}, [onceCache]);

	return [externalWriters, setExternalWriters];
};