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
		INDICATOR_NAME_PLACEHOLDER: 'A human reading name for indicator.'
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
			PREPARE: 'Prepare Indicator',
			INSPECTION: 'Indicators Inspection',
			SETTINGS: 'Settings',
			LOGOUT: 'Logout'
		},
		LOADING: 'Loading Data...',
		ON_EDIT: 'Still in editing, all changes will be lost if interrupt. Are you sure to continue?',
		PREPARE: {
			TITLE: 'Prepare Indicators',
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
			MEASURE_METHODS_TITLE: 'Available measures of current indicator were detected automatically.',
			AGGREGATE: 'Aggregate',
			GEO: 'GEO',
			TIME_PERIOD: 'Time Period',
			INDIVIDUAL: 'Individual',
			ORGANIZATION: 'Organization',
			CATEGORY: 'Category',
			DEFINE_BUCKETS_TITLE: 'Predefined buckets for better categorization and aggregation.',
			DEFINE_BUCKET: 'Define Bucket',
			IGNORE_DEFINE_BUCKETS: 'Ignore Buckets Definition',
			CHANGE_NAME: 'Change Name',
			NOT_NOW: 'Not Now',
			SAVE_INDICATOR: 'Save Indicator',
			SAVE_NAME: 'Save Name',
			REQUIRE_INDICATOR_NAME: 'A human reading name for indicator is required.',
			RELEVANT_TITLE: 'Relevant indicators of current indicator can be detected automatically.',
			DETECT_RELEVANT: 'Detect Potential Relevant Indicators',
			IGNORE_DETECT_RELEVANT: 'Ignore Detect Now',
			LAST_STEP_TITLE: 'Indicator is ready.',
			PREPARE_ANOTHER: 'Prepare Another Indicator'
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
		TRADE: 'Business Trade',
		SCALE: 'Business Scale',
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
		}
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
			TRADE: 'Business Trade',
			SCALE: 'Business Scale',
			BOOLEAN: 'Boolean',
			ENUM: 'Enumeration'
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