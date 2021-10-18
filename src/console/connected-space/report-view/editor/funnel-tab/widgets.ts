import styled from 'styled-components';
import {PropName, PropValue} from '../settings-widgets/widgets';

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
	display     : flex;
	position    : relative;
	align-items : center;
	padding     : 0 calc(var(--margin) / 2);
`;
export const FunnelValues = styled(PropValue)`
	display               : grid;
	grid-template-columns : 300px auto 300px 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	margin-right          : 0;
	height                : unset;
	> input,
	> div[data-widget=dropdown],
	> div[data-widget=calendar],
	> div[data-widget=funnel-enum-values] {
		flex-grow  : 1;
		min-height : calc((var(--height) * 1.8 + 1px) * 0.6);
	}
	> div[data-widget=funnel-enum-values] {
		grid-column : 1 / span 3;
		margin-top  : calc(var(--height) * 0.4);
		> div[data-widget=funnel-enum-value] {
			min-height : calc((var(--height) * 1.8 + 1px) * 0.6);
		}
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
