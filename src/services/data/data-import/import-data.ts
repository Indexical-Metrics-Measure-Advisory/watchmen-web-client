import {Apis, post} from '../apis';
import {tryToMockImportTopicsAndPipelines} from '../mock/data-import/import-data';
import {Pipeline} from '../tuples/pipeline-types';
import {Topic} from '../tuples/topic-types';
import {isMockService} from '../utils';
import {ImportDataResponse} from './import-data-types';

export const tryToImportTopicsAndPipelines = async (options: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
}): Promise<ImportDataResponse> => {
	if (isMockService()) {
		return await tryToMockImportTopicsAndPipelines(options);
	} else {
		const response = await post({
			api: Apis.IMPORT_TOPICS_AND_PIPELINES,
			data: options
		});

		return {
			passed: response.passed,
			topics: response.topics,
			pipelines: response.pipelines
		};
	}
};