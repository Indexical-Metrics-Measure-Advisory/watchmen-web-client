import {Indicator} from '../../tuples/indicator-types';
import {getCurrentTime} from '../../utils';
import {BUCKET_AMOUNT_ID} from './mock-data-buckets';
import {MonthlyOrderPremium, Order, WeeklyOrderPremium} from './mock-data-topics';

export const INDICATOR_ORDER_PREMIUM_ID = '1';
export const INDICATOR_MONTHLY_ORDER_PREMIUM_ID = '2';
export const INDICATOR_WEEKLY_ORDER_PREMIUM_ID = '3';

const OrderPremiumIndicator: Indicator = {
	indicatorId: INDICATOR_ORDER_PREMIUM_ID,
	name: 'Order Premium',
	topicId: Order.topicId,
	factorId: Order.factors.find(factor => factor.name === 'premium')?.factorId,
	valueBuckets: [BUCKET_AMOUNT_ID],
	category1: 'premium',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const MonthlyOrderPremiumIndicator: Indicator = {
	indicatorId: INDICATOR_MONTHLY_ORDER_PREMIUM_ID,
	name: 'Monthly Order Premium',
	topicId: MonthlyOrderPremium.topicId,
	factorId: MonthlyOrderPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	category1: 'premium',
	category2: 'short term',
	category3: 'monthly',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
const WeeklyOrderPremiumIndicator: Indicator = {
	indicatorId: INDICATOR_WEEKLY_ORDER_PREMIUM_ID,
	name: 'Weekly Order Premium',
	topicId: WeeklyOrderPremium.topicId,
	factorId: WeeklyOrderPremium.factors.find(factor => factor.name === 'premium')?.factorId,
	category1: 'premium',
	category2: 'short term',
	category3: 'weekly',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const OrderPremiumIndicators = [OrderPremiumIndicator, MonthlyOrderPremiumIndicator, WeeklyOrderPremiumIndicator];
export const DemoIndicators = [OrderPremiumIndicators].flat();