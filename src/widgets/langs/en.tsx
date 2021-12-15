import React from 'react';

export const En = {
	$$settings: {
		code: 'en',
		name: 'English',
		fallback: ''
	},
	// fix key, anything under PLAIN will not be proxy to other type
	// anything must be string, should be placed here.
	// such as input tooltip(string property), tuple name(not for react component)
	PLAIN: {
		NEW_DASHBOARD_NAME: 'Dashboard',
		DEFAULT_DASHBOARD_NAME: 'Dashboard',
		NEW_CONNECTED_SPACE_NAME: 'Connected Space',
		DEFAULT_CONNECTED_SPACE_NAME: 'Connected Space',
		NEW_SUBJECT_NAME: 'Subject',
		DEFAULT_SUBJECT_NAME: 'Subject',
		NEW_REPORT_NAME: 'Report',
		DEFAULT_REPORT_NAME: 'Report',
		CONSTANT_INPUT_PLACEHOLDER: 'Constant value please...',
		UNKNOWN_TOPIC_NAME: 'Unknown Topic',
		UNKNOWN_FACTOR_NAME: 'Unknown Factor',
		REPORT_DESCRIPTION_PLACEHOLDER: 'Description here...',
		REPORT_DATASET_GRID_TITLE: 'Report Dataset',
		REPORT_DATASET_GRID_CLOSE: 'Close',
		REPORT_DATASET_GRID_REFRESH: 'Refresh',
		REPORT_DATASET_GRID_DOWNLOAD: 'Download',
		LOADING: 'Loading...',
		FIND_INDICATOR_PLACEHOLDER: 'Find by indicator name, topic name or factor name.',
		FIND_TOPIC_OR_FACTOR_PLACEHOLDER: 'Find by topic name, factor name.',
		INDICATOR_NAME_PLACEHOLDER: 'A human reading name for indicator.',
		INDICATOR_DESCRIPTION_PLACEHOLDER: 'Indicator description here...',
		FIND_BUCKET_PLACEHOLDER: 'Search by bucket name, topic name, factor name.',
		BUCKET_CATEGORY_SEGMENT_VALUE_PLACEHOLDER: 'Key in category value here, confirm to add into segment.',
		FIND_INDICATOR_VALUE_BUCKETS_PLACEHOLDER: 'Search by bucket name.',
		DROPDOWN_PLACEHOLDER: 'Please Select...',
		FIND_NAVIGATION_PLACEHOLDER: 'Search by navigation name.'
	},
	STANDARD: {
		YES: 'Yes',
		NO: 'No'
	},
	ERROR: {
		UNAUTHORIZED: 'Unauthorized now, login please.',
		ACCESS_DENIED: 'Access denied, contact administrator for more information.',
		UNPREDICTED: 'Unpredicted error occurred, contact administrator for more information.'
	},
	ALERT: {
		BUTTON: 'Got It',
		NOT_IMPLEMENT: 'Not implemented yet.'
	},
	DIALOG: {
		BUTTON_YES: 'Yes',
		BUTTON_NO: 'No'
	},
	ACTIONS: {
		SAVE: 'Save',
		COPY: 'Copy',
		CLOSE: 'Close',
		CANCEL: 'Cancel',
		DELETE: 'Delete',
		CONFIRM: 'Confirm',
		NEXT: 'Next',
		SORT_ASC: 'Sort Ascending',
		SORT_DESC: 'Sort Descending',
		PREVIOUS_PAGE: 'Previous Page',
		NEXT_PAGE: 'Next Page',
		EXPAND: 'Expand',
		COLLAPSE: 'Collapse',
		MINIMIZE: 'Minimize',
		MAXIMIZE: 'Maximize',
		RESTORE: 'Restore'
	},
	LOGIN: {
		PRODUCT_TITLE: <>Indexical Metrics <span>&</span> Measure Advisory</>,
		MORNING: 'Good morning !',
		AFTERNOON: 'Good afternoon !',
		EVENING: 'Good evening !',
		BUTTON: 'Go !',
		NAME_EMPTY: 'Please tell me who you are, my friend.',
		CREDENTIAL_EMPTY: 'Credential is required to enjoy the journey.',
		FAIL: 'Name or credential cannot be identified now.'
	},
	DATASET: {
		UNFIX_COLUMN: 'Unfix Me and Follows',
		FIX_COLUMN: 'Fix Columns to Here',
		COMPRESS_COLUMNS: 'Compress Columns',
		DOWNLOAD_PAGE: 'Download This Page',
		DOWNLOAD_ALL: 'Download All',
		SIMULATE_DATA: 'Simulate',
		UPLOAD_DATA: 'Upload Data',
		UPLOAD_DATA_FAILURE: 'Failed to import dataset, check file format please.',
		DOWNLOAD_TEMPLATE: 'Download Template'
	},
	CONSOLE: {
		LOADING: 'Loading Personal Data...',
		BYE: 'Bye-bye now?',
		ERROR: {
			DASHBOARD_NOT_FOUND: 'Given dashboard not found.',
			CONNECTED_SPACE_NOT_FOUND: 'Given connected space not found.',
			SUBJECT_NOT_FOUND: 'Given subject not found.',
			REPORT_NOT_FOUND: 'Given report not found.'
		},
		MENU: {
			TITLE: 'Watchmen Console',
			HOME: 'Home',
			DASHBOARDS: 'Dashboards',
			FAVORITE: 'Show Favorites',
			NOTIFICATIONS: 'Notifications',
			MAILS: 'Inbox',
			TIMELINE: 'Show Timeline',
			CONNECT_SPACE: 'Connect Space',
			SETTINGS: 'Settings',
			TO_CONSOLE: 'To Console',
			TO_ADMIN: 'To Admin',
			TO_DATA_QUALITY: 'To Data Quality Center',
			TO_INDICATOR_WORKBENCH: 'To Indicator Workbench',
			LOGOUT: 'Logout'
		},
		FAVORITE: {
			TITLE: 'My Favorite',
			NO_DATA: 'No favorite items.',
			PIN: 'Pin',
			UNPIN: 'Unpin',
			REMOVE: 'Remove from Favorite'
		},
		HOME: {
			TITLE: 'Home',
			SORT_BY_NAME: 'Sort by Name',
			SORT_BY_VISIT_TIME: 'Sort by Visit Time',
			VIEW_COLLAPSE: 'Collapse',
			VIEW_ALL: 'View All',
			CONNECTED_SPACE_TITLE: 'Connected Spaces',
			CREATE_CONNECTED_SPACE_BUTTON: 'Connect Space',
			DASHBOARD_TITLE: 'Dashboards',
			CREATE_DASHBOARD_BUTTON: 'Create Dashboard'
		},
		DASHBOARD: {
			SHARE: 'Share',
			PRINT: 'Print',
			REFRESH: 'Refresh',
			AUTO_REFRESH: 'Auto Refresh (5 Minutes)',
			ADD_INTO_FAVORITE: 'Add into Favorite',
			REMOVE_FROM_FAVORITE: 'Remove from Favorite',
			ADD_REPORT: 'Add Report',
			ADD_PARAGRAPH: 'Add Paragraph',
			ADD_DASHBOARD: 'Add Dashboard',
			SWITCH_DASHBOARD: 'Switch Dashboard',
			DELETE_ME: 'Delete Me',
			SHARE_DIALOG_LABEL: 'Copy following url, and share to where you want.',
			URL_COPIED: 'URL copied.',
			DELETE_DIALOG_LABEL: 'Are you sure to delete dashboard? Please note that deletion cannot be recovered.',
			NO_MORE_DASHBOARD: 'No more dashboard exists.',
			SWITCH_DIALOG_LABEL: 'Please select dashboard',
			NO_MORE_REPORT: 'No more report exists.',
			DELETE_REPORT_DIALOG_LABEL: 'Are you sure to delete report? Please note that deletion cannot be recovered.',
			DELETE_PARAGRAPH_DIALOG_LABEL: 'Are you sure to delete paragraph? Please note that deletion cannot be recovered.',
			NO_REPORT: 'No report defined.',
			SHOW_PRINT_PAGE: 'Show Page Size',
			HIDE_PRINT_PAGE: 'Hide Page Size',
			SET_AS_ADMIN_HOME: 'Set as Admin Home',
			FUNNEL_TITLE: 'Funnels'
		},
		CONNECTED_SPACE: {
			CATALOG: 'Catalog',
			SUBJECT_DEF: 'Definition',
			SUBJECT_DATA: 'Dataset',
			SUBJECT_REPORTS: 'Reports',
			SUBJECT_REPORT: 'Report',
			REPORT_DATA: 'Dataset',
			REPORT_FILTER: 'Filter',
			REPORT_FUNNEL: 'Funnel',
			SHARE: 'Share',
			PRINT: 'Print',
			REFRESH: 'Refresh',
			AUTO_REFRESH: 'Auto Refresh (5 Minutes)',
			SHOW_PRINT_PAGE: 'Show Page Size',
			HIDE_PRINT_PAGE: 'Hide Page Size',
			ADD_REPORT: 'Add Report',
			ADD_SUBJECT: 'Add Subject',
			OPEN_SUBJECT: 'Open Subject',
			ADD_CONNECTED_SPACE: 'Connect Space',
			SWITCH_CONNECTED_SPACE: 'Switch Connected Space',
			DELETE_ME: 'Delete Me',
			ADD_INTO_FAVORITE: 'Add into Favorite',
			REMOVE_FROM_FAVORITE: 'Remove from Favorite',
			SET_AS_TEMPLATE: 'Set as Template',
			REMOVE_FROM_TEMPLATE: 'Remove from Template',
			DELETE_DIALOG_LABEL: 'Are you sure to delete connected space? Please note that deletion cannot be recovered.',
			NO_MORE_CONNECTED_SPACE: 'No more connected space exists.',
			SWITCH_DIALOG_LABEL: 'Please select connected space',
			CREATE_DIALOG_LABEL: 'Please select available space',
			CREATE_DIALOG_CHOOSE_TEMPLATE_LABEL: 'Please select favorite templates',
			TEMPLATE: 'Template',
			TEMPLATE_CREATE_BY: 'Created By',
			NO_MORE_SPACE: 'No space exists, contact your administrator for more information.',
			SPACE_NOT_FOUND: 'Space definition not found, contact your administrator for more information.',
			TOPICS_NOT_FOUND: 'Topics definition not found, contact your administrator for more information.',
			TOPICS_COUNT_MISMATCH: 'Topics count mismatch, contact your administrator for more information.',
			TOPIC_WITH_NO_FACTOR: 'No factor defined, contact your administrator for more information.',
			DELETE_SUBJECT_DIALOG_LABEL: 'Are you sure to delete subject? Please note that deletion cannot be recovered.',
			SWITCH_SUBJECT: 'Switch Subject',
			SWITCH_SUBJECT_DIALOG_LABEL: 'Please select subject',
			NO_MORE_SUBJECT: 'No more subject exists.',
			SUBJECT_DEF_INVALID: 'Something incorrect in subject definition, please correct it first.',
			SUBJECT_PICK_TOPICS: 'Pick Topics',
			SUBJECT_DEFINE_COLUMNS: 'Define Columns',
			SUBJECT_FILTER_DATA: 'Filter Data',
			SUBJECT_SET_JOINS: 'Set Joins',
			SUBJECT_DEF_OVERVIEW: 'Overview',
			NO_PICKED_TOPIC_FOR_SUBJECT: 'No topic picked.',
			NO_DATASET_COLUMN_FOR_SUBJECT: 'No columns defined, do you want ',
			CREATE_DATASET_COLUMN_WHEN_NONE: 'create one',
			NO_DATASET_COLUMN_FOR_SUBJECT_2: '?',
			ALIAS: 'As',
			ADD_SUBJECT_COLUMN: 'Add Column',
			CAN_NOT_DELETE_CHILD_FROM_COMPUTED: 'Cannot delete this because of reach minimum parameter(s).',
			CAN_NOT_ADD_CHILD_INTO_COMPUTED: 'Cannot add more because of reach maximum parameter(s).',
			ADD_COMPUTE_PARAMETER: 'Add Parameter',
			NO_DATASET_FILTER_FOR_SUBJECT: 'No filter defined, do you want ',
			CREATE_DATASET_FILTER_WHEN_NONE: 'create one',
			NO_DATASET_FILTER_FOR_SUBJECT_2: '?',
			ADD_SUB_EXPRESSION_FILTER: 'Add Sub Expression',
			ADD_SUB_JOINT_FILTER: 'Add Sub Joint',
			NO_DATASET_JOIN_FOR_SUBJECT: 'No join defined, do you want ',
			CREATE_DATASET_JOIN_WHEN_NONE: 'create one',
			NO_DATASET_JOIN_FOR_SUBJECT_2: '?',
			ADD_SUBJECT_JOIN: 'Add Join',
			SUBJECT_SELECT: 'Select',
			SUBJECT_NO_SELECT: 'No column defined.',
			SUBJECT_FROM: 'From',
			SUBJECT_NO_FROM: 'No join defined.',
			SUBJECT_JOIN_INNER: 'Inner Join',
			SUBJECT_JOIN_LEFT: 'Left Join',
			SUBJECT_JOIN_RIGHT: 'Right Join',
			SUBJECT_JOIN_ON: 'On',
			SUBJECT_JOIN_EQUALS: '=',
			SUBJECT_JOIN_AND: 'And',
			SUBJECT_WHERE: 'Where',
			SUBJECT_NO_WHERE: 'No filter defined.',
			SUBJECT_UNKNOWN_PARAMETER: 'Unknown Parameter',
			SUBJECT_EMPTY_CONSTANT: 'Empty Constant Value',
			SUBJECT_COLUMN_AS: 'As',
			SUBJECT_NO_ALIAS: '?',
			SUBJECT_FILTER_JOINT_NO_STATEMENT: 'No Statement in Joint',
			SUBJECT_UNKNOWN_FILTER: 'Unknown Filter',
			NO_DATASET_COLUMN: 'No column defined.',
			NO_REPORT: 'No report defined, do you want ',
			CREATE_REPORT: 'create one',
			NO_REPORT_2: '?',
			NO_MORE_REPORT: 'No more report exists.',
			OPEN_REPORT: 'Open Report',
			SWITCH_REPORT: 'Switch Report',
			SWITCH_REPORT_DIALOG_LABEL: 'Please select report',
			DELETE_REPORT_DIALOG_LABEL: 'Are you sure to delete report? Please note that deletion cannot be recovered.',
			COLLAPSE_REPORT_SETTINGS_SECTIONS: 'Collapse All Sections',
			EXPAND_REPORT_SETTINGS_SECTIONS: 'Expand All Sections',
			REPORT_NO_FILTER: 'No filter defined, do you want ',
			CREATE_REPORT_FILTER: 'create now',
			REPORT_NO_FILTER_2: '?',
			INCORRECT_REPORT_FILTER: 'Incorrect filter found.',
			REPORT_NO_FUNNEL: 'No funnel enabled.'
		}
	},
	INDICATOR_WORKBENCH: {
		MENU: {
			TITLE: 'Indicator Workbench',
			BUCKETS: 'Prepare Buckets',
			PREPARE: 'Prepare Indicator',
			INSPECTION: 'Indicators Inspection',
			NAVIGATION: 'Indicators Navigation',
			SETTINGS: 'Settings',
			LOGOUT: 'Logout'
		},
		LOADING: 'Loading Data...',
		ON_EDIT: 'Still in editing, all changes will be lost if interrupt. Are you sure to continue?',
		PREPARE: {
			TITLE: 'Prepare Indicators',
			STEP: 'Step',
			WAIT_INPUT: 'Waiting for input...',
			SEARCHING: 'Searching...',
			NO_MATCHED: 'No matching data found.',
			OR: 'or',
			CREATE_INDICATOR: 'Create An Indicator',
			FIND_INDICATOR: 'Find Existed Indicator',
			DISCARD_FIND_INDICATOR: 'Discard Finding',
			ON_CREATE_INDICATOR: 'Creating An Indicator',
			ON_VIEW_INDICATOR: 'View Indicator',
			RESTART: 'Restart',
			PICK_TOPIC: 'Pick a Topic or Factor',
			DEFINE_ON_TOPIC: 'Define on Topic',
			INDICATOR_ON_TOPIC: 'On Topic',
			FAILED_TO_LOAD_INDICATOR: 'Failed to load indicator, contact your administrator for more information.',
			MEASURE_METHODS_TITLE: 'Available measures of current indicator were detected automatically.',
			FACTOR: 'Factor',
			FACTOR_NAME: 'Name',
			FACTOR_LABEL: 'Label',
			FACTOR_TYPE: 'Type',
			FACTOR_ENUM: 'Enumeration',
			AGGREGATE: 'Aggregate',
			GEO: 'GEO',
			TIME_PERIOD: 'Time Period',
			INDIVIDUAL: 'Individual',
			ORGANIZATION: 'Organization',
			CATEGORY: 'Category',
			DEFINE_BUCKETS_TITLE: 'Predefined buckets for better categorization and aggregation.',
			INDICATOR_VALUE_BUCKET_ONLY_ON_FACTOR_LABEL: 'Value bucketing only available on factor indicator',
			INDICATOR_VALUE_BUCKET_LABEL: 'Indicator value bucketing',
			BUCKET_NAME: 'Bucket Name',
			LINK_INDICATOR_VALUE_BUCKETS: 'Link Predefined Value Buckets with Indicator Value',
			DISCARD_LINK_INDICATOR_VALUE_BUCKETS: 'Discard Link',
			MEASURE_BUCKET_LABEL: 'Measure bucketing',
			NO_MEASURE_BUCKET: 'No appropriate measure bucket found.',
			VIEW_MEASURE_BUCKETS: 'View Predefined Buckets on Measure',
			IGNORE_DEFINE_BUCKETS: 'Ignore Buckets Definition',
			CHANGE_NAME: 'Change Name',
			NOT_NOW: 'Not Now',
			SAVE_INDICATOR: 'Save Indicator',
			SAVE_NAME: 'Save Name',
			REQUIRE_INDICATOR_NAME: 'A human reading name for indicator is required.',
			RELEVANT_TITLE: 'Relevant indicators of current indicator can be detected automatically.',
			INDICATOR_NAME: 'Indicator',
			INDICATOR_RELEVANT_TYPE: 'Relevant Type',
			IRRELEVANT: 'Irrelevant',
			NO_RELEVANT_DETECTED: 'No relevant indicator detected yet.',
			DETECT_RELEVANT: 'Detect Potential Relevant Indicators',
			IGNORE_DETECT_RELEVANT: 'Ignore Detect Now',
			CATEGORIES_TITLE: 'Categories.',
			DESCRIPTION_TITLE: 'Description.',
			LAST_STEP_TITLE: 'Indicator is ready.',
			PREPARE_ANOTHER: 'Prepare Another Indicator'
		},
		BUCKET: {
			TITLE: 'Buckets',
			LABEL: 'Bucket',
			NEW_BUCKET_PREFIX: 'A New',
			EXISTING_BUCKET_PREFIX: 'An Existing',
			CREATE_BUCKET: 'Create Bucket',
			NAME_LABEL: 'Bucket Name:',
			TYPE_LABEL: 'Bucket Type:',
			TYPE_IS_FIXED_ONCE_SAVE: 'Bucket type cannot be change once saved.',
			DESCRIPTION_LABEL: 'Description:',
			CREATE_AT: 'Created At',
			LAST_MODIFIED_AT: 'Last Modified At',
			BUCKET_NAME_IS_REQUIRED: 'A human reading name is required.',
			BUCKET_MEASURE_IS_REQUIRED: 'Please select the measure method.',
			BUCKET_ENUM_IS_REQUIRED: 'Please select an enumeration.',
			BUCKET_SEGMENTS_IS_REQUIRED: 'At least two segments should be defined.',
			BUCKET_SEGMENT_NAME_IS_REQUIRED: 'A human reading name of segment is required.',
			BE_NUMERIC_OF_NUMERIC_SEGMENT: 'Value should be a numeric.',
			EMPTY_FIRST_MIN_OF_NUMERIC_SEGMENT: 'Minimum value of first segment should be left as empty.',
			NOT_EMPTY_FIRST_MAX_OF_NUMERIC_SEGMENT: 'Maximum value of first segment should not be empty.',
			NOT_EMPTY_OF_NUMERIC_SEGMENT: 'Values of segment in-between should not be empty.',
			MIN_MAX_ORDER_OF_NUMERIC_SEGMENT: 'Minimum value should be less than maximum value.',
			NOT_EMPTY_LAST_MIN_OF_NUMERIC_SEGMENT: 'Minimum value of last segment should not be empty.',
			EMPTY_LAST_MAX_OF_NUMERIC_SEGMENT: 'Maximum value of last segment should be left as empty.',
			RANGE_LACK_EXISTS_OF_NUMERIC_SEGMENT: 'Range lack exists.',
			RANGE_OVERLAP_EXISTS_OF_NUMERIC_SEGMENT: 'Range overlap exists.',
			NOT_EMPTY_OF_CATEGORY_SEGMENT: 'At least one category should be defined.',
			NO_DUPLICATED_OF_CATEGORY_SEGMENT: 'Duplicated categories are not allowed in segment.',
			ONE_OTHERS_SEGMENT_OF_CATEGORY_SEGMENT: 'Only one segment can contains category "others".',
			ONE_OTHERS_VALUE_OF_CATEGORY_SEGMENT: 'Only one category "others" in segment.',
			NO_SHARED_OF_CATEGORY_SEGMENT: 'Same category in multiple segments is not allowed.',
			NO_SEGMENT_DEFINED: 'No Segment Defined',
			ONE_SEGMENT_DEFINED: '1 Segment',
			N_SEGMENT_DEFINED: 'Segments',
			BUCKET_TYPE_VALUE: 'Value',
			BUCKET_TYPE_VALUE_MEASURE: 'Value Measure',
			BUCKET_TYPE_CATEGORY_MEASURE: 'Category Measure',
			BUCKET_TYPE_ENUM_MEASURE: 'Enumeration Measure',
			RANGE_INCLUDING_LABEL: 'Value Inclusion Mode:',
			RANGE_INCLUDE_MIN: '[Include Min Value, Exclude Max Value)',
			RANGE_INCLUDE_MAX: '(Exclude Max Value, Include Max Value]',
			SEGMENTS_LABEL: 'Segments:',
			SEGMENT_NAME: 'Segment Name',
			VALUE_SEGMENT_MIN_LABEL: 'Minimum Value',
			VALUE_SEGMENT_MAX_LABEL: 'Maximum Value',
			ADD_SEGMENT: 'Add Segment',
			SORT_SEGMENTS: 'Sort Segments',
			MEASURE_METHOD_LABEL: 'Measure Method:',
			MEASURE_METHOD_IS_FIXED_ONCE_SAVE: 'Measure method cannot be change once saved.',
			CATEGORY_SEGMENT_LABEL: 'Category Value',
			DUPLICATE_CATEGORY_SEGMENT_VALUE: 'Category already exists in this segment.',
			DUPLICATE_CATEGORY_SEGMENT_VALUE_CASE_IGNORED: 'Category (case insensitive) already exists in this segment, do you want to add it anyway?',
			OTHERS_IS_EXCLUSIVE_ON_CATEGORY_SEGMENT: 'Category "others" is exclusive in segment, cannot be coexisting with other values.',
			NO_SEGMENT_VALUE_DEFINED: 'No Value Defined',
			ADD_OTHER_CATEGORY: 'Add Segment for Others',
			ENUM_LABEL: 'Enumeration:',
			ENUM_IS_FIXED_ONCE_SAVE: 'Enumeration cannot be changed once saved.',
			SORT_SEGMENTS_BY_CODE: 'Sort Segments by Code',
			SORT_SEGMENTS_BY_NAME: 'Sort Segments by Name',
			AVAILABLE_ENUM_ITEMS_LABEL: 'Available Enumeration Items:',
			NO_AVAILABLE_ENUM_ITEMS: 'No available items.',
			ADD_AVAILABLE_ITEMS_INTO_SEGMENT: 'Add Into Segment',
			SEGMENT_LABEL: 'Segment',
			PLEASE_SELECT_SEGMENT: 'Please pick a segment to include selected enumeration items.',
			PLEASE_SELECT_ENUM_ITEM: 'Please select at lease one enumeration item to add into segment.'
		},
		INSPECTION: {
			TITLE: 'Inspection',
			OR: 'or',
			PICK_INSPECTION_LABEL: 'Pick an Inspection:',
			PICKED_INSPECTION_LABEL: 'Picked Inspection:',
			PICK_INSPECTION: 'Pick Selection',
			CREATE_INSPECTION: 'Create New Inspection',
			INSPECTION_IS_REQUIRED: 'Please pick an inspection.',
			NONAME_ON_INSPECTION: 'Noname yet',
			RENAME: 'Rename',
			NEW_NAME: 'Name It Now',
			SET_NAME_LABEL: 'Set Name',
			NAME_IS_REQUIRED: 'Please assign a human reading name to inspection.',
			PICK_INDICATOR_LABEL: 'Pick an Indicator:',
			PICK_INDICATOR: 'Pick Selection',
			INDICATOR_IS_REQUIRED: 'Please pick an indicator.',
			INSPECTING_ON_INDICATOR_LABEL: 'Inspecting on Indicator:',
			VALUE_TRANSFORM_LABEL: 'Indicator Value Transform:',
			VALUE_TRANSFORM_COUNT: 'Count',
			VALUE_TRANSFORM_SUM: 'Sum',
			VALUE_TRANSFORM_AVG: 'Avg',
			VALUE_TRANSFORM_MAX: 'Max',
			VALUE_TRANSFORM_MIN: 'Min',
			SELECT_BUCKETING_ON_LABEL: 'Bucketing On:',
			NO_BUCKET_ON: 'Ignore Bucketing',
			MEASURE_ON_VALUE: 'On Indicator Value',
			SELECT_MEASURE_ON_FIRST: 'Please select bucket base first...',
			MEASURE_ON_NATURALLY: 'Using Naturally Classification',
			TIME_PERIOD_LABEL: 'Time Period:',
			ALL_TIME_PERIOD: 'All Time',
			TIME_MEASURE_ON_LABEL: 'Time Grouping:',
			NO_TIME_MEASURE: 'No time grouping',
			REFRESH_DATA: 'Refresh Data',
			HIDE_DATA_GRID: 'Hide Data Grid',
			SHOW_DATA_GRID: 'Show Data Grid',
			HIDE_AVAILABLE_CHARTS: 'Hide Visualizations',
			SHOW_AVAILABLE_CHARTS: 'Show Visualizations',
			PRINT: 'Print',
			PICK_ANOTHER: 'Pick Another Indicator',
			AGGREGATE_ARITHMETIC_IS_REQUIRED: 'Please pick at least one value transforming.',
			MEASURE_IS_REQUIRED: 'Please pick time grouping or value bucket.',
			MEASURE_ON_TIME_IS_REQUIRED: 'Please pick time grouping.',
			INDICATOR_BUCKET_IS_REQUIRED: 'Please pick indicator value bucket.',
			MEASURE_BUCKET_IS_REQUIRED: 'Please pick a bucket.',
			RESET_INSPECTION: 'Are you sure to switch to another inspection?',
			NO_DATA: 'No data found.',
			VISUALIZATION_LABEL: 'Visualization'
		},
		NAVIGATION: {
			TITLE: 'Navigations',
			LABEL: 'Navigation',
			CREATE_NAVIGATION: 'Create Navigation',
			NEW_NAVIGATION_PREFIX: 'A New',
			EXISTING_NAVIGATION_PREFIX: 'An Existing',
			CREATE_AT: 'Created At',
			LAST_MODIFIED_AT: 'Last Modified At',
			NAVIGATION_NOT_FOUND: 'Failed to load navigation, contact your administrator for more information.',
			BACK_TO_QUERY: 'Back to Query',
			ROOT: 'Root'
		}
	},
	SETTINGS: {
		TITLE: 'Settings',
		LANGUAGE: 'Language',
		THEME: 'Theme',
		THEME_LIGHT: 'Light',
		THEME_DARK: 'Dark',
		PAT: {
			TITLE: 'Personal Access Token',
			CREATE: 'Generate New Token',
			DESCRIPTION: 'Tokens you have generated that can be used to access the Watchmen API.',
			DELETE_CONFIRM: 'Are you sure to delete token? Please note that deletion cannot be recovered.',
			INPUT_PLACEHOLDER: 'A note for identify purpose of token',
			NOTE_REQUIRED: 'Note is required for a token.'
		}
	},
	PARAM: {
		FROM: 'From',
		FROM_TOPIC: 'Topic',
		FROM_CONSTANT: 'Constant',
		FROM_COMPUTED: 'Compute'
	},
	FACTOR: {
		SEQUENCE: 'Sequence',
		NUMBER: 'Numeric',
		UNSIGNED: 'Unsigned Numeric',
		TEXT: 'Text',
		ADDRESS: 'Address',
		CONTINENT: 'Continent',
		REGION: 'Region',
		COUNTRY: 'Country',
		PROVINCE: 'State/Province',
		CITY: 'City',
		DISTRICT: 'District',
		ROAD: 'Road',
		COMMUNITY: 'Community',
		FLOOR: 'Floor',
		RESIDENCE_TYPE: 'Residence Type',
		RESIDENTIAL_AREA: 'Residential Area',
		EMAIL: 'Email',
		PHONE: 'Phone',
		MOBILE: 'Mobile',
		FAX: 'Fax',
		DATETIME: 'DateTime',
		FULL_DATETIME: 'Full DateTime',
		DATE: 'Date',
		TIME: 'Time',
		YEAR: 'Year',
		HALF_YEAR: '1st/2nd Half Year',
		QUARTER: 'Quarter',
		MONTH: 'Month',
		HALF_MONTH: '1st/2nd Half Month',
		TEN_DAYS: '1st/2nd/3rd Ten Days',
		WEEK_OF_YEAR: 'Week of Year',
		WEEK_OF_MONTH: 'Week of Month',
		HALF_WEEK: '1st/2nd Half Week',
		DAY_OF_MONTH: 'Day of Month',
		DAY_OF_WEEK: 'Day of Week',
		DAY_KIND: 'Workday/Weekday/Holiday',
		HOUR: 'Hour',
		HOUR_KIND: 'Work Time/Off Hours/Sleep Time',
		MINUTE: 'Minute',
		SECOND: 'Second',
		MILLISECOND: 'Millisecond',
		AM_PM: 'AM/PM',
		GENDER: 'Gender',
		OCCUPATION: 'Occupation',
		DATE_OF_BIRTH: 'Date of Birth',
		AGE: 'Age',
		ID_NO: 'ID No.',
		RELIGION: 'Religion',
		NATIONALITY: 'Nationality',
		BIZ_TRADE: 'Business Trade',
		BIZ_SCALE: 'Business Scale',
		BOOLEAN: 'Boolean',
		ENUM: 'Enumeration',
		OBJECT: 'Object',
		ARRAY: 'Array'
	},
	PARAMETER: {
		EXPRESSION: 'Expression',
		COMPUTE_TYPE: {
			NONE: 'As is',
			ADD: 'Add',
			SUBTRACT: 'Subtract',
			MULTIPLY: 'Multiply',
			DIVIDE: 'Divide',
			MODULUS: 'Modulus',
			YEAR_OF: 'Year of',
			HALF_YEAR_OF: 'Half Year of',
			QUARTER_OF: 'Quarter of',
			MONTH_OF: 'Month of',
			WEEK_OF_YEAR: 'Week of Year',
			WEEK_OF_MONTH: 'Week of Month',
			DAY_OF_MONTH: 'Day of Month',
			DAY_OF_WEEK: 'Day of Week',
			CASE_THEN: 'Case Then'
		},
		EXPRESSION_OPERATOR: {
			EMPTY: 'Is Empty',
			NOT_EMPTY: 'Has Value',
			EQUALS: 'Equals',
			NOT_EQUALS: 'Not Equals',
			LESS: 'Less than',
			LESS_EQUALS: 'Less than or Equals',
			MORE: 'Greater than',
			MORE_EQUALS: 'Greater than or Equals',
			IN: 'In',
			NOT_IN: 'Not In'
		}
	},
	JOINT: {
		AND: 'And',
		OR: 'OR'
	},
	JOIN: {
		INNER: 'Exactly Match',
		LEFT: 'Left Side Prioritized',
		RIGHT: 'Right Side Prioritized'
	},
	FUNNEL: {
		COLUMN: 'Column - Type',
		RANGE: 'Range?',
		ENABLED: 'Enable?',
		NUMERIC: 'Numeric',
		DATE: 'Date',
		YEAR: 'Year',
		HALF_YEAR: 'Half Year',
		QUARTER: 'Quarter',
		MONTH: 'Month',
		HALF_MONTH: 'Half Month',
		TEN_DAYS: 'Ten Days',
		WEEK_OF_MONTH: 'Week of Month',
		HALF_WEEK: 'Half Week',
		DAY_KIND: 'Day Kind',
		DAY_OF_WEEK: 'Day of Week',
		HOUR: 'Hour',
		HOUR_KIND: 'Hour Kind',
		AM_PM: 'AM/PM',
		ENUM: 'Enumeration'
	},
	PAGINATION: {
		TOTAL: '',
		ROWS: 'Row(s) Total',
		OF_PAGES: 'of',
		PAGES: 'Pages'
	},
	CHART: {
		SETTINGS_HEADER_LABEL: 'Report Settings',
		SECTION_TITLE_BASIC_STYLE: 'Basic Style',
		SECTION_TITLE_DIMENSIONS: 'Dimensions',
		SECTION_TITLE_INDICATORS: 'Indicators',
		SECTION_TITLE_FILTERS: 'Filters',
		SECTION_TITLE_BASIC: 'Basic',
		SECTION_TITLE_PALETTE_SIZE: 'Palette Size',
		SECTION_TITLE_COLOR: 'Color Rendering',
		SECTION_TITLE_BORDER: 'Border Rendering',
		SECTION_TITLE_FONT: 'Font',
		SECTION_TITLE_POSITION: 'Position',
		SECTION_TITLE_PADDING: 'Padding',
		SECTION_TITLE_GAP_AND_PADDING: 'Gap & Padding',
		SECTION_TITLE_VALUE_FORMAT: 'Value Format',
		SECTION_TITLE_FUNNEL_DEFINITION: 'Funnel Definition',
		DIMENSIONS: 'Dimensions',
		INDICATORS: 'Indicators',
		FILTERS: 'Filters',
		NO_FUNNEL_DETECTED: 'No available funnel detected.',
		FUNNEL_DESCRIPTION: 'Available funnels are auto detected, enable them to adjust report data dynamically here and in dashboard.',
		FUNNEL_INSTANCE_DESCRIPTION: 'Open palette to define funnel values.',
		NAME: 'Name',
		DESCRIPTION: 'Description',
		WIDTH: 'Width',
		HEIGHT: 'Height',
		PIXEL: 'PX',
		PERCENTAGE: '%',
		DEGREE: 'DEG',
		LINE_COLOR: 'Line Color',
		LINE_STYLE: 'Line Style',
		FONT_FAMILY: 'Font',
		FONT_COLOR: 'Font Color',
		FONT_SIZE: 'Font Size',
		FONT_STYLE: 'Font Style',
		FONT_STYLE_NORMAL: 'Normal',
		FONT_STYLE_ITALIC: 'Italic',
		FONT_WEIGHT: 'Font Weight',
		FONT_WEIGHT_100: '100',
		FONT_WEIGHT_200: '200',
		FONT_WEIGHT_300: '300',
		FONT_WEIGHT_400: '400',
		FONT_WEIGHT_500: '500',
		FONT_WEIGHT_600: '600',
		FONT_WEIGHT_700: '700',
		FONT_WEIGHT_800: '800',
		FONT_WEIGHT_900: '900',
		BACKGROUND_COLOR: 'Background Color',
		BORDER_STYLE: 'Border Style',
		BORDER_STYLE_NONE: 'None',
		BORDER_STYLE_SOLID: 'Solid',
		BORDER_STYLE_DASHED: 'Dashed',
		BORDER_STYLE_DOTTED: 'Dotted',
		BORDER_COLOR: 'Border Color',
		BORDER_WIDTH: 'Border Width',
		BORDER_RADIUS: 'Border Radius',
		POSITION: 'Position',
		POSITION_ON_OUTSIDE_OF_PIE: 'Outside Position',
		POSITION_TOP: 'Top',
		POSITION_RIGHT: 'Right',
		POSITION_LEFT: 'Left',
		POSITION_BOTTOM: 'Bottom',
		HORIZONTAL_ALIGNMENT: 'Alignment',
		HORIZONTAL_ALIGNMENT_AUTO: 'Auto',
		HORIZONTAL_ALIGNMENT_LEFT: 'Left',
		HORIZONTAL_ALIGNMENT_CENTER: 'Center',
		HORIZONTAL_ALIGNMENT_RIGHT: 'Right',
		VERTICAL_ALIGNMENT: 'Vertical Align',
		VERTICAL_ALIGNMENT_AUTO: 'Auto',
		VERTICAL_ALIGNMENT_TOP: 'Top',
		VERTICAL_ALIGNMENT_MIDDLE: 'Middle',
		VERTICAL_ALIGNMENT_BOTTOM: 'Bottom',
		TITLE_TEXT_ITEM_GAP: 'Gap of Titles',
		PADDING: 'Padding',
		SHOW: 'Show',
		SERIES_TEXT_SHOW: 'Show Series Text',
		SERIES_TEXT_POSITION: 'Series Text - Position',
		SERIES_TEXT_FONT: 'Series Text - Font',
		SERIES_TEXT_COLOR: 'Series Text - Color Rendering',
		SERIES_TEXT_BORDER: 'Series Text - Border Rendering',
		SERIES_TEXT_GAP_AND_PADDING: 'Series Text - Gap & Padding',
		LEGEND_ORIENT: 'Orient',
		LEGEND_ORIENT_HORIZONTAL: 'Horizontal',
		LEGEND_ORIENT_VERTICAL: 'Vertical',
		GRID_CONTAIN_LABEL: 'Contain Label',
		AXIS_TYPE: 'Axis Type',
		AXIS_TYPE_CATEGORY: 'Category',
		AXIS_TYPE_VALUE: 'Value',
		AXIS_TYPE_TIME: 'Time',
		AXIS_AUTO_MIN: 'Min Auto',
		AXIS_MIN: 'Min',
		AXIS_AUTO_MAX: 'Max Auto',
		AXIS_MAX: 'Max',
		AXIS_NAME_LOCATION: 'Location',
		AXIS_NAME_LOCATION_START: 'Start',
		AXIS_NAME_LOCATION_CENTER: 'Center',
		AXIS_NAME_LOCATION_END: 'End',
		AXIS_NAME_GAP: 'Gap',
		AXIS_NAME_ROTATE: 'Rotate',
		AXIS_LABEL_INSIDE: 'Inside',
		LABEL_GAP: 'Gap',
		LABEL_ROTATE: 'Rotate',
		LABEL_FORMAT_USING_GROUP: 'Using Group',
		LABEL_FORMAT_USING_PERCENTAGE: 'Using %',
		LABEL_VALUE_AS_PERCENTAGE: 'Value as %',
		LABEL_FRACTION_DIGITS: 'Fraction Digits',
		LABEL_POSITION_TOP: 'Top',
		LABEL_POSITION_LEFT: 'Left',
		LABEL_POSITION_RIGHT: 'Right',
		LABEL_POSITION_BOTTOM: 'Bottom',
		LABEL_POSITION_INSIDE: 'Inside',
		LABEL_POSITION_INSIDE_LEFT: 'Inside Left',
		LABEL_POSITION_INSIDE_RIGHT: 'Inside Right',
		LABEL_POSITION_INSIDE_TOP: 'Inside Top',
		LABEL_POSITION_INSIDE_BOTTOM: 'Inside Bottom',
		LABEL_POSITION_INSIDE_TOP_LEFT: 'Inside Top Left',
		LABEL_POSITION_INSIDE_BOTTOM_LEFT: 'Inside Bottom Left',
		LABEL_POSITION_INSIDE_TOP_RIGHT: 'Inside Top Right',
		LABEL_POSITION_INSIDE_BOTTOM_RIGHT: 'Inside Bottom Right',
		LABEL_POSITION_OUTSIDE: 'Outside',
		LABEL_POSITION_CENTER: 'Center',
		DECAL: 'Decal',
		ROAM: 'Roam',
		TREE_LAYOUT: 'Layout',
		TREE_LAYOUT_ORTHOGONAL: 'Orthogonal',
		TREE_LAYOUT_RADIAL: 'Radial',
		TREE_ORIENT: 'Orient',
		TREE_ORIENT_LEFT_RIGHT: 'Left to Right',
		TREE_ORIENT_RIGHT_LEFT: 'Right to Left',
		TREE_ORIENT_TOP_BOTTOM: 'Top to Bottom',
		TREE_ORIENT_BOTTOM_TOP: 'Bottom to Top',
		PIE_CENTER_X: 'Center X',
		PIE_CENTER_Y: 'Center Y',
		PIE_INSIDE_RADIUS: 'Inside Radius',
		PIE_OUTSIDE_RADIUS: 'Outside Radius',
		PIE_ROSE_TYPE: 'Rose Type',
		PIE_ROSE_TYPE_NONE: 'None',
		PIE_ROSE_TYPE_RADIUS: 'By Radius',
		PIE_ROSE_TYPE_AREA: 'By Area',
		PIE_SHOW_PERCENTAGE: 'Show %',
		PIE_LABEL_ALIGN_TO_NONE: 'None',
		PIE_LABEL_ALIGN_TO_LABEL_LINE: 'Label Line',
		PIE_LABEL_ALIGN_TO_EDGE: 'Edge',
		MAP_REGION: 'Region',
		MAP_REGION_JAPAN_L1: 'Japan (Prefecture)',
		MAP_REGION_USA_L1: 'United States (State)',
		TRUNCATION_TYPE: 'Type',
		TRUNCATION_NONE: 'None',
		TRUNCATION_TOP: 'Top',
		TRUNCATION_BOTTOM: 'Bottom',
		TRUNCATION_COUNT: 'Count',
		BAR_TRANSFORM_AXIS: 'Transform Axis',
		LINE_SMOOTH: 'Smooth',
		TOOLBOX_ORIENT: 'Orient',
		TOOLBOX_ORIENT_HORIZONTAL: 'Horizontal',
		TOOLBOX_ORIENT_VERTICAL: 'Vertical',
		SECTION_TITLE_COUNT_CHART: 'Count Style',
		SECTION_TITLE_BAR_CHART: 'Bar/Line style',
		SECTION_TITLE_PIE_CHART: 'Pie Style',
		SECTION_TITLE_TREE_CHART: 'Tree Style',
		SECTION_TITLE_TREEMAP_CHART: 'Treemap Style',
		SECTION_TITLE_MAP_CHART: 'Map Style',
		SECTION_TITLE_ECHART_TITLE: 'Title',
		SECTION_TITLE_ECHART_SUBTITLE: 'Subtitle',
		SECTION_TITLE_ECHART_LEGEND: 'Legend',
		SECTION_TITLE_ECHART_GRID: 'Grid',
		SECTION_TITLE_ECHART_SERIES_LABEL: 'Label',
		SECTION_TITLE_ECHART_XAXIS: 'X-Axis',
		SECTION_TITLE_ECHART_XAXIS_RANGE: 'X-Axis Range',
		SECTION_TITLE_ECHART_XAXIS_NAME: 'X-Axis Name',
		SECTION_TITLE_ECHART_XAXIS_NAME_FONT: 'X-Axis Name - Font',
		SECTION_TITLE_ECHART_XAXIS_NAME_COLOR: 'X-Axis Name - Color Rendering',
		SECTION_TITLE_ECHART_XAXIS_NAME_BORDER: 'X-Axis Name - Border Rendering',
		SECTION_TITLE_ECHART_XAXIS_NAME_GAP_AND_PADDING: 'X-Axis Name - Gap & Padding',
		SECTION_TITLE_ECHART_XAXIS_LABEL: 'X-Axis Label',
		SECTION_TITLE_ECHART_XAXIS_LABEL_FONT: 'X-Axis Label - Font',
		SECTION_TITLE_ECHART_XAXIS_LABEL_COLOR: 'X-Axis Label - Color Rendering',
		SECTION_TITLE_ECHART_XAXIS_LABEL_BORDER: 'X-Axis Label - Border Rendering',
		SECTION_TITLE_ECHART_XAXIS_LABEL_GAP_AND_PADDING: 'X-Axis Label - Gap & Padding',
		SECTION_TITLE_ECHART_XAXIS_LINE: 'X-Axis Split Line',
		SECTION_TITLE_ECHART_XAXIS_MINOR_LINE: 'X-Axis Minor Split Line',
		SECTION_TITLE_ECHART_YAXIS: 'Y-Axis',
		SECTION_TITLE_ECHART_YAXIS_RANGE: 'Y-Axis Range',
		SECTION_TITLE_ECHART_YAXIS_NAME: 'Y-Axis Name',
		SECTION_TITLE_ECHART_YAXIS_NAME_FONT: 'Y-Axis Name - Font',
		SECTION_TITLE_ECHART_YAXIS_NAME_COLOR: 'Y-Axis Name - Color Rendering',
		SECTION_TITLE_ECHART_YAXIS_NAME_BORDER: 'Y-Axis Name - Border Rendering',
		SECTION_TITLE_ECHART_YAXIS_NAME_GAP_AND_PADDING: 'Y-Axis Name - Gap & Padding',
		SECTION_TITLE_ECHART_YAXIS_LABEL: 'Y-Axis Label',
		SECTION_TITLE_ECHART_YAXIS_LABEL_FONT: 'Y-Axis Label - Font',
		SECTION_TITLE_ECHART_YAXIS_LABEL_COLOR: 'Y-Axis Label - Color Rendering',
		SECTION_TITLE_ECHART_YAXIS_LABEL_BORDER: 'Y-Axis Label - Border Rendering',
		SECTION_TITLE_ECHART_YAXIS_LABEL_GAP_AND_PADDING: 'Y-Axis Label - Gap & Padding',
		SECTION_TITLE_ECHART_YAXIS_LINE: 'Y-Axis Split Line',
		SECTION_TITLE_ECHART_YAXIS_MINOR_LINE: 'Y-Axis Minor Split Line',
		SECTION_TITLE_ECHART_SCRIPT: 'Script',
		SECTION_TITLE_ECHART_SCRIPT_VARS_DEF: 'Variables Defs',
		SECTION_TITLE_ECHART_SCRIPT_VARS: 'Variables',
		SECTION_TITLE_TRUNCATION: 'Data Truncation',
		SECTION_TITLE_TOOLBOX: 'Toolbox',
		NONAME_COLUMN: 'Noname Column',
		UNKNOWN_COLUMN_NAME: 'Unknown Column',
		CAN_NOT_DELETE_DIMENSION: 'Cannot delete this because of reach minimum dimension(s).',
		CAN_NOT_ADD_DIMENSION: 'Cannot add more because of reach maximum dimension(s).',
		CAN_NOT_DELETE_INDICATOR: 'Cannot delete this because of reach minimum indicator(s).',
		CAN_NOT_ADD_INDICATOR: 'Cannot add more because of reach maximum indicator(s).',
		ADD_DIMENSION: 'Add Dimension',
		ADD_INDICATOR: 'Add Indicator',
		PLEASE_SELECT_DIMENSION: 'Please select...',
		PLEASE_SELECT_INDICATOR: 'Please select...',
		PLEASE_SELECT_FUNNEL_VALUE: 'Please select...',
		NO_ENUM_FUNNEL_VALUE: 'No value selected',
		NO_SCRIPT_VARS: 'No script variables defined.',
		ARITHMETIC_NONE: 'As Is',
		ARITHMETIC_SUMMARY: 'Sum',
		ARITHMETIC_AVERAGE: 'Avg',
		ARITHMETIC_COUNT: 'Count',
		ARITHMETIC_MAX: 'Max',
		ARITHMETIC_MIN: 'Min',
		TYPE: 'Type',
		TYPES: {
			COUNT: 'Single Value',
			BAR: 'Bar',
			LINE: 'Line',
			SCATTER: 'Scatter',
			PIE: 'Pie',
			DOUGHNUT: 'Doughnut',
			NIGHTINGALE: 'Nightingale',
			SUNBURST: 'Sunburst',
			TREE: 'Tree',
			TREEMAP: 'Treemap',
			MAP: 'Map',
			CUSTOMIZED: 'Customized'
		},
		COUNT: {
			FORMAT_USING_GROUP: 'Using Group'
		},
		ECHART: {
			TEXT: 'Text'
		},
		DEFINITION_BROKEN: 'Definition not complete, cannot render chart for now.'
	},
	INDICATOR: {
		MEASURE_METHOD: {
			CONTINENT: 'Continent',
			REGION: 'Region',
			COUNTRY: 'Country',
			PROVINCE: 'Province',
			CITY: 'City',
			DISTRICT: 'District',
			FLOOR: 'Floor',
			RESIDENCE_TYPE: 'Residence Type',
			RESIDENTIAL_AREA: 'Residence Area',
			YEAR: 'Year',
			HALF_YEAR: '1st/2nd Half Year',
			QUARTER: 'Quarter',
			MONTH: 'Month',
			HALF_MONTH: '1st/2nd Half Month',
			TEN_DAYS: '1st/2nd/3rd Ten Days',
			WEEK_OF_YEAR: 'Week of Year',
			WEEK_OF_MONTH: 'Week of Month',
			HALF_WEEK: '1st/2nd Half Week',
			DAY_OF_MONTH: 'Day of Month',
			DAY_OF_WEEK: 'Day of Week',
			DAY_KIND: 'Workday/Weekday/Holiday',
			HOUR: 'Hour',
			HOUR_KIND: 'Work Time/Off Hours/Sleep Time',
			AM_PM: 'AM/PM',
			GENDER: 'Gender',
			OCCUPATION: 'Occupation',
			AGE: 'Age',
			RELIGION: 'Religion',
			NATIONALITY: 'Nationality',
			BIZ_TRADE: 'Business Trade',
			BIZ_SCALE: 'Business Scale',
			BOOLEAN: 'Boolean',
			ENUM: 'Enumeration'
		},
		RELEVANT_TYPE: {
			SAME: 'Same',
			HIGH_CORRELATED: 'High Correlated',
			WEAK_CORRELATED: 'Weak Correlated',
			THIS_CAUSES_RELEVANT: 'Causes Relevant',
			RELEVANT_CAUSES_THIS: 'Caused by Relevant'
		}
	},
	SHARE: {
		NOTHING: 'No content can be found, contact administrator for more information.'
	},
	CALENDAR: {
		JAN: 'January',
		FEB: 'February',
		MAR: 'March',
		APR: 'April',
		MAY: 'May',
		JUN: 'June',
		JUL: 'July',
		AUG: 'August',
		SEP: 'September',
		OCT: 'October',
		NOV: 'November',
		DEC: 'December',
		WEEK: 'Week',
		WEEK_0: '0th Week (Incomplete week)',
		WEEK_1: '1st Week',
		WEEK_2: '2nd Week',
		WEEK_3: '3rd Week',
		WEEK_4: '4th Week',
		WEEK_5: '5th Week (Incomplete week)',
		HALF_YEAR_1ST: '1st Half Year',
		HALF_YEAR_2ND: '2nd Half Year',
		QUARTER_1ST: '1st Quarter',
		QUARTER_2ND: '2nd Quarter',
		QUARTER_3RD: '3rd Quarter',
		QUARTER_4TH: '4th Quarter',
		HALF_MONTH_1ST: '1st Half Month',
		HALF_MONTH_2ND: '2nd Half Month',
		TEN_DAYS_1ST: '1st Ten Days Of Month',
		TEN_DAYS_2ND: '2nd Ten Days Of Month',
		TEN_DAYS_3RD: '3rd Ten Days Of Month',
		HALF_WEEK_1ST: '1st Half Week',
		HALF_WEEK_2ND: '2nd Half Week',
		SUNDAY: 'Sunday',
		MONDAY: 'Monday',
		TUESDAY: 'Tuesday',
		WEDNESDAY: 'Wednesday',
		THURSDAY: 'Thursday',
		FRIDAY: 'Friday',
		SATURDAY: 'Saturday',
		WORKDAY: 'Workday',
		WEEKEND: 'Weekend',
		HOLIDAY: 'Holiday',
		WORK_TIME: 'Work Time',
		OFF_HOURS: 'Off Hours',
		SLEEPING_TIME: 'Sleeping Time',
		AM: 'AM',
		PM: 'PM'
	}
};