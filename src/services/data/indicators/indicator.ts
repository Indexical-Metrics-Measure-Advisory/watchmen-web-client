import {Apis, get} from '../apis';
import {fetchMockIndicatorsForSelection} from '../mock/indicators/mock-indicator';
import {isMockService} from '../utils';
import {QueryIndicator} from './types';

export const fetchIndicatorsForSelection = async (text: string): Promise<Array<QueryIndicator>> => {
	if (isMockService()) {
		return await fetchMockIndicatorsForSelection(text.trim());
	} else {
		return await get({api: Apis.INDICATORS_LIST_FOR_SELECTION});
	}
};
