import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {ICON_CLOSE, ICON_SUBJECT} from '../../../../basic-widgets/constants';
import {TooltipAlignment} from '../../../../basic-widgets/types';
import {Lang} from '../../../../langs';
import {toSubject} from '../../../../routes/utils';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Report} from '../../../../services/tuples/report-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {Tuple} from '../../../../services/tuples/tuple-types';
import {isReport, isSubject, isTopic} from '../../../../services/tuples/utils';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {ReportBody} from './report-body';
import {SubjectBody} from './subject-body';
import {TopicBody} from './topic-body';
import {NavigatorContainer, NavigatorHeader, NavigatorHeaderButton, NavigatorHeaderTitle} from './widgets';

export const Navigator = (props: { connectedSpace: ConnectedSpace }) => {
    const {connectedSpace} = props;

    const history = useHistory();
    const {on, off} = useCatalogEventBus();
    const [visible, setVisible] = useState(false);
    const [tuple, setTuple] = useState<Tuple | null>(null);
    useEffect(() => {
        const onTopicSelected = (topic: Topic) => {
            setTuple(topic);
            setVisible(true);
        };
        const onSubjectSelected = (subject: Subject) => {
            setTuple(subject);
            setVisible(true);
        };
        const onReportSelected = (report: Report) => {
            setTuple(report);
            setVisible(true);
        };

        on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
        on(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
        on(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
        return () => {
            off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
            off(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
            off(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
        };
    }, [on, off]);

    const onOpenSubjectClicked = () => {
        if (tuple && isSubject(tuple)) {
            history.push(toSubject(connectedSpace.connectId, tuple.subjectId));
        }
    };
    const onCloseClicked = () => {
        setVisible(false);
    };

    let name = '';
    if (tuple == null) {
    } else if (isTopic(tuple)) {
        name = tuple.name;
    } else if (isSubject(tuple)) {
        name = tuple.name;
    } else if (isReport(tuple)) {
        name = tuple.name;
    }

    return <NavigatorContainer visible={visible}>
        <NavigatorHeader>
            <NavigatorHeaderTitle>{name}</NavigatorHeaderTitle>
            {tuple != null && isSubject(tuple)
                ? <NavigatorHeaderButton
                    tooltip={{
                        label: Lang.CONSOLE.CONNECTED_SPACE.OPEN_SUBJECT,
                        alignment: TooltipAlignment.RIGHT,
                        offsetX: 4
                    }}
                    onClick={onOpenSubjectClicked}>
                    <FontAwesomeIcon icon={ICON_SUBJECT}/>
                </NavigatorHeaderButton>
                : null}
            <NavigatorHeaderButton
                tooltip={{label: Lang.ACTIONS.CLOSE, alignment: TooltipAlignment.RIGHT, offsetX: 4}}
                onClick={onCloseClicked}>
                <FontAwesomeIcon icon={ICON_CLOSE}/>
            </NavigatorHeaderButton>
        </NavigatorHeader>
        {tuple != null && isTopic(tuple)
            ? <TopicBody topic={tuple}/>
            : null}
        {tuple != null && isSubject(tuple)
            ? <SubjectBody connectedSpace={connectedSpace} subject={tuple}/>
            : null}
        {tuple != null && isReport(tuple)
            ? <ReportBody report={tuple}/>
            : null}
    </NavigatorContainer>;
};