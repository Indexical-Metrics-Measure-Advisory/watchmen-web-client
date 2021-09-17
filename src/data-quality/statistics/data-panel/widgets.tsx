import {TooltipButton} from '@/widgets/basic/tooltip-button';
import Color from 'color';
import styled from 'styled-components';
import {DataPanelLayout} from '../types';

const SEQ_WIDTH = 40;

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
	display       : flex;
	border-radius : calc(var(--border-radius) * 2);
	border        : var(--border);
	overflow      : hidden;
	transition    : all 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
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
	display       : grid;
	border-bottom : var(--border);
`;
export const DataPanelHeaderTitle = styled.div.attrs<{ layout: DataPanelLayout }>(({layout}) => {
	return {
		'data-widget': 'data-panel-header-title',
		style: {
			writingMode: layout.spanColumn === 1 ? 'tb' : (void 0)
		}
	};
})<{ layout: DataPanelLayout }>`
	display       : flex;
	align-items   : center;
	font-family   : var(--title-font-family);
	font-size     : 1.4em;
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const DataPanelHeaderButtons = styled.div.attrs<{ layout: DataPanelLayout }>(({layout}) => {
	return {
		'data-widget': 'data-panel-header-buttons',
		style: {
			flexDirection: layout.spanColumn === 1 ? 'column' : (void 0)
		}
	};
})<{ layout: DataPanelLayout }>`
	display     : flex;
	align-items : center;
`;
export const DataPanelHeaderButton = styled(TooltipButton)`
	width   : var(--height);
	padding : 0;
`;
export const DataPanelBody = styled.div.attrs({
	'data-widget': 'data-panel-body',
	'data-v-scroll': ''
})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	overflow-y     : auto;
`;
export const DataPanelBodyHeader = styled.div.attrs<{ columns: string }>(({columns}) => {
	return {
		'data-widget': 'data-panel-body-header',
		style: {
			gridTemplateColumns: `${SEQ_WIDTH}px ${columns}`
		}
	};
})<{ columns: string }>`
	display            : grid;
	position           : sticky;
	top                : 0;
	grid-template-rows : 1fr;
	width              : 100%;
	border-bottom      : var(--border);
	background-color   : var(--bg-color);
	z-index            : 1;
`;
export const DataPanelBodyHeaderCell = styled.div.attrs({'data-widget': 'data-panel-body-header-cell'})`
	display       : flex;
	align-items   : center;
	min-height    : calc(var(--height) * 1.1);
	font-variant  : petite-caps;
	font-weight   : var(--font-bold);
	font-size     : 1.1em;
	padding       : 0 calc(var(--margin) / 4);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const DataPanelBodyHeaderSeqCell = styled(DataPanelBodyHeaderCell)`
	width : ${SEQ_WIDTH}px;
`;
export const DataPanelBodyDataRow = styled.div.attrs<{ columns: string }>(({columns}) => {
	return {
		'data-widget': 'data-panel-body-data-row',
		style: {
			gridTemplateColumns: `${SEQ_WIDTH}px ${columns}`
		}
	};
})<{ columns: string }>`
	display            : grid;
	grid-template-rows : 1fr;
	width              : 100%;
	background-color   : var(--bg-color);
	&:nth-child(2n + 1) {
		background-color : var(--grid-rib-bg-color);
	}
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const DataPanelBodyDataCell = styled.div.attrs({'data-widget': 'data-panel-body-data-cell'})`
	display       : flex;
	align-items   : center;
	min-height    : var(--height);
	padding       : 0 calc(var(--margin) / 4);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const DataPanelBodyNoDataCell = styled(DataPanelBodyDataCell)`
	grid-column : span 4;
`;
export const DataPanelBodyBreakdownCell = styled(DataPanelBodyDataCell).attrs<{ breakdown: boolean }>({})<{ breakdown: boolean }>`
	&:hover > span {
		text-decoration : underline;
		cursor          : pointer;
	}
`;
export const DataPanelBodyDataSeqCell = styled(DataPanelBodyDataCell)`
	width : ${SEQ_WIDTH}px;
`;
const start = Color({r: 223, g: 27, b: 46});
const end = Color({r: 128, g: 128, b: 128});
const computeColor = (value: number) => {
	const r = start.red() + (end.red() - start.red()) * (1 - value / 100);
	const g = start.green() + (end.green() - start.green()) * (1 - value / 100);
	const b = start.blue() + (end.blue() - start.blue()) * (1 - value / 100);
	return Color({r, g, b});
};
export const HorizontalValueBar = styled.div.attrs<{ value: number }>(({value}) => {
	return {
		'data-widget': 'horizontal-value-bar',
		style: {
			width: `calc((100% - 50px) * ${value} / 100)`,
			backgroundColor: `${computeColor(value)}`
		}
	};
})<{ value: number }>`
	display       : flex;
	align-items   : center;
	height        : calc(var(--height) * 0.6);
	border-radius : calc(var(--border-radius) / 2) calc(var(--height) * 0.3) calc(var(--height) * 0.3) calc(var(--border-radius) / 2);
	padding       : 0 calc(var(--margin) / 4);
	overflow      : hidden;
`;
export const HorizontalValue = styled.div.attrs({'data-widget': 'horizontal-value'})`
	display     : flex;
	align-items : center;
	height      : calc(var(--height) * 0.6);
	margin-left : calc(var(--margin) / 2);
	overflow    : hidden;
`;
