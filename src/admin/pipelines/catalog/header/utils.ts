import {
	Candidate,
	ConnectedSpaceCandidate,
	PipelineCandidate,
	SpaceCandidate,
	SubjectCandidate,
	TopicCandidate
} from './types';

export const isTopicCandidate = (candidate: Candidate): candidate is TopicCandidate => {
	return (candidate as any).topic != null;
};

export const isPipelineCandidate = (candidate: Candidate): candidate is PipelineCandidate => {
	return (candidate as any).pipeline != null;
};

export const isSpaceCandidate = (candidate: Candidate): candidate is SpaceCandidate => {
	return (candidate as any).space != null;
};

export const isConnectedSpaceCandidate = (candidate: Candidate): candidate is ConnectedSpaceCandidate => {
	return (candidate as any).connectedSpace != null;
};

export const isSubjectCandidate = (candidate: Candidate): candidate is SubjectCandidate => {
	return (candidate as any).subject != null;
};

export const getCandidateKey = (candidate: Candidate): string => {
	if (isTopicCandidate(candidate)) {
		return `topic-${candidate.topic.topicId}`;
	} else if (isPipelineCandidate(candidate)) {
		return `pipeline-${candidate.pipeline.pipelineId}`;
	} else if (isSpaceCandidate(candidate)) {
		return `space-${candidate.space.spaceId}`;
	} else if (isConnectedSpaceCandidate(candidate)) {
		return `connected-space-${candidate.connectedSpace.connectId}`;
	} else if (isSubjectCandidate(candidate)) {
		return `subject-${candidate.subject.subjectId}`;
	} else {
		throw new Error('Never occurred.');
	}
};

export const getCandidateName = (candidate: Candidate, askDefault: boolean = true): string => {
	if (isTopicCandidate(candidate)) {
		return candidate.topic.name || (askDefault ? 'Noname Topic' : '');
	} else if (isPipelineCandidate(candidate)) {
		return candidate.pipeline.name || (askDefault ? 'Noname Pipeline' : '');
	} else if (isSpaceCandidate(candidate)) {
		return candidate.space.name || (askDefault ? 'Noname Space' : '');
	} else if (isConnectedSpaceCandidate(candidate)) {
		return candidate.connectedSpace.name || (askDefault ? 'Noname Connected Space' : '');
	} else if (isSubjectCandidate(candidate)) {
		return candidate.subject.name || (askDefault ? 'Noname Subject' : '');
	} else {
		throw new Error('Never occurred.');
	}
};

export const getCandidateType = (candidate: Candidate): string => {
	if (isTopicCandidate(candidate)) {
		return 'Topic';
	} else if (isPipelineCandidate(candidate)) {
		return 'Pipeline';
	} else if (isSpaceCandidate(candidate)) {
		return 'Space';
	} else if (isConnectedSpaceCandidate(candidate)) {
		return 'Connected Space';
	} else if (isSubjectCandidate(candidate)) {
		return 'Subject';
	} else {
		throw new Error('Never occurred.');
	}
};
