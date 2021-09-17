import {Subject} from '@/services/data/tuples/subject-types';
import {Lang} from '@/widgets/langs';
import React, {useState} from 'react';
import {createSubjectDataSetJoin} from '../data-utils';
import {useJoinsDataVisible} from '../data/use-joins-data-visible';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {SubjectDefNoData, SubjectDefNoDataCreateButton} from '../widgets';

export const NoJoin = (props: { subject: Subject, active: boolean }) => {
	const {subject, active} = props;

	const {fire} = useSubjectDefEventBus();
	const [isVisible] = useState(() => () => subject.dataset.joins.length === 0);
	const visible = useJoinsDataVisible(isVisible);

	const onAddClicked = () => {
		const join = createSubjectDataSetJoin();
		subject.dataset.joins.push(join);
		fire(SubjectDefEventTypes.DATASET_JOIN_ADDED, join);
	};

	return <SubjectDefNoData active={active} visible={visible}>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_JOIN_FOR_SUBJECT}
			<SubjectDefNoDataCreateButton onClick={onAddClicked}>
				{Lang.CONSOLE.CONNECTED_SPACE.CREATE_DATASET_JOIN_WHEN_NONE}
			</SubjectDefNoDataCreateButton>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_JOIN_FOR_SUBJECT_2}
		</span>
	</SubjectDefNoData>;
};