import {RowOfAny} from '@/services/data/types';

export const buildXAxis = (data: Array<RowOfAny>, columnIndex: number) => {
	return [...new Set(data.map(row => row[columnIndex]))].sort((t1, t2) => {
		return `${t1 || ''}`.localeCompare(`${t2 || ''}`, void 0, {numeric: true});
	});
};

export const buildLegend = (data: Array<RowOfAny>, columnIndex: number) => {
	return [...new Set(data.map(row => row[columnIndex]))];
};