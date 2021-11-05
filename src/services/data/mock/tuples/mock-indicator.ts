import {isIndicatorFactor} from '../../tuples/factor-calculator-utils';
import {Indicator, IndicatorId, MeasureMethod, QueryIndicator, TopicForIndicator} from '../../tuples/indicator-types';
import {Topic} from '../../tuples/topic-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {DemoTopics, MonthlyPolicyPremium, WeeklyPolicyPremium} from '../tuples/mock-data-topics';

const MonthlyPolicyPremiumIndicator: Indicator = {
	indicatorId: '1',
	name: 'Monthly Policy Premium',
	topicId: MonthlyPolicyPremium.topicId,
	factorId: MonthlyPolicyPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	measures: [MeasureMethod.YEAR, MeasureMethod.MONTH],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
const WeeklyPolicyPremiumIndicator: Indicator = {
	indicatorId: '2',
	name: 'Weekly Policy Premium',
	topicId: WeeklyPolicyPremium.topicId,
	factorId: WeeklyPolicyPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	measures: [MeasureMethod.YEAR, MeasureMethod.WEEK_OF_YEAR],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

const PolicyPremiumIndicators = [MonthlyPolicyPremiumIndicator, WeeklyPolicyPremiumIndicator];
const DemoIndicators = [PolicyPremiumIndicators].flat();

export const fetchMockIndicatorsForSelection = async (text: string): Promise<Array<QueryIndicator>> => {
	return new Promise<Array<QueryIndicator>>(resolve => {
		const matchedText = text.toUpperCase();
		setTimeout(() => {
			resolve(PolicyPremiumIndicators.filter(indicator => indicator.name.toUpperCase().includes(matchedText)));
		}, 500);
	});
};

export const fetchMockTopicsForIndicatorSelection = async (text: string): Promise<Array<TopicForIndicator>> => {
	return new Promise<Array<TopicForIndicator>>(resolve => {
		const matchedText = text.toUpperCase();
		setTimeout(() => {
			resolve(DemoTopics.filter(topic => {
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

export const fetchMockIndicator = async (indicatorId: IndicatorId): Promise<{ indicator: Indicator; topic?: Topic }> => {
	// eslint-disable-next-line
	const found = DemoIndicators.find(({indicatorId: id}) => id == indicatorId);
	if (found) {
		const indicator = JSON.parse(JSON.stringify(found));
		// eslint-disable-next-line
		const topic = indicator.topicId ? DemoTopics.find(({topicId: id}) => id == indicator.topicId) : (void 0);
		return {indicator, topic};
	} else {
		return {
			indicator: {
				...MonthlyPolicyPremiumIndicator,
				indicatorId
			}, topic: MonthlyPolicyPremium
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