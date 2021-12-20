import {InputLines} from '@/widgets/basic/input-lines';
import styled from 'styled-components';

export const DescriptionText = styled(InputLines)`
	width     : calc(100% - var(--margin) / 2);
	height    : calc(var(--height) * 5);
	font-size : 1.1em;
`;