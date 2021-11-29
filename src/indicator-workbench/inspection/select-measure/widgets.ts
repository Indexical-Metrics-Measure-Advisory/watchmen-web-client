import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const SelectMeasureContainer = styled.div.attrs({'date-widget': 'inspection-select-measure'})`
	display               : grid;
	position              : relative;;
	grid-template-columns : auto auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const InspectOnDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;