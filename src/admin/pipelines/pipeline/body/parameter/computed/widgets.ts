import styled from 'styled-components';
import {GRID_ROW_GAP} from '../../constants';

export const ComputedEditContainer = styled.div.attrs({'data-widget': 'parameter-computed-edit'})`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	grid-auto-rows        : minmax(var(--height), auto);
	grid-row-gap          : ${GRID_ROW_GAP};
	align-self            : stretch;
	align-items           : center;
	min-height            : var(--param-height);
`;
export const SubParametersContainer = styled.div.attrs({'data-widget': 'parameter-computed-body'})`
	display                    : grid;
	position                   : relative;
	grid-template-columns      : 1fr;
	grid-row-gap               : calc(var(--margin) / 4);
	align-self                 : stretch;
	justify-self               : stretch;
	min-height                 : var(--param-height);
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	padding-left               : 1px;
`;
