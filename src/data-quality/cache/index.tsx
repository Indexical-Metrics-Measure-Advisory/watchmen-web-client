import React, {useEffect, useState} from 'react';
import {clearAdminData, loadAdminData, prepareAdminDB} from '../../local-persist';
import {useDataQualityCacheEventBus} from './cache-event-bus';
import {DataQualityCacheData} from '../../local-persist/types';
import {DataQualityCacheEventTypes} from './cache-event-bus-types';
import {EventTypes} from '../../events/types';
import {useEventBus} from '../../events/event-bus';

export interface CacheState {
	initialized: boolean;
	data?: DataQualityCacheData;
}

export const DataQualityCache = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useDataQualityCacheEventBus();
	const [data, setData] = useState<CacheState>({initialized: false});
	useEffect(() => {
		const onAskDataLoaded = () => fire(DataQualityCacheEventTypes.REPLY_DATA_LOADED, data.initialized);
		// noinspection TypeScriptValidateTypes
		const onAskData = () => fire(DataQualityCacheEventTypes.REPLY_DATA, data.data);
		on(DataQualityCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
		on(DataQualityCacheEventTypes.ASK_DATA, onAskData);

		if (!data.initialized) {
			prepareAdminDB();
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await loadAdminData(),
				(data) => {
					setData({initialized: true, data});
					fire(DataQualityCacheEventTypes.DATA_LOADED, data);
				});
		}

		return () => {
			off(DataQualityCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
			off(DataQualityCacheEventTypes.ASK_DATA, onAskData);
		};
	}, [fireGlobal, on, off, fire, data.initialized, data.data]);

	useEffect(() => {
		const onAskReload = async () => {
			setData({initialized: false});
			await clearAdminData();
			const data = await loadAdminData();
			setData({initialized: true, data});
			fire(DataQualityCacheEventTypes.REPLY_RELOAD);
		};
		on(DataQualityCacheEventTypes.ASK_RELOAD, onAskReload);
		return () => {
			off(DataQualityCacheEventTypes.ASK_RELOAD, onAskReload);
		};
	}, [on, off, fire]);

	return <></>;
};