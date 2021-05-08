import styled from 'styled-components';

export const StageFooterContainer = styled.div.attrs({'data-widget': 'stage-footer'})`
	grid-column   : 1 / span 2;
	display       : flex;
	position      : relative;
	align-items   : center;
	overflow      : hidden;
	margin        : 0 calc(var(--margin) / -2);
	padding       : calc(var(--margin) / 4) calc(var(--margin) / 2);
	border-radius : calc((var(--margin) / 2 + var(--height)) / 2);
	> div[data-widget="footer-buttons"] {
		top   : calc((var(--margin) / 2 + var(--height) - var(--param-height)) / 2);
		right : calc(var(--margin) / 2);
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--info-color);
		opacity          : 0.05;
		z-index          : -1;
	}
`;