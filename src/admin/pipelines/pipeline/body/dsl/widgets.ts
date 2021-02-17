import styled from 'styled-components';
import { Button } from '../../../../../basic-widgets/button';

export const DslContainer = styled.div.attrs<{ visible: boolean }>(({ visible }) => {
	return {
		'data-widget': 'pipeline-dsl',
		style: {
			top: visible ? 0 : (void 0),
			height: visible ? '100%' : (void 0)
		}
	};
})<{ visible: boolean }>`
	display          : block;
	position         : absolute;
	top              : 100%;
	left             : 0;
	width            : 100%;
	height           : 0;
	background-color : var(--bg-color);
	padding          : calc(var(--margin) / 2) var(--margin);
	overflow         : hidden;
	z-index          : 1;
	transition       : top 300ms ease-in-out, height 300ms ease-in-out;
`;
export const CloseButton = styled(Button)`
	display       : block;
	position      : absolute;
	top           : calc(var(--margin) / 2);
	right         : calc(var(--margin) / 2);
	height        : 40px;
	width         : 40px;
	padding       : 0;
	border-radius : 100%;
	box-shadow    : var(--hover-shadow);
	&:hover {
		color      : var(--primary-color);
		box-shadow : var(--primary-hover-shadow);
	}
	> svg {
		font-size : 1.5em;
	}
`;