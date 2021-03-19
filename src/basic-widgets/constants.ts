// the most important thing is keep z-index always be correct
import { faBuffer, faCreativeCommonsSampling } from '@fortawesome/free-brands-svg-icons';
import {
	faAngleLeft,
	faAngleRight,
	faArrowAltCircleDown,
	faArrowDown,
	faArrowUp,
	faBan,
	faBell,
	faCaretRight,
	faChalkboard,
	faChartBar,
	faChartPie,
	faCheck,
	faCheckSquare,
	faCloudDownloadAlt,
	faCode,
	faCog,
	faComments,
	faCompress,
	faCompressAlt,
	faCompressArrowsAlt,
	faDiceD20,
	faDrawPolygon,
	faEdit,
	faExpand,
	faExpandArrowsAlt,
	faGlobe,
	faGripVertical,
	faHome,
	faInbox,
	faLaptopHouse,
	faLevelDownAlt,
	faLevelUpAlt,
	faLink,
	faList,
	faLock,
	faLockOpen,
	faParagraph,
	faPlus,
	faPrint,
	faRandom,
	faSave,
	faSearch,
	faShare, faSignOutAlt,
	faSortAmountDown,
	faSortAmountUpAlt,
	faSpinner,
	faStar,
	faStickyNote,
	faStream,
	faTable,
	faTachometerAlt,
	faTags,
	faTasks,
	faTh,
	faThumbtack,
	faTimes,
	faTimesCircle,
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
export const CHART_DRAG_Z_INDEX = 1000;
export const CHART_SETTINGS_RESIZE_HANDLE_Z_INDEX = 500;
export const REMOTE_REQUEST_INDEX = 99999;

export const BASE_MARGIN = 32;
export const BASE_HEIGHT = 28;
export const BASE_TALL_HEIGHT = 32;
export const INPUT_INDENT = 10;
export const BUTTON_INDENT = 16;
export const BUTTON_HEIGHT_IN_FORM = 22;
export const CHECKBOX_SIZE = 22;
export const TOGGLE_HEIGHT = 22;
export const BORDER_WIDTH = 1;
export const HEADER_HEIGHT = 40;
export const GRID_ROW_HEIGHT = 36;
export const GRID_TALL_ROW_HEIGHT = 40;
export const PARAM_HEIGHT = 22;

export const SIDE_MENU_MIN_WIDTH = 51;
export const SIDE_MENU_MAX_WIDTH = 321;
export const SIDE_MENU_RESIZE_HANDLE_WIDTH = 6;

export const TOOLTIP_MAX_WIDTH = 300;
export const TOOLTIP_CARET_OFFSET = 6;

export const PIN_FAVORITE_HEIGHT = 'calc(var(--height) * 1.2 + 1px)';

export const CHART_SETTINGS_MIN_WIDTH = 350;
export const CHART_SETTINGS_MAX_WIDTH = 800;
export const CHART_SETTINGS_RESIZE_HANDLE_WIDTH = 6;

// business related
export const TUPLE_SEARCH_PAGE_SIZE = 9;

// icons
export const ICON_CONSOLE = faChalkboard;
export const ICON_ADMIN = faTools;
export const ICON_HOME = faHome;
export const ICON_LOGOUT = faSignOutAlt;

export const ICON_USER_GROUP = faUsers;
export const ICON_USER = faUser;
export const ICON_SPACE = faGlobe;
export const ICON_CONNECTION = faLink;
export const ICON_CONNECTED_SPACE = faDiceD20;
export const ICON_SUBJECT = faTable;
export const ICON_TOPIC = faTags;
export const ICON_FACTOR = faList;
export const ICON_ENUM = faStream;
export const ICON_REPORT = faChartBar;
export const ICON_PARAGRAPH = faParagraph;
export const ICON_AS_ADMIN_HOME = faLaptopHouse;
export const ICON_PIPELINE = faWaveSquare;

export const ICON_DASHBOARD = faTachometerAlt;
export const ICON_FAVORITE = faStar;
export const ICON_TASK = faTasks;
export const ICON_NOTIFICATION = faBell;
export const ICON_MAIL = faInbox;
export const ICON_TIMELINE = faComments;
export const ICON_MONITOR_LOGS = faCreativeCommonsSampling;

export const ICON_SECONDARY_SECTION = faCaretRight;

// icons for doing something
export const ICON_ADD = faPlus;
export const ICON_EDIT = faEdit;
export const ICON_DISCARD = faBan;
export const ICON_DELETE = faTimes;
export const ICON_CONFIRM = faCheck;
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
export const ICON_PAGE_SIZE = faStickyNote;
export const ICON_CONNECTED_SPACE_CATALOG = faDrawPolygon;
export const ICON_SUBJECT_DEF = faBuffer;
export const ICON_SUBJECT_DATA = faTh;
export const ICON_SUBJECT_REPORT = faChartPie;
export const ICON_UPLOAD = faUpload;
export const ICON_ROW_PREPEND_ON_RIGHT = faLevelUpAlt;
export const ICON_CLOSE = faTimes;
export const ICON_DOWNLOAD_PAGE = faArrowAltCircleDown;
export const ICON_DOWNLOAD = faCloudDownloadAlt;
export const ICON_PIPELINES_CATALOG = faWaveSquare;
export const ICON_COLLAPSE_CONTENT = faCompressArrowsAlt;
export const ICON_EXPAND_CONTENT = faExpandArrowsAlt;
export const ICON_PREVIOUS_PAGE = faAngleLeft;
export const ICON_NEXT_PAGE = faAngleRight;
export const ICON_COMPRESS_COLUMNS = faCompressAlt;
export const ICON_FIX_COLUMN = faLock;
export const ICON_UNFIX_COLUMN = faLockOpen;
export const ICON_SORT_ASC = faSortAmountUpAlt;
export const ICON_SORT_DESC = faSortAmountDown;
export const ICON_SAVE = faSave;
export const ICON_DISABLE = faTimesCircle;
export const ICON_ENABLE = faCheckSquare;
export const ICON_MOVE_DOWN = faArrowDown;
export const ICON_MOVE_UP = faArrowUp;
export const ICON_DSL = faCode;
export const ICON_PREPEND = faLevelUpAlt;
export const ICON_APPEND = faLevelDownAlt;
export const ICON_DRAG_HANDLE = faGripVertical;
export const ICON_CHECK = faCheck;
export const ICON_UNCHECK = faTimes;

// mock data
export const MOCK_ACCOUNT_NAME = 'Dr. X';