import {CheckBox} from '@/widgets/basic/checkbox';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import {InputLines} from '@/widgets/basic/input-lines';
import styled from 'styled-components';

export const TuplePropertyLabel = styled.div.attrs({'data-widget': 'tuple-property-label'})`
	display      : flex;
	align-self   : start;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	height       : var(--grid-tall-row-height);
`;
export const TuplePropertyInput = styled(Input).attrs({'data-widget': 'tuple-property-input'})`
	align-self : center;
`;
export const TuplePropertyDropdown = styled(Dropdown).attrs({'data-widget': 'tuple-property-dropdown'})`
	align-self : center;
`;
export const TuplePropertyCheckBox = styled(CheckBox).attrs({'data-widget': 'tuple-property-checkbox'})`
	align-self : center;
`;
export const TuplePropertyInputLines = styled(InputLines).attrs({'data-widget': 'tuple-property-input-lines'})`
	margin : calc((var(--grid-tall-row-height) - var(--height)) / 2) 0;
`;

