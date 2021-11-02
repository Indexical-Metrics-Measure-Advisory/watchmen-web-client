import {Router} from '@/routes/types';
import {toConnectedSpace, toConnectedSpaceCatalog, toSubject} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report, ReportId} from '@/services/data/tuples/report-types';
import {Subject, SubjectId} from '@/services/data/tuples/subject-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory, useParams} from 'react-router-dom';
import {Catalog} from './catalog';
import {ReportView} from './report-view';
import {SubjectView} from './subject-view';

const ReportRouter = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	const {subjectId, reportId} = useParams<{ subjectId: SubjectId; reportId: ReportId }>();
	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const [data, setData] = useState<{ subject: Subject, report: Report } | null>(null);

	useEffect(() => {
		// eslint-disable-next-line
		const subject = connectedSpace.subjects.find(subject => subject.subjectId == subjectId);
		if (subject) {
			// eslint-disable-next-line
			const report = (subject.reports || []).find(report => report.reportId == reportId);
			if (report) {
				setData({subject, report});
			} else {
				fireGlobal(EventTypes.SHOW_ALERT,
					<AlertLabel>{Lang.CONSOLE.ERROR.REPORT_NOT_FOUND}</AlertLabel>, () => {
						history.replace(toSubject(connectedSpace.connectId, subject.subjectId));
					});
			}
		} else {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.ERROR.SUBJECT_NOT_FOUND}</AlertLabel>, () => {
				history.replace(toConnectedSpace(connectedSpace.connectId));
			});
		}
	}, [connectedSpace.connectId, connectedSpace.subjects, subjectId, reportId, fireGlobal, history]);

	if (!data) {
		return null;
	}

	return <ReportView connectedSpace={connectedSpace} subject={data.subject} report={data.report}/>;
};

export const PageRouter = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	return <Switch>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT}>
			<ReportRouter connectedSpace={connectedSpace}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT}>
			<SubjectView connectedSpace={connectedSpace}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_CATALOG}>
			<Catalog connectedSpace={connectedSpace}/>
		</Route>
		<Route path="*">
			<Redirect to={toConnectedSpaceCatalog(connectedSpace.connectId)}/>
		</Route>
	</Switch>;
};