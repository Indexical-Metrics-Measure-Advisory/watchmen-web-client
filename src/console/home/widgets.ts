import {DwarfButton} from '@/widgets/basic/button';
import styled from 'styled-components';

export const HomeSection = styled.div.attrs({'data-widget': 'console-home-section'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	&:not(:last-child) {
		padding-bottom : var(--margin);
	}
`;
export const HomeSectionHeader = styled.div.attrs({'data-widget': 'console-home-section-header'})`
	display         : flex;
	justify-content : space-between;
	align-items     : center;
`;
export const HomeSectionTitle = styled.div.attrs({'data-widget': 'console-home-section-title'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : 3em;
	padding-right : var(--margin);
	font-family   : var(--title-font-family);
	font-size     : 1.6em;
	font-weight   : var(--font-demi-bold);
`;
export const HomeSectionHeaderOperators = styled.div.attrs({'data-widget': 'console-home-section-header-operators'})`
	display     : flex;
	align-items : center;
`;
export const HeaderButton = styled(DwarfButton).attrs({'data-widget': 'console-home-section-header-operators-button'})`
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
export const HomeSectionBody = styled.div.attrs<{ collapse: boolean, maxHeight?: number }>(
	({collapse, maxHeight}) => {
		return {
			'data-widget': 'console-home-section-body',
			style: {
				maxHeight: collapse ? 0 : (maxHeight || 2000),
				padding: collapse ? '0 calc(var(--margin) / 2)' : (void 0)
			}
		};
	})<{ collapse: boolean, maxHeight?: number }>`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(3, minmax(0, 1fr));
	grid-gap              : calc(var(--margin) / 2);
	margin                : calc(var(--margin) / -2);
	padding               : calc(var(--margin) / 2);
	border-radius         : calc(var(--margin) / 2);
	overflow              : hidden;
	transition            : all 300ms ease-in-out;
`;

export const ConnectedSpaceCardContainer = styled.div.attrs({'data-widget': 'connected-space-card'})`
	display               : grid;
	grid-template-columns : var(--height) 1fr;
	grid-row-gap          : calc(var(--margin) / 2);
	align-items           : center;
	padding               : calc(var(--margin) / 2) var(--margin);
	border-radius         : calc(var(--border-radius) * 2);
	box-shadow            : var(--shadow);
	cursor                : pointer;
	transition            : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
`;
export const ConnectedSpaceLastVisit = styled.div.attrs({'data-widget': 'connected-space-card-last-visit'})`
	font-variant : petite-caps;
	opacity      : 0.7;
`;
export const ConnectedSpaceName = styled.div.attrs({'data-widget': 'connected-space-card-name'})`
	grid-column : span 2;
	font-size   : 1.8em;
	font-weight : var(--font-demi-bold);
	font-family : var(--title-font-family);
`;
