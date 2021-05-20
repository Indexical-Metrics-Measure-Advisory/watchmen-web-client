import styled from 'styled-components';

export const DialogHeader = styled.div`
	display: flex;
	position: relative;
	padding: 0 var(--margin);
	min-height: calc(var(--header-height) * 1.5);
	margin: calc(var(--margin) * -1) calc(var(--margin) * -1) 0;
	align-items: center;
`;
export const DialogTitle = styled.div`
	font-family: var(--title-font-family);
	font-size: 2.5em;
`;

export const SectionTitle = styled.div.attrs({'data-widget': 'data-table-section-title'})`
	display: flex;
	position: relative;
	align-items: center;
	height: 2.2em;
	font-size: 1.5em;
	font-family: var(--title-font-family);
	background-color: var(--primary-color);
	color: var(--invert-color);
	padding-left: 16px;
	border-radius: calc(var(--border-radius) * 2) calc(var(--border-radius) * 2) 0 0;
`;
export const DataTable = styled.div.attrs({
	'data-widget': 'data-table',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display: flex;
	flex-direction: column;
	max-height: calc(var(--tall-height) * 10);
	margin-bottom: calc(var(--margin) / 2);
	overflow: auto;
	//border-radius: var(--border-radius);
	border-bottom: var(--border);
	border-bottom-color: var(--primary-color);
`;
export const DataTableHeader = styled.div.attrs<{ firstWidth?: number, columnCount: number }>(
	({firstWidth = 40, columnCount}) => {
		return {
			'data-widget': 'data-table-header',
			style: {
				gridTemplateColumns: `${firstWidth}px ${new Array(columnCount).fill('140px').join(' ')}`,
				minWidth: `${firstWidth + columnCount * 140}px`
			}
		};
	})<{ firstWidth?: number, columnCount: number }>`
	display: grid;
	position: sticky;
	top: 0;
	border-bottom: var(--border);
	z-index: 1;
`;
export const DataTableHeaderCell = styled.div.attrs({'data-widget': 'data-table-header-cell'})`
	display: flex;
	align-items: center;
	padding: 0 calc(var(--margin) / 8);
	margin-bottom: -1px;
	height: var(--tall-height);
	font-weight: var(--font-bold);
	font-size: 1.2em;
	border-bottom: var(--border);
	background-color: var(--bg-color);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
export const DataTableBodyRow = styled.div.attrs<{ firstWidth?: number, columnCount: number }>(
	({firstWidth = 40, columnCount}) => {
		return {
			'data-widget': 'data-table-body-row',
			style: {
				gridTemplateColumns: `${firstWidth}px ${new Array(columnCount).fill('140px').join(' ')}`,
				minWidth: `${firstWidth + columnCount * 140}px`
			}
		};
	})<{ firstWidth?: number, columnCount: number }>`
	display: grid;
	z-index: 0;
	&:nth-child(2n) {
		background-color: var(--grid-rib-bg-color);
	}
`;

export const DataTableBodyCell = styled.div.attrs({'data-widget': 'data-table-body-cell'})`
	display: flex;
	align-items: center;
	padding: 0 calc(var(--margin) / 8);
	height: var(--height);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	&:hover > input {
		box-shadow: var(--primary-shadow);
	}
	> input {
		height: 22px;
		border-color: transparent;
		margin-left: calc(var(--input-indent) * -1);
		margin-right: calc(var(--margin) / 8);
		&:focus {
			box-shadow: var(--primary-hover-shadow);
		}
	}
`;
export const TriggerDataFirstHeaderCell = styled(DataTableBodyCell)`
	font-variant: petite-caps;
	font-weight: var(--font-bold);
	color: var(--primary-color);
`;
export const TriggerDataNoOldCell = styled(DataTableBodyCell).attrs<{ columnCount: number }>(({columnCount}) => {
	return {style: {gridColumn: `span ${columnCount}`}};
})<{ columnCount: number }>`
	font-variant: petite-caps;
`;

