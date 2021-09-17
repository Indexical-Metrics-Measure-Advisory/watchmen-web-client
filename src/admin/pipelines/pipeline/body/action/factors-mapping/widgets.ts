import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';
import {GRID_ROW_GAP} from '../../constants';

export const FactorsMappingContainer = styled.div.attrs({'data-widget': 'factors-mapping'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
`;
export const AddFactorButton = styled(Button)`
	height        : var(--param-height);
	align-self    : center;
	border-radius : calc(var(--param-height) / 2);
	padding       : 0 calc(var(--margin) / 2);
	justify-self  : start;
	box-shadow    : var(--param-border);
	opacity       : 0.7;
	&:hover {
		color      : var(--warn-color);
		opacity    : 1;
		box-shadow : var(--primary-hover-shadow);
	}
	> svg {
		font-size : 0.8em;
	}
`;