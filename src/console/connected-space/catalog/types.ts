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

export interface GraphicsPosition {
	x: number;
	y: number;
}

export interface GraphicsSize {
	width: number;
	height: number;
}

export interface BlockCoordinate extends GraphicsPosition {
}

export interface BlockFrame extends GraphicsPosition, GraphicsSize {
}

export interface BlockName extends GraphicsPosition {
}

export interface FrameGraphics {
	rect: {
		coordinate: BlockCoordinate;
		frame: BlockFrame;
		name: BlockName
	}
}

export interface TopicGraphics extends FrameGraphics {
	topic: Topic;
}

export interface SubjectGraphics extends FrameGraphics {
	subject: Subject,
}

export interface ConnectedSpaceGraphics {
	topics: Array<TopicGraphics>;
	subjects: Array<SubjectGraphics>;
}

export interface RelationCurvePoints {
	drawn: string;
}
