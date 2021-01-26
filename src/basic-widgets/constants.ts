// the most important thing is keep z-index always be correct
import {
	faChartBar,
	faGlobe,
	faLink,
	faList,
	faTags,
	faTasks,
	faUser,
	faUsers,
	faWaveSquare
} from '@fortawesome/free-solid-svg-icons';

export const TOOLTIP_Z_INDEX = 10000;
export const DIALOG_Z_INDEX = 99999;
export const ALERT_Z_INDEX = 99999;
export const DROPDOWN_Z_INDEX = 999;
export const SIDE_MENU_RESIZE_HANDLE_Z_INDEX = 500;

export const BASE_MARGIN = 32;
export const BASE_HEIGHT = 28;
export const INPUT_INDENT = 10;
export const BUTTON_INDENT = 16;
export const BUTTON_HEIGHT_IN_FORM = 22;
export const BORDER_WIDTH = 1;

export const SIDE_MENU_MIN_WIDTH = 51;
export const SIDE_MENU_MAX_WIDTH = 321;
export const SIDE_MENU_RESIZE_HANDLE_WIDTH = 6;

export const TOOLTIP_MAX_WIDTH = 300;
export const TOOLTIP_CARET_OFFSET = 6;

// business related
export const TUPLE_SEARCH_PAGE_SIZE = 9;

// icons
export const ICON_USER_GROUP = faUsers;
export const ICON_USER = faUser;
export const ICON_SPACE = faGlobe;
export const ICON_CONNECTED_SPACE = faLink;
export const ICON_TOPIC = faTags;
export const ICON_FACTOR = faList;
export const ICON_REPORT = faChartBar;
export const ICON_PIPELINE = faWaveSquare;

export const ICON_TASK = faTasks;

// mock data
export const MOCK_ACCOUNT_NAME = 'Dr. X';