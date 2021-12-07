import {Factor} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {MeasureMethodLabels} from '@/widgets/basic/measure-method-label';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
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
		value: '',
		label: Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE
	};
};

const buildFirstFactorAsTimeFactor = (inspection: Inspection, firstFactor?: Factor): Array<DropdownOption> => {
	if (firstFactor == null) {
		return [];
	}

	const available = !isOneRangeOnly(inspection)
		|| tryToTransformToMeasures(firstFactor).filter(measure => isDescendantOf(measure, inspection.timeRangeMeasure)).length !== 0;

	return available ? [{
		value: firstFactor.factorId,
		label: firstFactor.label || firstFactor.name || 'Noname Factor'
	}] : [];
};

const buildOtherAsTimeFactors = (topic: TopicForIndicator, firstFactor?: Factor): Array<DropdownOption> => {
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
		}).map(({factor}) => {
			return {value: factor.factorId, label: factor.label || factor.name || 'Noname Factor'};
		});
};

export const buildTimeFactorOptions = (inspection: Inspection, topic: TopicForIndicator, firstFactor?: Factor): Array<DropdownOption> => {
	if (topic == null) {
		return [];
	}

	return [
		buildNoTimeMeasureOption(),
		// measure on factor itself.
		// when filter is only one value, top time measure is not applicable since only one group will be addressed
		...buildFirstFactorAsTimeFactor(inspection, firstFactor),
		...buildOtherAsTimeFactors(topic, firstFactor)
	];
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

	const measureOnTimeFactorId = inspection.measureOnTimeFactorId;
	if (measureOnTimeFactorId == null) {
		return [];
	}

	// eslint-disable-next-line
	const factor = (topic.factors || []).find(factor => factor.factorId == measureOnTimeFactorId);
	if (factor == null) {
		return [];
	}
	let measures;
	if (factor === firstFactor) {
		measures = isOneRangeOnly(inspection)
			? tryToTransformToMeasures(firstFactor).filter(measure => isDescendantOf(measure, inspection.timeRangeMeasure))
			: tryToTransformToMeasures(firstFactor);
	} else {
		measures = tryToTransformToMeasures(factor);
	}

	return measures.map(measure => {
		return {
			value: measure,
			label: MeasureMethodLabels[measure]
		};
	});
};