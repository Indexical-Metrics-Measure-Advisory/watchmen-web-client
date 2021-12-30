import color from 'color';
import {
	BASE_HEIGHT,
	BASE_MARGIN,
	BASE_TALL_HEIGHT,
	BORDER_WIDTH,
	BUTTON_HEIGHT_IN_FORM,
	BUTTON_INDENT,
	CHECKBOX_SIZE,
	GRID_ROW_HEIGHT,
	GRID_TALL_ROW_HEIGHT,
	HEADER_HEIGHT,
	INPUT_INDENT,
	PAGE_HEADER_HEIGHT,
	PARAM_HEIGHT,
	PIN_FAVORITE_HEIGHT,
	SIDE_MENU_MIN_WIDTH,
	TOGGLE_HEIGHT
} from '../basic/constants';

const DefaultTheme = {
	code: 'light',
	codeEditorTheme: 'light',
	// font
	fontColor: '#666666',
	fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Tahoma\', \'Verdana\', \'Arial\', \'Times New Roman\', \'Simsun\', \'Microsoft YaHei\', \'MS Mincho\', \'MS PGMincho\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
	titleFontFamily: 'Oswald, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
	codeFontFamily: '\'Source Code Pro\', Menlo, Monaco, Consolas, \'Courier New\', monospace',
	fontSize: 12,
	lineHeight: 20,
	fontNormal: 400,
	fontDemiBold: 500,
	fontBold: 600,
	fontBoldest: 900,
	placeholderColor: 'rgb(102,102,102,0.7)',

	// color
	primaryColor: 'rgb(94, 119, 171)',
	// primaryHoverColor: 'rgb(185,201,231)',
	dangerColor: 'rgb(222,89,99)',
	successColor: 'rgb(33, 157, 79)',
	warnColor: 'rgb(255, 161, 0)',
	infoColor: 'rgb(138, 53, 193)',
	waiveColor: 'rgb(191, 191, 191)',
	hoverColor: 'rgb(195, 218, 241)',
	bgColor: '#F9FAFC',
	invertColor: '#FFFFFF',

	// shadow
	shadow: '0 0 11px 0 rgba(0, 0, 0, 0.06)',
	hoverShadow: '0 0 11px 0 rgba(0, 0, 0, 0.2)',
	primaryShadow: '0 0 11px 0 rgba(94, 119, 171, 0.6)',
	primaryHoverShadow: '0 0 11px 0 rgba(94, 119, 171, 1)',
	dangerShadow: '0 0 11px 0 rgba(222, 89, 99, 0.6)',
	dangerHoverShadow: '0 0 11px 0 rgba(222, 89, 99, 1)',
	successShadow: '0 0 11px 0 rgba(33, 157, 79, 0.6)',
	successHoverShadow: '0 0 11px 0 rgba(33, 157, 79, 1)',
	warnShadow: '0 0 11px 0 rgba(255, 161, 0, 0.6)',
	warnHoverShadow: '0 0 11px 0 rgba(255, 161, 0, 1)',
	infoShadow: '0 0 11px 0 rgba(138, 53, 193, 0.6)',
	infoHoverShadow: '0 0 11px 0 rgba(138, 53, 193, 1)',
	waiveShadow: '0 0 11px 0 rgba(191, 191, 191, 0.6)',
	waiveHoverShadow: '0 0 11px 0 rgba(191, 191, 191, 1)',

	// border
	borderStyle: 'solid',
	borderColor: 'rgb(210, 220, 230)',
	borderWidth: BORDER_WIDTH,
	border: `var(--border-width) var(--border-style) var(--border-color)`,
	borderRadius: 4,

	// margin
	margin: BASE_MARGIN,

	// dialog
	dialogBoxShadow: '0 0 20px 0 rgba(37, 38, 94, 0.8)',

	// scroll
	scrollbarBgColor: 'rgba(229,229,229,0.5)',
	scrollbarThumbBgColor: 'var(--warn-color)',
	scrollbarBorderColor: 'transparent',

	// pin favorite
	pinFavoriteHeight: PIN_FAVORITE_HEIGHT,

	// standard
	height: BASE_HEIGHT,
	tallHeight: BASE_TALL_HEIGHT,
	headerHeight: HEADER_HEIGHT,

	// input
	inputIndent: INPUT_INDENT,

	// button
	buttonIndent: BUTTON_INDENT,
	buttonIconGap: 8,
	buttonHeightInForm: BUTTON_HEIGHT_IN_FORM,

	// checkbox
	checkboxSize: CHECKBOX_SIZE,

	// toggle
	toggleHeight: TOGGLE_HEIGHT,
	togglePositiveSliderColor: 'var(--bg-color)',
	toggleNegativeSliderColor: 'var(--bg-color)',
	togglePositiveBgColor: 'var(--primary-color)',
	toggleNegativeBgColor: 'var(--border-color)',

	pageHeaderHeight: PAGE_HEADER_HEIGHT,

	// side menu
	sideMenuMinWidth: SIDE_MENU_MIN_WIDTH,
	sideMenuIconSize: 32,
	sideMenuItemHeight: 40,
	sideMenuMargin: 'calc((var(--side-menu-min-width) - 1px - var(--side-menu-icon-size)) / 2)',

	// avatar
	avatarSize: 32,

	// tooltip
	tooltipBgColor: '#333333',
	tooltipMinHeight: 20,

	// grid
	gridRowHeight: GRID_ROW_HEIGHT,
	gridRibBgColor: 'rgb(243,243,243)',
	gridTallRowHeight: GRID_TALL_ROW_HEIGHT,

	// parameter
	paramHeight: PARAM_HEIGHT,
	paramBgColor: 'var(--border-color)',
	paramBorder: '0 0 0 1px var(--border-color)',
	paramTopBorder: '0 -1px 0 var(--border-color)',
	paramRightBorder: '1px 0 0 var(--border-color)',
	paramBottomBorder: '0 1px 0 var(--border-color)',
	paramLeftBorder: '-1px 0 0 var(--border-color)',
	paramPrimaryColor: 'rgba(94, 119, 171)',
	paramPrimaryBorder: '0 0 0 1px var(--param-primary-color)',
	paramPrimaryTopBorder: '0 -1px 0 var(--param-primary-color)',
	paramPrimaryRightBorder: '1px 0 0 var(--param-primary-color)',
	paramPrimaryBottomBorder: '0 1px 0 var(--param-primary-color)',
	paramPrimaryLeftBorder: '-1px 0 0 var(--param-primary-color)',
	paramDangerColor: 'rgba(222, 89, 99)',
	paramDangerBorder: '0 0 0 1px var(--param-danger-color)',
	paramDangerTopBorder: '0 -1px 0 var(--param-danger-color)',
	paramDangerRightBorder: '1px 0 0 var(--param-danger-color)',
	paramDangerBottomBorder: '0 1px 0 var(--param-danger-color)',
	paramDangerLeftBorder: '-1px 0 0 var(--param-danger-color)',

	// topic color
	rawTopicColor: 'var(--waive-color)',
	metaTopicColor: 'var(--waive-color)',
	distinctTopicColor: 'var(--primary-color)',
	aggregateTopicColor: 'var(--info-color)',
	timeTopicColor: 'var(--success-color)',
	ratioTopicColor: 'var(--warn-color)',

	// data diff color
	diffAddedBgColor: 'rgba(148,232,191,0.6)',

	// navigation node color
	navigationRootColor: 'var(--danger-color)',
	navigationTimeRangeColor: 'rgba(174,113,109)',
	navigationIndicatorColor: 'var(--primary-color)',
	navigationIndicatorBgColor: color('rgb(94,119,171)').alpha(0.1).toString(),
	navigationIndicatorValueColor: 'var(--success-color)',
	navigationComputeIndicatorColor: 'rgb(96,148,164)',
	navigationComputeIndicatorBgColor: color('rgb(96,148,164)').alpha(0.1).toString(),
	navigationComputeIndicatorValueColor: 'var(--success-color)',
	navigationCategoryColor: 'var(--info-color)',
	navigationCandidateColor: 'var(--success-color)',
	navigationScoreSumColor: 'rgb(69,146,70)'
};

export default DefaultTheme;