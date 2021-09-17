import {BlockCoordinate, BlockFrame, BlockName} from '@/services/data/graphics/graphics-types';
import styled from 'styled-components';

export const SubjectContainer = styled.g.attrs<{ coordinate: BlockCoordinate }>(({coordinate: {x, y}}) => {
	return {transform: `translate(${x}, ${y})`};
})<{ coordinate: BlockCoordinate }>`
	&:hover {
		> rect:nth-child(3) {
			opacity        : 1;
			pointer-events : auto;
		}
		> path {
			opacity : 1;
		}
	}
`;

export const SubjectBlock = styled.rect.attrs<{ frame: BlockFrame, dnd: boolean }>(
	({frame: {x, y, width, height}, dnd}) => {
		return {x, y, width, height, rx: 6, ry: 6, cursor: dnd ? 'move' : 'pointer'};
	})<{ frame: BlockFrame, dnd: boolean }>`
	stroke       : var(--warn-color);
	stroke-width : 2px;
	fill         : var(--invert-color);
`;

export const SubjectNameText = styled.text.attrs<{ dnd: boolean, pos: BlockName }>(
	({dnd, pos: {x, y}}) => {
		return {x, y, cursor: dnd ? 'move' : 'pointer'};
	})<{ dnd: boolean, pos: BlockName }>`
	fill        : var(--font-color);
	text-anchor : middle;
	font-family : var(--title-font-family);
	font-size   : 1.2em;
	user-select : none;
`;
export const OpenSubjectButton = styled.rect.attrs<{ frame: BlockFrame }>(
	({frame: {x, y, width, height}}) => {
		const size = height / 1.2;
		// noinspection JSSuspiciousNameCombination
		return {
			x: width + x - size / 1.5,
			y: height + y - size / 1.5,
			width: size,
			height: size,
			rx: size / 2,
			ry: size / 2
		};
	})<{ frame: BlockFrame }>`
	stroke         : var(--warn-color);
	stroke-width   : 2px;
	fill           : var(--invert-color);
	pointer-events : none;
	opacity        : 0;
	transition     : fill 300ms ease-in-out, opacity 300ms ease-in-out;
	cursor         : pointer;
	&:hover {
		fill : var(--warn-color);
		+ path {
			fill : var(--invert-color);
		}
	}
`;
export const OpenSubjectButtonIcon = styled.path.attrs<{ frame: BlockFrame }>(
	({frame: {x, y, width, height}}) => {
		// noinspection JSSuspiciousNameCombination
		return {
			width: height,
			height,
			transform: `translate(${width + x - height / 2.8}, ${y + height - height / 2.8}) scale(0.03)`
		};
	})<{ frame: BlockFrame }>`
	fill           : var(--warn-color);
	pointer-events : none;
	opacity        : 0;
	transition     : fill 300ms ease-in-out, opacity 300ms ease-in-out;
	cursor         : pointer;
`;
