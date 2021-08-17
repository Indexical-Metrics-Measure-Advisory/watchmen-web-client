import styled from 'styled-components';
import {CHART_SETTINGS_MAX_WIDTH, CHART_SETTINGS_MIN_WIDTH} from '../../../../../basic-widgets/constants';
import {TooltipButton} from '../../../../../basic-widgets/tooltip-button';

export const SettingsContainer = styled.div.attrs<{ width?: number }>(({width}) => {
	return {
		'data-widget': 'report-editor-settings',
		style: {width: width || CHART_SETTINGS_MIN_WIDTH}
	};
})<{ width?: number }>`
	display: flex;
	flex-direction: column;
	position: relative;
	border-right: var(--border);
	min-width: ${CHART_SETTINGS_MIN_WIDTH}px;
	max-width: ${CHART_SETTINGS_MAX_WIDTH}px;
	height: 100%;
	@media print {
		display: none;
	}
`;
export const SettingsHeader = styled.div.attrs({'data-widget': 'report-editor-settings-header'})`
	display: flex;
	position: relative;
	min-height: var(--header-height);
	height: calc(var(--height) * 2);
	align-items: center;
	justify-content: space-between;
	padding: 0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2);
	//font-family: var(--title-font-family);
	font-weight: var(--font-demi-bold);
	font-size: 1.2em;
	&:after {
		content: '';
		display: block;
		position: absolute;
		left: calc(var(--margin) / 4);
		bottom: 0;
		width: calc(100% - var(--margin) / 4 * 3);
		height: 1px;
		border-bottom: var(--border);
		border-bottom-style: dashed;
		opacity: 0.7;
	}
`;
export const SettingsHeaderTitle = styled.div.attrs({'data-widget': 'report-editor-settings-header-title'})`
	flex-grow: 1;
`;
export const SettingsHeaderButton = styled(TooltipButton).attrs({'data-widget': 'report-editor-settings-header-button'})`
	padding: 0;
	width: var(--height);
	height: var(--height);
	opacity: 0.3;
	&:hover {
		opacity: 1;
	}
`;
