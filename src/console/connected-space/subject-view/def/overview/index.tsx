import React, {useEffect, useRef} from 'react';
import {Lang} from '../../../../../langs';
import {ConnectedSpace} from '../../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../../services/tuples/subject-types';
import {useTopicData} from '../data/use-topic-data';
import {SubjectDefBodyCover} from '../widgets';
import {OverviewPanel} from './overview-panel';
import {OverviewBottomGap, OverviewContainer} from './widgets';

export const Overview = (props: {
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

    return <OverviewContainer active={active} ref={containerRef}>
        <OverviewPanel subject={subject}
                       availableTopics={availableTopics} pickedTopics={pickedTopics}
                       active={active}/>
        <OverviewBottomGap/>
        <SubjectDefBodyCover active={active}>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_OVERVIEW}</SubjectDefBodyCover>
    </OverviewContainer>;
};