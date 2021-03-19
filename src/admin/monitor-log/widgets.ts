import styled from 'styled-components';
import { PageHeaderContainer, PageTitle } from '../../basic-widgets/page-header';

export const Header = styled(PageHeaderContainer)`
	border-bottom : var(--border);
	padding       : 0 calc(var(--margin) / 2);
`;
export const HeaderTitle = styled(PageTitle).attrs({ 'data-widgets': 'monitor-logs-header-title' })`
`;

export const Body= styled.div.attrs({ 'data-widget': 'monitor-logs-body' })`
`;
