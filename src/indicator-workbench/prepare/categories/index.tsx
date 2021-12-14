import {noop} from '@/services/utils';
import {Lang} from '@/widgets/langs';
import {useSavingQueue} from '@/widgets/saving-queue';
import {useRef} from 'react';
import {SearchItem, SearchItems, SearchText} from '../../search-text';
import {SearchTextEventBusProvider} from '../../search-text/search-text-event-bus';
import {EmphaticSinkingLabel, Step, StepBody, StepTitle} from '../../step-widgets';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {PrepareStep} from '../types';
import {useConstructed} from '../use-constructed';
import {useStep} from '../use-step';
import {CategoriesContainer, CategoryContainer, CategoryIndexLabel} from './widgets';

export const Categories = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useIndicatorsEventBus();
	const saveQueue = useSavingQueue();
	const {constructed, setConstructed, visible, setVisible} = useConstructed(ref);
	const {data} = useStep({
		step: PrepareStep.CATEGORIES,
		active: () => setConstructed(true),
		done: () => setConstructed(true),
		dropped: () => setVisible(false)
	});

	if (!constructed) {
		return null;
	}

	const save = () => saveQueue.replace(() => {
		fire(IndicatorsEventTypes.SAVE_INDICATOR, data!.indicator!, noop);
	}, 500);
	const searchNoX = (prop: 'category1' | 'category2' | 'category3') => async (text: string): Promise<SearchItems<SearchItem>> => {
		data!.indicator![prop] = text;
		save();
		return new Promise<SearchItems<SearchItem>>(resolve => {
			fire(IndicatorsEventTypes.ASK_INDICATOR_CATEGORY,
				data!.indicator!,
				(() => {
					switch (prop) {
						case 'category1':
							return [];
						case 'category2':
							return [data?.indicator?.category1].map(x => x ?? '');
						case 'category3':
							return [data?.indicator?.category1, data?.indicator?.category2].map(x => x ?? '');
					}
				})(),
				(candidates: Array<string>) => {
					resolve((candidates || []).map(candidate => {
						return {key: candidate, text: candidate};
					}));
				}
			);
		});
	};
	const onNoXSelectionChange = (prop: 'category1' | 'category2' | 'category3') => async (item: SearchItem) => {
		data!.indicator![prop] = item.key;
		save();
	};

	return <Step index={PrepareStep.CATEGORIES} visible={visible} ref={ref}>
		<StepTitle visible={visible}>
			<EmphaticSinkingLabel>
				{Lang.INDICATOR_WORKBENCH.PREPARE.CATEGORIES_TITLE}
			</EmphaticSinkingLabel>
		</StepTitle>
		<StepBody visible={visible}>
			<CategoriesContainer>
				<CategoryContainer>
					<CategoryIndexLabel>#1</CategoryIndexLabel>
					<SearchTextEventBusProvider>
						<SearchText search={searchNoX('category1')}
						            onSelectionChange={onNoXSelectionChange('category1')}
						            alwaysShowSearchInput={true}
						            hideButton={true}/>
					</SearchTextEventBusProvider>
				</CategoryContainer>
				<CategoryContainer>
					<CategoryIndexLabel>#2</CategoryIndexLabel>
					<SearchTextEventBusProvider>
						<SearchText search={searchNoX('category2')}
						            onSelectionChange={onNoXSelectionChange('category2')}
						            alwaysShowSearchInput={true}
						            hideButton={true}/>
					</SearchTextEventBusProvider>
				</CategoryContainer>
				<CategoryContainer>
					<CategoryIndexLabel>#3</CategoryIndexLabel>
					<SearchTextEventBusProvider>
						<SearchText search={searchNoX('category3')}
						            onSelectionChange={onNoXSelectionChange('category3')}
						            alwaysShowSearchInput={true}
						            hideButton={true}/>
					</SearchTextEventBusProvider>
				</CategoryContainer>
			</CategoriesContainer>
		</StepBody>
	</Step>;
};