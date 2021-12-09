import {RowOfAny} from '@/services/data/types';
import {ColumnIndexMap, isColumnIndexAssigned} from '../chart-utils';

export interface SingleMeasureNames {
	columnIndex: number;
	data: RowOfAny;
}

export const buildSingleMeasureNames = (data: Array<RowOfAny>, columnIndexMap: ColumnIndexMap): SingleMeasureNames => {
	const columnIndex = isColumnIndexAssigned(columnIndexMap.timeGrouping) ? columnIndexMap.timeGrouping : columnIndexMap.bucketOn;
	return {
		columnIndex,
		data: [...new Set(data.map(row => row[columnIndex]))].sort((t1, t2) => {
			return `${t1 || ''}`.localeCompare(`${t2 || ''}`, void 0, {numeric: true});
		})
	};
};

export const buildTimeGroupingNames = (data: Array<RowOfAny>, columnIndexMap: ColumnIndexMap): SingleMeasureNames => {
	return {
		columnIndex: columnIndexMap.timeGrouping,
		data: [...new Set(data.map(row => row[columnIndexMap.timeGrouping]))].sort((t1, t2) => {
			return `${t1 || ''}`.localeCompare(`${t2 || ''}`, void 0, {numeric: true});
		})
	};
};

export const buildBucketOnNames = (data: Array<RowOfAny>, columnIndexMap: ColumnIndexMap): SingleMeasureNames => {
	return {
		columnIndex: columnIndexMap.bucketOn,
		data: [...new Set(data.map(row => row[columnIndexMap.bucketOn]))]
	};
};
