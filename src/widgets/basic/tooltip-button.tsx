import {useRef} from 'react';
import {Button} from './button';
import {TooltipRect, useTooltip} from './tooltip';
import {ButtonProps} from './types';

export const TooltipButton = (props: ButtonProps & {
	tooltip: TooltipRect & { label: string },
}) => {
	const {tooltip: {label, ...rect}, ...rest} = props;

	const buttonRef = useRef<HTMLButtonElement>(null);
	const tooltipTrigger = useTooltip<HTMLButtonElement>({
		tooltip: label,
		target: buttonRef,
		...rect
	});

	return <Button {...rest} {...tooltipTrigger} ref={buttonRef}/>;
};