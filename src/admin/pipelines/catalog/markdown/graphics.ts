export const generateGraphics = (selectedSvg: string, allSvg: string) => {
	if (allSvg) {
		return `
## 3.1 User Selection Graphics
${selectedSvg}

## 3.2 All Relevant Graphics
${allSvg}
`;
	} else {
		return `
${selectedSvg}
`;
	}
};
