import {useEffect} from 'react';
import {useDataQualityCacheEventBus} from './cache-event-bus';
import {DataQualityCacheEventTypes} from './cache-event-bus-types';
import {DQCCacheData} from './types';

/**
 * make sure options will not change, this must be executed only once
 */
export const useDataQualityCacheData = (options: { onDataRetrieved: (data?: DQCCacheData) => void; }) => {
	const {onDataRetrieved} = options;

	const {fire} = useDataQualityCacheEventBus();

	useEffect(() => {
		const askData = () => {
			fire(DataQualityCacheEventTypes.ASK_DATA, (data?: DQCCacheData) => {
				onDataRetrieved(data);
			});
		};
		const askDataLoaded = (askData: () => void) => {
			fire(DataQualityCacheEventTypes.ASK_DATA_LOADED, (loaded) => {
				if (loaded) {
					askData();
				} else {
					setTimeout(() => askDataLoaded(askData), 100);
				}
			});
		};
		askDataLoaded(askData);
	}, [fire, onDataRetrieved]);
};