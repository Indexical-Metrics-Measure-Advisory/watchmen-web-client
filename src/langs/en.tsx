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
		DEFAULT_SUBJECT_NAME: 'Subject'
	},
	ERROR: {
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
		COPY: 'Copy',
		CLOSE: 'Close',
		CANCEL: 'Cancel',
		DELETE: 'Delete',
		CONFIRM: 'Confirm'
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
	CONSOLE: {
		LOADING: 'Loading Personal Data...',
		ERROR: {
			DASHBOARD_NOT_FOUND: 'Given dashboard not found.',
			CONNECTED_SPACE_NOT_FOUND: 'Given connected space not found.',
			SUBJECT_NOT_FOUND: 'Given subject not found.'
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
			TO_ADMIN: 'Switch to Admin'
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
			ADD_INTO_FAVORITE: 'Add into Favorite',
			REMOVE_FROM_FAVORITE: 'Remove from Favorite',
			ADD_REPORT: 'Add Report',
			ADD_DASHBOARD: 'Add Dashboard',
			SWITCH_DASHBOARD: 'Switch Dashboard',
			DELETE_ME: 'Delete Me',
			SHARE_DIALOG_LABEL: 'Copy following url, and share to where you want.',
			URL_COPIED: 'URL copied.',
			DELETE_DIALOG_LABEL: 'Are you sure to delete dashboard? Please note that deletion cannot be recovered.',
			NO_MORE_DASHBOARD: 'No more dashboard exists.',
			SWITCH_DIALOG_LABEL: 'Please select dashboard'
		},
		CONNECTED_SPACE: {
			CATALOG: 'Catalog',
			ADD_SUBJECT: 'Add Subject',
			OPEN_SUBJECT: 'Open Subject',
			ADD_CONNECTED_SPACE: 'Connect Space',
			SWITCH_CONNECTED_SPACE: 'Switch Connected Space',
			DELETE_ME: 'Delete Me',
			ADD_INTO_FAVORITE: 'Add into Favorite',
			REMOVE_FROM_FAVORITE: 'Remove from Favorite',
			DELETE_DIALOG_LABEL: 'Are you sure to delete connected space? Please note that deletion cannot be recovered.',
			NO_MORE_CONNECTED_SPACE: 'No more connected space exists.',
			SWITCH_DIALOG_LABEL: 'Please select connected space',
			CREATE_DIALOG_LABEL: 'Please select available space',
			NO_MORE_SPACE: 'No space exists, contact your administrator for more information.',
			SPACE_NOT_FOUND: 'Space definition not found, contact your administrator for more information.',
			TOPICS_NOT_FOUND: 'Topics definition not found, contact your administrator for more information.',
			TOPICS_COUNT_MISMATCH: 'Topics count mismatch, contact your administrator for more information.',
			TOPIC_WITH_NO_FACTOR: 'No factor defined, contact your administrator for more information.',
			DELETE_SUBJECT_DIALOG_LABEL: 'Are you sure to delete subject? Please note that deletion cannot be recovered.',
			SWITCH_SUBJECT: 'Switch Subject',
			SWITCH_SUBJECT_DIALOG_LABEL: 'Please select subject',
			NO_MORE_SUBJECT: 'No more subject exists.'
		},
		SETTINGS: {
			TITLE: 'Settings',
			LANGUAGE: 'Language'
		}
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
		DATE: 'Date',
		TIME: 'Time',
		YEAR: 'Year',
		HALF_YEAR: '1st/2nd Half Year',
		QUARTER: 'Quarter',
		SEASON: 'Season',
		MONTH: 'Month',
		HALF_MONTH: '1st/2nd Half Month',
		TEN_DAYS: '1st/2nd/3rd Ten Days',
		WEEK_OF_YEAR: 'Week of Year',
		WEEK_OF_MONTH: 'Week of Month',
		HALF_WEEK: '1st/2nd Half Week',
		DAY: 'Day of Month',
		DAY_KIND: 'Workday/Weekday/Holiday',
		HOUR: 'Hour',
		HOUR_KIND: 'Work Time/Off Hours/Sleep Time',
		MINUTE: 'Minute',
		SECOND: 'Second',
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
	}
};