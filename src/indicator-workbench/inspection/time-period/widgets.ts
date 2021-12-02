import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const TimePeriodContainer = styled.div.attrs({'date-widget': 'inspection-time-period'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const TimePeriodDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;