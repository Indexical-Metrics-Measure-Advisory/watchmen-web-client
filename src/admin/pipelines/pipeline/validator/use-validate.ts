import {validatePipeline} from '@/services/data/pipeline/pipeline-validate';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';

export interface Validation {
	pass: boolean;
	message?: string;
}

export const useValidate = () => {
	return async (pipeline: Pipeline, topics: Array<Topic>): Promise<Validation> => {
		return new Promise(resolve => {
			const result = validatePipeline(pipeline, topics);
			if (!result.pass) {
				pipeline.validated = false;
				resolve({
					pass: false,
					message: result.messages[0] || 'There is something incorrect in pipeline definition, view it in dsl panel for detail information.'
				});
			} else if (result.missIndexed.length !== 0) {
				pipeline.validated = true;
				resolve({
					pass: true,
					message: `Action[${result.missIndexed.join(',')}] might not be indexed, try to use index when read from or write into storage.`
				});
			} else {
				pipeline.validated = true;
				resolve({pass: true});
			}
		});
	};
};