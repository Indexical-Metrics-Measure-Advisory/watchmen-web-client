import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {AlertLabel} from '../../../../alert/widgets';
import {ICON_SUBJECT_DATA} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {ButtonInk} from '../../../../basic-widgets/types';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {Lang} from '../../../../langs';
import {toSubjectData} from '../../../../routes/utils';
import {AvailableSpaceInConsole} from '../../../../services/console/settings-types';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {useConsoleEventBus} from '../../../console-event-bus';
import {ConsoleEventTypes} from '../../../console-event-bus-types';
import {isDefValid} from '../data-validator';
import {isSubjectDataNow} from './utils';

export const HeaderSubjectDataButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
    const {connectedSpace, subject} = props;

    const history = useHistory();
    const {fire: fireGlobal} = useEventBus();
    const {once: onceConsole} = useConsoleEventBus();

    const onDataClicked = async () => {
        if (isSubjectDataNow()) {
            return;
        }
        const handle = (valid: boolean) => {
            if (!valid) {
                fireGlobal(EventTypes.SHOW_ALERT,
                    <AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_INVALID}</AlertLabel>);
            } else {
                history.push(toSubjectData(connectedSpace.connectId, subject.subjectId));
            }
        };

        onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_SPACES, (spaces: Array<AvailableSpaceInConsole>) => {
            // eslint-disable-next-line
            const space = spaces.find(space => space.spaceId == connectedSpace.spaceId);
            if (!space) {
                handle(isDefValid(subject, []));
            } else {
                const topicIds = Array.from(new Set(space.topicIds));
                onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
                    const topicMap = availableTopics.reduce((map, topic) => {
                        map.set(topic.topicId, topic);
                        return map;
                    }, new Map<string, Topic>());
                    const topics = topicIds.map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
                    handle(isDefValid(subject, topics));
                }).fire(ConsoleEventTypes.ASK_AVAILABLE_TOPICS);
            }
        }).fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES);
    };

    return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DATA}
                             ink={isSubjectDataNow() ? ButtonInk.PRIMARY : (void 0)}
                             onClick={onDataClicked}>
        <FontAwesomeIcon icon={ICON_SUBJECT_DATA}/>
    </PageHeaderButton>;
};