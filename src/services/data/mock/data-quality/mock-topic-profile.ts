import {Dayjs} from 'dayjs';
import {TopicProfileData} from '../../data-quality/topic-profile-types';

export const fetchMockTopicProfileData = async (options: { topicId: string; date: Dayjs }): Promise<TopicProfileData> => {
	return new Promise<TopicProfileData>(resolve => {
		setTimeout(async () => {
			const data = await import('./mock-topic-profile-data.json');
			resolve(data as unknown as TopicProfileData);
		}, 2000);
	});
};