import {Factor} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {MeasureMethodLabels} from '@/widgets/basic/measure-method-label';
import {DropdownOption} from '@/widgets/basic/types';
import {getLangLabel, Lang} from '@/widgets/langs';
import {getValidRanges} from '../../utils/range';
import {MeasureMethodSort} from '../../utils/sort';

const isOneRangeOnly = (inspection?: Inspection): boolean => {
	const ranges = getValidRanges(inspection);
	if (ranges.length === 0) {
		return false;
	}
	return [...new Set(ranges.map(range => range.value))].length === 1;
};

const buildNoTimeMeasureOption = (): DropdownOption => {
	return {
		value: {factorId: null, measure: null},
		label: Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE,
		key: ''
	};
};

const buildMeasureOptions = (factor: Factor, measures: Array<MeasureMethod>): Array<DropdownOption> => {
	return measures.map(measure => {
		return {
			value: {factorId: factor.factorId, measure},
			label: () => {
				// @ts-ignore
				const measureLabel = getLangLabel(MeasureMethodLabels[measure].props.labelKey);
				const factorLabel = factor.label || factor.name || 'Noname Factor';
				return {
					node: <>{MeasureMethodLabels[measure]} - {factorLabel}</>,
					label: [measureLabel, factorLabel].join(',')
				};
			},
			key: `${factor.factorId}-${measure}`
		};
	});
};

const buildMeasureOptionsOnOtherFactors = (topic: TopicForIndicator, firstFactor?: Factor): Array<DropdownOption> => {
	return (topic.factors || [])
		.filter(factor => factor !== firstFactor)
		.map(factor => ({factor, measures: tryToTransformToMeasures(factor)}))
		.filter(({measures}) => measures.some(measure => isTimePeriodMeasure(measure)))
		.map(({factor, measures}) => {
			return {
				factor,
				measures: measures.filter(measure => isTimePeriodMeasure(measure))
					.sort((m1, m2) => MeasureMethodSort[m1] - MeasureMethodSort[m2])
			};
		}).sort(({factor: f1}, {factor: f2}) => {
			return (f1.label || f1.name || '').localeCompare(f2.label || f2.name || '', void 0, {
				sensitivity: 'base',
				caseFirst: 'upper'
			});
		}).map(({factor, measures}) => {
			return buildMeasureOptions(factor, measures);
		}).flat();
};

const isDescendantOf = (measure: MeasureMethod, ancestor?: MeasureMethod): boolean => {
	if (ancestor == null) {
		return true;
	}

	switch (ancestor) {
		case MeasureMethod.YEAR:
			return [MeasureMethod.HALF_YEAR, MeasureMethod.QUARTER, MeasureMethod.MONTH, MeasureMethod.WEEK_OF_YEAR].includes(measure);
		case MeasureMethod.MONTH:
			return [MeasureMethod.HALF_MONTH, MeasureMethod.WEEK_OF_MONTH, MeasureMethod.DAY_OF_MONTH].includes(measure);
		default:
			return false;
	}
};

export const buildTimeMeasureOptions = (inspection: Inspection, topic: TopicForIndicator, firstFactor?: Factor): Array<DropdownOption> => {
	if (topic == null) {
		return [];
	}

	return [
		buildNoTimeMeasureOption(),
		// measure on factor itself.
		// when filter is only one value, top time measure is not applicable since only one group will be addressed
		...(firstFactor == null
			? []
			: buildMeasureOptions(firstFactor, isOneRangeOnly(inspection)
				? tryToTransformToMeasures(firstFactor).filter(measure => isDescendantOf(measure, inspection.timeRangeMeasure))
				: tryToTransformToMeasures(firstFactor))),
		...buildMeasureOptionsOnOtherFactors(topic, firstFactor)
	];
};