import {useEffect} from 'react';
import {useDataQualityCacheEventBus} from './cache-event-bus';
import {DataQualityCacheEventTypes} from './cache-event-bus-types';
import {DQCCacheData} from './types';

/**
 * make sure options will not change, this must be executed only once
 */
export const useDataQualityCacheData = (options: {
	onDataRetrieved: (data?: DQCCacheData) => void;
}) => {
	const {onDataRetrieved} = options;

	const {once} = useDataQualityCacheEventBus();

	useEffect(() => {
		const askData = () => {
			once(DataQualityCacheEventTypes.REPLY_DATA, (data?: DQCCacheData) => {
				onDataRetrieved(data);
			}).fire(DataQualityCacheEventTypes.ASK_DATA);
		};
		const askDataLoaded = (askData: () => void) => {
			once(DataQualityCacheEventTypes.REPLY_DATA_LOADED, (loaded) => {
				if (loaded) {
					askData();
				} else {
					setTimeout(() => askDataLoaded(askData), 100);
				}
			}).fire(DataQualityCacheEventTypes.ASK_DATA_LOADED);
		};
		askDataLoaded(askData);
	}, [once, onDataRetrieved]);
};