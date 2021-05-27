import styled from 'styled-components';

export const GreetingContainer = styled.div.attrs({'data-widgets': 'data-quality-greeting'})`
	display: grid;
	grid-template-columns: 48px 1fr;
	grid-template-rows: 24px 24px;
	grid-column-gap: calc(var(--margin) / 2);
	padding-bottom: calc(var(--margin) / 2);
	margin-bottom: var(--margin);
	border-bottom: var(--border);
`;
export const GreetingIcon = styled.div.attrs({'data-widgets': 'data-quality-greeting-icon'})`
	grid-row: span 2;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	color: var(--success-color);
	font-size: 30px;
	&:before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: var(--primary-color);
		border-radius: calc(var(--border-radius) * 2);
		opacity: 0.2;
		z-index: -1;
	}
`;
export const GreetingTitle = styled.div.attrs({'data-widgets': 'data-quality-greeting-title'})`
	display: flex;
	align-items: center;
	font-variant: petite-caps;
	font-weight: var(--font-bold);
	font-size: 1.4em;
`;
export const GreetingDescription = styled.div.attrs({'data-widgets': 'data-quality-greeting-desc'})`
	display: flex;
	align-items: center;
	font-weight: var(--font-semi-bold);
	font-size: 1.1em;
	opacity: 0.7;
`;
