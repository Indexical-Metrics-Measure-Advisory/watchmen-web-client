import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useRef} from 'react';
import {useTopicData} from '../data/use-topic-data';
import {SubjectDefBodyCover} from '../widgets';
import {FiltersEdit} from './filters-edit';
import {NoFilter} from './no-filter';
import {FiltersBottomGap, FiltersContainer} from './widgets';

export const Filters = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	active: boolean;
}) => {
	const {subject, active} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {availableTopics, pickedTopics} = useTopicData();
	useEffect(() => {
		if (!active && containerRef.current) {
			containerRef.current.scrollTop = 0;
		}
	}, [active]);

	return <FiltersContainer active={active} ref={containerRef}>
		<NoFilter subject={subject} active={active}/>
		<FiltersEdit subject={subject} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<FiltersBottomGap/>
		<SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FILTER_DATA}</SubjectDefBodyCover>
	</FiltersContainer>;
};