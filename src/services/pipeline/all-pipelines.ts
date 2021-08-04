import {Apis, get} from '../apis';
import {fetchMockAllPipelines} from '../mock/pipeline/mock-all-pipelines';
import {Pipeline} from '../tuples/pipeline-types';
import {isMockService} from '../utils';
import {Dayjs} from 'dayjs';

export const fetchAllPipelines = async (): Promise<Array<Pipeline>> => {
	if (isMockService()) {
		return fetchMockAllPipelines();
	} else {
		return await get({api: Apis.PIPELINE_ALL});
	}
};

export const fetchUpdatedPipelines = async (lastModifiedTime: Dayjs): Promise<Array<Pipeline>> => {
	if (isMockService()) {
		return fetchMockAllPipelines();
	} else {
		// TODO fetch updated pipelines
		return fetchAllPipelines();
		// return await post({api: Apis.PIPELINE_UPDATED, data: {lastModified: lastModifiedTime.format('YYYY/MM/DD HH:mm:ss')}});
	}
};