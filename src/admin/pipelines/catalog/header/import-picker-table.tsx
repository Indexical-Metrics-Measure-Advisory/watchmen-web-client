import {
	buildPipelinesRelation,
	buildTopicsMap,
	buildTopicsRelation,
	PipelinesMap,
	TopicsMap
} from '@/services/data/pipeline/pipeline-relations';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Space} from '@/services/data/tuples/space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {CheckBox} from '@/widgets/basic/checkbox';
import {Input} from '@/widgets/basic/input';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent, Fragment, useState} from 'react';
import {
	Candidate,
	ConnectedSpaceCandidate,
	PipelineCandidate,
	SpaceCandidate,
	SubjectCandidate,
	TopicCandidate
} from './types';
import {
	getCandidateKey,
	getCandidateName,
	getCandidateType,
	isConnectedSpaceCandidate,
	isPipelineCandidate,
	isSpaceCandidate,
	isSubjectCandidate,
	isTopicCandidate
} from './utils';
import {
	PickerTableBody,
	PickerTableBodyCell,
	PickerTableBodyRow,
	PickerTableHeader,
	PickerTableHeaderCell,
	SubItemPrefix
} from './widgets';

interface Filter {
	value: string;
	handler?: number;
}

interface Candidates {
	topics: Array<TopicCandidate>;
	pipelines: Array<PipelineCandidate>;
	spaces: Array<SpaceCandidate>;
	connectedSpaces: Array<ConnectedSpaceCandidate>;
	subjects: Array<SubjectCandidate>;
}

type SpacesMap = Record<string, Space>;
type ConnectedSpacesMap = Record<string, ConnectedSpace>;
type SubjectsMap = Record<string, Subject>;

interface TopicRelations {
	pipelines: Array<PipelineCandidate>;
	spaces: Array<SpaceCandidate>;
	connectedSpaces: Array<ConnectedSpaceCandidate>;
	subjects: Array<SubjectCandidate>;
}

interface PipelineRelations {
	topics: Array<TopicCandidate>;
}

interface SpaceRelations {
	topics: Array<TopicCandidate>;
	connectedSpaces: Array<ConnectedSpaceCandidate>;
	subjects: Array<SubjectCandidate>;
}

interface ConnectedSpaceRelations {
	topics: Array<TopicCandidate>;
	spaces: Array<SpaceCandidate>;
	subjects: Array<SubjectCandidate>;
}

interface SubjectRelations {
	topics: Array<TopicCandidate>;
	spaces: Array<SpaceCandidate>;
	connectedSpaces: Array<ConnectedSpaceCandidate>;
}

const isCandidateExisted = (candidate: Candidate, existsMap: { topics: TopicsMap; pipelines: PipelinesMap; spaces: SpacesMap, connectedSpaces: ConnectedSpacesMap; subjects: SubjectsMap }): boolean => {
	if (isTopicCandidate(candidate)) {
		if (existsMap.topics[candidate.topic.topicId] != null) {
			return true;
		}
	} else if (isPipelineCandidate(candidate)) {
		if (existsMap.pipelines[candidate.pipeline.pipelineId] != null) {
			return true;
		}
	} else if (isSpaceCandidate(candidate)) {
		if (existsMap.spaces[candidate.space.spaceId] != null) {
			return true;
		}
	} else if (isConnectedSpaceCandidate(candidate)) {
		if (existsMap.connectedSpaces[candidate.connectedSpace.spaceId] != null) {
			return true;
		}
	} else if (isSubjectCandidate(candidate)) {
		if (existsMap.subjects[candidate.subject.subjectId] != null) {
			return true;
		}
	}
	return false;
};

