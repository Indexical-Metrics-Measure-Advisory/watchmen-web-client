import React from 'react';
import { Lang } from '../../../../../langs';
import { Subject } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { EmptyPart, PartContent } from './widgets';

export const Select = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	active: boolean;
}) => {
	const { subject, availableTopics, pickedTopics, active } = props;

	if (!active) {
		return null;
	}

	const hasSelect = subject.dataset.columns && subject.dataset.columns.length !== 0;

	return <PartContent>
		{hasSelect
			? subject.dataset.columns.map(column => {

			})
			: <EmptyPart>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_SELECT}</EmptyPart>}
	</PartContent>;
};