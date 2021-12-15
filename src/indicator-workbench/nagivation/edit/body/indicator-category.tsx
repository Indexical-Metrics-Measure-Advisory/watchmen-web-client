import {Lang} from '@/widgets/langs';
import {IndicatorRoot} from './indicator-root';
import {INDICATOR_UNCLASSIFIED, IndicatorCategoryContent} from './types';
import {IndicatorCategoryColumn, IndicatorCategoryContainer, IndicatorCategoryNode} from './widgets';

export const IndicatorCategory = (props: { category: IndicatorCategoryContent }) => {
	const {category} = props;

	const name = category.name === INDICATOR_UNCLASSIFIED ? Lang.INDICATOR_WORKBENCH.NAVIGATION.UNCLASSIFIED_CATEGORY : category.name;

	return <IndicatorCategoryContainer>
		<IndicatorCategoryColumn>
			<IndicatorCategoryNode>
				{name}
			</IndicatorCategoryNode>
		</IndicatorCategoryColumn>
		<IndicatorCategoryColumn>
			{(category.indicators || []).map(indicator => {
				return <IndicatorRoot indicator={indicator} key={indicator.indicatorId}/>;
			})}
		</IndicatorCategoryColumn>
	</IndicatorCategoryContainer>;
};