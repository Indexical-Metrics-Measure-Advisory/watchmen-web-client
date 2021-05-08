import React, {useEffect, useRef} from 'react';
import {Lang} from '../../../../../langs';
import {ConnectedSpace} from '../../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../../services/tuples/subject-types';
import {useTopicData} from '../data/use-topic-data';
import {SubjectDefBodyCover} from '../widgets';
import {ColumnsEdit} from './columns-edit';
import {NoColumn} from './no-column';
import {ColumnsBottomGap, ColumnsContainer} from './widgets';

export const Columns = (props: {
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

	return <ColumnsContainer active={active} ref={containerRef}>
		<NoColumn subject={subject} active={active}/>
		<ColumnsEdit subject={subject} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<ColumnsBottomGap/>
		<SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEFINE_COLUMNS}</SubjectDefBodyCover>
	</ColumnsContainer>;
};