export interface GraphicsPosition {
	x: number;
	y: number;
}

export interface GraphicsSize {
	width: number;
	height: number;
}

/**
 * block coordinate.
 * normally a svg element needs to identify its coordinate first.
 */
export interface BlockCoordinate extends GraphicsPosition {
}

export interface BlockFrame extends GraphicsPosition, GraphicsSize {
}

export interface BlockName extends GraphicsPosition {
}
