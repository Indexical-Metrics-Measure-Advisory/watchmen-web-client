import {AvailableSpaceInConsole} from '../../console/settings-types';
import {DemoTopics} from '../tuples/mock-data-topics';

export const fetchMockAvailableSpaces = async (): Promise<Array<AvailableSpaceInConsole>> => {
	return new Promise(resolve => {
		setTimeout(() => resolve([
			{
				spaceId: '1',
				name: 'Sales Statistics',
				topicIds: DemoTopics.map(topic => topic.topicId)
			},
			{
				spaceId: '2',
				name: 'Claim Trend',
				topicIds: DemoTopics.map(topic => topic.topicId)
			}
		]), 500);
	});
};
