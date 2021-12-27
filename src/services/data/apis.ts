import {findToken} from './account';
import {doFetch, getServiceHost} from './utils';

export const Apis = {
	LOGIN: 'login/access-token',

	// admin only
	PIPELINE_ALL: 'pipeline/all',
	PIPELINE_UPDATED: 'pipeline/updated',
	PIPELINE_GRAPHICS_MINE: 'pipeline/graphics/me',
	PIPELINE_GRAPHICS_MINE_UPDATED: 'pipeline/graphics/me/updated',
	PIPELINE_GRAPHICS_SAVE: 'pipeline/graphics',
	PIPELINE_GRAPHICS_DELETE: 'pipeline/graphics/delete?pipeline_graph_id=:pipelineGraphId',
	PIPELINE_GET: 'pipeline/id?pipeline_id=:pipelineId',
	PIPELINE_CREATE: 'pipeline',
	PIPELINE_SAVE: 'pipeline',
	PIPELINE_RENAME: 'pipeline/rename?pipeline_id=:pipelineId&name=:name',
	PIPELINE_ENABLE: 'pipeline/enabled?pipeline_id=:pipelineId&enabled=:enabled',

	SPACE_LIST_BY_NAME: 'space/name?query_name=:search',
	SPACE_LIST_FOR_HOLDER_BY_NAME: 'query/space/group?query_name=:search',
	SPACE_BY_IDS: 'space/ids',
	SPACE_GET: 'space?space_id=:spaceId',
	SPACE_CREATE: 'space',
	SPACE_SAVE: 'update/space?space_id=:spaceId',
	SPACES_EXPORT: 'space/export',

	TOPIC_ALL: 'topic/all',
	TOPIC_UPDATED: 'topic/updated',
	TOPIC_LIST_BY_NAME: 'topic/name?query_name=:search',
	TOPIC_LIST_FOR_HOLDER_BY_NAME: 'query/topic/space?query_name=:search',
	TOPIC_LIST_FOR_HOLDER_BY_NAME_NON_RAW: 'query/topic/space?query_name=:search&exclude=raw',
	TOPIC_GET: 'topic?topic_id=:topicId',
	TOPIC_CREATE: 'topic',
	TOPIC_SAVE: 'update/topic?topic_id=:topicId',
	TOPIC_PROFILE: 'dqc/topic/profile?topic_id=:topicId&date=:date',

	ENUM_LIST_BY_NAME: 'enum/name?query_name=:search',
	ENUM_GET: 'enum/id?enum_id=:enumId',
	ENUM_CREATE: 'enum',
	ENUM_SAVE: 'enum',
	ENUM_LOAD_ALL: 'enum/all',

	REPORT_LIST_BY_NAME: 'report/name?query_name=:search',

	USER_LIST_BY_NAME: 'user/name?query_name=:search',
	USER_LIST_FOR_HOLDER_BY_NAME: 'query/user/group?query_name=:search',
	USER_BY_IDS: 'user/ids',
	USER_GET: 'user?user_id=:userId',
	USER_CREATE: 'user',
	USER_SAVE: 'user',

	TENANT_LIST_BY_NAME: 'tenant/name?query_name=:search',
	TENANT_GET: 'tenant?tenant_id=:tenantId',
	TENANT_CREATE: 'tenant',
	TENANT_SAVE: 'tenant',

	USER_GROUP_LIST_BY_NAME: 'user_group/name?query_name=:search',
	USER_GROUP_LIST_FOR_HOLDER_BY_NAME: 'query/user_group/space?query_name=:search',
	USER_GROUP_BY_IDS: 'user_groups/ids',
	USER_GROUP_GET: 'user_group?user_group_id=:userGroupId',
	USER_GROUP_CREATE: 'user_group',
	USER_GROUP_SAVE: 'update/user_group?user_group_id=:userGroupId',

	DATASOURCE_LIST_BY_NAME: 'datasource/name?query_name=:search',
	DATASOURCE_GET: 'datasource/id?datasource_id=:dataSourceId',
	DATASOURCE_CREATE: 'datasource',
	DATASOURCE_SAVE: 'datasource',
	DATASOURCE_LOAD_ALL: 'datasource/all',

	EXTERNAL_WRITER_LIST_BY_NAME: 'external_writer/name?query_name=:search',
	EXTERNAL_WRITER_GET: 'external_writer/id?writer_id=:writerId',
	EXTERNAL_WRITER_CREATE: 'external_writer',
	EXTERNAL_WRITER_SAVE: 'external_writer',
	EXTERNAL_WRITER_LOAD_ALL: 'external_writer/all',

	DASHBOARD_FOR_ADMIN: 'home/dashboard',

	// authenticated
	SPACES_AVAILABLE: 'space/available',
	SPACE_CONNECT: 'space/connect?space_id=:spaceId&name=:name&template_ids=:templateIds',

	TOPICS_BY_IDS: 'topic/ids',

	CONNECTED_SPACES_MINE: 'console_space/connected/me',
	CONNECTED_SPACES_GRAPHICS_MINE: 'console_space/graphics/me',
	CONNECTED_SPACE_SAVE: 'console_space/save',
	CONNECTED_SPACE_RENAME: 'console_space/rename?connect_id=:connectId&name=:name',
	CONNECTED_SPACE_DELETE: 'console_space/delete?connect_id=:connectId',
	CONNECTED_SPACE_GRAPHICS_SAVE: 'console_space/graphics',
	CONNECTED_SPACES_TEMPLATE_LIST: 'console_space/template/list?space_id=:spaceId',
	CONNECTED_SPACES_EXPORT: 'console_space/export',

	SUBJECT_CREATE: 'console_space/subject?connect_id=:connectId',
	SUBJECT_SAVE: 'console_space/subject/save',
	SUBJECT_RENAME: 'console_space/subject/rename?subject_id=:subjectId&name=:name',
	SUBJECT_DELETE: 'console_space/subject/delete?subject_id=:subjectId',
	/**
	 * @deprecated Subject share is deprecated and removed from frontend implementation, not supported anymore
	 */
	SUBJECT_SHARE: 'subject/share',
	SUBJECT_DATA: 'console_space/subject/dataset?subject_id=:subjectId',

	REPORT_CREATE: 'console_space/subject/report/save?subject_id=:subjectId',
	REPORT_SAVE: 'console_space/subject/report/update',
	REPORT_DELETE: 'console_space/subject/report/delete?report_id=:reportId',
	REPORT_TEMPORARY: 'console_space/dataset/chart/temporary',
	REPORT_DATA: 'console_space/dataset/chart?report_id=:reportId',

	/** TODO api to retrieve dashboard share url from server side, not implemented yet */
	DASHBOARD_SHARE: 'dashboard/share',
	DASHBOARD_MINE: 'dashboard/me',
	DASHBOARD_CREATE: 'dashboard/create?name=:name',
	DASHBOARD_SAVE: 'dashboard/save',
	DASHBOARD_RENAME: 'dashboard/rename?dashboard_id=:dashboardId&name=:name',
	DASHBOARD_DELETE: 'dashboard/delete?dashboard_id=:dashboardId',

	FAVORITE_MINE: 'favorites/me',
	FAVORITE_SAVE: 'favorites/save',

	LAST_SNAPSHOT_MINE: 'last_snapshot/me',
	LAST_SNAPSHOT_SAVE: 'last_snapshot/save',

	PAT_LIST: 'pat/list',
	PAT_CREATE: 'pat/create',
	PAT_DELETE: 'pat/delete?pat_id=:patId',

	// any
	SUBJECT_SHARE_GET: 'share/subject?subject_id=:subjectId&&token=:token',
	DASHBOARD_SHARE_GET: 'share/dashboard?dashboard_id=:dashboardId&&token=:token',

	QUERY_LOG: 'pipeline/log/query',
	QUERY_RULE: 'dqc/monitor/query',
	QUERY_RULE_RESULT: 'dqc/rule/result/query',
	SAVE_RULE_LIST: 'dqc/monitor/rules',
	IMPORT_TOPICS_AND_PIPELINES: 'import',

	QUERY_CATALOG: 'dqc/catalog/query',
	CATALOG_CREATE: 'dqc/catalog',
	CATALOG_SAVE: 'dqc/update/catalog?catalog_id=:catalogId',
	CATALOG_DELETE: 'dqc/catalog/delete?catalog_id=:catalogId',

	INDICATORS_LIST_FOR_SELECTION: 'indicator/indicator/list/selection?query_name=:search',
	TOPIC_LIST_FOR_INDICATOR_SELECTION: 'query/topic/factor/index?query_name=:search',
	ENUM_LIST_FOR_INDICATOR_TOPIC: 'enum/list/selection?topic_id=:topicId',
	INDICATOR_GET: 'indicator/indicator?indicator_id=:indicatorId',
	INDICATOR_CREATE: 'indicator/indicator',
	INDICATOR_SAVE: 'indicator/update/indicator?indicator_id=:indicatorId',
	RELEVANT_INDICATOR_LIST: 'indicator/indicator/relevant?indicator_id=:indicatorId',
	INDICATOR_CATEGORIES: 'indicator/categories',
	INDICATORS_LIST: 'indicator/indicator/list',

	BUCKET_LIST_BY_NAME: 'indicator/bucket/name?query_name=:search',
	BUCKET_CREATE: 'indicator/bucket',
	BUCKET_SAVE: 'indicator/update/bucket?bucket_id=:bucketId',
	BUCKET_GET: 'indicator/bucket?bucket_id=:bucketId',
	BUCKET_LIST_FOR_INDICATOR_VALUE: 'indicator/bucket/numeric-value?query_name=:search',
	/** bucketIds is joined by comma */
	BUCKET_LIST_BY_IDS: 'indicator/buckets/ids?bucket_ids=:bucketIds',
	BUCKET_LIST_BY_METHODS: 'indicator/buckets/methods',

	INSPECTION_LIST: 'indicator/inspection/list',
	INSPECTION_CREATE: 'indicator/inspection',
	INSPECTION_GET: 'indicator/inspection?inspection_id=:inspectionId',
	INSPECTION_SAVE: 'indicator/update/inspection?inspection_id=:inspectionId',
	INSPECTION_DATA: 'indicator/inspection/data?inspection_id=:inspectionId',

	NAVIGATION_LIST_BY_NAME: 'indicator/navigation/name?query_name=:search',
	NAVIGATION_CREATE: 'indicator/navigation',
	NAVIGATION_SAVE: 'indicator/update/navigation?navigation_id=:navigationId',
	NAVIGATION_GET: 'indicator/navigation?navigation_id=:navigationId',
	NAVIGATION_INDICATOR_DATA: 'indicator/navigation/data'
};

