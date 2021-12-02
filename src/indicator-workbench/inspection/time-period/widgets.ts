import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const TimePeriodContainer = styled.div.attrs({'date-widget': 'inspection-time-period'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const TimePeriodDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;

export const YearPickDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;
export const YearPickDropdownOption = styled.span`
	display     : flex;
	position    : relative;
	align-items : center;
	width       : 100%;
	> span:first-child {
		flex-grow : 1;
	}
	> svg {
		opacity : 0.7;
	}
`;