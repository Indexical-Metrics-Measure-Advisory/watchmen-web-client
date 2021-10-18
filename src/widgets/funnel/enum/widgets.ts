import styled from 'styled-components';

export const MultipleEnumValues = styled.div.attrs({'data-widget': 'funnel-enum-values'})`
	display     : flex;
	position    : relative;
	flex-wrap   : wrap;
	grid-column : 1 / span 4;
`;
export const EnumValue = styled.div.attrs({'data-widget': 'funnel-enum-value'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 2);
	margin-right  : calc(var(--margin) / 2);
	margin-bottom : calc(var(--margin) / 4);
	border        : var(--border);
	border-radius : var(--border-radius);
	white-space   : nowrap;
	overflow-x    : hidden;
	text-overflow : ellipsis;
	> button {
		height        : calc(var(--height) * 0.8);
		min-width     : calc(var(--height) * 0.8);
		border-radius : var(--border-radius);
		padding       : 0;
		margin-left   : calc(var(--margin) / 2);
		margin-right  : calc(var(--margin) / 8 * -3);
		&:hover {
			background-color : var(--danger-color);
			color            : var(--invert-color);
			box-shadow       : var(--danger-hover-shadow);
		}
	}
`;
