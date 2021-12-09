import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const TimeMeasureOnContainer = styled.div.attrs({'data-widget': 'inspection-time-measure-on'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 200px auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const TimePeriodDropdown = styled(InspectionDropdown)`
	min-width : 250px;
	> span[data-widget=dropdown-label][data-please=true] {
		opacity : 1;
	}
`;

export const TimeMeasureOnDropdown = styled(InspectionDropdown)`
	min-width : 250px;
	> span[data-widget=dropdown-label][data-please=true] {
		opacity : 1;
	}
`;
