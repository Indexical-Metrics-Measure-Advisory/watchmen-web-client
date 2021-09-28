import {Apis, get} from '../apis';
import {fetchMockAllExternalWriters} from '../mock/pipeline/mock-all-external-writers';
import {ExternalWriter} from '../tuples/external-writer-types';
import {isMockService} from '../utils';

export const fetchAllExternalWriters = async (): Promise<Array<ExternalWriter>> => {
	if (isMockService()) {
		return fetchMockAllExternalWriters();
	} else {
		return await get({api: Apis.EXTERNAL_WRITER_LOAD_ALL});
	}
};
