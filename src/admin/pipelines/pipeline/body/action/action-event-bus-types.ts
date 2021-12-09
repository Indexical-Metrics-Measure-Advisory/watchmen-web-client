import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';

export enum ActionEventTypes {
	ACTION_TYPE_CHANGED = 'action-type-changed',
	ACTION_CONTENT_CHANGED = 'action-content-changed',

	TOPIC_CHANGED = 'topic-changed'
}

export interface ActionEventBus {
	fire(type: ActionEventTypes.ACTION_TYPE_CHANGED, action: PipelineStageUnitAction): this;
	on(type: ActionEventTypes.ACTION_TYPE_CHANGED, listener: (action: PipelineStageUnitAction) => void): this;
	off(type: ActionEventTypes.ACTION_TYPE_CHANGED, listener: (action: PipelineStageUnitAction) => void): this;

	fire(type: ActionEventTypes.ACTION_CONTENT_CHANGED, action: PipelineStageUnitAction): this;
	on(type: ActionEventTypes.ACTION_CONTENT_CHANGED, listener: (action: PipelineStageUnitAction) => void): this;
	off(type: ActionEventTypes.ACTION_CONTENT_CHANGED, listener: (action: PipelineStageUnitAction) => void): this;

	fire(type: ActionEventTypes.TOPIC_CHANGED, action: PipelineStageUnitAction): this;
	on(type: ActionEventTypes.TOPIC_CHANGED, listener: (action: PipelineStageUnitAction) => void): this;
	off(type: ActionEventTypes.TOPIC_CHANGED, listener: (action: PipelineStageUnitAction) => void): this;
}