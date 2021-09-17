import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {HeaderConnectedSpaceNameLabel} from './header-connected-space-name-label';
import {HeaderSubjectNameEditor} from './header-subject-name-editor';
import {SubjectHeaderButtons} from './subject-header-buttons';
import {PageHeaderHolder} from './widgets';

export const SubjectHeader = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <PageHeaderHolder>
		<HeaderSubjectNameEditor connectedSpace={connectedSpace} subject={subject}/>
		<HeaderConnectedSpaceNameLabel connectedSpace={connectedSpace}/>
		<SubjectHeaderButtons connectedSpace={connectedSpace} subject={subject}/>
	</PageHeaderHolder>;
};