import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const ValueTransformContainer = styled.div.attrs({'date-widget': 'inspection-value-transform'})`
	display               : grid;
	position              : relative;;
	grid-template-columns : auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const ValueTransformDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;