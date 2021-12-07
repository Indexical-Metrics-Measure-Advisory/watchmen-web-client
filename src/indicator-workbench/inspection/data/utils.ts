import {BucketId} from '@/services/data/tuples/bucket-types';
import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {IndicatorForInspection} from '../inspection-event-bus-types';

export enum ColumnType {
	TEXT = 'text',
	NUMERIC = 'numeric',
	TIME = 'time'
}

export interface Column {
	name: string;
	type: ColumnType;
	width?: number;
}

export type Columns = Array<Column>;

const findFactor = (topic: TopicForIndicator, factorId?: FactorId): Factor | undefined => {
	if (factorId == null) {
		return (void 0);
	}

	// eslint-disable-next-line
	return (topic.factors || []).find(factor => factor.factorId == factorId);
};

const findBucket = (buckets: Array<QueryBucket>, bucketId?: BucketId): QueryBucket | undefined => {
	if (bucketId == null) {
		return (void 0);
	}

	// eslint-disable-next-line
	return buckets.find(bucket => bucket.bucketId == bucketId);
};

const buildColumnDef = (name: string, type: ColumnType): Column => {
	return {name, type};
};

const appendColumnDef = (columns: Columns, name: string, type: ColumnType) => {
	columns.push(buildColumnDef(name, type));
};

const asArithmeticsName = (arithmetics: IndicatorAggregateArithmetic): string => {
	switch (arithmetics) {
		case IndicatorAggregateArithmetic.COUNT:
			return 'Count of';
		case IndicatorAggregateArithmetic.SUM:
			return 'Sum of';
		case IndicatorAggregateArithmetic.AVG:
			return 'Avg of';
		case IndicatorAggregateArithmetic.MAX:
			return 'Max of';
		case IndicatorAggregateArithmetic.MIN:
			return 'Min of';
		default:
			return '';
	}
};

const buildColumnForMeasureOnValue = (options: {
	inspection: Inspection;
	buckets: Array<QueryBucket>;
	columns: Array<Column>;
}) => {
	const {inspection, buckets, columns} = options;

	const measureOnBucketId = inspection.measureOnBucketId;
	if (measureOnBucketId == null) {
		// use naturally category, let column name to be factor name
		appendColumnDef(columns, 'Value', ColumnType.TEXT);
	} else {
		const bucket = findBucket(buckets, measureOnBucketId);
		appendColumnDef(columns, bucket?.name || 'Noname Bucket', ColumnType.TEXT);
	}
};
const buildColumnForMeasureOnOther = (options: {
	inspection: Inspection;
	topic: TopicForIndicator;
	buckets: Array<QueryBucket>;
	columns: Columns;
}) => {
	const {inspection, topic, buckets, columns} = options;

	const measureOnFactorId = inspection.measureOnFactorId;
	const measureOnFactor = findFactor(topic, measureOnFactorId);
	if (measureOnFactor != null) {
		const measureOnBucketId = inspection.measureOnBucketId;
		if (measureOnBucketId == null) {
			// use naturally category, let column name to be factor name
			appendColumnDef(columns, measureOnFactor.label || measureOnFactor.name || 'Noname Factor', ColumnType.TEXT);
		} else {
			const bucket = findBucket(buckets, measureOnBucketId);
			appendColumnDef(columns, bucket?.name || 'Noname Bucket', ColumnType.TEXT);
		}
	}
};
export const buildColumnDefs = (options: {
	inspection: Inspection;
	indicator: IndicatorForInspection;
	buckets: Array<QueryBucket>;
}): Columns => {
	const {inspection, indicator, buckets} = options;
	const {indicator: {factorId}, topic} = indicator;

	const factor = findFactor(topic, factorId);
	const factorName = factor?.label || factor?.name || 'Value';

	const columns: Columns = [];
	if (inspection.measureOn == null || inspection.measureOn === InspectMeasureOn.NONE) {
		// no measure
	} else if (inspection.measureOn === InspectMeasureOn.VALUE) {
		buildColumnForMeasureOnValue({inspection, buckets, columns});
	} else if (inspection.measureOn === InspectMeasureOn.OTHER) {
		buildColumnForMeasureOnOther({inspection, topic, buckets, columns});
	}

	if (inspection.measureOnTime != null) {
		const timeFactor = findFactor(topic, inspection.measureOnTimeFactorId);
		if (timeFactor != null) {
			appendColumnDef(columns, timeFactor.label || timeFactor.name || 'Noname Factor', ColumnType.TIME);
		}
	}

	(inspection.aggregateArithmetics
		?? [(factorId == null ? IndicatorAggregateArithmetic.COUNT : IndicatorAggregateArithmetic.SUM)]
	).forEach(arithmetics => {
		appendColumnDef(columns, `${asArithmeticsName(arithmetics)} ${factorName}`, ColumnType.NUMERIC);
	});

	return columns;
};