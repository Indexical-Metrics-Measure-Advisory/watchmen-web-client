import styled from 'styled-components';

export const HintBarContainer = styled.div.attrs({'data-widget': 'cli-hint-bar'})`
	display: flex;
	grid-column: span 3;
	height: var(--tall-height);
	border-bottom: var(--border);
	align-items: center;
	margin: 0 calc(var(--margin) / -4);
	padding: 0 calc(var(--margin) / 2) 0 calc(var(--margin) / 4 + var(--input-indent));
`;
export const HintButton = styled.div.attrs({'data-widget': 'cli-hint'})`
	display: flex;
	position: relative;
	align-items: center;
	padding: 0 calc(var(--margin) / 2);
	height: calc(var(--height) * 0.8);
	border-radius: var(--border-radius);
	cursor: pointer;
	overflow: hidden;
	&:not(:first-child) {
		margin-left: calc(var(--margin) / 4);
	}
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--info-color);
		opacity: 0.3;
		z-index: -1;
	}
`;
