import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useRef} from 'react';
import {useTopicData} from '../data/use-topic-data';
import {SubjectDefBodyCover} from '../widgets';
import {AvailableTopic} from './available-topic';
import {AvailableTopicBottomGap, PickTopicsContainer} from './widgets';

export const PickTopics = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	active: boolean;
}) => {
	const {active} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {availableTopics, pickedTopics} = useTopicData();
	useEffect(() => {
		if (!active && containerRef.current) {
			containerRef.current.scrollTop = 0;
		}
	}, [active]);

	return <PickTopicsContainer active={active} ref={containerRef}>
		{availableTopics.sort((t1, t2) => {
			return t1.name.toLowerCase().localeCompare(t2.name.toLowerCase());
		}).map(topic => {
			return <AvailableTopic topic={topic} picked={pickedTopics.includes(topic)} key={topic.topicId}/>;
		})}
		<AvailableTopicBottomGap/>
		<SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_PICK_TOPICS}</SubjectDefBodyCover>
	</PickTopicsContainer>;
};