import React from 'react';
import { Lang } from '../../../../../langs';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useTopicData } from '../use-topic-data';
import { SubjectDefBodyCover } from '../widgets';
import { FiltersContainer } from './widgets';

export const Filters = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	active: boolean;
}) => {
	const { active } = props;

	const data = useTopicData();

	return <FiltersContainer active={active}>
		<SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_FILTER_DATA}</SubjectDefBodyCover>
	</FiltersContainer>
}