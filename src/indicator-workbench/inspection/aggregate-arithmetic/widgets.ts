import styled from 'styled-components';
import {InspectionButton, InspectionDropdown} from '../widgets';

export const ValueTransformContainer = styled.div.attrs({'data-widget': 'inspection-value-transform'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 200px auto auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const ValueTransformDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;

export const ValueTransformButton = styled(InspectionButton)`
	border-radius : var(--border-radius);
`;