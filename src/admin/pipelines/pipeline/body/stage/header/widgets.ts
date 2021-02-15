import styled from 'styled-components';
import { Button } from '../../../../../../basic-widgets/button';
import { Input } from '../../../../../../basic-widgets/input';
import { GRID_COLUMN_GAP, GRID_STAGE_HEADER } from '../../constants';

export const StageHeaderContainer = styled.div.attrs({ 'data-widget': 'stage-header' })`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_STAGE_HEADER};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	align-items           : center;
`;
export const StageNameEditor = styled.div.attrs({ 'data-widget': 'stage-name' })`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : var(--height);
	min-width   : 200px;
`;
export const StageNameLabel = styled.div.attrs({ 'data-widget': 'stage-name-label' })`
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
export const StageHeaderButtons = styled.div.attrs({ 'data-widget': 'stage-header-buttons' })`
	display               : grid;
	grid-template-columns : repeat(3, auto);
	grid-column-gap       : calc(var(--margin) / 4);
	justify-self          : end;
`;
export const HeaderButton = styled(Button)`
	height        : var(--param-height);
	border-radius : calc(var(--param-height) / 2);
	border        : 0;
	&:not([data-ink]) {
		box-shadow : var(--param-border);
		&:hover {
			box-shadow: var(--hover-shadow);
		}
	}
	&[data-ink=primary] {
		&:hover {
			box-shadow: var(--primary-hover-shadow);
		}
	}
	&[data-ink=danger] {
		&:hover {
			box-shadow: var(--param-danger-border), var(--danger-hover-shadow);
		}
	}
	> svg {
		font-size: 0.8em;
	}
`;