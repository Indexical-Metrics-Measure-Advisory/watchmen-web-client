import { ConnectedSpaceBlockGraphics } from '../../../services/tuples/connected-space-types';
import { Subject } from '../../../services/tuples/subject-types';
import { Topic } from '../../../services/tuples/topic-types';

export enum GraphicsRole {
	TOPIC = 'topic',
	TOPIC_FRAME = 'topic-frame',
	TOPIC_NAME = 'topic-name',

	SUBJECT = 'subject',
	SUBJECT_FRAME = 'subject-frame',
	SUBJECT_NAME = 'subject-name',

	BLOCK_SELECTION = 'block-selection',

	SUBJECT_TOPIC_RELATION = 'subject-topic-relation',
	SUBJECT_TOPIC_RELATION_LINK = 'subject-topic-relation-link',
	SUBJECT_TOPIC_RELATION_ANIMATION = 'subject-topic-relation-animation'
}

export interface AssembledTopicGraphics extends ConnectedSpaceBlockGraphics {
	topic: Topic;
}

export interface AssembledSubjectGraphics extends ConnectedSpaceBlockGraphics {
	subject: Subject,
}

export interface AssembledConnectedSpaceGraphics {
	topics: Array<AssembledTopicGraphics>;
	subjects: Array<AssembledSubjectGraphics>;
}

export interface RelationCurvePoints {
	drawn: string;
}
