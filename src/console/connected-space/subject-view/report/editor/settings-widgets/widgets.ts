import styled from 'styled-components';

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
	height        : calc(var(--height) + 1px);
	border-bottom : var(--border);
`;