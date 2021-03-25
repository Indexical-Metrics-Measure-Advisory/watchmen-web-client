import styled from 'styled-components';
import { Button } from '../../../../basic-widgets/button';
import { GraphicsPosition, GraphicsSize } from '../../../../services/graphics/graphics-types';
import { BodySvg } from '../widgets';

export const THUMBNAIL_WIDTH = 300;
export const THUMBNAIL_HEIGHT = 150;

export const BodyThumbnail = styled.div.attrs<{ min: boolean }>(({ min }) => {
	return {
		'data-widget': 'pipelines-catalog-thumbnail',
		style: {
			width: min ? 'calc(var(--margin) / 4 * 3)' : (void 0),
			height: min ? 'calc(var(--margin) / 4 * 3)' : (void 0),
			overflow: min ? 'hidden' : (void 0)
		}
	};
})<{ min: boolean }>`
	display       : block;
	position      : fixed;
	border-radius : var(--border-radius);
	bottom        : calc(var(--margin) / 2);
	width         : ${THUMBNAIL_WIDTH}px;
	height        : ${THUMBNAIL_HEIGHT}px;
	margin-left   : calc(var(--margin) / 4);
	transition    : box-shadow 300ms ease-in-out;
	z-index       : 2;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
		> svg {
			background-color : var(--invert-color);
		}
		> button {
			opacity : 0.7;
		}
	}
	&:before, &:after {
		content  : '';
		display  : ${({ min }) => min ? 'none' : 'block'};
		position : absolute;
		top      : 0;
		left     : 0;
		width    : 100%;
		height   : 100%;
	}
	&:before {
		background-color : var(--primary-color);
		opacity          : 0.1;
		z-index          : -1;
	}
	&:after {
		cursor  : pointer;
		z-index : 1;
	}
`;
export const ThumbnailBodySvg = styled(BodySvg).attrs<{ ratio: number }>(({ ratio }) => {
	return {
		style: {
			transform: ratio === 1 ? 'translate(-50%, -50%)' : `scale(${ratio}) translate(-50%, -50%)`
		}
	};
})<{ ratio: number }>`
	display          : block;
	position         : absolute;
	top              : 50%;
	left             : 50%;
	transform-origin : top left;
	pointer-events   : none;
	transition       : background-color 300ms ease-in-out;
`;
export const CurrentRect = styled.div.attrs<{ rect: GraphicsPosition & GraphicsSize }>(
	({ rect }) => {
		const { x, y, width, height } = rect;
		return {
			'data-widget': 'pipelines-catalog-thumbnail-current',
			style: {
				top: y,
				left: x,
				width,
				height
			}
		};
	})<{ rect: GraphicsPosition & GraphicsSize }>`
	display        : block;
	position       : absolute;
	border         : var(--border);
	border-color   : var(--warn-color);
	border-radius  : calc(var(--border-radius) / 2);
	pointer-events : none;
`;
export const CloseButton = styled(Button).attrs<{ visible: boolean }>(({ visible }) => {
	return {
		style: {
			borderRadius: visible ? 0 : (void 0),
			opacity: visible ? 0.7 : (void 0),
			top: visible ? 0 : (void 0),
			right: visible ? 0 : (void 0)
		}
	};
})<{ visible: boolean }>`
	position      : absolute;
	top           : 2px;
	right         : 2px;
	width         : calc(var(--margin) / 4 * 3);
	height        : calc(var(--margin) / 4 * 3);
	padding       : 0;
	border-radius : var(--border-radius);
	opacity       : 0;
	z-index       : 2;
`;