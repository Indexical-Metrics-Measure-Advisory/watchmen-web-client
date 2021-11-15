import styled, {keyframes} from 'styled-components';
import {Button} from '../../basic/button';

export const TupleEditContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'tuple-edit',
		style: {
			display: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : 30% calc(70% - var(--margin));
	grid-column-gap       : var(--margin);
	margin-bottom         : var(--margin);
	padding-bottom        : var(--margin);
	transition            : all 300ms ease-in-out;
	width                 : 100%;
`;

export const TupleImage = styled.div.attrs<{ background: string, position: string }>(({background, position}) => {
	return {
		'data-widget': 'tuple-background-image',
		style: {
			backgroundImage: `url(${background})`,
			backgroundPosition: position
		}
	};
})<{ background: string, position: string }>`
	background-repeat : no-repeat;
	background-size   : 80%;
	filter            : drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.7)) grayscale(0.9);
	transition        : all 300ms ease-in-out;
`;
export const TupleEditBody = styled.div.attrs({'data-widget': 'tuple-edit-body'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 150px 1fr;
	grid-column-gap       : var(--margin);
	grid-auto-rows        : minmax(var(--grid-tall-row-height), auto);
	grid-row-gap          : calc(var(--margin) / 4);
	align-items           : start;
	align-content         : start;
	min-height            : 300px;
	margin-bottom         : var(--margin);
`;
export const TupleEditTitle = styled.div`
	display       : flex;
	align-items   : center;
	grid-column   : span 2;
	font-variant  : petite-caps;
	font-weight   : var(--font-demi-bold);
	font-size     : 1.8em;
	border-bottom : var(--border);
	height        : calc(var(--margin) * 1.5);
	margin-bottom : calc(var(--margin) / 2);
`;

export const TupleEditFooter = styled.div.attrs({'data-widget': 'tuple-edit-footer'})`
	grid-column     : 2;
	display         : flex;
	justify-content : flex-end;
	transition      : all 300ms ease-in-out;
`;
const TupleSaved = keyframes`
	0% {
		transform : scale(1);
	}
	5% {
		transform : scale(1.5);
	}
	20%, 80% {
		transform : scale(1);
		opacity   : 1;
	}
	100% {
		transform : scale(1);
		opacity   : 0;
	}
`;
export const TupleEditInformMessage = styled.div`
	flex-grow    : 1;
	display      : flex;
	align-items  : center;
	font-size    : 0.8em;
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
	opacity      : 0.5;
	transition   : all 300ms ease-in-out;
	&[data-change-kind=changed] {
		color : var(--success-color);
	}
	&[data-change-kind=saving] {
		color : var(--danger-color);
	}
	&[data-change-kind=saved] {
		color : var(--danger-color);
		> span {
			animation        : ${TupleSaved} 6000ms ease-in-out forwards;
			transform-origin : left;
		}
	}
	&:empty {
		opacity : 0;
	}
`;

export const TupleEditFooterButton = styled(Button).attrs({'data-widget': 'tuple-edit-footer-button'})`
	font-size : 1.4em;
	height    : 32px;
	min-width : 120px;
	&:not(:first-child) {
		margin-left : calc(var(--margin) / 2);
	}
`;