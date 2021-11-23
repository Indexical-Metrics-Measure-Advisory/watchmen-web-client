import {GRID_ROW_HEIGHT} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import styled from 'styled-components';
import {SegmentTableHeaderLabel} from '../segments/widgets';

export const SegmentValueCellContainer = styled.div.attrs<{ canAdd: boolean }>(({canAdd}) => {
	return {
		style: {
			minHeight: canAdd ? GRID_ROW_HEIGHT * 2 : GRID_ROW_HEIGHT
		}
	};
})<{ canAdd: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr auto;
	grid-column           : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	align-items           : center;
	align-content         : start;
	padding               : calc((${GRID_ROW_HEIGHT}px - var(--height)) / 2) 0;
	&:hover {
		> input,
		> button {
			opacity : 1;
		}
	}
	> input {
		border-right               : 0;
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
		opacity                    : 0;
	}
	> button {
		border-top-left-radius    : 0;
		border-bottom-left-radius : 0;
		opacity                   : 0;
	}
`;
export const SegmentValues = styled.div`
	display       : flex;
	position      : relative;
	flex-wrap     : wrap;
	grid-column   : 1 / span 2;
	margin-left   : calc(var(--margin) / -4);
	margin-bottom : calc(var(--margin) / -4);
`;
export const NoSegmentValueDefined = styled.span`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--height);
	padding       : 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	border-radius : var(--border-radius);
	font-variant  : petite-caps;
	overflow      : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--danger-color);
		opacity          : 0.2;
		z-index          : 0;
	}
`;
export const SegmentValue = styled.span<{ isOthers: boolean }>`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--height);
	padding       : 0 0 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	border-radius : var(--border-radius);
	overflow      : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.2;
		z-index          : 0;
	}
	&:hover > span:last-child:not(:first-child) {
		left : calc(var(--height) * -0.1);
	}
	> span:first-child {
		padding-right  : calc(var(--margin) / 4);
		white-space    : nowrap;
		text-overflow  : ellipsis;
		overflow       : hidden;
		z-index        : 1;
		font-variant   : ${({isOthers}) => isOthers ? 'petite-caps' : (void 0)};
		font-weight    : ${({isOthers}) => isOthers ? 'var(--font-demi-bold)' : (void 0)};
		text-transform : ${({isOthers}) => isOthers ? 'capitalize' : (void 0)};
		&:last-child {
			margin-right : calc(var(--margin) / 2);
		}
	}
	> span:last-child:not(:first-child) {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		height           : calc(var(--height) * 0.8);
		min-width        : calc(var(--height) * 0.8);
		left             : var(--height);
		color            : var(--invert-color);
		background-color : var(--danger-color);
		opacity          : 0.7;
		cursor           : pointer;
		border-radius    : var(--border-radius);
		transition       : background-color 300ms ease-in-out, left 300ms ease-in-out;
		z-index          : 1;
	}
`;

export const CategorySegmentsHeader = () => {
	return <SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.CATEGORY_SEGMENT_LABEL} </SegmentTableHeaderLabel>;
};