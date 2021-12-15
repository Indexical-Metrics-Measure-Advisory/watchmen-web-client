import {Navigation} from '../../tuples/navigation-types';
import {getCurrentTime} from '../../utils';

export const NAVIGATION_PREMIUM_ID = '1';

export const NavPremium: Navigation = {
	navigationId: NAVIGATION_PREMIUM_ID,
	name: 'Premium',
	indicators: [],
	description: 'Premium Navigation',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoNavigations = [NavPremium];
export const DemoQueryNavigations = DemoNavigations;