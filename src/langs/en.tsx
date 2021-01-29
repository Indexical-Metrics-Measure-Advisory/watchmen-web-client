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
		NEW_DASHBOARD_NAME: 'Dashboard'
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
		SETTINGS: {
			TITLE: 'Settings',
			LANGUAGE: 'Language'
		}
	}
};