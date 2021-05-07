import React, {useEffect, useRef} from 'react';
import {Lang} from '../../../../../langs';
import {ConnectedSpace} from '../../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../../services/tuples/subject-types';
import {useTopicData} from '../data/use-topic-data';
import {SubjectDefBodyCover} from '../widgets';
import {JoinsEdit} from './joins-edit';
import {NoJoin} from './no-join';
import {JoinsBottomGap, JoinsContainer} from './widgets';

export const Joins = (props: {
    connectedSpace: ConnectedSpace;
    subject: Subject;
    active: boolean;
}) => {
    const {subject, active} = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const {availableTopics, pickedTopics} = useTopicData();
    useEffect(() => {
        if (!active && containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [active]);

    return <JoinsContainer active={active} ref={containerRef}>
        <NoJoin subject={subject} active={active}/>
        <JoinsEdit subject={subject} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
        <JoinsBottomGap/>
        <SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_SET_JOINS}</SubjectDefBodyCover>
    </JoinsContainer>;
};