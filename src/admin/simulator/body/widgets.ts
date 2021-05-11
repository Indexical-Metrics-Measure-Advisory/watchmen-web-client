import styled from 'styled-components';

export const SimulatorBodyContainer = styled.div.attrs({'data-widget': 'simulator-body'})`
	display: flex;
	flex-direction: column;
	position: relative;
	flex-grow: 1;
`;

export const SimulatorBodyPart = styled.div.attrs<{ collapsed: boolean }>(({collapsed}) => {
	return {
		'data-widget': 'simulator-body-part',
		style: {
			flexGrow: collapsed ? 0 : 1
		}
	};
})<{ collapsed: boolean }>`
	display: flex;
	flex-direction: column;
	&:last-child > div[data-widget='simulator-body-part-header'] {
		border-bottom: ${({collapsed}) => collapsed ? 0 : (void 0)};
	}
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
	padding: calc(var(--margin) / 2);
	border-bottom: var(--border);
`;
export const SimulatorBodyPartRow = styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto auto 1fr;
	grid-column-gap: calc(var(--margin) / 2);
	align-items: center;
`;

export const SimulatorBodyPartLabel = styled.span`
	font-weight: var(--font-bold);
	font-variant: petite-caps;
`;