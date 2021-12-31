import {TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import styled from 'styled-components';

export const RestrictionsTableContainer = styled.div.attrs({'data-widget': 'restrictions-table'})`
	grid-column    : span 2;
	display        : flex;
	flex-direction : column;
	font-size      : 0.8em;
	// editor in grid layout, 30% 70%, column gap is 32px, table is second column in editor.
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
	margin-bottom  : var(--margin);
`;
export const RestrictionsPropLabel = styled(TuplePropertyLabel)`
	border-bottom : var(--border);
	width         : 100%;
`;
export const RestrictionsTableBodyContainer = styled.div.attrs({'data-widget': 'restrictions-table-body'})`
	display        : flex;
	flex-direction : column;
	position       : relative;
`;
export const RestrictionRowContainer = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 1fr auto;
	grid-column-gap       : calc(var(--margin) / 2);
	align-items           : center;
	padding               : calc(var(--margin) / 4) 0;
	border-radius         : var(--border-radius);
	&:nth-child(2n + 1):after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--grid-rib-bg-color);
		z-index          : -3;
	}
`;
export const RestrictionIndexLabel = styled.span`
	color       : var(--warn-color);
	font-weight : var(--font-bold);
	padding     : 0 calc(var(--margin) / 4);
`;
export const RestrictionNameLabel = styled.span`
`;
export const RestrictionEnablementCell = styled.div`
	padding : 0 calc(var(--margin) / 4);
`;
