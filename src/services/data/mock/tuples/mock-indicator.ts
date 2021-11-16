import {isIndicatorFactor} from '../../tuples/factor-calculator-utils';
import {Indicator, IndicatorId, MeasureMethod} from '../../tuples/indicator-types';
import {EnumForIndicator, QueryIndicator, TopicForIndicator} from '../../tuples/query-indicator-types';
import {TopicId, TopicKind, TopicType} from '../../tuples/topic-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {DemoTopics, MonthlyOrderPremium, Order, WeeklyOrderPremium} from '../tuples/mock-data-topics';
import {listMockEnums} from './mock-enum';

const OrderPremiumIndicator: Indicator = {
	indicatorId: '1',
	name: 'Order Premium',
	topicId: Order.topicId,
	factorId: Order.factors.find(factor => factor.name === 'premium')?.factorId,
	measures: [{
		factorId: Order.factors.find(factor => factor.name === 'quoteDate')!.factorId,
		method: MeasureMethod.YEAR
	}, {
		factorId: Order.factors.find(factor => factor.name === 'quoteDate')!.factorId,
		method: MeasureMethod.MONTH
	}, {
		factorId: Order.factors.find(factor => factor.name === 'issueDate')!.factorId,
		method: MeasureMethod.YEAR
	}, {
		factorId: Order.factors.find(factor => factor.name === 'issueDate')!.factorId,
		method: MeasureMethod.MONTH
	}, {
		factorId: Order.factors.find(factor => factor.name === 'ensureProvince')!.factorId,
		method: MeasureMethod.PROVINCE
	}, {
		factorId: Order.factors.find(factor => factor.name === 'ensureCity')!.factorId,
		method: MeasureMethod.ENUM
	}],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
const MonthlyOrderPremiumIndicator: Indicator = {
	indicatorId: '2',
	name: 'Monthly Order Premium',
	topicId: MonthlyOrderPremium.topicId,
	factorId: MonthlyOrderPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	measures: [{
		factorId: MonthlyOrderPremium.factors.find(factor => factor.name === 'year')!.factorId,
		method: MeasureMethod.YEAR
	}, {
		factorId: MonthlyOrderPremium.factors.find(factor => factor.name === 'month')!.factorId,
		method: MeasureMethod.MONTH
	}],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
const WeeklyOrderPremiumIndicator: Indicator = {
	indicatorId: '3',
	name: 'Weekly Order Premium',
	topicId: WeeklyOrderPremium.topicId,
	factorId: WeeklyOrderPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	measures: [{
		factorId: WeeklyOrderPremium.factors.find(factor => factor.name === 'year')!.factorId,
		method: MeasureMethod.YEAR
	}, {
		factorId: WeeklyOrderPremium.factors.find(factor => factor.name === 'week')!.factorId,
		method: MeasureMethod.WEEK_OF_YEAR
	}],
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

export const fetchMockIndicator = async (indicatorId: IndicatorId): Promise<{ indicator: Indicator; topic?: TopicForIndicator; enums?: Array<EnumForIndicator>; }> => {
	// eslint-disable-next-line
	const found = DemoIndicators.find(({indicatorId: id}) => id == indicatorId);
	if (found) {
		const indicator = JSON.parse(JSON.stringify(found));
		// eslint-disable-next-line
		const topic = indicator.topicId ? DemoTopics.find(({topicId: id}) => id == indicator.topicId) : (void 0);
		const {data: demoEnums} = await listMockEnums({search: ''});
		const enums = (topic?.factors || []).filter(factor => factor.enumId)
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