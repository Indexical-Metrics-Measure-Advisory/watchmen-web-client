import styled from 'styled-components';
import { PageHeaderHolderContainer } from '../../../../basic-widgets/page-header';

export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns : auto auto 1fr;
	+ div[data-widget="pipeline-body"] {
		max-height: calc(100vh - 57px);
	}
`;
