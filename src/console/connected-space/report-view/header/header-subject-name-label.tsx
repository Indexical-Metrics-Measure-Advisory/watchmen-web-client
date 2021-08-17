import React from 'react';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {SubjectNameLabel} from './widgets';
import {Subject} from '../../../../services/tuples/subject-types';

export const HeaderSubjectNameLabel = (props: { connectedSpace: ConnectedSpace; subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <SubjectNameLabel>@ {connectedSpace.name} / {subject.name}</SubjectNameLabel>;
};
