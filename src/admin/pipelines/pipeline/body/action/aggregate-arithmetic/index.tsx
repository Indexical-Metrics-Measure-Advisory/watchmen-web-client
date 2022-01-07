import {
	AggregateArithmetic,
	AggregateArithmeticHolder
} from '@/services/data/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';
import {ICON_COLLAPSE_CONTENT, ICON_EDIT} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useState} from 'react';
import {AggregateArithmeticButton, AggregateArithmeticContainer, AggregateArithmeticOption} from './widgets';

const OptionsLabel: Record<AggregateArithmetic, string> = {
	[AggregateArithmetic.NONE]: 'As Is',
	[AggregateArithmetic.SUM]: 'Sum',
	[AggregateArithmetic.AVG]: 'Avg',
	[AggregateArithmetic.COUNT]: 'Count'
};

const defendHolder = (holder: AggregateArithmeticHolder) => {
	if (!holder.arithmetic) {
		holder.arithmetic = AggregateArithmetic.NONE;
	}
};

export const AggregateArithmeticEditor = (props: { holder: AggregateArithmeticHolder, onChange: () => void }) => {
	const {holder, onChange} = props;

	const [expanded, setExpanded] = useState(false);

	defendHolder(holder);
	const {arithmetic} = holder;

	const onExpandedClicked = () => setExpanded(true);
	const onBlur = () => setExpanded(false);
	const onSeverityClicked = (newArithmetic: AggregateArithmetic) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (newArithmetic === arithmetic) {
			if (!expanded) {
				setExpanded(true);
			}
		} else {
			holder.arithmetic = newArithmetic;
			onChange();
			setExpanded(false);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setExpanded(!expanded);
	};
	const candidates = [
		AggregateArithmetic.NONE, AggregateArithmetic.SUM, AggregateArithmetic.AVG, AggregateArithmetic.COUNT
	].filter(candidate => candidate !== arithmetic);

	return <AggregateArithmeticContainer tabIndex={0} onClick={onExpandedClicked} onBlur={onBlur}>
		<AggregateArithmeticOption active={true} expanded={expanded}
		                           onClick={onSeverityClicked(arithmetic)}>
			{OptionsLabel[arithmetic]}
		</AggregateArithmeticOption>
		{candidates.map(candidate => {
			return <AggregateArithmeticOption active={false} expanded={expanded}
			                                  onClick={onSeverityClicked(candidate)}
			                                  key={candidate}>
				{OptionsLabel[candidate]}
			</AggregateArithmeticOption>;
		})}
		<AggregateArithmeticButton data-expanded={expanded} onClick={onIconClicked}>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EDIT}/>
		</AggregateArithmeticButton>
	</AggregateArithmeticContainer>;
};