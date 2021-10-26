import styled from 'styled-components';

const HEIGHT = 400;
export const ReportDataSetAndPaletteContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'report-dataset-and-palette-container',
		style: {
			minHeight: visible ? (void 0) : 0,
			maxHeight: visible ? (void 0) : 0,
			overflow: visible ? (void 0) : 'hidden',
			borderTop: visible ? (void 0) : 0
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	min-height     : ${HEIGHT}px;
	max-height     : ${HEIGHT}px;
	transition     : min-height 300ms ease-in-out, max-height 300ms ease-in-out;
	@media print {
		display : none;
	}
`;
export const TabHeaders = styled.div.attrs({'data-widget': 'tab-headers'})`
	display       : flex;
	position      : relative;
	border-bottom : var(--border);
`;
export const TabHeader = styled.div.attrs<{ active: boolean, zIndex: number }>(({active, zIndex}) => {
	return {
		'data-widget': 'tab-header',
		style: {
			backgroundColor: active ? 'var(--primary-color)' : (void 0),
			color: active ? 'var(--invert-color)' : (void 0),
			zIndex
		}
	};
})<{ active: boolean, zIndex: number }>`
	display                 : flex;
	position                : relative;
	min-height              : calc(var(--height) * 1.5);
	height                  : calc(var(--height) * 1.5);
	align-items             : center;
	justify-content         : space-between;
	padding                 : 0 calc(var(--margin) / 3 * 2) 0 calc(var(--margin) / 2);
	font-weight             : var(--font-demi-bold);
	font-size               : 1.2em;
	font-variant            : petite-caps;
	white-space             : nowrap;
	text-overflow           : ellipsis;
	border-top              : var(--border);
	border-right            : var(--border);
	border-top-right-radius : calc(var(--height) * 0.75);
	background-color        : var(--bg-color);
	cursor                  : pointer;
	transition              : background-color 300ms ease-in-out, color 300ms ease-in-out;
	&:first-child {
		margin-left : -1px;
		border-left : var(--border);
	}
	&:not(:first-child) {
		margin-left  : calc(var(--height) * -0.75);
		padding-left : calc(var(--margin) / 2 + var(--height) * 0.75);
	}
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const TabBodyContainer = styled.div.attrs({'data-widget': 'tab-body-container', 'data-v-scroll': ''})`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	max-height     : calc(${HEIGHT}px - var(--height) * 1.5);
	counter-reset  : list-number;
	padding-bottom : calc(var(--margin) / 2);
	overflow-x     : hidden;
	overflow-y     : auto;
`;
export const TabBodySection = styled.div.attrs({'data-widget': 'tab-body-section'})`
	display        : flex;
	flex-direction : column;
`;
export const TabBodySectionTitle = styled.div.attrs({'data-widget': 'tab-body-section-title'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	padding      : 0 calc(var(--margin) / 2);
	font-size    : 1.1em;
	font-variant : petite-caps;
	height       : calc(var(--height) * 1.5);
	&:before {
		content           : counter(list-number, lower-roman);
		counter-increment : list-number;
		display           : block;
		margin-right      : calc(var(--margin) / 4);
		font-size         : 0.8em;
		font-weight       : var(--font-bold);
		color             : var(--invert-color);
		background-color  : var(--primary-color);
		padding           : 0 calc(var(--margin) / 4);
		border-radius     : var(--border-radius) calc(var(--margin) / 4) calc(var(--margin) / 4) var(--border-radius);
		text-transform    : uppercase;
	}
	&:after {
		content             : '';
		display             : block;
		position            : absolute;
		top                 : calc(100% - 1px);
		left                : calc(var(--margin) / 2);
		height              : 1px;
		width               : calc(100% - var(--margin));
		border-bottom       : var(--border);
		border-bottom-style : dotted;
	}
`;
export const TabBodySectionBody = styled.div.attrs({'data-widget': 'tab-body-section-body'})`
	display               : grid;
	grid-template-columns : 135px 1fr 135px 1fr 135px 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	align-items           : start;
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2);
	> div[data-widget=chart-settings-prop-name] {
		height : calc(var(--height) * 1.4 + 1px);
	}
	> div[data-widget=chart-settings-prop-value] {
		height : calc(var(--height) * 1.4 + 1px);
		> input,
		> div[data-widget=dropdown],
		> div[data-widget=color-picker] {
			height : 80%;
		}
		> div[data-widget=chart-settings-prop-value-unit] {
			top : calc(var(--height) * 0.2 + 1px);
		}
	}
`;

