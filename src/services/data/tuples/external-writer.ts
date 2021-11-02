import {isWriteExternalEnabled} from '@/feature-switch';
import {
	fetchMockExternalWriter,
	listMockExternalWriters,
	listMockExternalWritersForHolder,
	saveMockExternalWriter
} from '../../data/mock/tuples/mock-external-writer';
import {Apis, get, page, post} from '../apis';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {ExternalWriter, ExternalWriterId} from './external-writer-types';
import {QueryExternalWriter, QueryExternalWriterForHolder} from './query-external-writer-types';
import {isFakedUuid} from './utils';

export const listExternalWriters = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryExternalWriter>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockExternalWriters(options);
	} else {
		return await page({api: Apis.EXTERNAL_WRITER_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const fetchExternalWriter = async (writerId: ExternalWriterId): Promise<{ externalWriter: ExternalWriter }> => {
	if (isMockService()) {
		const {writer: externalWriter} = await fetchMockExternalWriter(writerId);
		return {externalWriter};
	} else {
		const externalWriter = await get({api: Apis.EXTERNAL_WRITER_GET, search: {writerId}});
		return {externalWriter};
	}
};

export const saveExternalWriter = async (externalWriter: ExternalWriter): Promise<void> => {
	if (isMockService()) {
		await saveMockExternalWriter(externalWriter);
	} else if (isFakedUuid(externalWriter)) {
		const data = await post({api: Apis.EXTERNAL_WRITER_CREATE, data: externalWriter});
		externalWriter.writerId = data.writerId;
		externalWriter.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.EXTERNAL_WRITER_SAVE, data: externalWriter});
		externalWriter.lastModified = data.lastModified;
	}
};

export const listExternalWritersForHolder = async (): Promise<Array<QueryExternalWriterForHolder>> => {
	if (!isWriteExternalEnabled()) {
		return [];
	} else if (isMockService()) {
		return listMockExternalWritersForHolder();
	} else {
		// return listMockEnumsForHolder();
		return await get({api: Apis.EXTERNAL_WRITER_LOAD_ALL});
	}
};
