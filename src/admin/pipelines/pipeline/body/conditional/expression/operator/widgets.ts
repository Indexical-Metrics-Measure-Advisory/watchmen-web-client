import {DROPDOWN_Z_INDEX} from '@/widgets/basic/constants';
import styled from 'styled-components';

export const ExpressionOperatorContainer = styled.div.attrs({'data-widget': 'expression-operator'})<{ hasRight: boolean }>`
	display          : flex;
	position         : relative;
	align-self       : center;
	align-items      : center;
	justify-self     : start;
	height           : var(--param-height);
	background-color : var(--bg-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 2);
	margin-left      : var(--margin);
	cursor           : pointer;
	outline          : none;
	box-shadow       : var(--param-border);
	transition       : box-shadow 300ms ease-in-out;
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
		> div[data-widget="expression-operator-label"],
		> div[data-widget="expression-operator-icon"] {
			color : var(--warn-color);
		}
	}
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2 + 3px) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 2 - 1px);
		height                    : calc(var(--margin) / 4 + var(--param-height) + 3px);
		border-bottom-left-radius : ${({hasRight}) => hasRight ? (void 0) : 'var(--border-radius)'};;
		z-index                   : -1;
		box-shadow                : var(--param-left-border), var(--param-bottom-border);
	}
	&:not(:last-child):after {
		content          : '';
		display          : ${({hasRight}) => hasRight ? 'block' : 'none'};
		position         : absolute;
		top              : calc(var(--param-height) / 2 - 3px);
		left             : calc(var(--margin) / -2);
		width            : 1px;
		height           : calc(100% - var(--param-height) / 2);
		background-color : var(--border-color);
		z-index          : -1;
	}
`;
export const ExpressionOperatorLabel = styled.div.attrs({'data-widget': 'expression-operator-label'})`
	font-variant : petite-caps;
	transition   : color 300ms ease-in-out;
`;
export const ExpressionOperatorIcon = styled.div.attrs({'data-widget': 'expression-operator-icon'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
	transition   : color 300ms ease-in-out;
	> svg {
		font-size : 0.8em;
	}
`;
export const EXPRESSION_OPERATOR_DROPDOWN_HEIGHT = 200;
export const ExpressionOperatorDropdown = styled.div.attrs<{ visible: boolean, top?: number, bottom?: number, left: number }>(
	({visible, top, bottom, left}) => {
		return {
			'data-widget': 'expression-operator-dropdown',
			style: {
				opacity: visible ? 1 : 0,
				pointerEvents: visible ? 'auto' : 'none',
				top, bottom, left,
				transition: visible ? (void 0) : 'none'
			}
		};
	})<{ visible: boolean, top?: number, bottom?: number, left: number }>`
	display          : flex;
	position         : fixed;
	flex-wrap        : wrap;
	background-color : var(--bg-color);
	padding          : calc(var(--margin) / 4) calc(var(--margin) / 2) 0 calc(var(--margin) / 4);
	width            : 400px;
	max-height       : ${EXPRESSION_OPERATOR_DROPDOWN_HEIGHT}px;
	border-radius    : var(--border-radius);
	box-shadow       : var(--param-border);
	z-index          : ${DROPDOWN_Z_INDEX};
	overflow-y       : auto;
	transition       : opacity 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const ExpressionOperatorOption = styled.div.attrs<{ selected: boolean }>(({selected}) => {
	return {
		'data-widget': 'expression-operator-option',
		style: {
			backgroundColor: selected ? 'var(--primary-color)' : (void 0),
			color: selected ? 'var(--invert-color)' : (void 0)
		}
	};
})<{ selected: boolean }>`
	display       : flex;
	align-items   : center;
	font-variant  : petite-caps;
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	border-radius : calc(var(--param-height) / 2);
	box-shadow    : ${({selected}) => selected ? 'var(--param-primary-color)' : 'var(--param-border)'};
	transition    : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;