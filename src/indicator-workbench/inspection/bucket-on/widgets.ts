import styled from 'styled-components';
import {InspectionDropdown} from '../widgets';

export const BucketOnContainer = styled.div.attrs({'data-widget': 'inspection-bucket-on'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 200px auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;

export const BucketOnDropdown = styled(InspectionDropdown)`
	min-width : 250px;
`;