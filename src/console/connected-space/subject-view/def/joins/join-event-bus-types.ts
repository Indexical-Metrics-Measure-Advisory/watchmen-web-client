import {SubjectDataSetJoin} from '@/services/data/tuples/subject-types';

export enum JoinEventTypes {
	JOIN_TYPE_CHANGED = 'join-type-changed',
	FIRST_TOPIC_CHANGED = 'first-topic-changed',
	FIRST_FACTOR_CHANGED = 'first-factor-changed',
	SECOND_TOPIC_CHANGED = 'second-topic-changed',
	SECOND_FACTOR_CHANGED = 'second-factor-changed'
}

export interface JoinEventBus {
	fire(type: JoinEventTypes.JOIN_TYPE_CHANGED, join: SubjectDataSetJoin): this;
	on(type: JoinEventTypes.JOIN_TYPE_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: JoinEventTypes.JOIN_TYPE_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;

	fire(type: JoinEventTypes.FIRST_TOPIC_CHANGED, join: SubjectDataSetJoin): this;
	on(type: JoinEventTypes.FIRST_TOPIC_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: JoinEventTypes.FIRST_TOPIC_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;

	fire(type: JoinEventTypes.FIRST_FACTOR_CHANGED, join: SubjectDataSetJoin): this;
	on(type: JoinEventTypes.FIRST_FACTOR_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: JoinEventTypes.FIRST_FACTOR_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;

	fire(type: JoinEventTypes.SECOND_TOPIC_CHANGED, join: SubjectDataSetJoin): this;
	on(type: JoinEventTypes.SECOND_TOPIC_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: JoinEventTypes.SECOND_TOPIC_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;

	fire(type: JoinEventTypes.SECOND_FACTOR_CHANGED, join: SubjectDataSetJoin): this;
	on(type: JoinEventTypes.SECOND_FACTOR_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: JoinEventTypes.SECOND_FACTOR_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
}