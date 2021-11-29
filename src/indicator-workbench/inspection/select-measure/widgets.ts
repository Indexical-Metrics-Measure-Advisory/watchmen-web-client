import styled from 'styled-components';

export const SelectMeasureContainer = styled.div.attrs({'date-widget': 'inspection-select-measure'})`
	display               : grid;
	position              : relative;;
	grid-template-columns : auto auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;
