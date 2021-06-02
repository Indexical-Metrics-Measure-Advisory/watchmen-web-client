import {Topic} from '../../tuples/topic-types';
import {DemoTopics} from '../tuples/mock-data-topics';

export const fetchMockAllTopics = async (): Promise<Array<Topic>> => {
	return new Promise<Array<Topic>>(resolve => {
		setTimeout(() => resolve(DemoTopics), 500);
	});
};
