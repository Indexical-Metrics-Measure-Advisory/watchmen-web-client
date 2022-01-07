export enum AggregateArithmetic {
	NONE = 'none',
	COUNT = 'count',
	SUM = 'sum',
	AVG = 'avg'
}

export interface AggregateArithmeticHolder {
	arithmetic: AggregateArithmetic;
}