import {Apis, get} from '../apis';
import {fetchMockIndicator, fetchMockIndicatorsForSelection, fetchMockTopicsForIndicatorSelection} from '../mock/tuples/mock-indicator';
import {isMockService} from '../utils';
import {Indicator, IndicatorId, QueryIndicator, QueryTopicForIndicator} from './indicator-types';
import {Topic} from './topic-types';

export const fetchIndicatorsForSelection = async (text: string): Promise<Array<QueryIndicator>> => {
	if (isMockService()) {
		return await fetchMockIndicatorsForSelection(text.trim());
	} else {
		return await get({api: Apis.INDICATORS_LIST_FOR_SELECTION});
	}
};

export const fetchTopicsForIndicatorSelection = async (text: string): Promise<Array<QueryTopicForIndicator>> => {
	if (isMockService()) {
		return await fetchMockTopicsForIndicatorSelection(text.trim());
	} else {
		return await get({api: Apis.TOPIC_LIST_FOR_INDICATOR_SELECTION});
	}
};

export const fetchIndicator = async (indicatorId: IndicatorId): Promise<{ indicator: Indicator; topic?: Topic }> => {
	if (isMockService()) {
		return await fetchMockIndicator(indicatorId);
	} else {
		const indicator = await get({api: Apis.INDICATOR_GET, search: {indicatorId}});
		if (indicator.topicId) {
			const topic = await get({api: Apis.TOPIC_GET, search: {topicId: indicator.topicId}});
			return {indicator, topic};
		} else {
			return {indicator};
		}
	}
};
