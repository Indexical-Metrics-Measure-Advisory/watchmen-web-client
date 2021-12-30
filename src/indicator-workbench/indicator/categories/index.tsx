import {Lang} from '@/widgets/langs';
import {useRef} from 'react';
import {SearchTextEventBusProvider} from '../../search-text/search-text-event-bus';
import {EmphaticSinkingLabel, Step, StepBody, StepTitle} from '../../step-widgets';
import {IndicatorDeclarationStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';
import {CategoryInput} from './category-input';
import {CategoriesContainer} from './widgets';

export const Categories = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const {data} = useStep({
		step: IndicatorDeclarationStep.CATEGORIES,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed || data?.indicator == null) {
		return null;
	}

	return <Step index={IndicatorDeclarationStep.CATEGORIES} visible={visible} ref={ref}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				{Lang.INDICATOR_WORKBENCH.INDICATOR.CATEGORIES_TITLE}
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody visible={visible}>
			<CategoriesContainer>
				<SearchTextEventBusProvider>
					<CategoryInput indicator={data!.indicator!} index={1} name={'category1'}/>
				</SearchTextEventBusProvider>
				<SearchTextEventBusProvider>
					<CategoryInput indicator={data!.indicator!} index={2} name={'category2'}/>
				</SearchTextEventBusProvider>
				<SearchTextEventBusProvider>
					<CategoryInput indicator={data!.indicator!} index={3} name={'category3'}/>
				</SearchTextEventBusProvider>
			</CategoriesContainer>
		</StepBody>
	</Step>;
};