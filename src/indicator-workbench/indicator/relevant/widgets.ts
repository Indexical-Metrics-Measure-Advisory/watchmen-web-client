import styled from 'styled-components';

export const RelevantIndicatorsContainer = styled.div.attrs({'data-widget': 'relevant-indicators'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
`;
export const RelevantIndicatorsHeader = styled.div.attrs({'data-widget': 'relevant-indicators-header'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 1fr 200px;
	border-bottom         : var(--border);
	border-bottom-width   : calc(var(--border-width) * 2);
`;
export const RelevantIndicatorsHeaderCell = styled.div.attrs({'data-widget': 'relevant-indicators-header-cell'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	padding      : 0 calc(var(--margin) / 4);
	min-height   : var(--tall-height);
	font-size    : 1.1em;
	font-weight  : var(--font-demi-bold);
	font-variant : petite-caps;
`;
export const RelevantIndicatorsBodyRow = styled.div.attrs({'data-widget': 'relevant-indicators-header'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 1fr 200px;
	height                : var(--tall-height);
	border-radius         : var(--border-radius);
	overflow              : hidden;
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
	&:last-child {
		margin-bottom              : calc(var(--margin) / 2);
		border-bottom              : var(--border);
		border-bottom-left-radius  : 0;
		border-bottom-right-radius : 0;
	}
	&:before {
		content    : '';
		display    : block;
		position   : absolute;
		top        : 0;
		left       : 0;
		width      : 100%;
		height     : 100%;
		opacity    : 0.3;
		z-index    : 0;
		transition : background-color 300ms ease-in-out;
	}
	&:hover {
		&:before {
			background-color : var(--hover-color);
		}
		> div[data-widget=relevant-indicators-body-cell] > div[data-widget=dropdown] {
			border-color : var(--border-color);
		}
	}
`;
export const RelevantIndicatorsBodyCell = styled.div.attrs({'data-widget': 'relevant-indicators-body-cell'})`
	display     : flex;
	position    : relative;
	align-items : center;
	padding     : 0 calc(var(--margin) / 4);
	min-height  : var(--tall-height);
	> div[data-widget=dropdown] {
		border-color : transparent;
	}
`;
export const NoRelevant = styled.div.attrs({'data-widget': 'no-relevant'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	min-height    : var(--height);
	margin-bottom : calc(var(--margin) / 2);
	font-size     : 1.2em;
`;