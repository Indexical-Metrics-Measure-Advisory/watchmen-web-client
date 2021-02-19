import styled from 'styled-components';
import { CHART_SETTINGS_MAX_WIDTH, CHART_SETTINGS_MIN_WIDTH } from '../../../../../../basic-widgets/constants';
import { TooltipButton } from '../../../../../../basic-widgets/tooltip-button';

export const SettingsContainer = styled.div.attrs<{ width?: number }>(({ width }) => {
	return {
		'data-widget': 'report-editor-settings',
		style: { width: width || CHART_SETTINGS_MIN_WIDTH }
	};
})<{ width?: number }>`
	display        : flex;
	flex-direction : column;
	position       : relative;
	border-left    : var(--border);
	min-width      : ${CHART_SETTINGS_MIN_WIDTH}px;
	max-width      : ${CHART_SETTINGS_MAX_WIDTH}px;
`;
export const SettingsHeader = styled.div.attrs({ 'data-widget': 'report-editor-settings-header' })`
	display         : flex;
	min-height      : var(--header-height);
	height          : var(--header-height);
	align-items     : center;
	justify-content : space-between;
	padding         : 0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2);
	border-bottom   : var(--border);
	font-family     : var(--title-font-family);
	font-size       : 1.2em;
`;
export const SettingsHeaderTitle = styled.div.attrs({ 'data-widget': 'report-editor-settings-header-title' })`
	flex-grow : 1;
`;
export const SettingsHeaderButton = styled(TooltipButton).attrs({ 'data-widget': 'report-editor-settings-header-button' })`
	padding : 0;
	width   : var(--height);
	height  : var(--height);
`;
