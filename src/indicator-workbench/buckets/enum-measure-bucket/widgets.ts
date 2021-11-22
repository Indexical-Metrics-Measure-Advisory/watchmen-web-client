import styled from 'styled-components';

export const AvailableEnumItemsContainer = styled.div.attrs({'data-widget': 'available-enum-items'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	grid-column    : span 2;
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
`;
export const AvailableEnumItemSelectors = styled.div`
	display       : flex;
	position      : relative;
	margin-left   : calc(var(--margin) / -4);
	margin-bottom : calc(var(--margin) / -4);
`;
export const NoAvailableEnumItem = styled.span`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--height);
	margin-left   : calc(var(--margin) / 4);
	margin-bottom : calc(var(--margin) / 4);
`;
export const AvailableEnumItem = styled.span`
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
	transition    : box-shadow 300ms ease-in-out;
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
		white-space   : nowrap;
		text-overflow : ellipsis;
		overflow      : hidden;
		z-index       : 1;
	}
`;