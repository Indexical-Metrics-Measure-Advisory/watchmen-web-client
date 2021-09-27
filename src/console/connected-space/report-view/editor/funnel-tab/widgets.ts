import styled from 'styled-components';
import {PropName} from '../settings-widgets/widgets';

export const ReportFunnelContainer = styled.div.attrs({
	'data-widget': 'report-funnel',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	flex-grow      : 1;
	height         : calc(100% - var(--height) * 1.5 - 1px);
	overflow       : auto;
`;
export const ReportNoFunnel = styled.div.attrs({'data-widget': 'report-no-funnel'})`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : 0;
	left            : 0;
	width           : 100%;
	height          : 100%;
	font-family     : var(--title-font-family);
	font-size       : 2em;
	opacity         : 0.7;
`;
export const FunnelsContainer = styled.div.attrs({'data-widget': 'report-funnels'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
`;
export const FunnelItemContainer = styled.div.attrs({'data-widget': 'report-funnel-item'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 300px auto 300px 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	padding               : 0 calc(var(--margin) / 2);
	> div[data-widget=chart-settings-prop-value] {
		margin-right : 0;
	}
	div[data-widget=calendar] {
		flex-grow : 1;
		width     : 0;
		height    : 60%;
	}
`;
export const PairToLabel = styled(PropName)`
	position    : relative;
	padding     : 0 calc(var(--margin) / 2);
	font-family : var(--title-font-family);
	font-weight : var(--font-bold);
	font-size   : 1.4em;
	opacity     : 0.7;
`;
export const MultipleEnumValues = styled.div.attrs({'data-widget': 'report-funnel-enum-values'})`
	display     : flex;
	position    : relative;
	grid-column : 1 / span 4;
	margin-top  : calc(var(--height) * 0.4);
`;
export const EnumValue = styled.div.attrs({'data-widget': 'report-funnel-enum-value'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 2);
	margin-right  : calc(var(--margin) / 2);
	height        : calc(var(--height) * 1.8 * 0.6);
	line-height   : calc(var(--height) * 1.8 * 0.6 - 2px);
	border        : var(--border);
	border-radius : var(--border-radius);
	> button {
		height        : calc(var(--height) * 0.8);
		width         : calc(var(--height) * 0.8);
		border-radius : var(--border-radius);
		padding       : 0;
		margin-left   : calc(var(--margin) / 2);
		margin-top    : -1px;
		margin-right  : calc(var(--margin) / 8 * -3);
		&:hover {
			background-color : var(--danger-color);
			color            : var(--invert-color);
			box-shadow       : var(--danger-hover-shadow);
		}
	}
`;
