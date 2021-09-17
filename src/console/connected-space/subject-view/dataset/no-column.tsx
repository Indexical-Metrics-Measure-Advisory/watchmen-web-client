import {Subject} from '@/services/data/tuples/subject-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {SubjectDataSetNoColumn} from './widgets';

export const NoColumn = (props: { subject: Subject }) => {
	const {subject} = props;

	if (subject.dataset.columns.length !== 0) {
		return null;
	}

	return <SubjectDataSetNoColumn>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_COLUMN}
		</span>
	</SubjectDataSetNoColumn>;
};