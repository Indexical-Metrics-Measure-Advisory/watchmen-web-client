import {ConnectedSpaceId} from '../tuples/connected-space-types';
import {PipelineId} from '../tuples/pipeline-types';
import {SpaceId} from '../tuples/space-types';
import {TopicId} from '../tuples/topic-types';

export interface ImportDataResponse {
	passed: boolean;
	topics?: Array<{ topicId: TopicId; name: string; reason: string }>;
	pipelines?: Array<{ pipelineId: PipelineId; name: string; reason: string }>;
	spaces?: Array<{ spaceId: SpaceId; name: string; reason: string }>;
	connectedSpaces?: Array<{ connectId: ConnectedSpaceId; name: string; reason: string }>;
}