import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ReactNode, useRef} from 'react';
import {ICON_QUESTION_MARK} from '../basic/constants';
import {useTooltip} from '../basic/tooltip';
import {TooltipAlignment, TooltipPosition} from '../basic/types';
import {TuplePropertyQuestionMarkContainer} from './widgets';

export const TuplePropertyQuestionMark = (props: { children: ReactNode }) => {
	const {children} = props;

	const ref = useRef<HTMLSpanElement>(null);
	const tooltipTrigger = useTooltip<HTMLSpanElement>({
		tooltip: children,
		target: ref,
		position: TooltipPosition.TOP,
		alignment: TooltipAlignment.CENTER
	});

	return <TuplePropertyQuestionMarkContainer {...tooltipTrigger} ref={ref}>
		<FontAwesomeIcon icon={ICON_QUESTION_MARK}/>
	</TuplePropertyQuestionMarkContainer>;
};