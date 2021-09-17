import {ImportDataResponse} from '../../data-import/import-data-types';
import {Pipeline} from '../../tuples/pipeline-types';
import {Topic} from '../../tuples/topic-types';

export const tryToMockImportTopicsAndPipelines = async (options: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
}): Promise<ImportDataResponse> => {
	return new Promise(resolve => {
		setTimeout(() => resolve({passed: true}), 1000);
	});
};