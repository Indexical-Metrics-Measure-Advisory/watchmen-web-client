export interface ImportDataResponse {
	passed: boolean;
	topics?: Array<{ topicId: string; name: string; reason: string }>;
	pipelines?: Array<{ pipelineId: string; name: string; reason: string }>;
	spaces?: Array<{ spaceId: string; name: string; reason: string }>;
	connectedSpaces?: Array<{ connectId: string; name: string; reason: string }>;
}