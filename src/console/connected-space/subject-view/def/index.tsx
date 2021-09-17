import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React, {useState} from 'react';
import {Columns} from './columns';
import {SubjectDefDataHolder} from './def-data';
import {SubjectDefSaver} from './def-data/def-saver';
import {Filters} from './filters';
import {Header} from './header';
import {Joins} from './joins';
import {Overview} from './overview';
import {PickTopics} from './pick-topics';
import {SubjectDefEventBusProvider} from './subject-def-event-bus';
import {SubjectDefBody, SubjectDefContainer} from './widgets';

export const SubjectDefWrapper = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const [activeIndex, setActiveIndex] = useState(1);

	const onActiveIndexChange = (activeIndex: number) => setActiveIndex(activeIndex);

	return <SubjectDefContainer>
		<Header subject={subject} activeIndex={activeIndex} changeActiveIndex={onActiveIndexChange}/>
		<SubjectDefBody activeIndex={activeIndex}>
			<PickTopics connectedSpace={connectedSpace} subject={subject} active={activeIndex === 1}/>
			<Columns connectedSpace={connectedSpace} subject={subject} active={activeIndex === 2}/>
			<Filters connectedSpace={connectedSpace} subject={subject} active={activeIndex === 3}/>
			<Joins connectedSpace={connectedSpace} subject={subject} active={activeIndex === 4}/>
			<Overview connectedSpace={connectedSpace} subject={subject} active={activeIndex === 5}/>
		</SubjectDefBody>
		<SubjectDefDataHolder connectedSpace={connectedSpace} subject={subject}/>
	</SubjectDefContainer>;
};

export const SubjectDef = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <SubjectDefEventBusProvider>
		<SubjectDefSaver connectedSpace={connectedSpace} subject={subject}/>
		<SubjectDefWrapper connectedSpace={connectedSpace} subject={subject}/>
	</SubjectDefEventBusProvider>;
};