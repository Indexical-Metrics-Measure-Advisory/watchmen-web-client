import React from 'react';
import { Lang } from '../../../../../langs';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useTopicData } from '../use-topic-data';
import { SubjectDefBodyCover } from '../widgets';
import { OverviewContainer } from './widgets';

export const Overview = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	active: boolean;
}) => {
	const { active } = props;

	const data = useTopicData();

	return <OverviewContainer active={active}>
		<SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_OVERVIEW}</SubjectDefBodyCover>
	</OverviewContainer>;
};