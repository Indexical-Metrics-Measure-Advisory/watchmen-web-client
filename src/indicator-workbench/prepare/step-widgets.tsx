import {Button} from '@/widgets/basic/button';
import {ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from './indicators-event-bus-types';
import {PrepareStep} from './types';

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
	font-size     : 1.2em;
`;
export const EmphaticSinkingLabel = styled(SinkingLabel)`
	font-weight : var(--font-demi-bold);
`;
const StepIndex = styled(SinkingLabel).attrs({'data-widget': 'step-index'})`
	font-variant : petite-caps;
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
	transition  : opacity 300ms ease-in-out;
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
export const Step = (props: { index: number; visible?: boolean; children: ReactNode }) => {
	const {index, visible = true, children} = props;

	return <StepContainer visible={visible}>
		<StepIndex>Step {index}.</StepIndex>
		{children}
		<StepBackground/>
	</StepContainer>;
};

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
	line-height   : calc(var(--height) * 1.1);
	font-size     : 1.2em;
	border-radius : calc(var(--height) * 0.6);
	&[data-ink]:hover {
		box-shadow : ${({asLabel = false}) => asLabel ? 'none' : (void 0)};
	}
`;
export const StepTitleButtonsRetractor = styled.div.attrs({'data-widget': 'step-title-buttons-retractor'})`
	flex-grow : 1;
`;

export const StepBody = styled.div.attrs({'data-widget': 'step-body'})`
	grid-column : 2;
	width       : 100%;
	margin      : calc(var(--margin) / 2) 0 var(--margin);
`;

export interface StepState {
	active: boolean;
	done: boolean;
	data?: IndicatorsData;
}

export const useStep = (options: { step: PrepareStep, active?: () => void, done?: () => void, dropped?: () => void }): StepState => {
	const {step, active, done, dropped} = options;

	const {on, off} = useIndicatorsEventBus();
	const [state, setState] = useState<StepState>({active: false, done: false});
	useEffect(() => {
		const onSwitchStep = (toStep: PrepareStep, data?: IndicatorsData) => {
			setState({active: toStep === step, done: step < toStep, data});
			if (toStep === step) {
				active && active();
			} else if (step < toStep) {
				done && done();
			} else {
				dropped && dropped();
			}
		};
		on(IndicatorsEventTypes.SWITCH_STEP, onSwitchStep);
		return () => {
			off(IndicatorsEventTypes.SWITCH_STEP, onSwitchStep);
		};
	}, [on, off, step, active, done, dropped]);

	return state;
};