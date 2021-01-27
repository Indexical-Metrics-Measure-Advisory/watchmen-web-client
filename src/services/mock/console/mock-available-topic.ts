import { Topic } from '../../tuples/topic-types';
import { DemoTopics } from '../tuples/mock-data-topics';

export const fetchMockAvailableTopics = async (): Promise<Array<Topic>> => {
	return DemoTopics;
};
