import {Chart} from '@/services/data/tuples/chart-types';
import {Report} from '@/services/data/tuples/report-types';
import {isXaNumber} from '@/services/utils';
import {DropdownOption} from '@/widgets/basic/types';
import {BooleanPropNames} from './prop-defs/prop-types/boolean-props';
import {ColorPropNames} from './prop-defs/prop-types/color-props';
import {DropdownPropNames} from './prop-defs/prop-types/dropdown-props';
import {NumberPropNames} from './prop-defs/prop-types/number-props';
import {TextPropNames} from './prop-defs/prop-types/text-props';

export const assignValue = (chart: Chart, propNames: string, value: any, removePropOnNoValue: boolean) => {
	if (!chart.settings) {
		chart.settings = {};
	}

	const names = propNames.split('.');
	let holder = chart.settings as any;
	for (let index = 0, count = names.length - 1; index < count; index++) {
		const parent = holder;
		holder = parent[names[index]];
		if (!holder) {
			holder = {};
			parent[names[index]] = holder;
		}
	}
	if (value == null && removePropOnNoValue) {
		delete holder[names[names.length - 1]];
	} else {
		holder[names[names.length - 1]] = value;
	}
};

export const onTextValueChange = (options: {
	report: Report;
	chart: Chart;
	prop: TextPropNames;
	done: (report: Report, chart: Chart, prop: string, value: string) => void;
}) => (value: string) => {
	const {report, chart, prop, done} = options;
	assignValue(chart, prop, value, true);
	done(report, chart, prop, value);
};
export const onColorChange = (options: {
	report: Report;
	chart: Chart;
	prop: ColorPropNames;
	done: (report: Report, chart: Chart, prop: string, color?: string) => void;
}) => (color?: string) => {
	const {report, chart, prop, done} = options;
	assignValue(chart, prop, color, true);
	done(report, chart, prop, color);
};
export const validateNumber = (fractionDigits: number) => (value: string) => {
	return new RegExp(`^\\d{1,${fractionDigits}}$`).test(value);
};
export const validatePercentage = (value: string): boolean => {
	return isXaNumber(value);
};
export const isANumber = (value: string) => {
	try {
		parseInt(value);
		return true;
	} catch {
		return false;
	}
};
export const isANumberAndInRange = (min: number, max: number) => (value: string) => {
	if (!isANumber(value)) {
		return false;
	}
	const v = parseInt(value);
	return min <= v && v <= max;
};
export const onNumberChange = (options: {
	report: Report;
	chart: Chart;
	prop: NumberPropNames;
	done: (report: Report, chart: Chart, prop: string, value?: number) => void;
}) => (value?: string): number | undefined => {
	const {report, chart, prop, done} = options;
	const numberValue = isXaNumber(value) ? Number(value) : (void 0);
	assignValue(chart, prop, numberValue, true);
	done(report, chart, prop, numberValue);
	return numberValue;
};
export const onPercentageChange = (options: {
	report: Report;
	chart: Chart;
	prop: NumberPropNames;
	done: (report: Report, chart: Chart, prop: string, value?: number | string) => void;
}) => (value?: string): number | undefined => {
	return onNumberChange(options)(value);
};
export const onDropdownValueChange = (options: {
	report: Report;
	chart: Chart;
	prop: DropdownPropNames;
	done: (report: Report, chart: Chart, prop: string, value: string) => void;
}) => (option: DropdownOption) => {
	const {report, chart, prop, done} = options;
	const {value} = option;
	assignValue(chart, prop, value, false);
	done(report, chart, prop, value);
};
export const onBooleanChange = (options: {
	report: Report;
	chart: Chart;
	prop: BooleanPropNames;
	done: (report: Report, chart: Chart, prop: string, value: boolean) => void;
}) => (value: boolean) => {
	const {report, chart, prop, done} = options;
	assignValue(chart, prop, value, false);
	done(report, chart, prop, value);
};


