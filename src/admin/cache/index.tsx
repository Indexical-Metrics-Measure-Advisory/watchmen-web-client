import React, {useEffect, useState} from 'react';
import {clearAdminData, loadAdminData, prepareAdminDB} from '../../local-persist';
import {useCacheEventBus} from './cache-event-bus';
import {AdminCacheData} from '../../local-persist/types';
import {AdminCacheEventTypes} from './cache-event-bus-types';
import {EventTypes} from '../../events/types';
import {useEventBus} from '../../events/event-bus';

interface Cache {
	initialized: boolean;
	data?: AdminCacheData;
}

export const AdminCache = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useCacheEventBus();
	const [data, setData] = useState<Cache>({initialized: false});
	useEffect(() => {
		const onAskDataLoaded = () => fire(AdminCacheEventTypes.REPLY_DATA_LOADED, data.initialized);
		const onAskData = () => fire(AdminCacheEventTypes.REPLY_DATA, data.data);
		on(AdminCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
		on(AdminCacheEventTypes.ASK_DATA, onAskData);

		if (!data.initialized) {
			prepareAdminDB();
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await loadAdminData(),
				(data) => {
					setData({initialized: true, data});
					fire(AdminCacheEventTypes.DATA_LOADED, data);
				});
		}

		return () => {
			off(AdminCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
			off(AdminCacheEventTypes.ASK_DATA, onAskData);
		};
	}, [fireGlobal, on, off, fire, data.initialized, data.data]);

	useEffect(() => {
		const onAskReload = async () => {
			setData({initialized: false});
			await clearAdminData();
			await loadAdminData();
			fire(AdminCacheEventTypes.REPLY_RELOAD);
		};
		on(AdminCacheEventTypes.ASK_RELOAD, onAskReload);
		return () => {
			off(AdminCacheEventTypes.ASK_RELOAD, onAskReload);
		};
	}, [on, off]);

	return <></>;
};