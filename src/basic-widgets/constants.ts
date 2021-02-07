// the most important thing is keep z-index always be correct
import { faBuffer } from '@fortawesome/free-brands-svg-icons';
import {
	faArrowAltCircleDown,
	faBan,
	faBell,
	faChalkboard,
	faChartBar,
	faChartPie,
	faCheck,
	faCloudDownloadAlt,
	faCog,
	faComments,
	faCompress,
	faCompressArrowsAlt,
	faDiceD20,
	faDrawPolygon,
	faEdit,
	faExpand,
	faGlobe,
	faHome,
	faInbox,
	faLevelUpAlt,
	faLink,
	faList,
	faPlus,
	faPrint,
	faRandom,
	faSearch,
	faShare,
	faSortAmountDown,
	faSpinner,
	faStar,
	faTable,
	faTachometerAlt,
	faTags,
	faTasks,
	faTh,
	faThumbtack,
	faTimes,
	faTools,
	faTrashAlt,
	faUpload,
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
export const BASE_TALL_HEIGHT = 32;
export const INPUT_INDENT = 10;
export const BUTTON_INDENT = 16;
export const BUTTON_HEIGHT_IN_FORM = 22;
export const TOGGLE_HEIGHT = 22;
export const BORDER_WIDTH = 1;
export const HEADER_HEIGHT = 40;
export const GRID_ROW_HEIGHT = 36;
export const GRID_TALL_ROW_HEIGHT = 40;

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
export const ICON_SUBJECT = faTable;
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
export const ICON_THROW_AWAY = faTrashAlt;
export const ICON_SETTINGS = faCog;
export const ICON_SEARCH = faSearch;
export const ICON_SELECTED = faCheck;
export const ICON_LOADING = faSpinner;
export const ICON_PIN = faThumbtack;
export const ICON_SORT = faSortAmountDown;
export const ICON_COLLAPSE_PANEL = faCompress;
export const ICON_EXPAND_PANEL = faExpand;
export const ICON_SHARE = faShare;
export const ICON_SWITCH = faRandom;
export const ICON_PRINT = faPrint;
export const ICON_CONNECTED_SPACE_CATALOG = faDrawPolygon;
export const ICON_SUBJECT_DEF = faBuffer;
export const ICON_SUBJECT_DATA = faTh;
export const ICON_SUBJECT_REPORT = faChartPie;
export const ICON_UPLOAD = faUpload;
export const ICON_ROW_PREPEND_ON_RIGHT = faLevelUpAlt;
export const ICON_CLOSE = faTimes;
export const ICON_DOWNLOAD_PAGE = faArrowAltCircleDown;
export const ICON_DOWNLOAD = faCloudDownloadAlt;
export const ICON_COLLAPSE_CONTENT = faCompressArrowsAlt;
// export const ICON_EXPAND_CONTENT = faExpandArrowsAlt;

// mock data
export const MOCK_ACCOUNT_NAME = 'Dr. X';