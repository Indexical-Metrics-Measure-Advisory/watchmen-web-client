export const findSvgRoot = (element: SVGGraphicsElement): SVGSVGElement => {
	let parent = element.parentElement!;
	while (parent.tagName.toUpperCase() !== 'SVG') {
		parent = parent.parentElement!;
	}
	return parent as unknown as SVGSVGElement;
};
