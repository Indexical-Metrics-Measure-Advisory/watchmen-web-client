import styled from 'styled-components';
import {GRID_ROW_GAP} from '../../constants';

export const SingleParameterContainer = styled.div.attrs({'data-widget': 'single-parameter'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	grid-auto-rows        : minmax(var(--height), auto);
	grid-row-gap          : ${GRID_ROW_GAP};
	&:last-child:before {
		border-bottom-left-radius : var(--border-radius);
	}
`;