import {IndicatorAggregateArithmetic, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {
	isCategoryMeasure,
	isGeoMeasure,
	isIndividualMeasure,
	isOrganizationMeasure,
	isTimePeriodMeasure
} from '@/services/data/tuples/indicator-utils';
import {EmphaticSinkingLabel, Step, StepBody, StepTitle, useStep} from '../step-widgets';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';
import {
	AggregateItem,
	AggregateItemsBlock,
	AggregateItemsTitle,
	MeasureItem,
	MeasureItemsBlock,
	MeasureItemsContainer,
	MeasureItemsTitle
} from './widgets';

const MeasureItems = (props: { label: string; measures: Array<MeasureMethod> }) => {
	const {label, measures} = props;

	if (measures.length === 0) {
		return null;
	}

	return <>
		<MeasureItemsTitle>{label}</MeasureItemsTitle>
		<MeasureItemsBlock>
			{measures.map(measure => {
				return <MeasureItem key={measure}>
					{measure.replace(/-/g, ' ')}
				</MeasureItem>;
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
	const {constructed, setConstructed, visible, setVisible} = useConstructed();
	const {data} = useStep({
		step: PrepareStep.MEASURE_METHODS,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const filterMeasures = (func: (measure: MeasureMethod) => boolean) => {
		return [...new Set((data?.indicator?.measures || []).filter(func))];
	};

	const geoMeasures = {label: 'GEO', measures: filterMeasures(isGeoMeasure)};
	const timePeriodMeasures = {label: 'Time Period', measures: filterMeasures(isTimePeriodMeasure)};
	const individualMeasures = {label: 'Individual', measures: filterMeasures(isIndividualMeasure)};
	const organizationMeasures = {label: 'Organization', measures: filterMeasures(isOrganizationMeasure)};
	// TODO to view boolean factor name and enum name when measure is categorized
	const categoryMeasures = {label: 'Category', measures: filterMeasures(isCategoryMeasure)};

	return <Step index={3} visible={visible}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				Available measures of current indicator were detected automatically.
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody>
			<MeasureItemsContainer>
				{[geoMeasures, timePeriodMeasures, individualMeasures, organizationMeasures, categoryMeasures]
					.map(({label, measures}) => {
						return <MeasureItems label={label} measures={measures} key={label}/>;
					})}
				<AggregateItems label="Aggregate" aggregates={[
					IndicatorAggregateArithmetic.COUNT, IndicatorAggregateArithmetic.SUM, IndicatorAggregateArithmetic.AVG,
					IndicatorAggregateArithmetic.MAX, IndicatorAggregateArithmetic.MIN
				]}/>
			</MeasureItemsContainer>
		</StepBody>
	</Step>;
};