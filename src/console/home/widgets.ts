import styled from 'styled-components';
import { DwarfButton } from '../../basic-widgets/button';

export const HomeSection = styled.div.attrs({ 'data-widget': 'console-home-section' })`
	display        : flex;
	position       : relative;
	flex-direction : column;
`;
export const HomeSectionHeader = styled.div.attrs({ 'data-widget': 'console-home-section-header' })`
	display         : flex;
	justify-content : space-between;
	align-items     : center;
`;
export const HomeSectionTitle = styled.div.attrs({ 'data-widget': 'console-home-section-title' })`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : 3em;
	padding-right : var(--margin);
	font-family   : var(--title-font-family);
	font-size     : 1.6em;
	font-weight   : var(--font-demi-bold);
`;
export const HomeSectionHeaderOperators = styled.div.attrs({ 'data-widget': 'console-home-section-header-operators' })`
	display     : flex;
	align-items : center;
`;
export const HeaderButton = styled(DwarfButton).attrs({ 'data-widget': 'console-home-section-header-operators-button' })`
	&:not(:first-child) {
		border-top-left-radius    : 0;
		border-bottom-left-radius : 0;
		&:after {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 30%;
			left             : -0.5px;
			width            : 1px;
			height           : 40%;
			background-color : var(--bg-color);
		}
	}
	&:not(:last-child) {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
	}
`;
export const HomeSectionBody = styled.div.attrs({ 'data-widget': 'console-home-section-body' })`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(3, minmax(0, 1fr));
	grid-column-gap       : var(--margin);
	grid-gap              : calc(var(--margin) / 2);
	background-color      : var(--bg-color);
	overflow              : hidden;
	padding               : calc(var(--margin) / 2);
	border-radius         : calc(var(--margin) / 2);
	transition            : all 300ms ease-in-out;
`;

export const ConnectedSpaceCardContainer = styled.div.attrs({ 'data-widget': 'connected-space-card' })`
`;
