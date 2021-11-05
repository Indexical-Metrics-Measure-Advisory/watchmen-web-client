import {MeasureMethod} from '@/services/data/tuples/indicator-types';
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
import {MeasureItem, MeasuresItemsBlock, MeasuresItemsContainer, MeasuresItemsTitle} from './widgets';

const MeasuresItems = (props: { label: string; measures: Array<MeasureMethod> }) => {
	const {label, measures} = props;

	if (measures.length === 0) {
		return null;
	}

	return <>
		<MeasuresItemsTitle>{label}</MeasuresItemsTitle>
		<MeasuresItemsBlock>
			{measures.map(measure => {
				return <MeasureItem key={measure}>
					{measure.replace(/-/g, ' ')}
				</MeasureItem>;
			})}
		</MeasuresItemsBlock>
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
	const categoryMeasures = {label: 'Category', measures: filterMeasures(isCategoryMeasure)};

	return <Step index={3} visible={visible}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				Available measures of selected indicator were detected automatically.
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody>
			<MeasuresItemsContainer>
				{[geoMeasures, timePeriodMeasures, individualMeasures, organizationMeasures, categoryMeasures]
					.map(({label, measures}) => {
						return <MeasuresItems label={label} measures={measures} key={label}/>;
					})}
				<MeasuresItems label="Count" measures={[MeasureMethod.COUNT]}/>
			</MeasuresItemsContainer>
		</StepBody>
	</Step>;
};