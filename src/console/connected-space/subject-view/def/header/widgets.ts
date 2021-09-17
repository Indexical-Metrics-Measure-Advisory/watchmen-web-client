import {DwarfButton} from '@/widgets/basic/button';
import styled from 'styled-components';
import {COLLAPSE_WIDTH, computeColumnWidths} from '../widgets';

export const SubjectDefHeader = styled.div.attrs<{ activeIndex: number }>(({activeIndex}) => {
	return {
		'data-widget': 'subject-def-header',
		style: {
			gridTemplateColumns: computeColumnWidths(activeIndex)
		}
	};
})<{ activeIndex: number }>`
	display               : grid;
	grid-template-columns : 1fr repeat(4, ${COLLAPSE_WIDTH}px);
	position              : relative;
	height                : var(--grid-row-height);
	min-height            : var(--grid-row-height);
	transition            : all 300ms ease-in-out;
`;
export const DefHeaderCell = styled.div.attrs({'data-widget': 'subject-def-header-cell'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	font-family   : var(--title-font-family);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : clip;
	padding-right : var(--input-indent);
	border-right  : var(--border);
	border-bottom : var(--border);
	cursor        : pointer;
	&:last-child {
		border-right : 0;
	}
`;
export const DefHeaderIndex = styled.span.attrs({'data-widget': 'subject-def-header-index'})`
	display          : flex;
	justify-content  : center;
	font-variant     : petite-caps;
	background-color : var(--border-color);
	width            : 20px;
	padding          : 2px calc(var(--margin) / 4);
	margin           : 0 var(--input-indent);
	border-radius    : 50%;
`;
export const DefHeaderLabel = styled.span.attrs({'data-widget': 'subject-def-header-label'})`
	display     : flex;
	position    : relative;
	align-items : center;
	flex-grow   : 1;
`;
export const DefHeaderNextButton = styled(DwarfButton).attrs({'data-widget': 'subject-def-header-button'})`
`;
export const DefHeaderButton = styled(DwarfButton).attrs({'data-widget': 'subject-def-header-button'})`
	margin-right : calc(var(--margin) / 4);
`;
