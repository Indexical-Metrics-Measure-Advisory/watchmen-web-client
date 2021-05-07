import styled from 'styled-components';
import {Input} from '../../../../../../basic-widgets/input';

export const ConstantInput = styled(Input).attrs({'data-widget': 'parameter-constant-input'})`
	height     : var(--param-height);
	border     : 0;
	box-shadow : var(--param-border);
	&:hover {
		z-index          : 1;
		background-color : var(--bg-color);
		box-shadow       : var(--primary-hover-shadow);
	}
`;
