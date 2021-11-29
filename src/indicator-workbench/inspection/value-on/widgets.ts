import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const ValueOnContainer = styled.div.attrs({'date-widget': 'inspection-value-on'})`
	display               : grid;
	position              : relative;;
	grid-template-columns : auto auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const ValueOnDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;