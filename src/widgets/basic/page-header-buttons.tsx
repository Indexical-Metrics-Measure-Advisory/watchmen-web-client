import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Button} from './button';
import {TOOLTIP_Z_INDEX} from './constants';
import {ButtonInk} from './types';

const PageHeaderButtonsContainer = styled.div.attrs({'data-widget': 'page-header-buttons'})`
	display     : flex;
	align-self  : flex-end;
	align-items : flex-end;
	margin      : auto var(--margin) calc((var(--page-header-height) - 3.9em) / 2) var(--margin);
`;

export const PageHeaderButtons = (props: { children: ReactNode }) => {
	const {children} = props;

	return <PageHeaderButtonsContainer>
		{children}
	</PageHeaderButtonsContainer>;
};

const PageHeaderBtn = styled(Button).attrs({'data-widget': 'page-header-button'})`
	width        : var(--height);
	padding      : 0;
	margin-right : calc(var(--margin) / 4);
	&:hover {
		width         : calc(var(--height) * 1.5);
		height        : calc(var(--height) * 1.5);
		font-size     : calc(var(--font-size) * 1.5);
		border-radius : calc(var(--border-radius) * 3);
		color         : var(--primary-color);
		box-shadow    : var(--primary-hover-shadow);
		> div[data-widget="page-header-button-tooltip"],
		> svg[data-widget="page-header-button-tooltip-caret"] {
			opacity : 1;
		}
	}
	&[data-ink=primary]:hover {
		color : var(--invert-color);
	}
	&[data-ink=danger]:hover {
		color      : var(--invert-color);
		box-shadow : var(--danger-hover-shadow);
	}
`;

const PageHeaderButtonTooltip = styled.div.attrs({'data-widget': 'page-header-button-tooltip'})`
	display          : flex;
	position         : absolute;
	min-height       : var(--tooltip-min-height);
	align-items      : center;
	font-size        : var(--font-size);
	font-weight      : var(--font-bold);
	top              : calc(100% + 4px);
	border-radius    : var(--border-radius);
	padding          : calc(var(--margin) / 6) calc(var(--margin) / 2);
	background-color : var(--tooltip-bg-color);
	color            : var(--invert-color);
	pointer-events   : none;
	user-select      : none;
	opacity          : 0;
	white-space      : nowrap;
	overflow         : hidden;
	text-overflow    : ellipsis;
	transition       : opacity 300ms ease-in-out;
	z-index          : ${TOOLTIP_Z_INDEX};
`;
const PageHeaderButtonTooltipCaret = styled(FontAwesomeIcon).attrs({'data-widget': 'page-header-button-tooltip-caret'})`
	display  : block;
	position : absolute;
	color    : var(--tooltip-bg-color);
	top      : calc(100% - 6px);
	opacity  : 0;
`;
export const PageHeaderButton = (props: {
	tooltip: string,
	ink?: ButtonInk;
	onClick: () => void,
	children?: ((props: any) => ReactNode) | ReactNode
}) => {
	const {tooltip, ink, onClick, children, ...rest} = props;

	return <PageHeaderBtn {...rest} ink={ink} onClick={onClick}>
		<PageHeaderButtonTooltip>
			{tooltip}
		</PageHeaderButtonTooltip>
		<PageHeaderButtonTooltipCaret icon={faCaretUp}/>
		{children}
	</PageHeaderBtn>;
};

export const PageHeaderButtonSeparator = styled.div.attrs({'data-widget': 'page-header-button-separator'})`
	display          : block;
	position         : relative;
	width            : 1px;
	height           : calc(var(--margin) / 4);
	margin           : calc(var(--height) / 4) calc(var(--margin) / 4);
	background-color : var(--border-color);
`;