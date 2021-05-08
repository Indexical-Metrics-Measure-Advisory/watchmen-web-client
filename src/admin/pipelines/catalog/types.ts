import {Pipeline, PipelineBlockGraphics} from '../../../services/tuples/pipeline-types';
import {Topic} from '../../../services/tuples/topic-types';

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
    topics: Array<AssembledTopicGraphics>;
}

export interface RelationCurvePoints {
    drawn: string;
}

export interface CatalogData {
    initialized: boolean;
    topics: Array<Topic>;
    pipelines: Array<Pipeline>;
    graphics?: AssembledPipelinesGraphics
}
