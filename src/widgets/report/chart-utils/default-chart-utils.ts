import {ChartDef} from '@/services/data/tuples/chart-def/chart-def-types';
import {ChartDataSet, ChartDataSetRow, ChartDataSetRows, ChartType} from '@/services/data/tuples/chart-types';
import {Report, ReportIndicatorArithmetic} from '@/services/data/tuples/report-types';
import {getDimensionColumnIndexOffset} from './dimension-utils';
import {createNumberFormat} from './number-format';
import {buildTreeData} from './tree-data-builder';
import {ChartOptions, ChartUtils} from './types';

export interface Legend {
	name: string;
	rows: ChartDataSetRows;
}

export type ReportValidator = (report: Report, def: ChartDef) => ReportValidationSuccess | ReportValidationFailure;

export interface ReportValidationFailure {
	readonly pass: false,
	readonly error: string;
}

export interface ReportValidationSuccess {
	readonly pass: true,
}

export const VALIDATION_SUCCESS: ReportValidationSuccess = {pass: true};
export const createValidationFailure = (message: string) => ({pass: false, error: message});

export const DEFAULT_INDICATOR_COUNT_VALIDATOR: ReportValidator = (report: Report, def: ChartDef) => {
	const count = report.indicators?.length || 0;
	const {minIndicatorCount = 1, maxIndicatorCount = 1} = def;
	if (count > maxIndicatorCount) {
		return createValidationFailure('Too many indicators exits.');
	}
	if (count < minIndicatorCount) {
		return createValidationFailure('Do not have enough indicator(s).');
	}
	return VALIDATION_SUCCESS;
};
export const DEFAULT_DIMENSION_COUNT_VALIDATOR: ReportValidator = (report: Report, def: ChartDef) => {
	const count = report.dimensions?.length || 0;
	const {minDimensionCount = 1, maxDimensionCount = 1} = def;
	if (count > maxDimensionCount) {
		return createValidationFailure('Too many dimensions exits.');
	}
	if (count < minDimensionCount) {
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
	protected get indicatorCountValidator(): ReportValidator {
		return DEFAULT_INDICATOR_COUNT_VALIDATOR;
	}
	protected get dimensionCountValidator(): ReportValidator {
		return DEFAULT_DIMENSION_COUNT_VALIDATOR;
	}
	getDef(): ChartDef {
		return this.def;
	}
	getType(): ChartType {
		return this.def.type;
	}

	shouldHasIndicator(): boolean {
		return true;
	}
	getMaxIndicatorCount(): number {
		const {maxIndicatorCount = Infinity} = this.def;
		return maxIndicatorCount;
	}
	canAppendIndicators(report: Report): boolean {
		const currentCount = report.indicators?.length || 0;
		return currentCount < this.getMaxIndicatorCount();
	}
	canReduceIndicators(report: Report): boolean {
		const currentCount = report.indicators?.length || 0;
		const {minIndicatorCount = 1} = this.def;
		return currentCount > minIndicatorCount;
	}
	defendIndicatorMinCount(report: Report): void {
		// make indicators not null
		if (!report.indicators) {
			report.indicators = [];
		}
		// make indicators fulfill the minimum count
		const {minIndicatorCount = 1} = this.def;
		new Array(Math.max(minIndicatorCount - report.indicators.length, 0))
			.fill(1)
			.forEach(() => report.indicators.push({
				columnId: '',
				name: '',
				arithmetic: ReportIndicatorArithmetic.NONE
			}));
	}
	defendIndicatorMaxCount(report: Report): void {
		// make indicators not null
		if (!report.indicators) {
			report.indicators = [];
		}
		// make indicators fulfill the maximum count
		const maxIndicatorCount = this.getMaxIndicatorCount();
		if (report.indicators.length > maxIndicatorCount) {
			report.indicators.length = maxIndicatorCount;
		}
	}

	shouldHasDimension(): boolean {
		return true;
	}
	getMaxDimensionCount(): number {
		const {maxDimensionCount = Infinity} = this.def;
		return maxDimensionCount;
	}
	canAppendDimensions(report: Report): boolean {
		const currentCount = report.dimensions?.length || 0;
		return currentCount < this.getMaxDimensionCount();
	}
	canReduceDimensions(report: Report): boolean {
		const currentCount = report.dimensions?.length || 0;
		const {minDimensionCount = 1} = this.def;
		return currentCount > minDimensionCount;
	}
	defendDimensionMinCount(report: Report): void {
		// make dimensions not null
		if (!report.dimensions) {
			report.dimensions = [];
		}
		// make dimensions fulfill the minimum count
		const {minDimensionCount = 1} = this.def;
		new Array(Math.max(minDimensionCount - report.dimensions.length, 0))
			.fill(1)
			.forEach(() => report.dimensions.push({columnId: '', name: ''}));
	}
	defendDimensionMaxCount(report: Report): void {
		// make dimensions not null
		if (!report.dimensions) {
			report.dimensions = [];
		}
		// make dimensions fulfill the maximum count
		const maxDimensionCount = this.getMaxDimensionCount();
		if (report.dimensions.length > maxDimensionCount) {
			report.dimensions.length = maxDimensionCount;
		}
	}

	shouldHasTruncation(): boolean {
		return true;
	}

	shouldHasFunnel(): boolean {
		return true;
	}

	defend(report: Report): void {
		this.defendIndicatorMinCount(report);
		this.defendIndicatorMaxCount(report);
		this.defendDimensionMinCount(report);
		this.defendDimensionMaxCount(report);
	}
	validate(report: Report): boolean | string {
		const validationResult = this.getValidators().reduce((prev: ReportValidationSuccess | ReportValidationFailure, validate) => {
			if (!prev.pass) {
				// previous not passed, return directly
				return prev;
			} else {
				return validate(report, this.def);
			}
		}, {pass: true});
		return validationResult.pass || validationResult.error;
	}

	abstract buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions>;

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
		}, {max: -Infinity, min: Infinity});
	};
	protected getValidators(): Array<ReportValidator> {
		return [
			this.indicatorCountValidator,
			this.dimensionCountValidator
		];
	}
	protected formatNumber(value: any, decimal: number = 0): any {
		if (typeof value === 'number') {
			return createNumberFormat(decimal)(value);
		} else {
			return value;
		}
	};

	/**
	 * get dimension column index offset from starting.
	 * in dataset, order of columns as below,
	 * indicator 1, indicator 2, ..., indicator n, dimension 1, dimension 2, ..., dimension n.
	 */
	protected getDimensionColumnIndexOffset(report: Report) {
		// there are some unnecessary indicators remained because chart type changed
		return Math.min(getDimensionColumnIndexOffset(report), this.getMaxIndicatorCount());
	};

	protected buildDescartesByDimensions(report: Report, dataset: ChartDataSet): Array<{ value: any, row: ChartDataSetRow }> {
		const {data} = dataset;
		const {dimensions} = report;

		const columnIndexOffset = this.getDimensionColumnIndexOffset(report);
		const dimensionIndexes = new Array(dimensions.length).fill(1).map((v, index) => index + columnIndexOffset);
		return data.map(row => {
			return {value: dimensionIndexes.map(index => row[index]).join(','), row};
		});
	};

	protected buildTreeData(report: Report, dataset: ChartDataSet) {
		return buildTreeData(report, dataset);
	}
}