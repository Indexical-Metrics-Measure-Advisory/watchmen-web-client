import {Subject} from '@/services/data/tuples/subject-types';
import {Lang} from '@/widgets/langs';
import React, {useState} from 'react';
import {createSubjectDataSetFilter} from '../data-utils';
import {useFiltersDataVisible} from '../data/use-filters-data-visible';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {SubjectDefNoData, SubjectDefNoDataCreateButton} from '../widgets';

export const NoFilter = (props: { subject: Subject, active: boolean }) => {
	const {subject, active} = props;

	const {fire} = useSubjectDefEventBus();
	const [isVisible] = useState(() => () => {
		return !subject.dataset.filters || subject.dataset.filters.filters.length === 0;
	});
	const visible = useFiltersDataVisible(isVisible);

	const onAddClicked = () => {
		const filter = createSubjectDataSetFilter();
		subject.dataset.filters.filters.push(filter);
		fire(SubjectDefEventTypes.DATASET_FILTER_ADDED, filter);
	};

	return <SubjectDefNoData active={active} visible={visible}>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_FILTER_FOR_SUBJECT}
			<SubjectDefNoDataCreateButton onClick={onAddClicked}>
				{Lang.CONSOLE.CONNECTED_SPACE.CREATE_DATASET_FILTER_WHEN_NONE}
			</SubjectDefNoDataCreateButton>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_FILTER_FOR_SUBJECT_2}
		</span>
	</SubjectDefNoData>;
};