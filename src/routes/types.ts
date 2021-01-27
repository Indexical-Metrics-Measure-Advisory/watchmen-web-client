export enum Router {
	LOGIN = '/login',

	ADMIN = '/admin',
	ADMIN_TOPICS = '/admin/topics',
	ADMIN_REPORTS = '/admin/reports',
	ADMIN_SPACES = '/admin/space',
	ADMIN_PIPELINES = '/admin/pipelines',
	ADMIN_USER_GROUPS = '/admin/user-groups',
	ADMIN_USERS = '/admin/users',
	ADMIN_TASKS = '/admin/tasks',

	CONSOLE = '/console',
	CONSOLE_HOME = '/console/home',
	CONSOLE_DASHBOARDS = '/console/dashboard',
	CONSOLE_DASHBOARD = '/console/dashboard/:dashboardId',
	CONSOLE_CONNECTED_SPACE = '/console/space/connected/:connectId',
	CONSOLE_CONNECTED_SPACE_OVERALL = '/console/space/connected/:connectId/overall',
	CONSOLE_CONNECTED_SPACE_RESOURCES = '/console/space/connected/:connectId/resources',
	CONSOLE_CONNECTED_SPACE_GROUP = '/console/space/connected/:connectId/group/:groupId',
	CONSOLE_CONNECTED_SPACE_SUBJECT = '/console/space/connected/:connectId/subject/:subjectId',
	CONSOLE_NOTIFICATION = '/console/notification',
	CONSOLE_MAIL = '/console/mail',
	CONSOLE_TIMELINE = '/console/timeline',
	CONSOLE_SETTINGS = '/console/settings'
}