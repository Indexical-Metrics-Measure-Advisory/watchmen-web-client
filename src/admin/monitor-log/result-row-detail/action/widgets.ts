import styled from 'styled-components';
import { SectionTitle } from '../widgets';

export const DetailProcessActionContainer = styled.div.attrs({ 'data-widget': 'monitor-log-detail-process-action' })`
	display        : flex;
	flex-direction : column;
	min-height     : var(--height);
`;
export const ActionSectionTitle = styled(SectionTitle)`
	grid-template-columns : 50% 1fr auto;
`;
export const DetailProcessActionBody = styled.div.attrs({'data-widget': 'monitor-log-detail-process-action-body'})`
`