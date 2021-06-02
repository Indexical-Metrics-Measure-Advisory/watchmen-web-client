import {Pipeline} from '../../tuples/pipeline-types';
import {DemoPipelines} from './mock-data-pipelines';

export const fetchMockAllPipelines = async (): Promise<Array<Pipeline>> => {
	return new Promise<Array<Pipeline>>(resolve => {
		setTimeout(() => resolve(DemoPipelines), 500);
	});
};
