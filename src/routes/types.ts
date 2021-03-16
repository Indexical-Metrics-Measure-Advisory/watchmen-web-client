export enum Router {
	LOGIN = '/login',

	ADMIN = '/admin',
	ADMIN_TOPICS = '/admin/topics',
	ADMIN_ENUMS = '/admin/enums',
	ADMIN_REPORTS = '/admin/reports',
	ADMIN_SPACES = '/admin/space',
	ADMIN_PIPELINE = '/admin/pipeline/:pipelineId',
	ADMIN_PIPELINE_CATALOG = '/admin/pipeline/catalog',
	ADMIN_PIPELINES = '/admin/pipeline',
	ADMIN_USER_GROUPS = '/admin/user-groups',
	ADMIN_USERS = '/admin/users',
	ADMIN_TASKS = '/admin/tasks',

	CONSOLE = '/console',
	CONSOLE_HOME = '/console/home',
	CONSOLE_DASHBOARD = '/console/dashboard/:dashboardId',
	CONSOLE_CONNECTED_SPACE = '/console/space/connected/:connectId',
	CONSOLE_CONNECTED_SPACE_CATALOG = '/console/space/connected/:connectId/catalog',
	CONSOLE_CONNECTED_SPACE_SUBJECT = '/console/space/connected/:connectId/subject/:subjectId',
	CONSOLE_CONNECTED_SPACE_SUBJECT_DEF = '/console/space/connected/:connectId/subject/:subjectId/def',
	CONSOLE_CONNECTED_SPACE_SUBJECT_DATA = '/console/space/connected/:connectId/subject/:subjectId/data',
	CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT = '/console/space/connected/:connectId/subject/:subjectId/report',
	CONSOLE_NOTIFICATION = '/console/notification',
	CONSOLE_MAIL = '/console/mail',
	CONSOLE_TIMELINE = '/console/timeline',
	CONSOLE_SETTINGS = '/console/settings',

	SHARE = '/share',
	SHARE_DASHBOARD = '/share/dashboard/:dashboardId/:token',
	SHARE_SUBJECT = '/share/subject/:subjectId/:token'
}