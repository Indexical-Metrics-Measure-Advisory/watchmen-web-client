import {PageHeaderHolderContainer} from '@/widgets/basic/page-header';
import styled from 'styled-components';

export const DashboardPageHeaderHolder = styled(PageHeaderHolderContainer)`
	@media print {
		display : none;
	}
`;
