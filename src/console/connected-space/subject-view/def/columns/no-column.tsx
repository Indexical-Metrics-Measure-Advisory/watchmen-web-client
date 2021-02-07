import React, { useState } from 'react';
import { Lang } from '../../../../../langs';
import { Subject } from '../../../../../services/tuples/subject-types';
import { createSubjectDataSetColumn } from '../data-utils';
import { useDataVisible } from '../data/use-data-visible';
import { useSubjectDefEventBus } from '../subject-def-event-bus';
import { SubjectDefEventTypes } from '../subject-def-event-bus-types';
import { SubjectDefNoData, SubjectDefNoDataCreateButton } from '../widgets';

export const NoColumn = (props: { subject: Subject, active: boolean }) => {
	const { subject, active } = props;

	const { fire } = useSubjectDefEventBus();
	const [ isVisible ] = useState(() => () => subject.dataset.columns.length === 0);
	const visible = useDataVisible(isVisible);

	const onAddClicked = () => {
		const column = createSubjectDataSetColumn(subject);
		subject.dataset.columns.push(column);
		fire(SubjectDefEventTypes.DATASET_COLUMN_ADDED, column);
	};

	return <SubjectDefNoData active={active} visible={visible}>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_COLUMN_FOR_SUBJECT}
			<SubjectDefNoDataCreateButton onClick={onAddClicked}>
				{Lang.CONSOLE.CONNECTED_SPACE.CREATE_DATASET_COLUMN_WHEN_NONE}
			</SubjectDefNoDataCreateButton>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_COLUMN_FOR_SUBJECT_2}
		</span>
	</SubjectDefNoData>;
};