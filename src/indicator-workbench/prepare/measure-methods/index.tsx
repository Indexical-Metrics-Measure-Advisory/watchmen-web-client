import {Factor} from '@/services/data/tuples/factor-types';
import {IndicatorAggregateArithmetic, IndicatorMeasure, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {
	isCategoryMeasure,
	isGeoMeasure,
	isIndividualMeasure,
	isOrganizationMeasure,
	isTimePeriodMeasure
} from '@/services/data/tuples/indicator-utils';
import {EnumForIndicator} from '@/services/data/tuples/query-indicator-types';
import {ICON_INDICATOR_MEASURE_METHOD} from '@/widgets/basic/constants';
import {FactorTypeLabel} from '@/widgets/basic/factor-type-label';
import {MeasureMethodLabel} from '@/widgets/basic/measure-method-label';
import {useTooltip} from '@/widgets/basic/tooltip';
import {TooltipAlignment} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Fragment, useRef} from 'react';
import {MeasureMethodSort} from '../../utils/sort';
import {EmphaticSinkingLabel, Step, StepBody, StepTitle, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';
import {
	AggregateItem,
	AggregateItemsBlock,
	AggregateItemsTitle,
	MeasureFactorLabel,
	MeasureFactors,
	MeasureFactorTooltip,
	MeasureItem,
	MeasureItemsBlock,
	MeasureItemsContainer,
	MeasureItemsTitle
} from './widgets';

interface AvailableMeasureFactor extends IndicatorMeasure {
	factorName?: string;
	factor?: Factor;
}

const MeasureFactor = (props: { factor: Factor, enum?: EnumForIndicator }) => {
	const {factor, enum: enumeration} = props;
	const {name, label} = factor;

	const ref = useRef<HTMLSpanElement>(null);
	const tooltip = useTooltip<HTMLSpanElement>({
		use: true,
		alignment: TooltipAlignment.CENTER,
		tooltip: <MeasureFactorTooltip>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.FACTOR}</span>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.FACTOR_NAME}:</span>
			<span>{name}</span>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.FACTOR_LABEL}:</span>
			<span>{label}</span>
			<span>{Lang.INDICATOR_WORKBENCH.PREPARE.FACTOR_TYPE}:</span>
			<span><FactorTypeLabel factor={factor}/></span>
			{enumeration != null
				? <>
					<span>{Lang.INDICATOR_WORKBENCH.PREPARE.FACTOR_ENUM}:</span>
					<span>{enumeration.name}</span>
				</>
				: null}
		</MeasureFactorTooltip>,
		target: ref
	});

	return <MeasureFactorLabel {...tooltip} ref={ref}>
		<span>{name || 'Noname Factor'}</span>
	</MeasureFactorLabel>;
};

const MeasureItems = (props: { label: string; measureFactors: Array<AvailableMeasureFactor>; enums: Array<EnumForIndicator> }) => {
	const {label, measureFactors, enums} = props;

	if (measureFactors.length === 0) {
		return null;
	}

	const legal = (amf: AvailableMeasureFactor): amf is Required<AvailableMeasureFactor> => amf.factor != null;
	const mfs: Array<Required<AvailableMeasureFactor>> = measureFactors.filter(legal);
	if (mfs.length === 0) {
		return null;
	}

	const methodGroups = mfs.reduce((map, measureFactor) => {
		const {method, factor} = measureFactor;
		let group = map[method];
		if (group == null) {
			group = [];
			map[method] = group;
		}
		group.push(factor);
		return map;
	}, {} as Record<MeasureMethod, Array<Factor>>);

	return <>
		<MeasureItemsTitle>{label}</MeasureItemsTitle>
		<MeasureItemsBlock>
			{Object.keys(methodGroups).sort((m1, m2) => {
				return MeasureMethodSort[m1 as MeasureMethod] - MeasureMethodSort[m2 as MeasureMethod];
			}).map(method => {
				const factors = methodGroups[method as MeasureMethod];
				return <Fragment key={method}>
					<MeasureItem>
						<FontAwesomeIcon icon={ICON_INDICATOR_MEASURE_METHOD}/>
						<MeasureMethodLabel measureMethod={method as MeasureMethod}/>
					</MeasureItem>
					<MeasureFactors>
						{factors.map(factor => {
							// eslint-disable-next-line
							const enumeration = enums.find(enumeration => enumeration.enumId == factor.enumId);
							return <MeasureFactor factor={factor} enum={enumeration}
							                      key={factor.factorId}/>;
						})}
					</MeasureFactors>
				</Fragment>;
			})}
		</MeasureItemsBlock>
	</>;
};

