import {PageHeaderHolderContainer} from '@/widgets/basic/page-header';
import styled from 'styled-components';

export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns : auto auto 1fr;
	padding               : 0 calc(var(--margin) / 2);
	+ div[data-widget="simulator-body"] {
		max-height : calc(100vh - var(--page-header-height));
	}
`;
