import React from 'react';
import styled from 'styled-components';
import {Logo} from '../logo';

// height might changed by language switching, fix it.
const SideMenuLogoContainer = styled.div.attrs({'data-widget': 'side-menu-logo'})`
	display               : grid;
	position              : relative;
	grid-template-columns : var(--side-menu-icon-size) 1fr;
	grid-column-gap       : var(--side-menu-margin);
	align-items           : center;
	padding               : calc(var(--margin) / 2) var(--side-menu-margin);
	height                : 66px;
`;
const SideMenuLogoImage = styled(Logo).attrs({'data-widget': 'side-menu-logo-image'})`
	width  : var(--side-menu-icon-size);
	height : var(--side-menu-icon-size);
`;
const SideMenuLogoTitle = styled.div.attrs({'data-widget': 'side-menu-logo-title'})`
	font-family  : var(--title-font-family);
	font-weight  : var(--font-bold);
	font-style   : italic;
	font-size    : 2.1em;
	font-variant : petite-caps;
	overflow-x   : hidden;
	white-space  : nowrap;
`;

export const SideMenuLogo = (props: { title?: string; }) => {
	const {title = 'Watchmen'} = props;
	return <SideMenuLogoContainer>
		<SideMenuLogoImage/>
		<SideMenuLogoTitle>{title}</SideMenuLogoTitle>
	</SideMenuLogoContainer>;
};