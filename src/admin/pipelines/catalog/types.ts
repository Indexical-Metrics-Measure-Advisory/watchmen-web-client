import {
	Pipeline,
	PipelineBlockGraphics,
	PipelinesGraphics,
	PipelinesGraphicsId
} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum GraphicsRole {
	TOPIC = 'topic',
	TOPIC_FRAME = 'topic-frame',
	TOPIC_NAME = 'topic-name',

	BLOCK_SELECTION = 'block-selection',

	TOPICS_RELATION = 'topics-relation',
	TOPICS_RELATION_LINK = 'topics-relation-link',
	TOPICS_RELATION_ANIMATION = 'topics-relation-animation'
}

export interface AssembledTopicGraphics extends PipelineBlockGraphics {
	topic: Topic;
}

export interface AssembledPipelinesGraphics {
	pipelineGraphId: PipelinesGraphicsId;
	name: string;
	topics: Array<AssembledTopicGraphics>;
}

export interface CatalogData {
	initialized: boolean;
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
	allGraphics: Array<PipelinesGraphics>;
	graphics?: AssembledPipelinesGraphics;
}