const AggregateItems = (props: { label: string; aggregates: Array<IndicatorAggregateArithmetic> }) => {
	const {label, aggregates} = props;

	if (aggregates.length === 0) {
		return null;
	}

	return <>
		<AggregateItemsTitle>{label}</AggregateItemsTitle>
		<AggregateItemsBlock>
			{aggregates.map(aggregate => {
				return <AggregateItem key={aggregate}>
					{aggregate.replace(/-/g, ' ')}
				</AggregateItem>;
			})}
		</AggregateItemsBlock>
	</>;
};

export const MeasureMethods = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const {data} = useStep({
		step: PrepareStep.MEASURE_METHODS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const filterMeasures = (func: (measure: MeasureMethod) => boolean): Array<AvailableMeasureFactor> => {
		const {factors = []} = data?.topic || {};
		return [
			...new Set((data?.indicator?.measures || [])
				.filter(({method}) => func(method))
				.map(({factorId, method}) => {
					// eslint-disable-next-line
					const factor = factors.find(factor => factor.factorId == factorId);
					return {factorId, factorName: factor?.name, factor, method};
				}))
		];
	};

	const geoMeasures = {
		key: 'geo',
		label: Lang.INDICATOR_WORKBENCH.PREPARE.GEO,
		measures: filterMeasures(isGeoMeasure)
	};
	const timePeriodMeasures = {
		key: 'time-period',
		label: Lang.INDICATOR_WORKBENCH.PREPARE.TIME_PERIOD,
		measures: filterMeasures(isTimePeriodMeasure)
	};
	const individualMeasures = {
		key: 'individual',
		label: Lang.INDICATOR_WORKBENCH.PREPARE.INDIVIDUAL,
		measures: filterMeasures(isIndividualMeasure)
	};
	const organizationMeasures = {
		key: 'organization',
		label: Lang.INDICATOR_WORKBENCH.PREPARE.ORGANIZATION,
		measures: filterMeasures(isOrganizationMeasure)
	};
	const categoryMeasures = {
		key: 'category',
		label: Lang.INDICATOR_WORKBENCH.PREPARE.CATEGORY,
		measures: filterMeasures(isCategoryMeasure)
	};

	const aggregates = data?.indicator?.factorId == null
		? [IndicatorAggregateArithmetic.COUNT]
		: [IndicatorAggregateArithmetic.COUNT, IndicatorAggregateArithmetic.SUM, IndicatorAggregateArithmetic.AVG,
			IndicatorAggregateArithmetic.MAX, IndicatorAggregateArithmetic.MIN];

	return <Step index={PrepareStep.MEASURE_METHODS} visible={visible} ref={ref}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>{Lang.INDICATOR_WORKBENCH.PREPARE.MEASURE_METHODS_TITLE}</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody visible={visible}>
			<MeasureItemsContainer>
				{[geoMeasures, timePeriodMeasures, individualMeasures, organizationMeasures, categoryMeasures]
					.map(({key, label, measures}) => {
						return <MeasureItems label={label} measureFactors={measures} enums={data?.enums || []}
						                     key={key}/>;
					})}
				<AggregateItems label={Lang.INDICATOR_WORKBENCH.PREPARE.AGGREGATE} aggregates={aggregates}/>
			</MeasureItemsContainer>
		</StepBody>
	</Step>;
};