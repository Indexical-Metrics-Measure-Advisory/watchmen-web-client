import {findAccount} from '../account';
import {Apis, get, post} from '../apis';
import {
	fetchMockIndicator,
	fetchMockIndicatorsForSelection,
	fetchMockTopicsForIndicatorSelection,
	saveMockIndicator
} from '../mock/tuples/mock-indicator';
import {isMockService} from '../utils';
import {Indicator, IndicatorId, QueryIndicator, TopicForIndicator} from './indicator-types';
import {Topic} from './topic-types';
import {isFakedUuid} from './utils';

export const fetchIndicatorsForSelection = async (text: string): Promise<Array<QueryIndicator>> => {
	if (isMockService()) {
		return await fetchMockIndicatorsForSelection(text.trim());
	} else {
		return await get({api: Apis.INDICATORS_LIST_FOR_SELECTION});
	}
};

export const fetchTopicsForIndicatorSelection = async (text: string): Promise<Array<TopicForIndicator>> => {
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

export const saveIndicator = async (indicator: Indicator): Promise<void> => {
	indicator.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockIndicator(indicator);
	} else if (isFakedUuid(indicator)) {
		const data = await post({api: Apis.INDICATOR_CREATE, data: indicator});
		indicator.indicatorId = data.indicatorId;
		indicator.tenantId = data.tenantId;
		indicator.lastModified = data.lastModified;
	} else {
		const data = await post({
			api: Apis.INDICATOR_SAVE,
			search: {indicatorId: indicator.indicatorId},
			data: indicator
		});
		indicator.tenantId = data.tenantId;
		indicator.lastModified = data.lastModified;
	}
};
