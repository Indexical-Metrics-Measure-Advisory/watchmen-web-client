import React from 'react';
import {Subject} from '../../../../../services/tuples/subject-types';
import {Topic} from '../../../../../services/tuples/topic-types';
import {SubjectDsl} from '../../../subject-dsl';
import {OverviewPanelContainer} from './widgets';

export const OverviewPanel = (props: {
    subject: Subject;
    availableTopics: Array<Topic>;
    pickedTopics: Array<Topic>;
    active: boolean;
}) => {
    const {subject, availableTopics, pickedTopics, active} = props;

    return <OverviewPanelContainer>
        <SubjectDsl subject={subject} availableTopics={availableTopics} pickedTopics={pickedTopics} visible={active}/>
    </OverviewPanelContainer>;
};