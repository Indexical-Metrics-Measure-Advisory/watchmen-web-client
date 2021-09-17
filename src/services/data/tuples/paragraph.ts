import {GraphicsPosition, GraphicsSize} from '../graphics/graphics-types';

export type ParagraphRect = GraphicsSize & GraphicsPosition;

export interface Paragraph {
	content: string;
	rect: ParagraphRect;
}
