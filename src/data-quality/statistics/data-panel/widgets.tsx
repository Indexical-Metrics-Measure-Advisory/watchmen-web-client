import styled from 'styled-components';
import {TooltipButton} from '../../../basic-widgets/tooltip-button';
import {DataPanelLayout} from '../types';

export const DataPanelContainer = styled.div
	.attrs<{ layout: DataPanelLayout }>(({layout}) => {
		return {
			'data-widget': 'data-panel',
			style: {
				gridColumn: `${layout.column} / span ${layout.spanColumn}`,
				gridRow: `${layout.row} / span ${layout.spanRow}`,
				flexDirection: layout.spanColumn === 1 ? (void 0) : 'column'
			}
		};
	})<{ layout: DataPanelLayout }>`
	display: flex;
	border-radius: calc(var(--border-radius) * 2);
	border: var(--border);
	overflow: hidden;
	transition: all 300ms ease-in-out;
	&:hover {
		box-shadow: var(--primary-hover-shadow);
	}
`;
export const DataPanelHeader = styled.div.attrs<{ layout: DataPanelLayout }>(({layout}) => {
	return {
		'data-widget': 'data-panel-header',
		style: {
			gridTemplateColumns: layout.spanColumn === 1 ? '1fr' : '1fr auto',
			gridTemplateRows: layout.spanColumn === 1 ? '1fr auto' : '1fr',
			minHeight: layout.spanColumn === 1 ? '' : 'var(--header-height)',
			minWidth: layout.spanColumn === 1 ? 'var(--header-height)' : '',
			padding: layout.spanColumn === 1 ? 'calc(var(--margin) / 2) 0 calc(var(--margin) / 4)' : '0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2)',
			alignItems: layout.spanColumn === 1 ? (void 0) : 'center'
		}
	};
})<{ layout: DataPanelLayout }>`
	display: grid;
`;
export const DataPanelHeaderTitle = styled.div.attrs<{ layout: DataPanelLayout }>(({layout}) => {
	return {
		'data-widget': 'data-panel-header-title',
		style: {
			writingMode: layout.spanColumn === 1 ? 'tb' : (void 0)
		}
	};
})<{ layout: DataPanelLayout }>`
	display: flex;
	align-items: center;
	font-family: var(--title-font-family);
	font-size: 1.4em;
`;
export const DataPanelHeaderButtons = styled.div.attrs<{ layout: DataPanelLayout }>(({layout}) => {
	return {
		'data-widget': 'data-panel-header-buttons',
		style: {
			flexDirection: layout.spanColumn === 1 ? 'column' : (void 0)
		}
	};
})<{ layout: DataPanelLayout }>`
	display: flex;
	align-items: center;
`;
export const DataPanelHeaderButton = styled(TooltipButton)`
	width: var(--height);
	padding: 0;
`;