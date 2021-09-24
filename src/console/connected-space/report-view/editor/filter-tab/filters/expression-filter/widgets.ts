import {DROPDOWN_Z_INDEX} from '@/widgets/basic/constants';
import styled from 'styled-components';
import {ParameterFromEditor} from '../../../../../widgets/parameter/param-from';

export const ExpressionFilterContainer = styled.div.attrs({'data-widget': 'filter-expression'})`
	display               : grid;
	grid-template-columns : auto auto 1fr;
	grid-row-gap          : calc(var(--margin) / 4);
	position              : relative;
	grid-column           : span 5;
	margin-left           : var(--margin);
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2 + 3px) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 4);
		height                    : calc(var(--margin) / 4 + var(--param-height) + 3px);
		z-index                   : -1;
		border-bottom-left-radius : 2px;
		box-shadow                : var(--param-left-border), var(--param-bottom-border);
	}
	&:not(:last-child):after {
		content    : '';
		display    : block;
		position   : absolute;
		top        : calc(var(--param-height) / 2 - 3px);
		right      : 100%;
		width      : calc(var(--margin) / 4);
		height     : calc(100% - var(--param-height) / 2 - 3px);
		z-index    : -1;
		box-shadow : var(--param-left-border);
	}
`;
export const ExpressionLeadLabel = styled.div.attrs({'data-widget': 'expression-lead-label'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : flex-start;
	justify-self     : start;
	height           : var(--param-height);
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	background-color : var(--param-bg-color);
	border-radius    : calc(var(--param-height) / 2);
	padding          : 0 calc(var(--margin) / 2);
	cursor           : default;
	outline          : none;
	box-shadow       : var(--param-border);
`;
export const ExpressionSide = styled.div.attrs<{ shorten: boolean, visible: boolean }>(({shorten, visible}) => {
	return {
		'data-widget': 'expression',
		style: {
			display: visible ? (void 0) : 'none',
			gridTemplateColumns: shorten ? 'auto auto 1fr' : (void 0)
		}
	};
})<{ shorten: boolean, visible: boolean }>`
	display               : grid;
	grid-column           : span 3;
	position              : relative;
	grid-template-columns : auto 1fr auto;
	grid-row-gap          : calc(var(--margin) / 4);
	align-self            : stretch;
	justify-self          : stretch;
	margin-left           : var(--margin);
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2 + 3px) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 4);
		height                    : calc(var(--margin) / 4 + var(--param-height) + 3px);
		z-index                   : -1;
		border-bottom-left-radius : 2px;
		box-shadow                : var(--param-left-border), var(--param-bottom-border);
	}
	&:not(:last-child):after {
		content    : '';
		display    : block;
		position   : absolute;
		top        : calc(var(--param-height) / 2 - 3px);
		right      : 100%;
		width      : calc(var(--margin) / 4);
		height     : calc(100% - var(--param-height) / 2 - 3px);
		z-index    : -1;
		box-shadow : var(--param-left-border);
	}
	> div[data-widget="parameter-from-edit"] {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
	}
`;

export const ExpressionOperatorContainer = styled.div.attrs({'data-widget': 'expression-operator'})<{ hasRight: boolean }>`
	display          : flex;
	grid-column      : span 3;
	position         : relative;
	align-items      : center;
	align-self       : start;
	justify-self     : start;
	height           : var(--param-height);
	color            : var(--primary-color);
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
	}
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2 + 3px) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 4);
		height                    : calc(var(--margin) / 4 + var(--param-height) + 3px);
		z-index                   : -1;
		border-bottom-left-radius : 2px;
		box-shadow                : var(--param-left-border), var(--param-bottom-border);
	}
	&:not(:last-child):after {
		content    : '';
		display    : ${({hasRight}) => hasRight ? 'block' : 'none'};
		position   : absolute;
		top        : calc(var(--param-height) / 2 - 3px);
		right      : 100%;
		width      : calc(var(--margin) / 4);
		height     : calc(100% - var(--param-height) / 2 - 3px);
		z-index    : -1;
		box-shadow : var(--param-left-border);
	}
`;
export const ExpressionOperatorLabel = styled.div.attrs({'data-widget': 'expression-operator-label'})`
	font-variant : petite-caps;
`;
export const ExpressionOperatorIcon = styled.div.attrs({'data-widget': 'expression-operator-icon'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	align-items  : center;
	padding-left : calc(var(--margin) / 4);
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
export const ParameterFromEditorForExpression = styled(ParameterFromEditor).attrs<{ shorten: boolean }>(({shorten}) => {
	return {
		style: {
			borderTopRightRadius: shorten ? 'calc(var(--param-height) / 2)' : (void 0),
			borderBottomRightRadius: shorten ? 'calc(var(--param-height) / 2)' : (void 0)
		}
	};
})<{ shorten: boolean }>`
`;