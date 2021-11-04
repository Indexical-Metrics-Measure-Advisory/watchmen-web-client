import {Indicator, MeasureMethod, QueryIndicator} from '../../indicators/types';
import {MonthlyPolicyPremium, WeeklyPolicyPremium} from '../tuples/mock-data-topics';

const MonthlyPolicyPremiumIndicator: Indicator = {
	indicatorId: '1',
	name: 'Monthly Policy Premium',
	topicId: MonthlyPolicyPremium.topicId,
	factorId: MonthlyPolicyPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	measures: [MeasureMethod.YEAR, MeasureMethod.MONTH]
};
const WeeklyPolicyPremiumIndicator: Indicator = {
	indicatorId: '2',
	name: 'Weekly Policy Premium',
	topicId: WeeklyPolicyPremium.topicId,
	factorId: WeeklyPolicyPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	measures: [MeasureMethod.YEAR, MeasureMethod.WEEK_OF_YEAR]
};

const PolicyPremiumIndicators = [MonthlyPolicyPremiumIndicator, WeeklyPolicyPremiumIndicator];

export const fetchMockIndicatorsForSelection = async (text: string): Promise<Array<QueryIndicator>> => {
	return new Promise<Array<QueryIndicator>>(resolve => {
		setTimeout(() => {
			resolve(PolicyPremiumIndicators.filter(indicator => indicator.name.toUpperCase().includes(text.toUpperCase())));
		}, 500);
	});
};
