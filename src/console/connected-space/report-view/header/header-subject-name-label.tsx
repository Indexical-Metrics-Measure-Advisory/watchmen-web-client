import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {SubjectNameLabel} from './widgets';

export const HeaderSubjectNameLabel = (props: { connectedSpace: ConnectedSpace; subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <SubjectNameLabel>@ {connectedSpace.name} / {subject.name}</SubjectNameLabel>;
};
