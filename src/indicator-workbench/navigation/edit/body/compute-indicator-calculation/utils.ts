import {PropOf} from '@/services/types';
import {AllCalculatedIndicatorValues} from '../types';

export const computeScore = (data: PropOf<AllCalculatedIndicatorValues, 'data'>): Pick<AllCalculatedIndicatorValues, 'failed' | 'shouldComputeScore' | 'score'> => {
	const score = data.reduce((sum, pair) => {
		const {values: {shouldComputeScore, score: {value: score = 0} = {}}} = pair;
		if (shouldComputeScore) {
			sum = sum + Number(score.toFixed(1));
		}

		return sum;
	}, 0);
	return {
		failed: false,
		shouldComputeScore: true,
		score: {
			value: score,
			formatted: score.toFixed(1)
		}
	};
};
