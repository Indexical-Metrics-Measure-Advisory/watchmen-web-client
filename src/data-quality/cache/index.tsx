import {clearAdminData, loadAdminData, prepareAdminDB} from '@/services/local-persist';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {useDataQualityCacheEventBus} from './cache-event-bus';
import {DataQualityCacheEventTypes} from './cache-event-bus-types';
import {DQCCacheData} from './types';
import {buildRelations} from './utils';

export interface CacheState {
	initialized: boolean;
	data?: DQCCacheData;
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
					const {pipelines, topics} = data;
					setData({
						initialized: true,
						data: buildRelations({pipelines, topics})
					});
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
			await clearAdminData();
			const {pipelines, topics} = await loadAdminData();
			setData({initialized: true, data: buildRelations({pipelines, topics})});
			fire(DataQualityCacheEventTypes.REPLY_RELOAD);
		};
		on(DataQualityCacheEventTypes.ASK_RELOAD, onAskReload);
		return () => {
			off(DataQualityCacheEventTypes.ASK_RELOAD, onAskReload);
		};
	}, [on, off, fire]);

	return <></>;
};