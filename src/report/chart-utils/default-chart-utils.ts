import { ChartDef } from '../../services/tuples/chart-def/chart-def-types';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report, ReportIndicatorArithmetic } from '../../services/tuples/report-types';
import { createNumberFormat } from './number-format';
import { ChartUtils } from './types';

export type ReportValidator = (report: Report, def: ChartDef) => ReportValidationSuccess | ReportValidationFailure;

export interface ReportValidationFailure {
	readonly pass: false,
	readonly error: string;
}

export interface ReportValidationSuccess {
	readonly pass: true,
}

export const VALIDATION_SUCCESS: ReportValidationSuccess = { pass: true };
export const createValidationFailure = (message: string) => ({ pass: false, error: message });

export const DEFAULT_INDICATOR_COUNT_VALIDATOR: ReportValidator = (report: Report, def: ChartDef) => {
	const count = report.indicators?.length || 0;
	if (count > (def.maxIndicatorCount || 1)) {
		return createValidationFailure('Too many indicators exits.');
	}
	if (count < (def.minIndicatorCount || 1)) {
		return createValidationFailure('Do not have enough indicator(s).');
	}
	return VALIDATION_SUCCESS;
};
export const DEFAULT_DIMENSION_COUNT_VALIDATOR: ReportValidator = (report: Report, def: ChartDef) => {
	const count = report.dimensions?.length || 0;
	if (count > (def.maxDimensionCount || 1)) {
		return createValidationFailure('Too many dimensions exits.');
	}
	if (count < (def.minDimensionCount || 1)) {
		return createValidationFailure('Do not have enough dimension(s).');
	}
	return VALIDATION_SUCCESS;
};


export abstract class DefaultChartUtils implements ChartUtils {
	private readonly _def: ChartDef;

	protected constructor(def: ChartDef) {
		this._def = def;
	}

	protected get def(): ChartDef {
		return this._def;
	}

	canAppendDimensions(report: Report): boolean {
		const currentCount = report.dimensions?.length || 0;
		const { maxDimensionCount = 1 } = this.def;
		return currentCount < maxDimensionCount;
	}

	canReduceDimensions(report: Report): boolean {
		const currentCount = report.dimensions?.length || 0;
		const { minDimensionCount = 1 } = this.def;
		return currentCount > minDimensionCount;
	}

	canAppendIndicators(report: Report): boolean {
		const currentCount = report.indicators?.length || 0;
		const { maxIndicatorCount = 1 } = this.def;
		return currentCount < maxIndicatorCount;
	}

	canReduceIndicators(report: Report): boolean {
		const currentCount = report.indicators?.length || 0;
		const { minIndicatorCount = 1 } = this.def;
		return currentCount > minIndicatorCount;
	}

	abstract buildOptions(report: Report, dataset: ChartDataSet): echarts.EChartOption | echarts.EChartsResponsiveOption;

	protected defendIndicatorCount(report: Report): void {
		// make indicators not null
		if (!report.indicators) {
			report.indicators = [];
		}
		// make indicators fulfill the minimum count
		new Array(Math.max((this.def.minIndicatorCount || 1) - report.indicators.length, 0))
			.fill(1)
			.forEach(() => report.indicators.push({ column: '', arithmetic: ReportIndicatorArithmetic.NONE }));
		// make indicators fulfill the maximum count
		const maxIndicatorCount = (this.def.maxIndicatorCount || 1);
		if (report.indicators.length > maxIndicatorCount) {
			report.indicators.length = maxIndicatorCount;
		}
	}

	protected defendDimensionCount(report: Report): void {
		// make dimensions not null
		if (!report.dimensions) {
			report.dimensions = [];
		}
		// make dimensions fulfill the minimum count
		new Array(Math.max((this.def.minDimensionCount || 1) - report.dimensions.length, 0))
			.fill(1)
			.forEach(() => report.dimensions.push({ column: '' }));
		// make dimensions fulfill the maximum count
		const maxDimensionCount = (this.def.maxDimensionCount || 1);
		if (report.dimensions.length > maxDimensionCount) {
			report.dimensions.length = maxDimensionCount;
		}
	}

	defend(report: Report): void {
		this.defendIndicatorCount(report);
		this.defendDimensionCount(report);
	}

	protected get indicatorCountValidator(): ReportValidator {
		return DEFAULT_INDICATOR_COUNT_VALIDATOR;
	}

	protected get dimensionCountValidator(): ReportValidator {
		return DEFAULT_DIMENSION_COUNT_VALIDATOR;
	}

	protected getValidators(): Array<ReportValidator> {
		return [
			this.indicatorCountValidator,
			this.dimensionCountValidator
		];
	}

	validate(report: Report): boolean | string {
		const validationResult = this.getValidators().reduce((prev: ReportValidationSuccess | ReportValidationFailure, validate) => {
			if (!prev.pass) {
				// previous not passed, return directly
				return prev;
			} else {
				return validate(report, this.def);
			}
		}, { pass: true });
		return validationResult.pass || validationResult.error;
	}

	protected formatNumber(value: any, decimal: number = 0): any {
		if (typeof value === 'number') {
			return createNumberFormat(decimal)(value);
		} else {
			return value;
		}
	};

	/**
	 * get dimension column index offset from starting
	 */
	protected getDimensionColumnIndexOffset(report: Report) {
		return report.indicators.length || 0;
	};

	protected buildDescartesByDimensions(report: Report, dataset: ChartDataSet) {
		const { data } = dataset;
		const { dimensions } = report;

		const columnIndexOffset = this.getDimensionColumnIndexOffset(report);
		const dimensionIndexes = new Array(dimensions.length).fill(1).map((v, index) => index + columnIndexOffset);
		return data.map(row => {
			return { value: dimensionIndexes.map(index => row[index]).join(','), row };
		});
	};
}