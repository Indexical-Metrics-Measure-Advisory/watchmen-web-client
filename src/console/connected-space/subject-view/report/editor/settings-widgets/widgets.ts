import styled from 'styled-components';

export const SectionContainer = styled.div.attrs<{ expanded: boolean }>(({ expanded }) => {
	return { 'data-widget': 'chart-settings-section' };
})<{ expanded: boolean }>`
	display       : flex;
	position      : relative;
	grid-column   : 1 / span 2;
	align-items   : center;
	font-variant  : petite-caps;
	padding       : 0 calc(var(--margin) / 2) 0 var(--margin);
	height        : calc(var(--height) + 1px);
	border-bottom : var(--border);
	cursor        : pointer;
	&:before {
		content          : '';
		display          : ${({ expanded }) => expanded ? 'block' : 'none'};
		position         : absolute;
		top              : calc(var(--height) / 2 + 5px);
		left             : calc(var(--margin) / 2 - 0.5px);
		width            : 1px;
		height           : calc(var(--height) / 2 - 5px);
		background-color : var(--border-color);
		z-index          : -1;
	}
	> svg {
		display   : block;
		position  : absolute;
		left      : 0;
		min-width : var(--margin);
		opacity   : 0.5;
	}
`;
