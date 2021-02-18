import { ParameterJoint } from "../factor-calculator-types";

export enum SystemActionType {
	ALARM = "alarm",
	COPY_TO_MEMORY = "copy-to-memory",
}

export enum ReadTopicActionType {
	READ_ROW = "read-row",
	READ_FACTOR = "read-factor",
	EXISTS = "exists",
}

export enum WriteTopicActionType {
	MERGE_ROW = "merge-row",
	INSERT_ROW = "insert-row",
	INSERT_OR_MERGE_ROW = "insert-or-merge-row",
	WRITE_FACTOR = "write-factor",
}

export type PipelineStageUnitActionType = WriteTopicActionType | ReadTopicActionType | SystemActionType;

export interface PipelineStageUnitAction {
	type: PipelineStageUnitActionType;
}

export interface MemoryWriter extends PipelineStageUnitAction {
	variableName: string;
}

export interface FromTopic extends PipelineStageUnitAction {
	topicId: string;
}

export interface FromFactor extends FromTopic {
	factorId: string;
}

export interface ToTopic extends PipelineStageUnitAction {
	topicId: string;
}

export interface ToFactor extends ToTopic {
	factorId: string;
}

export interface FindBy extends PipelineStageUnitAction {
	by: ParameterJoint;
}
