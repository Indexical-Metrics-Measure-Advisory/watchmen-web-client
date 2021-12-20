import {Button} from '@/widgets/basic/button';
import {Lang} from '@/widgets/langs';
import {ForwardedRef, forwardRef, ReactNode} from 'react';
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
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	width                 : 100%;
`;
export const SinkingLabel = styled.span`
	display    : flex;
	position   : relative;
	align-self : flex-end;
	font-size  : 1.2em;
`;
export const ConjunctionLabel = styled(SinkingLabel).attrs({'data-widget': 'conjunction-label'})`
	text-transform : lowercase;
	font-variant   : petite-caps;
	margin-right   : calc(var(--margin) / 2);
`;
export const EmphaticSinkingLabel = styled(SinkingLabel)`
	font-weight   : var(--font-demi-bold);
	margin-bottom : calc(var(--height) * 0.4);
`;
const StepIndex = styled(SinkingLabel).attrs({'data-widget': 'step-index'})`
	font-variant  : petite-caps;
	margin-bottom : calc(var(--height) * 0.4);
	white-space   : nowrap;
`;
const StepTitleContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'step-title',
		style: {
			opacity: visible ? 1 : 0,
			pointerEvents: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	display     : flex;
	position    : relative;
	align-items : center;
	grid-column : 2;
	grid-row    : 1;
	height      : calc(var(--height) * 2);
	width       : 100%;
`;
const StepBackground = styled.div.attrs({'data-widget': 'step-background'})`
	display          : block;
	position         : absolute;
	left             : calc(var(--margin) / -2);
	top              : 20px;
	bottom           : 4px;
	width            : calc(100% + var(--margin));
	background-color : var(--border-color);
	border-radius    : 16px 16px 4px 4px;
	opacity          : 0.2;
	z-index          : -1;
`;
export const StepTitleConjunctionLabel = styled(ConjunctionLabel)`
	margin-bottom : calc(var(--height) * 0.4);
`;

export const Step = forwardRef((props: { index: number; visible?: boolean; children: ReactNode }, ref: ForwardedRef<HTMLDivElement>) => {
	const {index, visible = true, children} = props;

	return <StepContainer visible={visible} ref={ref}>
		<StepIndex>{Lang.INDICATOR_WORKBENCH.INDICATOR.STEP} {index}.</StepIndex>
		{children}
		<StepBackground/>
	</StepContainer>;
});

export const StepTitle = (props: { visible?: boolean; children: ReactNode; }) => {
	const {visible = true, children, ...rest} = props;

	return <StepTitleContainer visible={visible} {...rest}>
		{children}
	</StepTitleContainer>;
};

export const StepTitleButton = styled(Button).attrs<{ asLabel?: boolean }>(({asLabel = false}) => {
	return {
		style: {
			cursor: asLabel ? 'default' : (void 0)
		}
	};
})<{ asLabel?: boolean }>`
	height        : calc(var(--height) * 1.2);
	//line-height   : calc(var(--height) * 1.1);
	font-size     : 1.2em;
	border-radius : calc(var(--height) * 0.6);
	&[data-ink]:hover {
		box-shadow : ${({asLabel = false}) => asLabel ? 'none' : (void 0)};
	}
`;
export const StepTitleButtonsRetractor = styled.div.attrs({'data-widget': 'step-title-buttons-retractor'})`
	flex-grow : 1;
`;

export const StepBody = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'step-body',
		style: {
			opacity: visible ? 1 : 0
		}
	};
})<{ visible: boolean }>`
	grid-column : 2;
	width       : 100%;
	margin      : calc(var(--margin) / 2) 0 var(--margin);
`;
export const StepBodyConjunctionLabel = styled(ConjunctionLabel)`
	margin-left : calc(var(--margin) / 2);
`;
export const StepBodyButtons = styled.div.attrs({'data-widget': 'step-body-buttons'})`
	display  : flex;
	position : relative;
`;
