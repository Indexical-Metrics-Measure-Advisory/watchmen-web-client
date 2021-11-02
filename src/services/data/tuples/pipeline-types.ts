import {BlockCoordinate, BlockFrame, BlockName} from '../graphics/graphics-types';
import {DateTime} from '../types';
import {PipelineStage} from './pipeline-stage-types';
import {Conditional} from './pipeline-super-types';
import {TenantId} from './tenant-types';
import {TopicId} from './topic-types';
import {Tuple} from './tuple-types';

export enum PipelineTriggerType {
	INSERT = 'insert',
	MERGE = 'merge',
	// insert or merge
	INSERT_OR_MERGE = 'insert-or-merge',
	DELETE = 'delete',
}

export type PipelineId = string;

export interface Pipeline extends Tuple, Conditional {
	pipelineId: PipelineId;
	topicId: TopicId;
	name: string;
	type: PipelineTriggerType;
	stages: Array<PipelineStage>;
	enabled: boolean;
	validated: boolean;
	tenantId?: TenantId;
}

export interface PipelineBlockGraphicsRect {
	coordinate: BlockCoordinate;
	frame: BlockFrame;
	name: BlockName;
}

export interface PipelineBlockGraphics {
	rect: PipelineBlockGraphicsRect;
}

export interface TopicGraphics extends PipelineBlockGraphics {
	topicId: TopicId;
}

export type PipelinesGraphicsId = string;

export interface PipelinesGraphics {
	pipelineGraphId: PipelinesGraphicsId;
	name: string;
	topics: Array<TopicGraphics>;
	createTime: DateTime;
	lastModified: DateTime;
}