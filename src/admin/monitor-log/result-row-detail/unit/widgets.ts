import styled from 'styled-components';
import {SectionTitle} from '../widgets';

export const DetailProcessUnitContainer = styled.div.attrs({'data-widget': 'monitor-log-detail-process-unit'})`
	display        : flex;
	flex-direction : column;
	min-height     : var(--height);
`;
export const UnitSectionTitle = styled(SectionTitle)`
	grid-template-columns : 1fr auto;
`;