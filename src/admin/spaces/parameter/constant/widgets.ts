import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

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
