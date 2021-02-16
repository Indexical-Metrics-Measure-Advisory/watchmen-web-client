import styled from 'styled-components';
import { GRID_COLUMN_GAP, GRID_COLUMNS, GRID_ROW_GAP } from '../constants';

export const StageContainer = styled.div.attrs({ 'data-widget': 'stage' })`
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	margin                : calc(var(--margin) / 4) calc(var(--margin) / -2) 0 calc(var(--margin) / -2);
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2) 0 calc(var(--margin) / 2);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : calc(var(--margin) / -2);
		width            : calc(100% + var(--margin));
		height           : 1px;
		border-top       : var(--border);
		border-top-style : dashed;
		border-top-color : var(--primary-color);
		opacity          : 0.3;
	}
	//> div[data-widget="stage-header"] > div[data-widget="header-buttons"],
	//> div[data-widget="stage-body"] > div[data-widget="stage-footer"] > div[data-widget="footer-buttons"] {
	//	pointer-events : none;
	//	transform      : translateX(calc(100% + var(--margin) / 2));
	//	transition     : transform 300ms ease-in-out;
	//}
	//&:hover {
	//	> div[data-widget="stage-header"] > div[data-widget="header-buttons"],
	//	> div[data-widget="stage-body"] > div[data-widget="stage-footer"] > div[data-widget="footer-buttons"] {
	//		transform      : translateX(0);
	//		pointer-events : auto;
	//	}
	//}
`;
