import { BlockCoordinate, BlockFrame, BlockName } from '../graphics/graphics-types';
import { ParameterJoint } from './factor-calculator-types';
import { PipelineStage } from './pipeline-stage-types';
import { Tuple } from './tuple-types';

export enum PipelineTriggerType {
	INSERT = 'insert',
	MERGE = 'merge',
	// insert or merge
	INSERT_OR_MERGE = 'insert-or-merge',
	DELETE = 'delete',
}

export interface Pipeline extends Tuple {
	pipelineId: string;
	topicId: string;
	name: string;
	type: PipelineTriggerType;
	conditional: boolean;
	on?: ParameterJoint;
	stages: Array<PipelineStage>;
	enabled: boolean;
}

export interface PipelineBlockGraphicsRect {
	coordinate: BlockCoordinate;
	frame: BlockFrame;
	name: BlockName
}

export interface PipelineBlockGraphics {
	rect: PipelineBlockGraphicsRect
}

export interface TopicGraphics extends PipelineBlockGraphics {
	topicId: string;
}

export interface PipelinesGraphics {
	topics: Array<TopicGraphics>;
}