import {isIndicatorFactor} from '../../tuples/factor-calculator-utils';
import {Indicator, IndicatorId} from '../../tuples/indicator-types';
import {EnumForIndicator, QueryIndicator, TopicForIndicator} from '../../tuples/query-indicator-types';
import {TopicId, TopicKind, TopicType} from '../../tuples/topic-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {BUCKET_AMOUNT_ID} from '../tuples/mock-data-buckets';
import {DemoTopics, MonthlyOrderPremium, Order, WeeklyOrderPremium} from '../tuples/mock-data-topics';
import {listMockEnums} from './mock-enum';

export const INDICATOR_ORDER_PREMIUM_ID = '1';
export const INDICATOR_MONTHLY_ORDER_PREMIUM_ID = '2';
export const INDICATOR_WEEKLY_ORDER_PREMIUM_ID = '3';

const OrderPremiumIndicator: Indicator = {
	indicatorId: INDICATOR_ORDER_PREMIUM_ID,
	name: 'Order Premium',
	topicId: Order.topicId,
	factorId: Order.factors.find(factor => factor.name === 'premium')?.factorId,
	valueBuckets: [BUCKET_AMOUNT_ID],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
const MonthlyOrderPremiumIndicator: Indicator = {
	indicatorId: INDICATOR_MONTHLY_ORDER_PREMIUM_ID,
	name: 'Monthly Order Premium',
	topicId: MonthlyOrderPremium.topicId,
	factorId: MonthlyOrderPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
const WeeklyOrderPremiumIndicator: Indicator = {
	indicatorId: INDICATOR_WEEKLY_ORDER_PREMIUM_ID,
	name: 'Weekly Order Premium',
	topicId: WeeklyOrderPremium.topicId,
	factorId: WeeklyOrderPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

const OrderPremiumIndicators = [OrderPremiumIndicator, MonthlyOrderPremiumIndicator, WeeklyOrderPremiumIndicator];
const DemoIndicators = [OrderPremiumIndicators].flat();

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

export const fetchMockIndicatorCategories = async (prefix: Array<string>): Promise<Array<string>> => {
	return new Promise<Array<string>>(resolve => {
		setTimeout(() => {
			resolve(['premium', 'order']);
		}, 500);
	});
};