import styled from 'styled-components';

export const AvailableEnumItemsContainer = styled.div.attrs({'data-widget': 'available-enum-items'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	grid-column    : span 2;
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
	> div:first-child {
		width               : 100%;
		border-bottom       : var(--border);
		border-bottom-width : calc(var(--border-width) * 2);
	}
`;
export const AvailableEnumItemSelectors = styled.div`
	display     : flex;
	position    : relative;
	padding-top : calc(var(--margin) / 4);
	margin-left : calc(var(--margin) / -4);
`;
export const NoAvailableEnumItem = styled.span`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--height);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
`;
export const AvailableEnumItem = styled.span.attrs<{ selected: boolean }>(({selected}) => {
	return {
		style: {
			color: selected ? 'var(--invert-color)' : (void 0),
			backgroundColor: selected ? 'var(--primary-color)' : (void 0)
		}
	};
})<{ selected: boolean }>`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--height);
	padding       : 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
	border-radius : var(--border-radius);
	cursor        : pointer;
	overflow      : hidden;
	transition    : box-shadow 300ms ease-in-out, color 300ms ease-in-out, background-color 300ms ease-in-out;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.2;
		z-index          : 0;
	}
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
	> span:first-child {
		margin-right  : calc(var(--margin) / 4);
		white-space   : nowrap;
		text-overflow : ellipsis;
		overflow      : hidden;
		z-index       : 1;
	}
	> svg {
		font-size  : 0.8em;
		margin-top : 2px;
		opacity    : ${({selected}) => selected ? 1 : 0};
	}
`;
export const AvailableItemOperator = styled.div`
	display       : flex;
	position      : relative;
	align-items   : center;
	border-top    : var(--border);
	padding       : calc(var(--margin) / 4) 0;
	margin-bottom : calc(var(--margin) / 2);
	> div:first-child {
		white-space  : nowrap;
		margin-right : calc(var(--margin) / 2);
	}
	> div[data-widget=tuple-property-dropdown] {
		width     : auto;
		min-width : 300px;
	}
	> button:last-child {
		margin-left : calc(var(--margin) / 2);
	}
`;

