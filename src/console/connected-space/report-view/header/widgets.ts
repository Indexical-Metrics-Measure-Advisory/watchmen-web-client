import styled from 'styled-components';
import {PageHeaderHolderContainer} from '../../../../basic-widgets/page-header';

export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns : auto auto 1fr;
	@media print {
		display: none;
	}
`;
export const SubjectNameLabel = styled.div.attrs({'data-widget': 'page-header-subject-label'})`
	padding-left  : calc(var(--input-indent) + var(--margin) / 2);
	align-self    : end;
	margin-bottom : 10px;
	font-variant  : petite-caps;
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	max-width     : 500px;
`;
