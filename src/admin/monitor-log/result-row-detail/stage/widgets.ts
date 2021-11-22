import styled from 'styled-components';
import {SectionTitle} from '../widgets';

export const DetailProcessStageContainer = styled.div.attrs({'data-widget': 'monitor-log-detail-process-stage'})`
	display        : flex;
	flex-direction : column;
	min-height     : var(--height);
`;
export const StageSectionTitle = styled(SectionTitle)`
	grid-template-columns : 1fr auto;
`;