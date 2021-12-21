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

export const computeRatio = (currentValue: any, previousValue: any): number => {
	const current = toNumber(currentValue);
	const previous = toNumber(previousValue);
	if (current === '') {
		return 0;
	} else if (previous === '') {
		return 100;
	} else {
		return (current - previous) / previous * 100;
	}
};

export type ComputedScore = { ratio: number, ratioStr: string, score?: number, scoreStr?: string, useScore: boolean };
export const computeScore = (options: {
	script?: string;
	current?: number;
	previous?: number;
}): ComputedScore => {
	const {script, current, previous} = options;
	const ratio = computeRatio(current, previous);

	const useScore = script != null && script.trim().length !== 0;
	if (useScore) {
		const score = (() => {
			try {
				const mathFunctionNames = Object.getOwnPropertyNames(Math);
				const runScript = script.split('\n')
					.filter(x => x != null && x.trim().length !== 0)
					.map((line, index, lines) => {
						return lines.length === index + 1 ? `return ${line}` : line;
					}).join('\n');
				const args = ['c', 'p', 'r', ...mathFunctionNames, runScript];
				// eslint-disable-next-line
				const func = new Function(...args);
				// @ts-ignore
				const params = [current, previous, ratio, ...mathFunctionNames.map(name => Math[name])];
				return func(...params);
			} catch (e) {
				console.groupCollapsed('Navigation Indicator Formula Script Error');
				console.error(e);
				console.groupEnd();
				return (void 0);
			}
		})();
		const scoreStr = formatToNumber(score);
		return {ratio, ratioStr: ratio.toFixed(2), useScore: true, score, scoreStr};
	} else {
		return {ratio, ratioStr: ratio.toFixed(2), useScore: false};
	}
};
