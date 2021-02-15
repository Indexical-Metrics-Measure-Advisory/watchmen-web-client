import styled from 'styled-components';
import { GRID_ROW_GAP } from '../../constants';

export const JointContainer = styled.div.attrs({ 'data-widget': 'top-joint' })`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-auto-rows        : minmax(var(--height), auto);
	grid-row-gap          : ${GRID_ROW_GAP};
`;
