import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';

export const DslContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'pipeline-dsl',
		'data-v-scroll': '',
		style: {
			top: visible ? 0 : (void 0)
		}
	};
})<{ visible: boolean }>`
	display          : flex;
	flex-direction   : column;
	position         : absolute;
	top              : 100%;
	left             : 0;
	width            : 100%;
	height           : 100%;
	background-color : var(--bg-color);
	padding          : calc(var(--margin) / 2) var(--margin);
	overflow         : auto;
	z-index          : 1;
	transition       : top 300ms ease-in-out;
`;
export const CloseButton = styled(Button)`
	display          : block;
	position         : sticky;
	top              : 0;
	height           : 40px;
	min-height       : 40px;
	width            : 40px;
	padding          : 0;
	margin-left      : calc(100% - var(--margin) * 1.25);
	background-color : var(--bg-color);
	border-radius    : 100%;
	box-shadow       : var(--hover-shadow);
	z-index          : 1;
	&:hover {
		color      : var(--primary-color);
		box-shadow : var(--primary-hover-shadow);
	}
	> svg {
		font-size : 1.5em;
	}
`;
export const DslBottomGap = styled.div.attrs({'data-widget': 'dsl-bottom-gap'})`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;