const buildCandidatesRelationship = (candidates: Candidates) => {
	const topics = (candidates.topics || []).map(({topic}) => topic);
	const pipelines = (candidates.pipelines || []).map(({pipeline}) => pipeline);
	const topicsMap = buildTopicsMap(topics);
	const pipelineRelations = buildPipelinesRelation(pipelines, topicsMap);
	const topicRelations = buildTopicsRelation(topics, pipelineRelations);
	const topicCandidatesMap = candidates.topics.reduce((map, topic) => {
		map[topic.topic.topicId] = topic;
		return map;
	}, {} as Record<TopicId, TopicCandidate>);
	const pipelineCandidatesMap = candidates.pipelines.reduce((map, pipeline) => {
		map[pipeline.pipeline.pipelineId] = pipeline;
		return map;
	}, {} as Record<string, PipelineCandidate>);

	return {
		topics: (candidates.topics || []).reduce((map, {topic}) => {
			const r: TopicRelations = map[topic.topicId] ?? {
				pipelines: [],
				spaces: [],
				connectedSpaces: [],
				subjects: []
			};
			map[topic.topicId] = r;
			r.pipelines = [...new Set([
				...(topicRelations[topic.topicId].readMe || []),
				...(topicRelations[topic.topicId].writeMe || []),
				// eslint-disable-next-line
				...(candidates.pipelines || []).filter(({pipeline}) => pipeline.topicId == topic.topicId).map(({pipeline}) => pipeline)
			])].map(pipeline => pipelineCandidatesMap[pipeline.pipelineId]).filter(x => !!x);
			// eslint-disable-next-line
			r.spaces = (candidates.spaces || []).filter(({space}) => (space.topicIds || []).some(topicId => topicId == topic.topicId));
			// eslint-disable-next-line
			r.connectedSpaces = (candidates.connectedSpaces || []).filter(({connectedSpace}) => r.spaces.some(({space}) => connectedSpace.spaceId == space.spaceId));
			r.subjects = (candidates.subjects || []).filter(({subject}) => {
				return r.connectedSpaces.some(({connectedSpace}) => (connectedSpace.subjects || []).includes(subject));
			});
			return map;
		}, {} as Record<TopicId, TopicRelations>),
		pipelines: (candidates.pipelines || []).reduce((map, {pipeline}) => {
			const r: PipelineRelations = map[pipeline.pipelineId] ?? {topics: []};
			map[pipeline.pipelineId] = r;
			r.topics = [...new Set([
				pipelineRelations[pipeline.pipelineId].trigger,
				...(pipelineRelations[pipeline.pipelineId].incoming || []),
				...(pipelineRelations[pipeline.pipelineId].outgoing || [])
			])].filter(x => !!x).map(topic => topic ? topicCandidatesMap[topic.topic.topicId] : null).filter(x => !!x) as Array<TopicCandidate>;
			return map;
		}, {} as Record<string, PipelineRelations>),
		spaces: (candidates.spaces || []).reduce((map, {space}) => {
			const r: SpaceRelations = map[space.spaceId] ?? {topics: [], connectedSpaces: [], subjects: []};
			map[space.spaceId] = r;
			// eslint-disable-next-line
			r.topics = (candidates.topics || []).filter(({topic}) => (space.topicIds || []).some(topicId => topicId == topic.topicId));
			// eslint-disable-next-line
			r.connectedSpaces = (candidates.connectedSpaces || []).filter(({connectedSpace}) => connectedSpace.spaceId == space.spaceId);
			r.subjects = (candidates.subjects || []).filter(({subject}) => {
				return r.connectedSpaces.some(({connectedSpace}) => (connectedSpace.subjects || []).includes(subject));
			});
			return map;
		}, {} as Record<string, SpaceRelations>),
		connectedSpaces: (candidates.connectedSpaces || []).reduce((map, {connectedSpace}) => {
			const r: ConnectedSpaceRelations = map[connectedSpace.connectId] ?? {subjects: []};
			map[connectedSpace.connectId] = r;
			// eslint-disable-next-line
			r.spaces = (candidates.spaces || []).filter(({space}) => space.spaceId == connectedSpace.spaceId);
			const allTopicIds = [...new Set(r.spaces.map(({space}) => space.topicIds || []).flat())];
			// eslint-disable-next-line
			r.topics = (candidates.topics || []).filter(({topic}) => allTopicIds.some(topicId => topicId == topic.topicId));
			r.subjects = (candidates.subjects || []).filter(({subject}) => (connectedSpace.subjects || []).includes(subject));
			return map;
		}, {} as Record<string, ConnectedSpaceRelations>),
		subjects: (candidates.subjects || []).reduce((map, {subject}) => {
			const r: SubjectRelations = map[subject.subjectId] ?? {connectedSpaces: []};
			map[subject.subjectId] = r;
			r.connectedSpaces = (candidates.connectedSpaces || []).filter(({connectedSpace}) => (connectedSpace.subjects || []).includes(subject));
			// eslint-disable-next-line
			r.spaces = (candidates.spaces || []).filter(({space}) => r.connectedSpaces.some(({connectedSpace}) => connectedSpace.spaceId == space.spaceId));
			const allTopicIds = [...new Set(r.spaces.map(({space}) => space.topicIds || []).flat())];
			// eslint-disable-next-line
			r.topics = (candidates.topics || []).filter(({topic}) => allTopicIds.some(topicId => topicId == topic.topicId));
			return map;
		}, {} as Record<string, SubjectRelations>)
	};
};

