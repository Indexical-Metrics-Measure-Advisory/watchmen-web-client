import React from 'react';
import { Lang } from '../../../../../langs';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useTopicData } from '../use-topic-data';
import { SubjectDefBodyCover } from '../widgets';
import { ColumnsContainer } from './widgets';

export const Columns = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	active: boolean;
}) => {
	const { active } = props;

	const data = useTopicData();

	return <ColumnsContainer active={active}>
		<SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEFINE_COLUMNS}</SubjectDefBodyCover>
	</ColumnsContainer>;
};