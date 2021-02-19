import { ChartDef } from '../../services/tuples/chart-def/chart-def-types';
import { ChartDataSet, ChartDataSetRows, ChartType } from '../../services/tuples/chart-types';
import { Report, ReportIndicatorArithmetic } from '../../services/tuples/report-types';
import { getDimensionColumnIndexOffset } from './dimension-utils';
import { createNumberFormat } from './number-format';
import { buildTreeData } from './tree-data-builder';
import { ChartOptions, ChartUtils } from './types';

export interface Legend {
	name: string;
	rows: ChartDataSetRows
}

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

	getType(): ChartType {
		return this.def.type;
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

	abstract buildOptions(report: Report, dataset: ChartDataSet): ChartOptions;

	protected defendIndicatorCount(report: Report): void {
		// make indicators not null
		if (!report.indicators) {
			report.indicators = [];
		}
		// make indicators fulfill the minimum count
		new Array(Math.max((this.def.minIndicatorCount || 1) - report.indicators.length, 0))
			.fill(1)
			.forEach(() => report.indicators.push({ name: '', arithmetic: ReportIndicatorArithmetic.NONE }));
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
			.forEach(() => report.dimensions.push({ name: '' }));
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

	buildLegends(report: Report, dataset: ChartDataSet): Array<Legend> {
		const { dimensions } = report;

		const dimensionColumnIndexOffset = this.getDimensionColumnIndexOffset(report);

		if (dimensions.length === 1) {
			// only one dimension, use as xAxis. legend is not needed.
			// still build as legend for later logic
			return [ {
				name: dimensions[0].name,
				rows: dataset.data
			} ];
		} else {
			// multiple dimensions, first as legends, second as xAxis
			const legendMap = new Map<string, number>();
			return dataset.data.reduce<Array<Legend>>((legends, row) => {
				// values of first dimension as legends
				const dimensionValue = `${row[dimensionColumnIndexOffset]}`;
				const legendIndex = legendMap.get(dimensionValue);
				if (legendIndex == null) {
					legends.push({ name: dimensionValue, rows: [ row ] });
					legendMap.set(dimensionValue, legends.length - 1);
				} else {
					legends[legendIndex].rows.push(row);
				}
				return legends;
			}, []);
		}
	}

	findColumnExtremum(dataset: ChartDataSet, columnIndex: number): { min: number, max: number } {
		return dataset.data.reduce((extremum, row) => {
			// must be number, otherwise throw exception
			const value = (row[columnIndex] || 0) as number;
			if (value > extremum.max) {
				extremum.max = value;
			}
			if (value < extremum.min) {
				extremum.min = value;
			}
			return extremum;
		}, { max: -Infinity, min: Infinity });
	};

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
		return getDimensionColumnIndexOffset(report);
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

	protected buildTreeData(report: Report, dataset: ChartDataSet) {
		return buildTreeData(report, dataset);
	}
}