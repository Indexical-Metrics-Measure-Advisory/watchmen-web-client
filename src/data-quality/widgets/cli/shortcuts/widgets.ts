import styled from 'styled-components';
import {Input} from '../../../../basic-widgets/input';

export const ShortcutsContainer = styled.div.attrs({'data-widget': 'cli-shortcuts-container'})``;
export const ShortcutsPopupContainer = styled.div
	.attrs<{ itemCount: number, visible: boolean, transition: boolean }>(({itemCount, visible, transition}) => {
		return {
			'data-widget': 'shortcuts-popup',
			style: {
				height: visible ? `calc(var(--tall-height) * ${Math.min(itemCount, 8)} + var(--tall-height) + var(--margin) / 2)` : 0,
				transition: transition ? 'height 150ms ease-in-out' : (void 0)
			}
		};
	})<{ itemCount: number, visible: boolean, transition: boolean }>`
	display: block;
	position: absolute;
	bottom: calc(100% + var(--margin) / 4);
	border-radius: var(--border-radius);
	min-width: 200px;
	background-color: var(--bg-color);
	box-shadow: var(--primary-hover-shadow);
	overflow: hidden;
	z-index: 1;
`;
export const ShortcutsMenuContainer = styled.div.attrs<{ itemCount: number }>(({itemCount}) => {
	return {
		'data-widget': 'cli-shortcuts-menu',
		'data-v-scroll': '',
		style: {
			height: `calc(var(--tall-height) * ${Math.min(itemCount, 8)})`
		}
	};
})<{ itemCount: number }>`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
`;
export const ShortcutMenu = styled.div.attrs({'data-widget': 'cli-shortcut-menu'})`
	display: grid;
	position: relative;
	grid-template-columns: 32px 1fr;
	align-items: center;
	padding: 0 calc(var(--margin) / 2);
	height: var(--tall-height);
	cursor: pointer;
	&:hover {
		background-color: var(--hover-color);
	}
`;
export const ShortcutEmptyIcon = styled.div.attrs({'data-widget': 'cli-shortcut-menu-empty-icon'})`
	display: block;
	width: var(--height);
	height: var(--height);
`;
export const ShortcutFilter = styled.div.attrs({'data-widget': 'cli-shortcut-filter'})`
	display: flex;
	position: relative;
	align-items: center;
	border-top: var(--border);
	height: calc(var(--tall-height) + var(--margin) / 2);
	padding: calc(var(--margin) / 4);
	> svg {
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: calc(var(--margin) / 2 + 2px);
	}
`;
export const ShortcutFilterInput = styled(Input).attrs({'data-widget': 'cli-shortcut-filter-input'})`
	height: var(--tall-height);
	width: 100%;
	padding-left: calc(var(--margin) - 4px);
	border-radius: calc(var(--tall-height) / 2);
`;
