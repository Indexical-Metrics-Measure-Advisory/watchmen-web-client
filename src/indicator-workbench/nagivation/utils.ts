import {Navigation} from '@/services/data/tuples/navigation-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

export const createNavigation = (): Navigation => {
	return {
		navigationId: generateUuid(),
		name: '',
		indicators: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};
