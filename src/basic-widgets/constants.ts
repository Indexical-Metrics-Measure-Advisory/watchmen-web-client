// the most important thing is keep z-index always be correct
import {
	faBan,
	faBell,
	faChalkboard,
	faChartBar,
	faCheck,
	faCog,
	faComments,
	faCompress,
	faDiceD20,
	faEdit,
	faExpand,
	faGlobe,
	faHome,
	faInbox,
	faLink,
	faList,
	faPlus,
	faSearch,
	faSortAmountDown,
	faSpinner,
	faStar,
	faTachometerAlt,
	faTags,
	faTasks,
	faThumbtack,
	faTimes,
	faTools,
	faUser,
	faUsers,
	faWaveSquare
} from '@fortawesome/free-solid-svg-icons';

export const TOOLTIP_Z_INDEX = 10000;
export const DIALOG_Z_INDEX = 99999;
export const ALERT_Z_INDEX = 99999;
export const FAVORITE_Z_INDEX = 1500;
export const PIN_FAVORITE_Z_INDEX = 1499;
export const DROPDOWN_Z_INDEX = 999;
export const SIDE_MENU_RESIZE_HANDLE_Z_INDEX = 500;

export const BASE_MARGIN = 32;
export const BASE_HEIGHT = 28;
export const INPUT_INDENT = 10;
export const BUTTON_INDENT = 16;
export const BUTTON_HEIGHT_IN_FORM = 22;
export const TOGGLE_HEIGHT = 22;
export const BORDER_WIDTH = 1;

export const SIDE_MENU_MIN_WIDTH = 51;
export const SIDE_MENU_MAX_WIDTH = 321;
export const SIDE_MENU_RESIZE_HANDLE_WIDTH = 6;

export const TOOLTIP_MAX_WIDTH = 300;
export const TOOLTIP_CARET_OFFSET = 6;

export const PIN_FAVORITE_HEIGHT = 'calc(var(--height) * 1.2 + 1px)';

// business related
export const TUPLE_SEARCH_PAGE_SIZE = 9;

// icons
export const ICON_CONSOLE = faChalkboard;
export const ICON_ADMIN = faTools;
export const ICON_HOME = faHome;

export const ICON_USER_GROUP = faUsers;
export const ICON_USER = faUser;
export const ICON_SPACE = faGlobe;
export const ICON_CONNECTION = faLink;
export const ICON_CONNECTED_SPACE = faDiceD20;
export const ICON_TOPIC = faTags;
export const ICON_FACTOR = faList;
export const ICON_REPORT = faChartBar;
export const ICON_PIPELINE = faWaveSquare;

export const ICON_DASHBOARD = faTachometerAlt;
export const ICON_FAVORITE = faStar;
export const ICON_TASK = faTasks;
export const ICON_NOTIFICATION = faBell;
export const ICON_MAIL = faInbox;
export const ICON_TIMELINE = faComments;

// icons for doing something
export const ICON_ADD = faPlus;
export const ICON_EDIT = faEdit;
export const ICON_DISCARD = faBan;
export const ICON_DELETE = faTimes;
export const ICON_SETTINGS = faCog;
export const ICON_SEARCH = faSearch;
export const ICON_SELECTED = faCheck;
export const ICON_LOADING = faSpinner;
export const ICON_PIN = faThumbtack;
export const ICON_SORT = faSortAmountDown;
export const ICON_COLLAPSE_PANEL = faCompress;
export const ICON_EXPAND_PANEL = faExpand;

// mock data
export const MOCK_ACCOUNT_NAME = 'Dr. X';