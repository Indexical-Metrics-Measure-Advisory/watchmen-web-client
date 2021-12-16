import {ConnectedSpaceId} from '@/services/data/tuples/connected-space-types';
import {DashboardId} from '@/services/data/tuples/dashboard-types';
import {NavigationId} from '@/services/data/tuples/navigation-types';
import {PipelineId} from '@/services/data/tuples/pipeline-types';
import {ReportId} from '@/services/data/tuples/report-types';
import {SubjectId} from '@/services/data/tuples/subject-types';
import {matchPath} from 'react-router-dom';
import {Router} from './types';

export const isConnectedSpaceOpened = (connectedSpaceId: ConnectedSpaceId): boolean => {
	const match = matchPath<{ connectId: ConnectedSpaceId }>(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE);
	// eslint-disable-next-line
	return !!match && match.params.connectId == connectedSpaceId;
};
export const toConnectedSpace = (connectedSpaceId: ConnectedSpaceId) => Router.CONSOLE_CONNECTED_SPACE.replace(':connectId', connectedSpaceId);
export const toConnectedSpaceCatalog = (connectedSpaceId: ConnectedSpaceId) => Router.CONSOLE_CONNECTED_SPACE_CATALOG.replace(':connectId', connectedSpaceId);
export const toSubject = (connectedSpaceId: ConnectedSpaceId, subjectId: SubjectId) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};
export const toSubjectDef = (connectedSpaceId: ConnectedSpaceId, subjectId: SubjectId) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};
export const toSubjectData = (connectedSpaceId: ConnectedSpaceId, subjectId: SubjectId) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DATA.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};
export const toSubjectReports = (connectedSpaceId: ConnectedSpaceId, subjectId: SubjectId) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORTS.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};
export const toSubjectReport = (connectedSpaceId: ConnectedSpaceId, subjectId: SubjectId, reportId: ReportId) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId).replace(':reportId', reportId);
};
export const isDashboardOpened = (dashboardId: DashboardId): boolean => {
	const match = matchPath<{ dashboardId: DashboardId }>(window.location.pathname, Router.CONSOLE_DASHBOARD);
	// eslint-disable-next-line
	return !!match && match.params.dashboardId == dashboardId;
};
export const toDashboard = (dashboardId: DashboardId) => Router.CONSOLE_DASHBOARD.replace(':dashboardId', dashboardId);
export const toPipeline = (pipelineId: PipelineId) => Router.ADMIN_PIPELINE.replace(':pipelineId', pipelineId);
export const toNavigationEdit = (navigationId: NavigationId) => Router.INDICATOR_WORKBENCH_NAVIGATION_EDIT.replace(':navigationId', navigationId);