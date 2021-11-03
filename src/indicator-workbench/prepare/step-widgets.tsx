import {Button} from '@/widgets/basic/button';
import {ReactNode} from 'react';
import styled from 'styled-components';

const StepContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'step',
		style: {
			opacity: visible ? 1 : 0
		}
	};
})<{ visible: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : 64px 1fr;
	width                 : 100%;
	transition            : opacity 300ms ease-in-out;
`;
export const SinkingLabel = styled.span`
	display       : flex;
	position      : relative;
	align-self    : flex-end;
	margin-bottom : calc(var(--height) * 0.4);
`;
const StepIndex = styled(SinkingLabel).attrs({'data-widget': 'step-index'})`
	font-variant : petite-caps;
	font-size    : 1.2em;
`;
const StepTitleContainer = styled.div.attrs({'data-widget': 'step-title'})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : calc(var(--height) * 2);
	width       : 100%;
`;
const StepTitleSeparator = styled.div.attrs({'data-widget': 'step-title-separator'})`
	display          : block;
	position         : absolute;
	left             : -80px;
	bottom           : 4px;
	height           : 32px;
	width            : calc(100% + 96px);
	background-color : var(--border-color);
	border-radius    : 16px 16px 4px 4px;
	opacity          : 0.2;
	z-index          : -1;
`;
export const Step = (props: { index: number; visible?: boolean; children: ReactNode }) => {
	const {index, visible = true, children} = props;

	return <StepContainer visible={visible}>
		<StepIndex>Step {index}.</StepIndex>
		{children}
	</StepContainer>;
};

export const StepTitle = (props: { children: ReactNode }) => {
	const {children, ...rest} = props;

	return <StepTitleContainer {...rest}>
		{children}
		<StepTitleSeparator/>
	</StepTitleContainer>;
};

export const StepTitleButton = styled(Button)`
	height        : calc(var(--height) * 1.2);
	line-height   : calc(var(--height) * 1.1);
	font-size     : 1.2em;
	border-radius : calc(var(--height) * 0.6);
`;