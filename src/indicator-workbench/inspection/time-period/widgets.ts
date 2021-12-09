import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const TimePeriodContainer = styled.div.attrs({'data-widget': 'inspection-time-period'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 200px auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const TimePeriodDropdown = styled(InspectionDropdown)`
	min-width : 250px;
	> span[data-widget=dropdown-label][data-please=true] {
		opacity : 1;
	}
`;

export const TimePeriodFilterDropdown = styled(InspectionDropdown)`
	min-width : 250px;
	max-width : 250px;
	> span[data-widget=dropdown-label][data-please=true] {
		opacity : 1;
	}
`;
export const TimePeriodFilterDropdownOption = styled.span`
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
export const TimePeriodFilterDisplayLabel = styled.span`
	display       : flex;
	position      : relative;
	flex-wrap     : nowrap;
	overflow      : hidden;
	white-space   : nowrap;
	text-overflow : ellipsis;
`;
export const TimePeriodFilterDisplayLabelSegment = styled.span`
	display     : flex;
	position    : relative;
	align-items : center;
	&:not(:last-child):after {
		content      : ',';
		margin-right : 2px;
	}
`;