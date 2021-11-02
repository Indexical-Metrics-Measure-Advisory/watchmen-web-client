import {Dayjs} from 'dayjs';
import {TopicProfileData} from '../../data-quality/topic-profile-types';
import {TopicId} from '../../tuples/topic-types';

export const fetchMockTopicProfileData = async (options: { topicId: TopicId; date: Dayjs }): Promise<TopicProfileData> => {
	return new Promise<TopicProfileData>(resolve => {
		setTimeout(async () => {
			const data = await import('./mock-topic-profile-data.json');
			resolve(data as unknown as TopicProfileData);
		}, 2000);
	});
};