import {Factor} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Inspection, InspectionYearRange} from '@/services/data/tuples/inspection-types';
import {isInspectionYearRange} from '@/services/data/tuples/inspection-utils';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {isNotNull} from '@/services/data/utils';
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

export const getValidYearRanges = (inspection?: Inspection): Array<InspectionYearRange> => {
	if (inspection == null) {
		return [];
	}

	if (inspection.timeRange == null || inspection.timeRange.length === 0) {
		return [];
	}

	return inspection.timeRange.filter(isNotNull)
		.filter(isInspectionYearRange)
		.filter(range => range.year != null);
};

export const isOneYearOnly = (inspection?: Inspection): boolean => {
	const ranges = getValidYearRanges(inspection);
	if (ranges.length === 0) {
		return false;
	}
	return [...new Set(ranges.map(range => range.year))].length === 1;
};

const buildNoTimeMeasureOption = (): DropdownOption => {
	return {
		value: '', label: () => {
			return {
				node: Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE,
				label: 'no time measure'
			};
		}, key: ''
	};
};
const buildMeasureOptions = (measures: Array<MeasureMethod>): Array<DropdownOption> => {
	return measures.map(measure => {
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
	});
};

export const buildTimeMeasureOptions = (inspection: Inspection, factor?: Factor): { annual: boolean, options: Array<DropdownOption> } => {
	if (factor == null) {
		return {annual: false, options: []};
	}

	const measures = tryToTransformToMeasures(factor);
	if (measures.includes(MeasureMethod.YEAR)) {
		const oneYearOnly = isOneYearOnly(inspection);
		const options = buildMeasureOptions(oneYearOnly ? measures.filter(measure => measure !== MeasureMethod.YEAR) : measures);
		return {
			annual: true,
			options: [
				buildNoTimeMeasureOption(),
				...options
			]
		};
	} else {
		return {
			annual: false,
			options: [
				buildNoTimeMeasureOption(),
				...buildMeasureOptions(measures)
			]
		};
	}
};