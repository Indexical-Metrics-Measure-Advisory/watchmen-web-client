import {Lang} from '@/widgets/langs';
import {useState} from 'react';
import {v4} from 'uuid';
import {IndicatorRoot} from './indicator-root';
import {MoreIndicators} from './more-indicators';
import {HierarchicalIndicatorCategoryContent, INDICATOR_UNCLASSIFIED, IndicatorCategoryContent} from './types';
import {useCurve} from './use-curve';
import {
	IndicatorCategoryColumn,
	IndicatorCategoryContainer,
	IndicatorCategoryCurve,
	IndicatorCategoryNode,
	IndicatorCategoryNodeContainer
} from './widgets';

export const IndicatorCategory = (props: {
	paletteId: string;
	parentId: string;
	category: IndicatorCategoryContent;
}) => {
	const {paletteId, parentId, category} = props;

	const [categoryId] = useState(v4());
	const {ref, curve} = useCurve(parentId);

	const {sub: hasSubCategories, data: subCategories} = (() => {
		const children = (category as HierarchicalIndicatorCategoryContent).categories;
		return {sub: children != null && children.length !== 0, data: children || []};
	})();
	const name = category.name === INDICATOR_UNCLASSIFIED ? Lang.INDICATOR_WORKBENCH.NAVIGATION.UNCLASSIFIED_CATEGORY : category.name;

	return <IndicatorCategoryContainer>
		<IndicatorCategoryColumn>
			<IndicatorCategoryNodeContainer>
				<IndicatorCategoryNode id={categoryId} ref={ref}>
					{name}
				</IndicatorCategoryNode>
				{curve == null
					? null
					: <IndicatorCategoryCurve rect={curve}>
						<g>
							<path
								d={`M${curve.startX},${curve.startY} C${(curve.endX - curve.startX) / 4 * 3},${curve.startY} ${(curve.endX - curve.startX) / 4},${curve.endY} ${curve.endX},${curve.endY}`}/>
						</g>
					</IndicatorCategoryCurve>}
			</IndicatorCategoryNodeContainer>
		</IndicatorCategoryColumn>
		<IndicatorCategoryColumn>
			{(category.indicators || []).map(indicator => {
				return <IndicatorRoot paletteId={paletteId} parentId={categoryId} indicator={indicator}
				                      key={indicator.indicatorId}/>;
			})}
			{hasSubCategories
				? <MoreIndicators paletteId={paletteId} parentId={categoryId} candidates={subCategories}/>
				: null}
		</IndicatorCategoryColumn>
	</IndicatorCategoryContainer>;
};