import {toSubjectReports} from '@/routes/utils';
import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {SingleLineAlertLabel} from '@/widgets/alert/widgets';
import {ICON_SUBJECT_REPORT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {useConsoleEventBus} from '../../../console-event-bus';
import {ConsoleEventTypes} from '../../../console-event-bus-types';
import {isDefValid} from '../data-validator';
import {isSubjectReportNow} from './utils';

export const HeaderSubjectReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {once: onceConsole} = useConsoleEventBus();

	const onReportClicked = () => {
		if (isSubjectReportNow()) {
			return;
		}

		const handle = ({valid, messages}: { valid: boolean, messages: Array<string> }) => {
			if (!valid) {
				fireGlobal(EventTypes.SHOW_ALERT,
					<>
						{(messages || []).reduce((all, message) => {
								return <SingleLineAlertLabel>{message}</SingleLineAlertLabel>;
							},
							<SingleLineAlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_DEF_INVALID}</SingleLineAlertLabel>)}
					</>);
			} else {
				history.push(toSubjectReports(connectedSpace.connectId, subject.subjectId));
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

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_REPORT}
	                         ink={isSubjectReportNow() ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onReportClicked}>
		<FontAwesomeIcon icon={ICON_SUBJECT_REPORT}/>
	</PageHeaderButton>;
};