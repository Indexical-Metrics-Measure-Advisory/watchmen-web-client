import {PageHeaderHolderContainer} from '@/widgets/basic/page-header';
import styled from 'styled-components';

export const BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR = 'calc(100vh - 57px)';
export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns : auto auto 1fr;
	padding               : 0 calc(var(--margin) / 2);
	+ div[data-widget="simulator-body"] {
		max-height : ${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR};
	}
`;
