import styled from 'styled-components';
import {PageHeaderHolderContainer} from '../../../../basic-widgets/page-header';
import {DialogBody} from '../../../../dialog/widgets';

export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns: auto auto 1fr;
`;

export const TopicPickerDialogBody = styled(DialogBody)`
	flex-direction: column;
	margin-bottom: var(--margin);
	max-height: 50vh;
`;

export const TopicPickerTableHeader = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: 40px 60px 1fr;
`;
export const TopicPickerTableHeaderCell = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	font-weight: var(--font-bold);
	font-variant: petite-caps;
	padding: 0 calc(var(--margin) / 4);
	> input {
		border-top: 0;
		border-left: 0;
		border-right: 0;
		border-radius: 0;
		height: calc(var(--height) * 0.8);
		width: 100%;
		padding: 0;
		margin-bottom: -1px;
		margin-left: calc(var(--margin) / 2);
	}
`;
export const TopicPickerTableBody = styled.div.attrs({'data-v-scroll': ''})`
	display: block;
	position: relative;
	overflow-y: auto;
	max-height: calc(100% - var(--margin) - var(--line-height));
`;
export const TopicPickerTableBodyRow = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: 40px 60px 1fr;
	&:nth-child(2n) {
		background-color: var(--grid-rib-bg-color);
	}
	&:hover {
		background-color: var(--hover-color);
	}
`;
export const TopicPickerTableBodyCell = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
	padding: 0 calc(var(--margin) / 4);
`;
