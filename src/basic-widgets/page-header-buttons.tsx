import React from 'react';
import styled from 'styled-components';
import { Button } from './button';

const PageHeaderButtonsContainer = styled.div.attrs({ 'data-widget': 'page-header-buttons' })`
	display     : flex;
	align-self  : flex-end;
	align-items : flex-end;
	margin      : auto var(--margin) calc((57px - 3.9em) / 2) var(--margin);
`;

export const PageHeaderButton = styled(Button).attrs({ 'data-widget': 'page-header-button' })`
	width        : var(--height);
	padding      : 0;
	margin-right : calc(var(--margin) / 4);
	&:before {
		content            : '';
		display            : block;
		position           : absolute;
		width              : 12px;
		height             : 12px;
		top                : calc(100% - 8px);
		border-color       : var(--tooltip-bg-color);
		border-style       : solid;
		border-width       : 6px;
		border-top-color   : transparent;
		border-left-color  : transparent;
		border-right-color : transparent;
		transform          : scaleX(0);
		transform-origin   : bottom;
		transition         : all 300ms ease-in-out;
		z-index            : 1;
	}
	&:after {
		content          : attr(data-title);
		display          : flex;
		position         : absolute;
		align-items      : center;
		height           : 0;
		top              : 100%;
		font-size        : var(--font-size);
		font-weight      : var(--font-bold);
		color            : var(--invert-color);
		background-color : var(--tooltip-bg-color);
		border-radius    : var(--border-radius);
		padding          : calc(var(--margin) / 6) calc(var(--margin) / 2);
		transform        : scaleX(0);
		transform-origin : top;
		overflow         : hidden;
		transition       : all 300ms ease-in-out;
		z-index          : 1;
		white-space      : nowrap;
		text-overflow    : ellipsis;
	}
	&:hover {
		width         : calc(var(--height) * 1.5);
		height        : calc(var(--height) * 1.5);
		font-size     : calc(var(--font-size) * 1.5);
		border-radius : calc(var(--border-radius) * 3);
		color         : var(--primary-color);
		box-shadow    : var(--primary-hover-shadow);
		&:before {
			transform : scaleX(1);
		}
		&:after {
			top       : calc(100% + 4px);
			height    : calc(var(--height) * 0.8);
			transform : scaleX(1);
		}
	}
`;

export const PageHeaderButtons = (props: { children: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	return <PageHeaderButtonsContainer>
		{children}
	</PageHeaderButtonsContainer>;
};