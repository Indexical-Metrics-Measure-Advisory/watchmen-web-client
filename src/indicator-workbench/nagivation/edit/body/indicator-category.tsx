import {Lang} from '@/widgets/langs';
import {useState} from 'react';
import {v4} from 'uuid';
import {IndicatorRoot} from './indicator-root';
import {INDICATOR_UNCLASSIFIED, IndicatorCategoryContent} from './types';
import {IndicatorCategoryColumn, IndicatorCategoryContainer, IndicatorCategoryNode} from './widgets';

export const IndicatorCategory = (props: { category: IndicatorCategoryContent }) => {
	const {category} = props;

	const [categoryId] = useState(v4());

	const name = category.name === INDICATOR_UNCLASSIFIED ? Lang.INDICATOR_WORKBENCH.NAVIGATION.UNCLASSIFIED_CATEGORY : category.name;

	return <IndicatorCategoryContainer>
		<IndicatorCategoryColumn>
			<IndicatorCategoryNode id={categoryId}>
				{name}
			</IndicatorCategoryNode>
		</IndicatorCategoryColumn>
		<IndicatorCategoryColumn>
			{(category.indicators || []).map(indicator => {
				return <IndicatorRoot parentId={categoryId} indicator={indicator} key={indicator.indicatorId}/>;
			})}
		</IndicatorCategoryColumn>
	</IndicatorCategoryContainer>;
};