const CandidatePrefix = (props: { me: Candidate, items: Array<Candidate> }) => {
	const {me} = props;

	if (isConnectedSpaceCandidate(me)) {
		return <SubItemPrefix/>;
	} else if (isSubjectCandidate(me)) {
		return <>
			<SubItemPrefix/>
			<SubItemPrefix/>
		</>;
	}

	return <Fragment/>;
};

export const ImportPickerTable = (props: {
	candidates: Candidates;
	cachedTopics: Array<Topic>; cachedPipelines: Array<Pipeline>;
	cachedSpaces: Array<Space>; cachedConnectedSpaces: Array<ConnectedSpace>;
}) => {
	const {candidates, cachedTopics, cachedPipelines, cachedSpaces, cachedConnectedSpaces} = props;
	const {
		topics: topicCandidates, pipelines: pipelineCandidates,
		spaces: spaceCandidates, connectedSpaces: connectedSpaceCandidates,
		subjects: subjectCandidates
	} = candidates;

	const [items] = useState(() => {
		return [...topicCandidates, ...pipelineCandidates, ...spaceCandidates.map(spaceCandidate => {
			const spaceId = spaceCandidate.space.spaceId;
			return [
				spaceCandidate,
				...connectedSpaceCandidates
					// eslint-disable-next-line
					.filter(connectedSpaceCandidate => connectedSpaceCandidate.connectedSpace.spaceId == spaceId)
					.map(connectedSpaceCandidate => {
						const subjectIds = (connectedSpaceCandidate.connectedSpace.subjects || []).map(subject => subject.subjectId);
						return [
							connectedSpaceCandidate,
							// eslint-disable-next-line
							...subjectCandidates.filter(subjectCandidate => subjectIds.some(subjectId => subjectId == subjectCandidate.subject.subjectId))
						];
					}).flat()];
		}).flat()];
	});
	const [relations] = useState(buildCandidatesRelationship(candidates));
	const [displayItems, setDisplayItems] = useState(items);
	const [filter, setFilter] = useState<Filter>({value: ''});
	const forceUpdate = useForceUpdate();

	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (filter.handler) {
			window.clearTimeout(filter.handler);
		}
		setFilter({
			value, handler: window.setTimeout(() => {
				delete filter.handler;
				const text = value.trim().toLowerCase();
				if (text === '') {
					// show all
					setDisplayItems(items);
				} else {
					setDisplayItems(items.filter(candidate => {
						return getCandidateName(candidate).toLowerCase().includes(text);
					}));
				}
			}, 300)
		});
	};
	const onAllSelectionChange = () => {
		const allSelected = displayItems.every(item => item.picked);
		if (allSelected) {
			displayItems.forEach(item => item.picked = false);
		} else {
			displayItems.forEach(item => item.picked = true);
		}
		forceUpdate();
	};
	const onSelectionChange = (candidate: TopicCandidate | PipelineCandidate | SpaceCandidate | ConnectedSpaceCandidate | SubjectCandidate) => (value: boolean) => {
		candidate.picked = value;
		if (isTopicCandidate(candidate) && !candidate.picked) {
			// unpick a topic, unpick related pipelines/spaces/connected spaces/subjects as well
			const {pipelines, spaces, connectedSpaces, subjects} = relations.topics[candidate.topic.topicId] || {};
			[...pipelines, ...spaces, ...connectedSpaces, ...subjects].forEach(candidate => candidate.picked = false);
		} else if (isPipelineCandidate(candidate) && candidate.picked) {
			// pick a pipeline, pick related topics
			const {topics} = relations.pipelines[candidate.pipeline.pipelineId] || {};
			topics.forEach(candidate => candidate.picked = true);
		} else if (isSpaceCandidate(candidate)) {
			if (candidate.picked) {
				// pick a space, pick related topics
				const {topics} = relations.spaces[candidate.space.spaceId] || {};
				topics.forEach(candidate => candidate.picked = true);
			} else {
				// unpick a space, unpick related connected spaces and subjects
				const {connectedSpaces, subjects} = relations.spaces[candidate.space.spaceId] || {};
				[...connectedSpaces, ...subjects].filter(x => !!x).forEach(candidate => candidate.picked = false);
			}
		} else if (isConnectedSpaceCandidate(candidate)) {
			const {topics, spaces, subjects} = relations.connectedSpaces[candidate.connectedSpace.connectId] || {};
			if (candidate.picked) {
				// pick a connected spaces, pick all subjects, its space and topics
				[...topics, ...spaces, ...subjects].forEach(candidate => candidate.picked = true);
			} else {
				// unpick a connected space, unpick all subjects
				subjects.forEach(candidate => candidate.picked = false);
			}
		} else if (isSubjectCandidate(candidate) && candidate.picked) {
			// pick a subject, pick its connected space, space and topics
			const {topics, spaces, connectedSpaces} = relations.subjects[candidate.subject.subjectId] || {};
			[...topics, ...spaces, ...connectedSpaces].forEach(candidate => candidate.picked = true);
		}
		forceUpdate();
	};

	const allSelected = displayItems.every(item => item.picked);

	const topicsMap: TopicsMap = cachedTopics.reduce((map, topic) => {
		map[topic.topicId] = topic;
		return map;
	}, {} as TopicsMap);
	const pipelinesMap: PipelinesMap = cachedPipelines.reduce((map, pipeline) => {
		map[pipeline.pipelineId] = pipeline;
		return map;
	}, {} as PipelinesMap);
	const spacesMap: SpacesMap = cachedSpaces.reduce((map, space) => {
		map[space.spaceId] = space;
		return map;
	}, {} as SpacesMap);
	const {connectedSpacesMap, subjectsMap} = cachedConnectedSpaces.reduce((map, connectedSpace) => {
		map.connectedSpacesMap[connectedSpace.connectId] = connectedSpace;
		(connectedSpace.subjects || []).forEach(subject => map.subjectsMap[subject.subjectId] = subject);
		return map;
	}, {connectedSpacesMap: {} as ConnectedSpacesMap, subjectsMap: {} as SubjectsMap});

	return <>
		<PickerTableHeader>
			<PickerTableHeaderCell>#</PickerTableHeaderCell>
			<PickerTableHeaderCell>
				<CheckBox value={allSelected} data-checked={allSelected} onChange={onAllSelectionChange}/>
			</PickerTableHeaderCell>
			<PickerTableHeaderCell>Tuple Type</PickerTableHeaderCell>
			<PickerTableHeaderCell>
				<span>Name</span>
				<Input placeholder="Filter by name..."
				       value={filter.value} onChange={onFilterTextChanged}/>
			</PickerTableHeaderCell>
		</PickerTableHeader>
		<PickerTableBody>
			{displayItems.map((candidate, index) => {

				return <PickerTableBodyRow columns={5} key={getCandidateKey(candidate)}>
					<PickerTableBodyCell>{index + 1}</PickerTableBodyCell>
					<PickerTableBodyCell>
						<CheckBox value={candidate.picked} data-checked={candidate.picked}
						          onChange={onSelectionChange(candidate)}/>
					</PickerTableBodyCell>
					<PickerTableBodyCell>{getCandidateType(candidate)}</PickerTableBodyCell>
					<PickerTableBodyCell>
						<CandidatePrefix me={candidate} items={displayItems}/>
						<span>{getCandidateName(candidate)}</span>
					</PickerTableBodyCell>
					<PickerTableBodyCell>{isCandidateExisted(candidate, {
						topics: topicsMap,
						pipelines: pipelinesMap,
						spaces: spacesMap,
						connectedSpaces: connectedSpacesMap,
						subjects: subjectsMap
					}) ? 'Already exists.' : ''}</PickerTableBodyCell>
				</PickerTableBodyRow>;
			}).filter(x => x)}
		</PickerTableBody>
	</>;
};