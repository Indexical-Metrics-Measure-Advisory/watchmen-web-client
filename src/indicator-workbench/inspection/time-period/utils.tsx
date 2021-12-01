import {Factor} from '@/services/data/tuples/factor-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {MeasureMethodLabel} from '@/widgets/basic/measure-method-label';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const buildTimePeriodOptions = (topic: TopicForIndicator): Array<DropdownOption> => {
	return (topic.factors || []).filter(factor => {
		const measures = tryToTransformToMeasures(factor);
		return measures.some(measure => isTimePeriodMeasure(measure));
	}).map(factor => {
		return {
			value: factor.factorId,
			label: factor.label || factor.name || 'Noname Factor'
		};
	});
};

export const buildTimeMeasureOptions = (factor?: Factor): Array<DropdownOption> => {
	if (factor == null) {
		return [];
	}

	return [
		{
			value: '', label: () => {
				return {
					node: Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE,
					label: 'no time measure'
				};
			}, key: ''
		},
		...tryToTransformToMeasures(factor).map(measure => {
			return {
				value: measure,
				label: () => {
					return {
						node: <MeasureMethodLabel measureMethod={measure}/>,
						label: measure
					};
				},
				key: measure
			};
		})
	];
};