import {Tuple} from './tuple-types';

export enum ExternalWriterType {
	STANDARD_WRITER = 'standard-writer',
	ELASTIC_SEARCH_WRITER = 'elastic-search-writer'
}

export interface ExternalWriter extends Tuple {
	writerId: string;
	writerCode: string;
	type: ExternalWriterType;
	pat?: string;
	url: string;
	tenantId?: string;
}
