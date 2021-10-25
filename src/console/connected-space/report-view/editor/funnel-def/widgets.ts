import {CheckBox} from '@/widgets/basic/checkbox';
import styled from 'styled-components';
import {PropName} from '../settings-widgets/widgets';

export const NoFunnel = styled(PropName).attrs({'data-widget': 'no-funnel'})`
	grid-column : 1 / span 2;
`;
export const FunnelDescription = styled(PropName).attrs({'data-widget': 'funnel-description'})`
	grid-column : 1 / span 2;
	line-height : var(--line-height);
	height      : auto;
	padding     : calc(var(--margin) / 4) calc(var(--margin) / 2);
	white-space : normal;
	overflow    : unset;
	&:last-child {
		margin-bottom : var(--margin);
	}
`;
export const FunnelTable = styled.div.attrs({'data-widget': 'funnel-table'})`
	display               : grid;
	position              : relative;
	grid-column           : 1 / span 2;
	grid-template-columns : 32px 1fr auto auto;
	grid-auto-rows        : calc(var(--height) * 1.4);
	align-items           : center;
	margin-left           : calc(var(--margin) / 4);
	margin-right          : calc(var(--margin) / 2);
`;
export const FunnelTableHeaderCell = styled.div.attrs({'data-widget': 'funnel-header-cell'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	height       : calc(var(--height) * 1.4);
	padding      : 0 calc(var(--margin) / 8);
	font-weight  : var(--font-demi-bold);
	font-variant : petite-caps;
	opacity      : 0.7;
	&:after {
		content       : '';
		display       : block;
		position      : absolute;
		left          : 0;
		bottom        : 0;
		width         : 100%;
		height        : 1px;
		border-bottom : var(--border);
		opacity       : 0.7;
	}`;
export const FunnelIndexLabel = styled.div.attrs({'data-widget': 'report-funnel-index'})`
	display                   : flex;
	align-items               : center;
	justify-content           : center;
	font-weight               : var(--font-demi-bold);
	height                    : 100%;
	padding                   : 0 calc(var(--margin) / 8);
	border-top-left-radius    : var(--border-radius);
	border-bottom-left-radius : var(--border-radius);
	white-space               : nowrap;
	overflow                  : hidden;
	text-overflow             : ellipsis;
	transition                : background-color 300ms ease-in-out;
	&:nth-child(8n + 1) {
		background-color : var(--grid-rib-bg-color);
	}
	&[data-hover=true] {
		background-color : var(--hover-color);
	}
`;
export const FunnelColumnLabel = styled.div.attrs({'data-widget': 'report-funnel-column'})`
	display       : flex;
	align-items   : center;
	width         : 100%;
	height        : 100%;
	padding       : 0 calc(var(--margin) / 8);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	transition    : background-color 300ms ease-in-out;
	&:nth-child(8n + 2) {
		background-color : var(--grid-rib-bg-color);
	}
	&[data-hover=true] {
		background-color : var(--hover-color);
	}
`;
export const FunnelCheckBoxContainer = styled.div.attrs({'data-widget': 'report-funnel-checkbox'})`
	display         : flex;
	align-items     : center;
	justify-content : center;
	height          : 100%;
	transition      : background-color 300ms ease-in-out;
	&:nth-child(8n + 3), &:nth-child(8n + 4) {
		background-color : var(--grid-rib-bg-color);
	}
	&:nth-child(4n) {
		border-top-right-radius    : var(--border-radius);
		border-bottom-right-radius : var(--border-radius);
	}
	&[data-hover=true] {
		background-color : var(--hover-color);
		> div[data-widget=checkbox] {
			border-color : var(--font-color);
		}
	}
`;
export const FunnelCheckBox = styled(CheckBox)`
	transition : border-color 300ms ease-in-out;
`;