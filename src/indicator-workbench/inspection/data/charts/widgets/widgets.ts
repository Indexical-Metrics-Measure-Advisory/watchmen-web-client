import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';

export const ChartGroup = styled.div.attrs({'data-widget': 'inspection-chart-group'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(2, calc((100% - var(--margin)) / 2));
	grid-column-gap       : var(--margin);
	grid-row-gap          : calc(var(--margin) / 2);
	padding-top           : calc(var(--margin) / 2);
`;

export const ChartGroupTitle = styled.div.attrs({'data-widget': 'inspection-chart-group-title'})`
	display       : flex;
	position      : relative;
	grid-column   : 1 / span 2;
	align-items   : center;
	font-variant  : petite-caps;
	font-weight   : var(--font-demi-bold);
	min-height    : var(--header-height);
	padding       : 0 calc(var(--margin) / 2);
	margin-bottom : calc(var(--margin) / 2);
	border-radius : calc(var(--border-radius) * 2);
	overflow      : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.2;
		z-index          : -1;
	}
`;

export const ChartGroupButtons = styled.div.attrs({'data-widget': 'inspection-chart-group-buttons'})`
	display         : flex;
	position        : relative;
	flex-grow       : 1;
	align-items     : center;
	justify-content : flex-end;
	@media print {
		display : none;
	}
`;

export const MeasureSelector = styled.div`
	display      : flex;
	position     : relative;
	align-items  : center;
	margin-right : calc(var(--margin) / 4);
	> button {
		border       : var(--border);
		border-color : var(--primary-color);
		opacity      : 0.5;
		&:first-child {
			border-top-right-radius    : 0;
			border-bottom-right-radius : 0;
		}
		&:not(:first-child):not(:last-child) {
			border-radius : 0;
		}
		&:last-child {
			border-top-left-radius    : 0;
			border-bottom-left-radius : 0;
		}
		&:not(:first-child) {
			border-left : 0;
		}
		&[data-selected=true] {
			color            : var(--invert-color);
			background-color : var(--primary-color);
		}
	}
`;

export const ChartGroupButton = styled(Button)`
	height    : calc(var(--header-height) * 0.7);
	min-width : calc(var(--header-height) * 0.7);
	padding   : 0 calc(var(--margin) / 4);
	color     : var(--primary-color);
	> svg:not(:last-child) {
		margin-right : var(--button-icon-gap);
	}
`;

export const ChartContainer = styled.div.attrs({'data-widget': 'inspection-chart'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	padding-top    : 75%;
	@media print {
		grid-column : 1 / span 2;
	}
	> div[data-widget=inspection-chart-wrapper] {
		position      : absolute;
		flex-grow     : 1;
		margin-top    : -75%;
		height        : calc(100% - var(--header-height) - var(--margin) / 4);
		width         : 100%;
		border        : var(--border);
		border-width  : calc(var(--border-width) * 2);
		border-radius : calc(var(--border-radius) * 2);
		@media print {
			height : calc(100% - var(--header-height));
		}
	}
`;

export const ChartToolbar = styled.div.attrs({'data-widget': 'inspection-chart-toolbar'})`
	display    : flex;
	position   : relative;
	min-height : calc(var(--header-height));
	margin-top : calc(var(--margin) / 4);
	@media print {
		display : none;
	}
`;

export const ChartTypeButtons = styled.div.attrs({'data-widget': 'inspection-chart-type-buttons'})`
	display     : flex;
	position    : relative;
	align-items : center;
	> button {
		border       : var(--border);
		border-color : var(--primary-color);
		opacity      : 0.5;
		&:first-child:not(:last-child) {
			border-top-right-radius    : 0;
			border-bottom-right-radius : 0;
		}
		&:not(:first-child):not(:last-child) {
			border-radius : 0;
		}
		&:last-child:not(:first-child) {
			border-top-left-radius    : 0;
			border-bottom-left-radius : 0;
		}
		&:not(:first-child) {
			border-left : 0;
		}
		&[data-selected=true] {
			color            : var(--invert-color);
			background-color : var(--primary-color);
		}
	}
	+ div[data-widget=inspection-chart-type-buttons] {
		margin-left : calc(var(--margin) / 4);
	}
`;

export const ChartTypeButton = styled(Button)`
	height    : calc(var(--header-height) * 0.7);
	min-width : calc(var(--header-height) * 0.7);
	max-width : calc(var(--header-height) * 0.7);
	padding   : 0 calc(var(--margin) / 4);
	color     : var(--primary-color);
	> svg:not(:last-child) {
		margin-right : var(--button-icon-gap);
	}
`;

export const ChartWrapper = styled.div.attrs({'data-widget': 'inspection-chart-wrapper'})`
	display  : block;
	position : relative;
	overflow : hidden;
`;

export const ChartPalette = styled.div.attrs({'data-widget': 'inspection-chart-palette'})`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
`;
