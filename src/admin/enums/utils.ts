import { Enum } from '../../services/tuples/enum-types';
import { generateUuid } from '../../services/tuples/utils';
import { getCurrentTime } from '../../services/utils';

export const createEnum = (): Enum => {
	return {
		enumId: generateUuid(),
		name: '',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};
