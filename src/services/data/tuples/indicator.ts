import {findAccount} from '../account';
import {Apis, get, post} from '../apis';
import {
	fetchMockEnumsForTopic,
	fetchMockIndicator,
	fetchMockIndicatorCategories,
	fetchMockIndicatorsForSelection,
	fetchMockRelevantIndicators,
	fetchMockTopicsForIndicatorSelection,
	listMockIndicators,
	saveMockIndicator
} from '../mock/tuples/mock-indicator';
import {isMockService} from '../utils';
import {Indicator, IndicatorId} from './indicator-types';
import {
	EnumForIndicator,
	QueryIndicator,
	QueryIndicatorCategoryParams,
	TopicForIndicator
} from './query-indicator-types';
import {TopicId} from './topic-types';
import {isFakedUuid} from './utils';

export const fetchIndicatorsForSelection = async (search: string): Promise<Array<QueryIndicator>> => {
	if (isMockService()) {
		return await fetchMockIndicatorsForSelection(search.trim());
	} else {
		return await get({api: Apis.INDICATORS_LIST_FOR_SELECTION, search: {search}});
	}
};

export const fetchTopicsForIndicatorSelection = async (search: string): Promise<Array<TopicForIndicator>> => {
	if (isMockService()) {
		return await fetchMockTopicsForIndicatorSelection(search.trim());
	} else {
		return await get({api: Apis.TOPIC_LIST_FOR_INDICATOR_SELECTION, search: {search}});
	}
};

export const fetchEnumsForTopic = async (topicId: TopicId): Promise<Array<EnumForIndicator>> => {
	if (isMockService()) {
		return await fetchMockEnumsForTopic(topicId);
	} else {
		return await get({api: Apis.ENUM_LIST_FOR_INDICATOR_TOPIC, search: {topicId}});
	}
};

export const fetchIndicator = async (indicatorId: IndicatorId): Promise<{ indicator: Indicator; topic: TopicForIndicator; enums?: Array<EnumForIndicator>; }> => {
	if (isMockService()) {
		return await fetchMockIndicator(indicatorId);
	} else {
		const indicator = await get({api: Apis.INDICATOR_GET, search: {indicatorId}});
		const topic = await get({api: Apis.TOPIC_GET, search: {topicId: indicator.topicId}});
		return {indicator, topic};
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

export const fetchRelevantIndicators = async (indicatorId: IndicatorId): Promise<Array<Indicator>> => {
	if (isMockService()) {
		return fetchMockRelevantIndicators(indicatorId);
	} else {
		return await get({api: Apis.RELEVANT_INDICATOR_LIST, search: {indicatorId}});
	}
};

/**
 * @param prefix {@code []} for load category1, {@code [string]} for load category2,
 *              {@code [string, string]} for load category3
 */
export const loadIndicatorCategories = async (prefix: QueryIndicatorCategoryParams): Promise<Array<string>> => {
	if (isMockService()) {
		return fetchMockIndicatorCategories(prefix);
	} else {
		return await post({api: Apis.INDICATOR_CATEGORIES, data: prefix});
	}
};

export const listIndicators = async (): Promise<Array<Indicator>> => {
	if (isMockService()) {
		return listMockIndicators();
	} else {
		return await get({api: Apis.INDICATORS_LIST});
	}
};