import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';
import {GRID_COLUMN_GAP, GRID_STAGE_HEADER} from '../../constants';
import {LeadLabel} from '../../widgets';

export const StageHeaderContainer = styled.div.attrs({'data-widget': 'stage-header'})`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_STAGE_HEADER};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	align-items           : center;
	overflow              : hidden;
	margin                : calc(var(--margin) / -4) calc(var(--margin) / -2);
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2);
	> div[data-widget="header-buttons"] {
		top   : calc((var(--margin) / 2 + var(--height) - var(--param-height)) / 2);
		right : calc(var(--margin) / 2);
	}
`;
export const StageLeadLabel = styled(LeadLabel)`
	font-weight : var(--font-boldest);
	color       : var(--warn-color);
`;
export const StageNameEditor = styled.div.attrs({'data-widget': 'stage-name'})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : var(--height);
	min-width   : 200px;
`;
export const StageNameLabel = styled.div.attrs({'data-widget': 'stage-name-label'})`
	padding       : 0 calc(var(--margin) / 2);
	opacity       : 0;
	overflow      : hidden;
	text-overflow : ellipsis;
	white-space   : nowrap;
`;
export const StageNameInput = styled(Input)`
	position      : absolute;
	width         : 100%;
	top           : calc((var(--height) - var(--param-height)) / 2);
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	border        : 0;
	border-radius : calc(var(--param-height) / 2);
	box-shadow    : var(--param-border);
	:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;