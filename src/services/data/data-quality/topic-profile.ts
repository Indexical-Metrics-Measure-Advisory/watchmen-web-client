import {Dayjs} from 'dayjs';
import {Apis, get} from '../apis';
import {fetchMockTopicProfileData} from '../mock/data-quality/mock-topic-profile';
import {TopicId} from '../tuples/topic-types';
import {isMockService} from '../utils';
import {
	TopicProfileCategoricalFactor,
	TopicProfileData,
	TopicProfileFactor,
	TopicProfileFactorType
} from './topic-profile-types';

export const fetchTopicProfileData = async (options: { topicId: TopicId; date: Dayjs }): Promise<TopicProfileData> => {
	if (isMockService()) {
		return await fetchMockTopicProfileData(options);
	} else {
		const {topicId, date} = options;
		return get({api: Apis.TOPIC_PROFILE, search: {topicId, date: date.format('YYYY/MM/DD')}});
	}
};

export const isCategoricalTopicProfileFactor = (factor: TopicProfileFactor): factor is TopicProfileCategoricalFactor => {
	return factor.type === TopicProfileFactorType.CATEGORICAL;
};