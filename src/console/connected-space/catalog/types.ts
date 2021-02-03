import { Topic } from '../../../services/tuples/topic-types';

export enum GraphicsRole {
	TOPIC = 'topic',
	TOPIC_FRAME = 'topic-frame',
	TOPIC_NAME = 'topic-name',
	TOPIC_RELATION = 'topic-relation',
	TOPIC_RELATION_LINK = 'topic-relation-link',
	TOPIC_SELECTION = 'topic-selection',
}

export interface GraphicsPosition {
	x: number;
	y: number;
}

export interface GraphicsSize {
	width: number;
	height: number;
}

export interface TopicCoordinate extends GraphicsPosition {
}

export interface TopicFrame extends GraphicsPosition, GraphicsSize {
}

export interface TopicName extends GraphicsPosition {
}

export interface TopicGraphics {
	topic: Topic;
	rect: {
		coordinate: TopicCoordinate;
		frame: TopicFrame;
		name: TopicName
	}
}

export interface ConnectedSpaceGraphics {
	topics: Array<TopicGraphics>;
	// topicRelations: Array<TopicRelationGraphics>;
	// topicSelection: TopicSelectionGraphics
}