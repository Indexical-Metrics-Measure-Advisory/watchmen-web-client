import styled from 'styled-components';

export const ReportDataSetAndPaletteContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'report-dataset-and-palette-container',
		style: {
			minHeight: visible ? (void 0) : 0,
			maxHeight: visible ? (void 0) : 0,
			overflow: visible ? (void 0) : 'hidden',
			borderTop: visible ? (void 0) : 0
		}
	};
})<{ visible: boolean }>`
	display: block;
	position: relative;
	min-height: 200px;
	max-height: 400px;
	border-top: var(--border);
	transition: min-height 300ms ease-in-out, max-height 300ms ease-in-out;
`;
export const TabHeaders = styled.div.attrs({'data-widget': 'tab-headers'})`
	display: flex;
	position: absolute;
	flex-flow: row-reverse;
	bottom: calc(100% + 1px);
	z-index: 2;
`;
export const TabHeader = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'tab-header',
		style: {
			backgroundColor: active ? 'var(--primary-color)' : (void 0),
			color: active ? 'var(--invert-color)' : (void 0)
		}
	};
})<{ active: boolean }>`
	display: flex;
	position: relative;
	min-height: calc(var(--height) * 1.5);
	height: calc(var(--height) * 1.5);
	align-items: center;
	justify-content: space-between;
	padding: 0 calc(var(--margin) / 2) 0 calc(var(--margin) / 3);
	font-weight: var(--font-demi-bold);
	font-size: 1.2em;
	white-space: nowrap;
	text-overflow: ellipsis;
	border-top: var(--border);
	border-right: var(--border);
	border-top-right-radius: calc(var(--height) * 0.75);
	background-color: var(--bg-color);
	cursor: pointer;
	transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
	&:last-child {
		margin-left: -1px;
		border-left: var(--border);
	}
	&:not(:last-child) {
		margin-left: calc(var(--height) * -0.75);
		padding-left: calc(var(--margin) / 3 + var(--height) * 0.75);
	}
	&:hover {
		background-color: var(--hover-color);
	}
`;
