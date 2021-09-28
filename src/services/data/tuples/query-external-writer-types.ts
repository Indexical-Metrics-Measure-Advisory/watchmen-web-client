import {ExternalWriter} from './external-writer-types';
import {QueryTuple, QueryTupleForHolder} from './tuple-types';

export interface QueryExternalWriter extends Pick<ExternalWriter, 'writerId' | 'writerCode' | 'type' | 'createTime' | 'lastModified'>, QueryTuple {
	tenantName: string;
}

export interface QueryExternalWriterForHolder extends Pick<ExternalWriter, 'writerId' | 'writerCode'>, QueryTupleForHolder {
}
