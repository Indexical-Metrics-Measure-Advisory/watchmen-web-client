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
`;

export const SimulatorBodyPartHeader = styled.div.attrs<{ collapsed: boolean }>(({collapsed}) => {
	return {
		'data-widget': 'simulator-body-part-header',
		style: {
			borderBottom: collapsed ? 0 : ''
		}
	};
})<{ collapsed: boolean }>`
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

export const SimulatorBodyPartBody = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'simulator-body-part-body',
		style: {
			overflow: visible ? '' : 'hidden',
			height: visible ? '' : 0,
			padding: visible ? '' : '0 calc(var(--margin) / 2)'
		}
	};
})<{ visible: boolean }>`
	flex-grow: 1;
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: calc(var(--margin) / 4);
	grid-auto-rows: var(--margin);
	padding: calc(var(--margin) / 2);
	border-bottom: var(--border);
`;

export const SimulatorBodyPartLabel = styled.span`
	font-weight: var(--font-bold);
	font-variant: petite-caps;
`;