import styled from 'styled-components';
import {Dropdown} from '../../../basic-widgets/dropdown';
import {Input} from '../../../basic-widgets/input';
import {InputLines} from '../../../basic-widgets/input-lines';
import {CheckBox} from '../../../basic-widgets/checkbox';

export const TuplePropertyLabel = styled.div.attrs({'data-widget': 'tuple-property-label'})`
	display: flex;
	align-self: start;
	align-items: center;
	font-variant: petite-caps;
	font-weight: var(--font-demi-bold);
	height: var(--grid-tall-row-height);
`;
export const TuplePropertyInput = styled(Input).attrs({'data-widget': 'tuple-property-input'})`
	align-self: center;
`;
export const TuplePropertyDropdown = styled(Dropdown).attrs({'data-widget': 'tuple-property-dropdown'})`
	align-self: center;
`;
export const TuplePropertyCheckBox = styled(CheckBox).attrs({'data-widget': 'tuple-property-checkbox'})`
	align-self: center;
`;
export const TuplePropertyInputLines = styled(InputLines).attrs({'data-widget': 'tuple-property-input-lines'})`
	margin: calc((var(--grid-tall-row-height) - var(--height)) / 2) 0;
`;

