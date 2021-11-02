import {ParameterJoint} from '../factor-calculator-types';
import {FactorId} from '../factor-types';
import {TopicId} from '../topic-types';

export enum SystemActionType {
	ALARM = 'alarm',
	COPY_TO_MEMORY = 'copy-to-memory',
	WRITE_TO_EXTERNAL = 'write-to-external'
}

export enum ReadTopicActionType {
	READ_ROW = 'read-row',
	READ_FACTOR = 'read-factor',
	EXISTS = 'exists',
	READ_ROWS = 'read-rows',
	READ_FACTORS = 'read-factors'
}

export enum WriteTopicActionType {
	MERGE_ROW = 'merge-row',
	INSERT_ROW = 'insert-row',
	INSERT_OR_MERGE_ROW = 'insert-or-merge-row',
	WRITE_FACTOR = 'write-factor',
}

export type PipelineStageUnitActionType = WriteTopicActionType | ReadTopicActionType | SystemActionType;

export type PipelineStageUnitActionId = string;

export interface PipelineStageUnitAction {
	actionId: PipelineStageUnitActionId;
	type: PipelineStageUnitActionType;
}

export interface MemoryWriter extends PipelineStageUnitAction {
	variableName: string;
}

export interface FromTopic extends PipelineStageUnitAction {
	topicId: TopicId;
}

export interface FromFactor extends FromTopic {
	factorId: FactorId;
}

export interface ToTopic extends PipelineStageUnitAction {
	topicId: TopicId;
}

export interface ToFactor extends ToTopic {
	factorId: FactorId;
}

export interface FindBy extends PipelineStageUnitAction {
	by: ParameterJoint;
}
