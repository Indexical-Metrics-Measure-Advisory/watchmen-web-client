import React from 'react';
import { Lang } from '../../../../../langs';
import { Subject } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { EmptyPart, PartContent } from './widgets';

export const Where = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	active: boolean;
}) => {
	const { subject, availableTopics, pickedTopics, active } = props;

	if (!active) {
		return null;
	}

	const hasFilter = subject.dataset.filters
		&& subject.dataset.filters.filters
		&& subject.dataset.filters.filters.length !== 0;

	return <PartContent>
		{hasFilter
			? subject.dataset.filters.filters.map(filter => {

			})
			: <EmptyPart>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_WHERE}</EmptyPart>}
	</PartContent>;
};