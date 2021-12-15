import {isIndicatorFactor} from '../../tuples/factor-calculator-utils';
import {Indicator, IndicatorId} from '../../tuples/indicator-types';
import {
	EnumForIndicator,
	QueryIndicator,
	QueryIndicatorCategoryParams,
	TopicForIndicator
} from '../../tuples/query-indicator-types';
import {TopicId, TopicKind, TopicType} from '../../tuples/topic-types';
import {isFakedUuid} from '../../tuples/utils';
import {DemoTopics, MonthlyOrderPremium} from '../tuples/mock-data-topics';
import {DemoIndicators, MonthlyOrderPremiumIndicator, OrderPremiumIndicators} from './mock-data-indicators';
import {listMockEnums} from './mock-enum';

export const fetchMockIndicatorsForSelection = async (text: string): Promise<Array<QueryIndicator>> => {
	return new Promise<Array<QueryIndicator>>(resolve => {
		const matchedText = text.toUpperCase();
		setTimeout(() => {
			resolve(OrderPremiumIndicators.filter(indicator => indicator.name.toUpperCase().includes(matchedText)));
		}, 500);
	});
};

export const fetchMockTopicsForIndicatorSelection = async (text: string): Promise<Array<TopicForIndicator>> => {
	return new Promise<Array<TopicForIndicator>>(resolve => {
		const matchedText = text.toUpperCase();
		setTimeout(() => {
			resolve(DemoTopics.filter(topic => topic.kind !== TopicKind.SYSTEM)
				.filter(topic => topic.type !== TopicType.RAW && topic.type !== TopicType.META)
				.filter(topic => {
					return topic.name.toUpperCase().includes(matchedText)
						|| (topic.factors || []).some(factor => {
							return isIndicatorFactor(factor.type)
								&& ((factor.label || '').toUpperCase().includes(matchedText)
									|| (factor.name || '').toUpperCase().includes(matchedText));
						});
				}));
		}, 500);
	});
};

export const fetchMockEnumsForTopic = async (topicId: TopicId): Promise<Array<EnumForIndicator>> => {
	return new Promise<Array<EnumForIndicator>>(async resolve => {
		// eslint-disable-next-line
		const topic = DemoTopics.find(topic => topic.topicId == topicId);
		if (topic == null) {
			resolve([]);
		} else {
			const {data: demoEnums} = await listMockEnums({search: ''});
			const enums = (topic?.factors || []).filter(factor => factor.enumId)
				// eslint-disable-next-line
				.map(factor => demoEnums.find(enumeration => enumeration.enumId == factor.enumId))
				.filter(enumeration => enumeration != null) as Array<EnumForIndicator>;
			resolve(enums);
		}
	});
};

export const fetchMockIndicator = async (indicatorId: IndicatorId): Promise<{ indicator: Indicator; topic: TopicForIndicator; enums?: Array<EnumForIndicator>; }> => {
	// eslint-disable-next-line
	const found = DemoIndicators.find(({indicatorId: id}) => id == indicatorId);
	if (found) {
		const indicator = JSON.parse(JSON.stringify(found));
		// eslint-disable-next-line
		const topic = DemoTopics.find(({topicId: id}) => id == indicator.topicId)!;
		const {data: demoEnums} = await listMockEnums({search: ''});
		const enums = (topic.factors || []).filter(factor => factor.enumId)
			// eslint-disable-next-line
			.map(factor => demoEnums.find(enumeration => enumeration.enumId == factor.enumId))
			.filter(enumeration => enumeration != null) as Array<EnumForIndicator>;
		return {indicator, topic, enums};
	} else {
		return {
			indicator: {
				...MonthlyOrderPremiumIndicator,
				indicatorId
			},
			topic: MonthlyOrderPremium,
			enums: []
		};
	}
};

let newIndicatorId = 10000;
export const saveMockIndicator = async (indicator: Indicator): Promise<void> => {
	return new Promise<void>((resolve) => {
		if (isFakedUuid(indicator)) {
			indicator.indicatorId = `${newIndicatorId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const fetchMockRelevantIndicators = async (indicatorId: IndicatorId): Promise<Array<Indicator>> => {
	return new Promise<Array<Indicator>>(resolve => {
		setTimeout(() => {
			resolve(DemoIndicators);
		}, 500);
	});
};

export const fetchMockIndicatorCategories = async (prefix: QueryIndicatorCategoryParams): Promise<Array<string>> => {
	return new Promise<Array<string>>(resolve => {
		setTimeout(() => {
			resolve(['premium', 'order']);
		}, 500);
	});
};

export const listMockIndicators = async (): Promise<Array<Indicator>> => {
	return new Promise<Array<Indicator>>(resolve => {
		setTimeout(() => {
			resolve(DemoIndicators);
		}, 500);
	});
};