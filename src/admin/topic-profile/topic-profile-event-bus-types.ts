import {Topic} from '@/services/data/tuples/topic-types';
import {Dayjs} from 'dayjs';

export enum TopicProfileEventTypes {
	SHOW_PROFILE = 'show-profile'
}

export interface TopicProfileEventBus {
	fire(type: TopicProfileEventTypes.SHOW_PROFILE, topic: Topic, date?: Dayjs): this;
	on(type: TopicProfileEventTypes.SHOW_PROFILE, listener: (topic: Topic, date?: Dayjs) => void): this;
	off(type: TopicProfileEventTypes.SHOW_PROFILE, listener: (topic: Topic, date?: Dayjs) => void): this;
}