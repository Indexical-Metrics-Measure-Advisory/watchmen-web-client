import {PageHeaderHolderContainer} from '@/widgets/basic/page-header';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import styled from 'styled-components';

export const BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR = 'calc(100vh - 57px)';
export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns : auto auto 1fr;
	+ div[data-widget="pipeline-body"] {
		max-height : ${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR};
	}
`;

export const PipelineSaveButton = styled(PageHeaderButton).attrs<{ changed: boolean }>(({changed}) => {
	return {
		style: {
			paddingLeft: changed ? 'calc(var(--margin) / 2)' : (void 0),
			color: changed ? 'var(--danger-color)' : (void 0)
		}
	};
})<{ changed: boolean }>`
	width     : auto;
	min-width : var(--height);
	&:hover {
		width     : auto;
		min-width : calc(var(--height) * 1.5);
	}
`;
export const PipelineChangeLabel = styled.span`
	padding     : 0 calc(var(--margin) / 2);
	font-weight : var(--font-bold);
`;