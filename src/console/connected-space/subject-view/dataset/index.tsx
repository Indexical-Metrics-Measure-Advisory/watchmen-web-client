import React from 'react';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { DataLoading } from './data/data-loading';
import { TopicsHolder } from './data/topics-holder';
import { DataSet } from './dataset';
import { NoColumn } from './no-column';
import { SubjectDataSetEventBusProvider } from './subject-dataset-event-bus';
import { SubjectDataSetContainer } from './widgets';

export const SubjectDataSet = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	return <SubjectDataSetEventBusProvider>
		<SubjectDataSetContainer>
			<DataSet connectedSpace={connectedSpace} subject={subject}/>
			<NoColumn subject={subject}/>
			<DataLoading subject={subject}/>
			<TopicsHolder connectedSpace={connectedSpace} subject={subject}/>
		</SubjectDataSetContainer>
	</SubjectDataSetEventBusProvider>;
};