import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Router } from '../../../routes/types';
import { toSubjectDef, toSubjectReport } from '../../../routes/utils';
import { AvailableSpaceInConsole } from '../../../services/console/settings-types';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Subject } from '../../../services/tuples/subject-types';
import { Topic } from '../../../services/tuples/topic-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { isDefValid } from './data-validator';
import { SubjectDataSet } from './dataset';
import { SubjectDef } from './def';
import { isSubjectDefNow } from './header/utils';
import { SubjectReports } from './report';

export const SubjectBodyRouter = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const history = useHistory();
	const { once: onceConsole } = useConsoleEventBus();
	const [ initialized, setInitialized ] = useState(false);
	useEffect(() => {
		const handle = (valid: boolean) => {
			if (!valid && !isSubjectDefNow()) {
				history.replace(toSubjectDef(connectedSpace.connectId, subject.subjectId));
			} else {
				setInitialized(true);
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
	});

	if (!initialized) {
		return <></>;
	}

	return <Switch>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT}>
			<SubjectReports connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DATA}>
			<SubjectDataSet connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF}>
			<SubjectDef connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path="*">
			<Redirect to={toSubjectReport(connectedSpace.connectId, subject.subjectId)}/>
		</Route>
	</Switch>;
};