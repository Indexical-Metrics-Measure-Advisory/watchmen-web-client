import styled from 'styled-components';
import {PageHeaderHolderContainer} from '../../../basic-widgets/page-header';

export const DashboardPageHeaderHolder = styled(PageHeaderHolderContainer)`
	@media print {
		display : none;
	}
`;