const buildApi = (api: string, args?: Record<string, any>): string => {
	if (!args) {
		return api;
	}

	return Object.keys(args).reduce((api: string, key: string) => {
		return api.replace(`:${key}`, encodeURIComponent(args[key]));
	}, api);
};

const request = async (options: {
	api: string;
	method: 'POST' | 'GET';
	search?: Record<string, any>;
	auth?: boolean;
	pageable?: { pageNumber: number; pageSize: number };
	data?: any;
}) => {
	const {api, method = 'GET', search, auth = true, pageable, data} = options;

	const url = `${getServiceHost()}${buildApi(api, search)}`;

	const headers: HeadersInit = {
		'Content-Type': 'application/json'
	};
	if (auth) {
		headers.Authorization = `Bearer ${findToken()}`;
	}

	let body;
	if (pageable) {
		body = JSON.stringify(pageable);
	} else if (data) {
		body = JSON.stringify(data);
	}

	const response = await doFetch(url, {method, headers, body});
	return await response.json();
};

export const get = async (options: { api: string; search?: Record<string, any>; auth?: boolean }) => {
	const {api, search, auth} = options;
	return await request({api, method: 'GET', search, auth});
};

export const post = async (options: { api: string; search?: Record<string, any>; auth?: boolean; data?: any }) => {
	const {api, search, auth, data} = options;
	return await request({api, method: 'POST', search, auth, data});
};

export const page = async (options: {
	api: string;
	search?: Record<string, any>;
	auth?: boolean;
	pageable?: { pageNumber: number; pageSize: number };
}) => {
	const {api, search, auth, pageable} = options;
	return await request({api, method: 'POST', search, auth, pageable});
};
