import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Space} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';

export interface Candidate {
	picked: boolean;
}

export interface TopicCandidate extends Candidate {
	topic: Topic;
}

export interface SpaceCandidate extends Candidate {
	space: Space;
}

export interface PipelineCandidate extends Candidate {
	pipeline: Pipeline;
}