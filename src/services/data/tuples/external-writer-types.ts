import {Token} from '../types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export enum ExternalWriterType {
	STANDARD_WRITER = 'standard-writer',
	ELASTIC_SEARCH_WRITER = 'elastic-search-writer'
}

export type ExternalWriterId = string;

export interface ExternalWriter extends Tuple {
	writerId: ExternalWriterId;
	writerCode: string;
	type: ExternalWriterType;
	pat?: Token;
	url: string;
	tenantId?: TenantId;
}
