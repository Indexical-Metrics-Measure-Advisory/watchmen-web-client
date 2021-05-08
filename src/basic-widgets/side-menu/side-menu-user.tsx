import React from 'react';
import styled from 'styled-components';
import {Avatar} from '../avatar';

const SideMenuUserContainer = styled.div.attrs({'data-widget': 'side-menu-user'})`
	display               : grid;
	position              : relative;
	grid-template-columns : var(--side-menu-icon-size) 1fr;
	grid-column-gap       : var(--side-menu-margin);
	align-items           : center;
	padding               : calc(var(--margin) / 2) var(--side-menu-margin);
`;
const SideMenuUserLabel = styled.div.attrs({'data-widget': 'side-menu-user-label'})`
	position      : relative;
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow      : hidden;
	font-variant  : petite-caps;
	font-size     : 1.2em;
`;

export const SideMenuUser = (props: { name: string }) => {
	const {name} = props;

	return <SideMenuUserContainer>
		<Avatar name={name}/>
		<SideMenuUserLabel>{name}</SideMenuUserLabel>
	</SideMenuUserContainer>;
};