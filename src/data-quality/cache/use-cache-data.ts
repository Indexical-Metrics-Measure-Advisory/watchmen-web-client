import {useDataQualityCacheEventBus} from './cache-event-bus';
import {useEffect} from 'react';
import {DataQualityCacheEventTypes} from './cache-event-bus-types';
import {DataQualityCacheData} from '../../local-persist/types';

/**
 * make sure options will not change, this must be executed only once
 */
export const useDataQualityCacheData = (options: {
	onDataRetrieved: (data?: DataQualityCacheData) => void;
}) => {
	const {onDataRetrieved} = options;

	const {once} = useDataQualityCacheEventBus();

	useEffect(() => {
		const askData = () => {
			once(DataQualityCacheEventTypes.REPLY_DATA, (data?: DataQualityCacheData) => {
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