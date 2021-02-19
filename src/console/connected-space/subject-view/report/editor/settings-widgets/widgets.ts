import styled from 'styled-components';
import { Input } from '../../../../../../basic-widgets/input';
import { InputLines } from '../../../../../../basic-widgets/input-lines';

export const SectionContainer = styled.div.attrs<{ expanded: boolean }>(({ expanded }) => {
	return { 'data-widget': 'chart-settings-section' };
})<{ expanded: boolean }>`
	display       : flex;
	position      : relative;
	grid-column   : 1 / span 2;
	align-items   : center;
	font-variant  : petite-caps;
	font-weight   : var(--font-demi-bold);
	font-size     : 1.1em;
	padding       : 0 calc(var(--margin) / 2);
	height        : calc(var(--height) * 1.1);
	border-bottom : var(--border);
	cursor        : pointer;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.05;
		z-index          : -1;
	}
	> span:first-child {
		flex-grow : 1;
	}
	> svg {
		font-size : 0.8em;
	}
`;
export const PropName = styled.div.attrs({ 'data-widget': 'chart-settings-prop-name' })`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : calc(var(--height) + 1px);
	border-right  : var(--border);
	border-bottom : var(--border);
	padding       : 0 calc(var(--margin) / 2);
`;
export const PropValue = styled.div.attrs({ 'data-widget': 'chart-settings-prop-value' })`
	display       : flex;
	align-items   : center;
	height        : calc(var(--height) + 1px);
	border-bottom : var(--border);
`;
export const PropExclusiveValue = styled.div.attrs({ 'data-widget': 'chart-settings-prop-exclusive-value' })`
	grid-column   : 1 / span 2;
	display       : flex;
	align-items   : center;
	//height        : calc(var(--height) + 1px);
	border-bottom : var(--border);
`;
export const PropValueUnit = styled.div.attrs({ 'data-widget': 'chart-settings-prop-value-unit' })`
	display          : flex;
	position         : relative;
	align-items      : center;
	height           : var(--height);
	font-variant     : petite-caps;
	color            : var(--primary-color);
	padding          : 0 calc(var(--margin) / 4);
	transform        : scale(0.8);
	transform-origin : center;
	white-space      : nowrap;
	overflow         : hidden;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 30%;
		left             : 0;
		width            : 1px;
		height           : 40%;
		background-color : var(--border-color);
	}
`;
export const PropValueInput = styled(Input)`
	flex-grow     : 1;
	width         : 0;
	border        : 0;
	border-radius : 0;;
`;
export const PropValueInputLines = styled(InputLines)`
	flex-grow     : 1;
	width         : 0;
	border        : 0;
	border-radius : 0;
	padding-left  : calc(var(--margin) / 2);
	padding-right : calc(var(--margin) / 2);
`;