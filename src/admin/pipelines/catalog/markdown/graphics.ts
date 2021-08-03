const css = `
<style>
div[data-role=svg-container] {
	--distinct-topic-color: rgb(94, 119, 171);
	--raw-topic-color: rgb(191, 191, 191);
	--time-topic-color: rgb(33, 157, 79);
	--aggregate-topic-color: rgb(138, 53, 193);
	--ratio-topic-color: rgb(255, 161, 0);
}
svg[data-widget=pipelines-catalog-svg] {
	display: block;
	min-width: 100%;
	min-height: 100%;
}
path[data-role=topics-relation-link] {
	stroke: rgb(191, 191, 191);
	stroke-width: 2px;
	fill: transparent;
}
rect[data-role=topic-frame] {
	stroke: rgb(94, 119, 171);
	stroke-width: 2px;
	fill: #fff;
}
text[data-role=topic-name] {
	fill: #666;
	text-anchor: middle;
	font-family: sans-serif;
	font-size: 12px;
	user-select: none;
}
</style>
`;

export const generateGraphics = (selectedSvg: string, allSvg: string) => {
	if (allSvg) {
		return `${css}

## 3.1 User Selection Graphics
<div data-role="svg-container">${selectedSvg}</div>

## 3.2 All Relevant Graphics
<div data-role="svg-container">${allSvg}</div>
`;
	} else {
		return `${css}
<div data-role="svg-container">${selectedSvg}</div>
`;
	}
};
