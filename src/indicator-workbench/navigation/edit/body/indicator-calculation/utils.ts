import {isXaNumber} from '@/services/utils';

export const toNumber = (x: any): number | '' => {
	if (x == null || !isXaNumber(x)) {
		return '';
	}
	try {
		const v = Number(x);
		return Number.isNaN(v) ? '' : v;
	} catch {
		return '';
	}
};

export const formatToNumber = (x: any, fractionDigits: number = 2) => {
	const v = toNumber(x);
	return v === '' ? '' : v.toFixed(fractionDigits);
};

export const computeRatio = (currentValue: any, previousValue: any): string => {
	const current = toNumber(currentValue);
	const previous = toNumber(previousValue);
	if (current === '') {
		return '0.00';
	} else if (previous === '') {
		return '100.00';
	} else {
		return ((current - previous) / previous * 100).toFixed(2);
	}
};
