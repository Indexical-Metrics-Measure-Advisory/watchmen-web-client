import {GRID_ROW_HEIGHT} from '@/widgets/basic/constants';
import styled from 'styled-components';

export const SegmentValueCellContainer = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr auto;
	grid-column           : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	align-items           : center;
	align-content         : start;
	min-height            : ${GRID_ROW_HEIGHT * 2}px;
	padding               : calc((${GRID_ROW_HEIGHT}px - var(--height)) / 2) 0;
	> input {
		border-right               : 0;
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
	}
	> button {
		border-top-left-radius    : 0;
		border-bottom-left-radius : 0;
	}
`;
export const SegmentValues = styled.div`
	display       : flex;
	position      : relative;
	flex-wrap     : wrap;
	grid-column   : 1 / span 2;
	margin-left   : calc(var(--margin) / -4);
	margin-bottom : calc(var(--margin) / -4);
`;
export const NoSegmentValueDefined = styled.span`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--height);
	padding       : 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	border-radius : calc(var(--height) / 2);
	font-variant  : petite-caps;
	overflow      : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--danger-color);
		opacity          : 0.2;
		z-index          : 0;
	}
`;
export const SegmentValue = styled.span`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--height);
	padding       : 0 0 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	//color            : var(--invert-color);
	//background-color : var(--primary-color);
	border-radius : calc(var(--height) / 2);
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow      : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.2;
		z-index          : 0;
	}
	&:hover > span:last-child {
		left : calc(var(--height) * -0.1);
	}
	> span:first-child {
		padding-right : calc(var(--margin) / 4);
		z-index       : 1;
	}
	> span:last-child {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		height           : calc(var(--height) * 0.8);
		width            : calc(var(--height) * 0.8);
		left             : var(--height);
		color            : var(--invert-color);
		background-color : var(--danger-color);
		opacity          : 0.7;
		cursor           : pointer;
		border-radius    : 100%;
		transition       : background-color 300ms ease-in-out, left 300ms ease-in-out;
		z-index          : 1;
	}
`;
