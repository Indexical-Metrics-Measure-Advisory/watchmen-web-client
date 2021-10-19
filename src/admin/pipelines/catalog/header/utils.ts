import {Candidate, PipelineCandidate, SpaceCandidate, TopicCandidate} from './types';

export const isTopicCandidate = (candidate: Candidate): candidate is TopicCandidate => {
	return (candidate as any).topic != null;
};

export const isSpaceCandidate = (candidate: Candidate): candidate is SpaceCandidate => {
	return (candidate as any).space != null;
};

export const isPipelineCandidate = (candidate: Candidate): candidate is PipelineCandidate => {
	return (candidate as any).pipeline != null;
};

export const getCandidateKey = (candidate: Candidate): string => {
	if (isTopicCandidate(candidate)) {
		return `topic-${candidate.topic.topicId}`;
	} else if (isSpaceCandidate(candidate)) {
		return `space-${candidate.space.spaceId}`;
	} else if (isPipelineCandidate(candidate)) {
		return `pipeline-${candidate.pipeline.pipelineId}`;
	} else {
		throw new Error('Never occurred.');
	}
};

export const getCandidateName = (candidate: Candidate, askDefault: boolean = true): string => {
	if (isTopicCandidate(candidate)) {
		return candidate.topic.name || (askDefault ? 'Noname Topic' : '');
	} else if (isSpaceCandidate(candidate)) {
		return candidate.space.name || (askDefault ? 'Noname Space' : '');
	} else if (isPipelineCandidate(candidate)) {
		return candidate.pipeline.name || (askDefault ? 'Noname Pipeline' : '');
	} else {
		throw new Error('Never occurred.');
	}
};

export const getCandidateType = (candidate: Candidate): string => {
	if (isTopicCandidate(candidate)) {
		return 'Topic';
	} else if (isSpaceCandidate(candidate)) {
		return 'Space';
	} else if (isPipelineCandidate(candidate)) {
		return 'Pipeline';
	} else {
		throw new Error('Never occurred.');
	}
};
