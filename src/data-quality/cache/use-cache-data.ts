import {useDataQualityCacheEventBus} from './cache-event-bus';
import {ExecutionContent} from '../widgets/cli/types';
import {useEffect} from 'react';
import {DataQualityCacheEventTypes} from './cache-event-bus-types';
import {DataQualityCacheData} from '../../local-persist/types';

export const useDataQualityCacheData = (options: {
	content: ExecutionContent;
	onDataRetrieved: (data?: DataQualityCacheData) => void;
}) => {
	const {content, onDataRetrieved} = options;

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
	}, [once, onDataRetrieved, content]);

};