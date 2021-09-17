export const NUMBER_FORMAT_DECIMAL_0 = new Intl.NumberFormat(undefined, {
	useGrouping: false,
	maximumFractionDigits: 0
}).format;
export const NUMBER_FORMAT_DECIMAL_1 = new Intl.NumberFormat(undefined, {
	useGrouping: false,
	maximumFractionDigits: 1
}).format;
export const NUMBER_FORMAT_DECIMAL_2 = new Intl.NumberFormat(undefined, {
	useGrouping: false,
	maximumFractionDigits: 2
}).format;
export const NUMBER_FORMAT_DECIMAL_3 = new Intl.NumberFormat(undefined, {
	useGrouping: false,
	maximumFractionDigits: 3
}).format;
export const NUMBER_FORMAT_DECIMAL_4 = new Intl.NumberFormat(undefined, {
	useGrouping: false,
	maximumFractionDigits: 4
}).format;
export const PREDEFINED_NUMBER_FORMATS = [
	NUMBER_FORMAT_DECIMAL_0,
	NUMBER_FORMAT_DECIMAL_1,
	NUMBER_FORMAT_DECIMAL_2,
	NUMBER_FORMAT_DECIMAL_3,
	NUMBER_FORMAT_DECIMAL_4
];
export const createNumberFormat = (decimal: number, useGrouping: boolean = false) => {
	if (decimal < 5 && !useGrouping) {
		return PREDEFINED_NUMBER_FORMATS[decimal];
	} else {
		return new Intl.NumberFormat(undefined, {useGrouping, maximumFractionDigits: decimal}).format;
	}
};
export const PREDEFINED_GROUPING_FORMATS = new Intl.NumberFormat(undefined, {useGrouping: true}).format;
