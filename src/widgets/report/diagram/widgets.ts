import {ChartSettings} from '@/services/data/tuples/chart-types';
import styled from 'styled-components';

export const DiagramContainer = styled.div.attrs<{ settings?: ChartSettings }>(({settings = {}}) => {
	return {
		'data-widget': 'chart-diagram',
		style: {
			backgroundColor: settings?.backgroundColor || 'var(--bg-color)',
			borderStyle: settings?.border?.style || 'none',
			borderWidth: settings?.border?.width || 0,
			borderColor: settings?.border?.color || 'var(--border-color)',
			borderRadius: settings?.border?.radius || 0
		}
	};
})<{ settings?: ChartSettings }>`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
	overflow : hidden;
`;
export const DiagramBroken = styled.div.attrs({'data-widget': 'chart-diagram-broken'})`
	display         : flex;
	align-items     : center;
	justify-content : center;
	font-size       : 3.5em;
	font-family     : var(--title-font-family);
	height          : 100%;
	padding         : 0 calc(var(--margin) * 2);
	color           : var(--font-color);
	opacity         : 0.3;
`;
export const DiagramLoading = styled.div.attrs({'data-widget': 'chart-diagram-loading'})`
	display         : flex;
	align-items     : center;
	justify-content : center;
	font-size       : 112px;
	height          : 100%;
	color           : var(--font-color);
	opacity         : 0.1;
`;
export const EChartDiagramContainer = styled.div.attrs({'data-widget': 'echart-diagram'})`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
	div.report-dataset-grid {
		display        : flex;
		flex-direction : column;
		margin         : 0 calc(var(--margin) / 2);
		height         : 100%;
		width          : calc(100% - var(--margin));
		align-content  : start;
		> div.report-dataset-grid-header {
			display                 : grid;
			border                  : var(--border);
			border-top-left-radius  : var(--border-radius);
			border-top-right-radius : var(--border-radius);
			background-color        : var(--primary-color);
			border-color            : var(--primary-color);
			> div {
				display      : flex;
				align-items  : center;
				font-variant : petite-caps;
				font-weight  : var(--font-demi-bold);
				color        : var(--invert-color);
				height       : var(--height);
				padding      : 0 calc(var(--margin) / 4);
				border-right : var(--border);
				&:last-child {
					border-right : 0;
				}
			}
		}
		> div.report-dataset-grid-body {
			display        : flex;
			flex-direction : column;
			height         : calc(100% - var(--height));
			overflow       : auto;
			border         : var(--border);
			border-top     : 0;
			border-color   : var(--primary-color);
			> div.report-dataset-grid-body-row {
				display       : grid;
				border-bottom : var(--border);
				&:hover {
					background-color : var(--hover-color);
				}
				> div {
					display      : flex;
					align-items  : center;
					height       : var(--height);
					padding      : 0 calc(var(--margin) / 4);
					border-right : var(--border);
					&:last-child {
						border-right : 0;
					}
				}
			}
		}
		${new Array(10).fill(1).map((v, index) => `&[data-columns="${index + 1}"] > div.report-dataset-grid-header {grid-template-columns : 40px repeat(${index + 1}, 100px) 1fr;}`)}
		${new Array(10).fill(1).map((v, index) => `&[data-columns="${index + 1}"] > div.report-dataset-grid-body > div.report-dataset-grid-body-row {grid-template-columns : 40px repeat(${index + 1}, 100px) 1fr;}`)}
		+ a {
			display          : flex;
			position         : absolute;
			align-items      : center;
			outline          : none;
			color            : var(--invert-color);
			background-color : var(--primary-color);
			font-variant     : petite-caps;
			font-weight      : var(--font-demi-bold);
			font-size        : 0.8em;
			border-radius    : var(--border-radius);
			height           : var(--button-height-in-form);
			padding          : 0 calc(var(--margin) / 2);
			right            : 100px;
			bottom           : 0;
			cursor           : pointer;
			transition       : box-shadow 300ms ease-in-out;
			text-decoration  : none;
			z-index          : 1;
		}
	}
`;