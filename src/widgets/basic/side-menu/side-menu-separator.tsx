import styled from 'styled-components';

export const SideMenuSeparator = styled.div.attrs<{ width: number, visible?: boolean }>(({width, visible = true}) => {
	return {
		'data-widget': 'side-menu-separator',
		style: {
			width: `calc(${width}px - var(--side-menu-margin) * 2)`,
			display: visible ? 'block' : 'none'
		}
	};
})<{ width: number, visible?: boolean }>`
	margin           : 0 var(--side-menu-margin);
	height           : 1px;
	min-height       : 1px;
	background-color : var(--primary-color);
	opacity          : 0.1;
`;