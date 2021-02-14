import { matchPath } from 'react-router-dom';
import { Router } from './types';

export const isConnectedSpaceOpened = (connectedSpaceId: string): boolean => {
	const match = matchPath<{ connectId: string }>(window.location.pathname, Router.CONSOLE_CONNECTED_SPACE);
	// eslint-disable-next-line
	return !!match && match.params.connectId == connectedSpaceId;
};
export const toConnectedSpace = (connectedSpaceId: string) => Router.CONSOLE_CONNECTED_SPACE.replace(':connectId', connectedSpaceId);
export const toConnectedSpaceCatalog = (connectedSpaceId: string) => Router.CONSOLE_CONNECTED_SPACE_CATALOG.replace(':connectId', connectedSpaceId);
export const toSubject = (connectedSpaceId: string, subjectId: string) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};
export const toSubjectDef = (connectedSpaceId: string, subjectId: string) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};
export const toSubjectData = (connectedSpaceId: string, subjectId: string) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DATA.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};
export const toSubjectReport = (connectedSpaceId: string, subjectId: string) => {
	return Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT.replace(':connectId', connectedSpaceId).replace(':subjectId', subjectId);
};

export const isDashboardOpened = (dashboardId: string): boolean => {
	const match = matchPath<{ dashboardId: string }>(window.location.pathname, Router.CONSOLE_DASHBOARD);
	// eslint-disable-next-line
	return !!match && match.params.dashboardId == dashboardId;
};
export const toDashboard = (dashboardId: string) => Router.CONSOLE_DASHBOARD.replace(':dashboardId', dashboardId);

export const toPipeline = (pipelineId: string) => Router.ADMIN_PIPELINE.replace(':pipelineId', pipelineId);