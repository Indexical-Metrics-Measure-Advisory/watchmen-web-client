import {Factor} from '@/services/data/tuples/factor-types';
import {IndicatorAggregateArithmetic, IndicatorMeasure, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {
	detectMeasures,
	isCategoryMeasure,
	isGeoMeasure,
	isIndividualMeasure,
	isOrganizationMeasure,
	isTimePeriodMeasure
} from '@/services/data/tuples/indicator-utils';
import {EnumForIndicator} from '@/services/data/tuples/query-indicator-types';
import {ICON_INDICATOR_MEASURE_METHOD} from '@/widgets/basic/constants';
import {MeasureMethodLabel} from '@/widgets/basic/measure-method-label';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Fragment, useRef} from 'react';
import {EmphaticSinkingLabel, Step, StepBody, StepTitle} from '../../step-widgets';
import {MeasureMethodSort} from '../../utils/sort';
import {MeasureFactor} from '../measure-factor';
import {IndicatorDeclarationStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';
import {
	AggregateItem,
	AggregateItemsBlock,
	AggregateItemsTitle,
	MeasureFactors,
	MeasureItemsBlock,
	MeasureItemsContainer,
	MeasureItemsTitle,
	MeasureMethodItem
} from './widgets';

interface AvailableMeasureFactor extends IndicatorMeasure {
	factorName?: string;
	factor?: Factor;
}

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
					<MeasureMethodItem>
						<FontAwesomeIcon icon={ICON_INDICATOR_MEASURE_METHOD}/>
						<MeasureMethodLabel measureMethod={method as MeasureMethod}/>
					</MeasureMethodItem>
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
		step: IndicatorDeclarationStep.MEASURE_METHODS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const measures = detectMeasures(data?.topic);
	const filterMeasures = (func: (measure: MeasureMethod) => boolean): Array<AvailableMeasureFactor> => {
		const {factors = []} = data?.topic || {};
		return measures.filter(({method}) => func(method))
			.map(({factorId, method}) => {
				// eslint-disable-next-line
				const factor = factors.find(factor => factor.factorId == factorId);
				return {factorId, factorName: factor?.name, factor, method};
			});
	};

	const geoMeasures = {
		key: 'geo',
		label: Lang.INDICATOR_WORKBENCH.INDICATOR.GEO,
		measures: filterMeasures(isGeoMeasure)
	};
	const timePeriodMeasures = {
		key: 'time-period',
		label: Lang.INDICATOR_WORKBENCH.INDICATOR.TIME_PERIOD,
		measures: filterMeasures(isTimePeriodMeasure)
	};
	const individualMeasures = {
		key: 'individual',
		label: Lang.INDICATOR_WORKBENCH.INDICATOR.INDIVIDUAL,
		measures: filterMeasures(isIndividualMeasure)
	};
	const organizationMeasures = {
		key: 'organization',
		label: Lang.INDICATOR_WORKBENCH.INDICATOR.ORGANIZATION,
		measures: filterMeasures(isOrganizationMeasure)
	};
	const categoryMeasures = {
		key: 'category',
		label: Lang.INDICATOR_WORKBENCH.INDICATOR.CATEGORY,
		measures: filterMeasures(isCategoryMeasure)
	};

	const aggregates = data?.indicator?.factorId == null
		? [IndicatorAggregateArithmetic.COUNT]
		: [IndicatorAggregateArithmetic.COUNT, IndicatorAggregateArithmetic.SUM, IndicatorAggregateArithmetic.AVG,
			IndicatorAggregateArithmetic.MAX, IndicatorAggregateArithmetic.MIN];

	return <Step index={IndicatorDeclarationStep.MEASURE_METHODS} visible={visible} ref={ref}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>{Lang.INDICATOR_WORKBENCH.INDICATOR.MEASURE_METHODS_TITLE}</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody visible={visible}>
			<MeasureItemsContainer>
				{[geoMeasures, timePeriodMeasures, individualMeasures, organizationMeasures, categoryMeasures]
					.map(({key, label, measures}) => {
						return <MeasureItems label={label} measureFactors={measures} enums={data?.enums || []}
						                     key={key}/>;
					})}
				<AggregateItems label={Lang.INDICATOR_WORKBENCH.INDICATOR.AGGREGATE} aggregates={aggregates}/>
			</MeasureItemsContainer>
		</StepBody>
	</Step>;
};