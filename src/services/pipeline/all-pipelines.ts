import {Apis, get} from '../apis';
import {fetchMockAllPipelines} from '../mock/pipeline/mock-all-pipelines';
import {Pipeline} from '../tuples/pipeline-types';
import {isMockService} from '../utils';

export const fetchAllPipelines = async (): Promise<Array<Pipeline>> => {
    if (isMockService()) {
        return fetchMockAllPipelines();
    } else {
        return await get({api: Apis.PIPELINE_ALL});
    }
};
