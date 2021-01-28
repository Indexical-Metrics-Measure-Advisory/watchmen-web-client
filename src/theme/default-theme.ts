import {
	BASE_HEIGHT,
	BASE_MARGIN,
	BORDER_WIDTH, BUTTON_HEIGHT_IN_FORM,
	BUTTON_INDENT,
	INPUT_INDENT, PIN_FAVORITE_HEIGHT,
	SIDE_MENU_MIN_WIDTH, TOGGLE_HEIGHT
} from '../basic-widgets/constants';

const DefaultTheme = {
	// font
	fontColor: '#666666',
	fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
	titleFontFamily: 'Oswald, -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
	codeFontFamily: 'source-code-pro, Menlo, Monaco, Consolas, \'Courier New\', monospace',
	fontSize: 12,
	lineHeight: 20,
	fontDemiBold: 500,
	fontBold: 600,
	fontBoldest: 900,
	placeholderColor: 'rgb(185, 185, 185)',

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
	borderColor: '#D3DCE6',
	borderWidth: BORDER_WIDTH,
	border: `var(--border-width) var(--border-style) var(--border-color)`,
	borderRadius: 4,

	// margin
	margin: BASE_MARGIN,

	// dialog
	dialogBoxShadow: '0 0 20px 0 rgba(37, 38, 94, 0.8)',

	// scroll
	scrollbarBgColor: 'rgba(229,229,229,0.5)',
	scrollbarThumbBgColor: 'var(--primary-color)',
	scrollbarBorderColor: 'transparent',

	// pin favorite
	pinFavoriteHeight: PIN_FAVORITE_HEIGHT,

	// row
	height: BASE_HEIGHT,

	// input
	inputIndent: INPUT_INDENT,

	// button
	buttonIndent: BUTTON_INDENT,
	buttonIconGap: 8,
	buttonHeightInForm: BUTTON_HEIGHT_IN_FORM,

	// toggle
	toggleHeight: TOGGLE_HEIGHT,
	togglePositiveSliderColor: 'var(--bg-color)',
	toggleNegativeSliderColor: 'var(--bg-color)',
	togglePositiveBgColor: 'var(--primary-color)',
	toggleNegativeBgColor: 'var(--border-color)',

	// side menu
	sideMenuMinWidth: SIDE_MENU_MIN_WIDTH,
	sideMenuIconSize: 32,
	sideMenuItemHeight: 40,
	sideMenuMargin: 'calc((var(--side-menu-min-width) - 1px - var(--side-menu-icon-size)) / 2)',

	// avatar
	avatarSize: 32,

	// tooltip
	tooltipBgColor: '#333333',
	tooltipMinHeight: 20
};

export default DefaultTheme;