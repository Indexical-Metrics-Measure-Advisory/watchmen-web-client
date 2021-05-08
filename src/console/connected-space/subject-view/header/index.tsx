import React from 'react';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
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