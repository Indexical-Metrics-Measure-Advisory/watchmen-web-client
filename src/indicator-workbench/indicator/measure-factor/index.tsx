import {Factor} from '@/services/data/tuples/factor-types';
import {EnumForIndicator} from '@/services/data/tuples/query-indicator-types';
import {ICON_FACTOR} from '@/widgets/basic/constants';
import {FactorTypeLabel} from '@/widgets/basic/factor-type-label';
import {useTooltip} from '@/widgets/basic/tooltip';
import {TooltipAlignment} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useRef} from 'react';
import {MeasureFactorItem, MeasureFactorTooltip} from './widgets';

export const MeasureFactor = (props: { factor: Factor, enum?: EnumForIndicator }) => {
	const {factor, enum: enumeration} = props;
	const {name, label} = factor;

	const ref = useRef<HTMLSpanElement>(null);
	const tooltip = useTooltip<HTMLSpanElement>({
		use: true,
		alignment: TooltipAlignment.CENTER,
		tooltip: <MeasureFactorTooltip>
			<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.FACTOR}</span>
			<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.FACTOR_NAME}:</span>
			<span>{name}</span>
			<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.FACTOR_LABEL}:</span>
			<span>{label}</span>
			<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.FACTOR_TYPE}:</span>
			<span><FactorTypeLabel factor={factor}/></span>
			{enumeration != null
				? <>
					<span>{Lang.INDICATOR_WORKBENCH.INDICATOR.FACTOR_ENUM}:</span>
					<span>{enumeration.name}</span>
				</>
				: null}
		</MeasureFactorTooltip>,
		target: ref
	});

	return <MeasureFactorItem {...tooltip} ref={ref}>
		<FontAwesomeIcon icon={ICON_FACTOR}/>
		<span>{name || 'Noname Factor'}</span>
	</MeasureFactorItem>;
};