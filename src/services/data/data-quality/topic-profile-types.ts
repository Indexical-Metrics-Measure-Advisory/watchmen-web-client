// pandas format
export enum TopicProfileFactorType {
	CATEGORICAL = 'Categorical',
	NUMERIC = 'Numeric',
	DATETIME = 'DateTime',
	UNSUPPORTED = 'Unsupported'
}

export interface TopicProfileFactor {
	n_distinct: number;
	p_distinct: number;
	is_unique: boolean;
	n_unique: number;
	p_unique: number;
	type: TopicProfileFactorType;
	hashable: boolean;
	value_counts_without_nan: Record<string, number>;
	value_counts_index_sorted: Record<string, number>;
	ordering: boolean;
	n_missing: number;
	n: number;
	p_missing: number;
	count: number;
	memory_size: number;
}

export interface TopicProfileCategoricalFactor extends TopicProfileFactor {
	type: TopicProfileFactorType.CATEGORICAL;
	histogram_frequencies?: {
		counts: Array<number>;
		bin_edges: Array<number>;
	};
	first_rows: Record<string, string>;
	mode: string;
}

export interface TopicProfileNumericFactor extends TopicProfileFactor {
	type: TopicProfileFactorType.NUMERIC;
	n_zeros: number;
	p_zeros: number;
	n_negative: number;
	p_negative: number;
	n_infinite: number;
	p_infinite: number;
	mean: number;
	std: number;
	variance: number;
	min: number;
	max: number;
	kurtosis: number;
	skewness: number;
	sum: number;
	mad: number;
	range: number;
	'5%': number;
	'25%': number;
	'50%': number;
	'75%': number;
	'95%': number;
	iqr: number;
	cv: number;
	monotonic_increase: boolean;
	monotonic_decrease: boolean;
	monotonic_increase_strict: boolean;
	monotonic_decrease_strict: boolean;
	monotonic: number;
	histogram?: {
		counts: Array<number>;
		bin_edges: Array<number>;
	};
}

export interface TopicProfileDateTimeFactor extends TopicProfileFactor {
	type: TopicProfileFactorType.DATETIME;
	min: string;
	max: string;
	range: string;
	histogram_frequencies?: {
		counts: Array<number>;
		bin_edges: Array<number>;
	};
}

export interface TopicProfileUnsupportedFactor extends TopicProfileFactor {
	type: TopicProfileFactorType.UNSUPPORTED;
}

export interface TopicProfileData {
	analysis: {
		title: string;
		date_start: string;         // analysis start time, 2021-07-29 08:51:15.874410
		date_end: string;           // analysis end time, 2021-07-29 08:51:16.042502
		duration: string            // analysis spent time, 0:00:00.168092
	};
	table: {
		n: number;
		n_var: number;
		memory_size: number;
		record_size: number;
		n_cells_missing: number;
		n_vars_with_missing: number;
		n_vars_all_missing: number;
		p_cells_missing: number;
		types: Record<TopicProfileFactorType, number>
	};
	variables: Record<string, TopicProfileFactor>;
	scatter: {};
	correlations: {};
	missing: {};
	messages: Array<string>;
	package: {
		pandas_profiling_version: string;
		pandas_profiling_config: string;
	};
	sample: [];
	duplicates: 'None';
}