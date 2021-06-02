import styled from 'styled-components';

export const FlowContainer = styled.div`
	display: block;
	position: relative;
	width: 100%;
	min-height: 400px;
	margin: calc(var(--margin) / 2) 0;
	border-radius: calc(var(--border-radius) * 8);
	overflow: hidden;
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--invert-color);
		filter: brightness(0.95);
		z-index: -1;
	}
`