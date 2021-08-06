export interface ImportDataResponse {
	passed: boolean;
	topics?: Array<{ topicId: string; reason: string }>;
	pipelines?: Array<{ pipelineId: string; reason: string }>;
}