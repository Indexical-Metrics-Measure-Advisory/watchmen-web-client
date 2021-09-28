import {ExternalWriter} from '../../tuples/external-writer-types';
import {DemoExternalWriters} from '../tuples/mock-external-writer';

export const fetchMockAllExternalWriters = async (): Promise<Array<ExternalWriter>> => {
	return new Promise<Array<ExternalWriter>>(resolve => {
		setTimeout(() => resolve(DemoExternalWriters), 500);
	});
};
