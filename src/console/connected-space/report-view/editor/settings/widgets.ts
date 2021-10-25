import {CHART_SETTINGS_MAX_WIDTH, CHART_SETTINGS_MIN_WIDTH} from '@/widgets/basic/constants';
import {TooltipButton} from '@/widgets/basic/tooltip-button';
import styled from 'styled-components';

export const SettingsContainer = styled.div.attrs<{ visible: boolean, width?: number }>(({visible, width}) => {
	return {
		'data-widget': 'report-editor-settings',
		style: {
			width: visible ? (width || CHART_SETTINGS_MIN_WIDTH) : 0,
			minWidth: visible ? (void 0) : 0,
			maxWidth: visible ? (void 0) : 0,
			overflow: visible ? (void 0) : 'hidden',
			borderRight: visible ? (void 0) : 0
		}
	};
})<{ visible: boolean, width?: number }>`
	display        : flex;
	flex-direction : column;
	position       : relative;
	grid-row       : 1 / span 2;
	border-right   : var(--border);
	min-width      : ${CHART_SETTINGS_MIN_WIDTH}px;
	max-width      : ${CHART_SETTINGS_MAX_WIDTH}px;
	height         : 100%;
	transition     : min-width 300ms ease-in-out, max-width 300ms ease-in-out;
	@media print {
		display : none;
	}
`;
export const SettingsHeader = styled.div.attrs({'data-widget': 'report-editor-settings-header'})`
	display         : flex;
	position        : relative;
	min-height      : calc(var(--height) * 2);
	height          : calc(var(--height) * 2);
	align-items     : center;
	justify-content : space-between;
	padding         : 0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2);
	font-weight     : var(--font-demi-bold);
	font-size       : 1.2em;
	white-space     : nowrap;
	overflow        : hidden;
	text-overflow   : ellipsis;
	&:after {
		content             : '';
		display             : block;
		position            : absolute;
		left                : calc(var(--margin) / 4);
		bottom              : 0;
		width               : calc(100% - var(--margin) / 4 * 3);
		height              : 1px;
		border-bottom       : var(--border);
		border-bottom-style : dashed;
		opacity             : 0.7;
	}
`;
export const SettingsHeaderTitle = styled.div.attrs({'data-widget': 'report-editor-settings-header-title'})`
	flex-grow : 1;
`;
export const SettingsHeaderButton = styled(TooltipButton).attrs({'data-widget': 'report-editor-settings-header-button'})`
	padding : 0;
	width   : var(--height);
	height  : var(--height);
	opacity : 0.3;
	&:hover {
		opacity : 1;
	}
`;
