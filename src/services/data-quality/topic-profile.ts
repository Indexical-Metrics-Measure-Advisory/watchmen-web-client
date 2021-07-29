import {isMockService} from '../utils';
import {Apis, get} from '../apis';
import {Dayjs} from 'dayjs';
import {TopicProfileData} from './topic-profile-types';
import {fetchMockTopicProfileData} from '../mock/data-quality/mock-topic-profile';

export const fetchTopicProfileData = async (options: { topicId: string; date: Dayjs }): Promise<TopicProfileData> => {
	if (isMockService()) {
		return await fetchMockTopicProfileData(options);
	} else {
		const {topicId, date} = options;
		return get({api: Apis.TOPIC_PROFILE, search: {topicId, date: date.format('YYYY/MM/DD')}});
	}
};
