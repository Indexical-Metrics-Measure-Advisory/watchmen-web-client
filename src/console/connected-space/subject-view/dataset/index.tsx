import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {DataLoading} from './data/data-loading';
import {TopicsHolder} from './data/topics-holder';
import {SubjectDataGrid} from './grid';
import {NoColumn} from './no-column';
import {SubjectDataSetEventBusProvider} from './subject-dataset-event-bus';
import {SubjectDataSetContainer} from './widgets';

export const SubjectDataSet = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <SubjectDataSetEventBusProvider>
		<SubjectDataSetContainer>
			<SubjectDataGrid connectedSpace={connectedSpace} subject={subject}/>
			<NoColumn subject={subject}/>
			<DataLoading subject={subject}/>
			<TopicsHolder connectedSpace={connectedSpace} subject={subject}/>
		</SubjectDataSetContainer>
	</SubjectDataSetEventBusProvider>;
};