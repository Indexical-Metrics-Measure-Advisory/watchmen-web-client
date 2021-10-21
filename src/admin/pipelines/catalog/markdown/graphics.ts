export const generateGraphics = (selectedSvg: string, allSvg: string, sectionIndex: number) => {
	if (allSvg) {
		return `
## ${sectionIndex}.1 User Selection Graphics
${selectedSvg}

## ${sectionIndex}.2 All Relevant Graphics
${allSvg}
`;
	} else {
		return `
${selectedSvg}
`;
	}
};
