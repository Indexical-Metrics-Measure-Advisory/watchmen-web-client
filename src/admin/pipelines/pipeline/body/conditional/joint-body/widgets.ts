import styled from 'styled-components';
import {GRID_ROW_GAP} from '../../constants';

export const JointBodyContainer = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		'data-widget': 'joint-body',
		style: {
			display: expanded ? (void 0) : 'none'
		}
	};
})<{ expanded: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-auto-rows        : minmax(var(--height), auto);
	grid-row-gap          : ${GRID_ROW_GAP};
`;