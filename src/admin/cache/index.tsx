import React, {useEffect, useState} from 'react';
import {loadAdminData, prepareAdminDB} from '../../local-persist';
import {useCacheEventBus} from './cache-event-bus';
import {AdminCacheData} from '../../local-persist/types';
import {AdminCacheEventTypes} from './cache-event-bus-types';

interface Cache {
	initialized: boolean;
	data?: AdminCacheData;
}

export const AdminCache = () => {
	const [data, setData] = useState<Cache>({initialized: false});
	const {on, off, fire} = useCacheEventBus();
	useEffect(() => {
		const onAskDataLoaded = () => fire(AdminCacheEventTypes.REPLY_DATA_LOADED, data.initialized);
		const onAskData = () => fire(AdminCacheEventTypes.REPLY_DATA, data.data);
		on(AdminCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
		on(AdminCacheEventTypes.ASK_DATA, onAskData);

		prepareAdminDB();
		if (!data.initialized) {
			(async () => {
				const data = await loadAdminData();
				setData({initialized: true, data});
			})();
		}

		return () => {
			off(AdminCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
			off(AdminCacheEventTypes.ASK_DATA, onAskData);
		};
	}, [on, off, fire, data.initialized, data.data]);

	return <></>;
};