import {Router} from '@/routes/types';
import {toSubjectDef, toSubjectReports} from '@/routes/utils';
import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {Fragment, useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {isDefValid} from './data-validator';
import {SubjectDataSet} from './dataset';
import {SubjectDef} from './def';
import {isSubjectDefNow} from './header/utils';
import {NoReport} from './no-report';
import {ReportList} from './report-list';

export const SubjectBodyRouter = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireConsole} = useConsoleEventBus();
	const [initialized, setInitialized] = useState(false);
	useEffect(() => {
		const handle = ({valid}: { valid: boolean }) => {
			if (!valid && !isSubjectDefNow()) {
				history.replace(toSubjectDef(connectedSpace.connectId, subject.subjectId));
			} else {
				setInitialized(true);
			}
		};
		fireConsole(ConsoleEventTypes.ASK_AVAILABLE_SPACES, (spaces: Array<AvailableSpaceInConsole>) => {
			// eslint-disable-next-line
			const space = spaces.find(space => space.spaceId == connectedSpace.spaceId);
			if (!space) {
				handle(isDefValid(subject, []));
			} else {
				const topicIds = Array.from(new Set(space.topicIds));
				fireConsole(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
					const topicMap = availableTopics.reduce((map, topic) => {
						map.set(topic.topicId, topic);
						return map;
					}, new Map<string, Topic>());
					const topics = topicIds.map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
					handle(isDefValid(subject, topics));
				});
			}
		});
	});

	if (!initialized) {
		return <Fragment/>;
	}

	return <Switch>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORTS}>
			{() => {
				if ((subject.reports || []).length === 0) {
					return <NoReport connectedSpace={connectedSpace} subject={subject}/>;
				} else {
					return <ReportList connectedSpace={connectedSpace} subject={subject}/>;
				}
			}}
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DATA}>
			<SubjectDataSet connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF}>
			<SubjectDef connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path="*">
			<Redirect to={toSubjectReports(connectedSpace.connectId, subject.subjectId)}/>
		</Route>
	</Switch>;
};