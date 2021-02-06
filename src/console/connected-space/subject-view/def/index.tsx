import React, { useState } from 'react';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { SubjectDefDataHolder } from './def-data';
import { DefHeader } from './def-header';
import { PickTopics } from './pick-topics';
import { SubjectDefEventBusProvider } from './subject-def-event-bus';
import { SubjectDefBody, SubjectDefContainer } from './widgets';

export const SubjectDefWrapper = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const [ activeIndex, setActiveIndex ] = useState(1);

	const onActiveIndexChange = (activeIndex: number) => setActiveIndex(activeIndex);

	return <SubjectDefContainer>
		<DefHeader activeIndex={activeIndex} changeActiveIndex={onActiveIndexChange}/>
		<SubjectDefBody activeIndex={activeIndex}>
			<PickTopics connectedSpace={connectedSpace} subject={subject} active={activeIndex === 1}/>
		</SubjectDefBody>
		<SubjectDefDataHolder connectedSpace={connectedSpace} subject={subject}/>
	</SubjectDefContainer>;
};

export const SubjectDef = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	return <SubjectDefEventBusProvider>
		<SubjectDefWrapper connectedSpace={connectedSpace} subject={subject}/>
	</SubjectDefEventBusProvider>;
};