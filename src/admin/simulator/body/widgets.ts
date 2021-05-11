import styled from 'styled-components';

export const SimulatorBodyContainer = styled.div.attrs({'data-widget': 'simulator-body'})`
	display: flex;
	flex-direction: column;
	position: relative;
	flex-grow: 1;
`;

export const SimulatorBodyPart = styled.div.attrs({'data-widget': 'simulator-body-part'})`
	display: flex;
	flex-direction: column;
`;

export const SimulatorBodyPartHeader = styled.div.attrs({'data-widget': 'simulator-body-part-header'})`
	display: grid;
	grid-template-columns: auto 1fr;
	grid-column-gap: calc(var(--margin) / 2);
	height: var(--header-height);
	padding: 0 calc(var(--margin) / 2);
	align-items: center;
	border-bottom: var(--border);
`;

export const SimulatorBodyPartHeaderTitle = styled.div.attrs({'data-widget': 'simulator-body-part-header-title'})`
	font-size: 1.6em;
	font-weight: var(--font-semi-bold);
	font-family: var(--title-font-family);
`;

export const SimulatorBodyPartBody = styled.div.attrs({'data-widget': 'simulator-body-part-body'})`
	flex-grow: 1;
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: calc(var(--margin) / 4);
	grid-auto-rows: var(--margin);
`;

export const SimulatorBodyPartLabel = styled.span`
	font-weight: var(--font-bold);
	font-variant: petite-caps;
`;