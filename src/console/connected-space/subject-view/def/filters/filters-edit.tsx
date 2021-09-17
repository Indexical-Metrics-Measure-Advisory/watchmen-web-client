import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
import {createSubjectDataSetTopFilter} from '../data-utils';
import {useFiltersDataVisible} from '../data/use-filters-data-visible';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {TopFilterEdit} from './top-filter-edit';
import {FiltersEditContainer} from './widgets';

export const FiltersEdit = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, availableTopics, pickedTopics} = props;

	const {on, off} = useSubjectDefEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(SubjectDefEventTypes.DATASET_FILTER_ADDED, forceUpdate);
		on(SubjectDefEventTypes.DATASET_FILTER_REMOVED, forceUpdate);
		return () => {
			off(SubjectDefEventTypes.DATASET_FILTER_ADDED, forceUpdate);
			off(SubjectDefEventTypes.DATASET_FILTER_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);
	const [isVisible] = useState(() => () => {
		return subject.dataset.filters && subject.dataset.filters.filters.length !== 0;
	});
	const visible = useFiltersDataVisible(isVisible);

	if (!subject.dataset.filters) {
		subject.dataset.filters = createSubjectDataSetTopFilter();
	}

	return <FiltersEditContainer visible={visible}>
		<TopFilterEdit subject={subject} filter={subject.dataset.filters}
		               availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</FiltersEditContainer>;
};