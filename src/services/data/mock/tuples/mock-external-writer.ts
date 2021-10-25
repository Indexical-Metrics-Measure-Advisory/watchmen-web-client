import {TuplePage} from '../../query/tuple-page';
import {ExternalWriter, ExternalWriterType} from '../../tuples/external-writer-types';
import {QueryExternalWriter, QueryExternalWriterForHolder} from '../../tuples/query-external-writer-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';

const StandardWriter: ExternalWriter = {
	writerId: '1',
	writerCode: 'STANDARD_WRITER',
	type: ExternalWriterType.STANDARD_WRITER,
	tenantId: '1',
	url: '',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
const EsWriter: ExternalWriter = {
	writerId: '2',
	writerCode: 'ES_WRITER',
	type: ExternalWriterType.ELASTIC_SEARCH_WRITER,
	tenantId: '1',
	url: '',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const listMockExternalWriters = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryExternalWriter>> => {
	const {pageNumber = 1, pageSize = 9} = options;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [StandardWriter, EsWriter].map(writer => {
					return {tenantName: 'X World', ...writer};
				}),
				itemCount: 2,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};

export const fetchMockExternalWriter = async (writerId: string): Promise<{ writer: ExternalWriter }> => {
	return {
		// eslint-disable-next-line
		writer: [StandardWriter, EsWriter].find(writer => writer.writerId == writerId) ?? StandardWriter
	};
};

let newExternalWriterId = 10000;
export const saveMockExternalWriter = async (externalWriter: ExternalWriter): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(externalWriter)) {
			externalWriter.writerId = `${newExternalWriterId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const listMockExternalWritersForHolder = async (): Promise<Array<QueryExternalWriterForHolder>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([StandardWriter, EsWriter]);
		}, 500);
	});
};

export const DemoExternalWriters: Array<ExternalWriter> = [StandardWriter, EsWriter];
