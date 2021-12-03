import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

export const createInspection = (): Inspection => {
	return {
		inspectionId: generateUuid(),
		name: '',
		aggregateArithmetics: [IndicatorAggregateArithmetic.SUM],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	} as Inspection;
};