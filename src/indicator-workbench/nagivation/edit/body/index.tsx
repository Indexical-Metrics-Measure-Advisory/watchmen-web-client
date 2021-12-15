import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {BlockCurves} from './block-curves';
import {IndicatorRoot} from './indicator-root';
import {MoreIndicators} from './more-indicators';
import {NavigationEditEventBusProvider} from './navigation-edit-event-bus';
import {NavigationRoot} from './navigation-root';
import {CategoryNodes} from './types';
import {buildCategoryNodes} from './utils';
import {BodyContainer, BodyPalette, PaletteColumn} from './widgets';

interface Indicators {
	loaded: boolean;
	data: Array<Indicator>;
}

export const NavigationEditPageBody = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const {fire} = useNavigationEventBus();
	const [rootId] = useState(v4());
	const [nodes, setNodes] = useState<CategoryNodes>({picked: [], candidates: []});
	const [indicators, setIndicators] = useState<Indicators>({loaded: false, data: []});
	useEffect(() => {
		fire(NavigationEventTypes.ASK_INDICATORS, (indicators: Array<Indicator>) => {
			setNodes(buildCategoryNodes(navigation, indicators));
			setIndicators({loaded: true, data: indicators});
		});
	}, [fire, navigation]);

	if (!indicators.loaded) {
		return null;
	}

	return <NavigationEditEventBusProvider>
		<BodyContainer>
			<BodyPalette>
				<PaletteColumn>
					<NavigationRoot id={rootId} navigation={navigation}/>
				</PaletteColumn>
				<PaletteColumn>
					{nodes.picked.map(picked => {
						return <IndicatorRoot parentId={rootId} indicator={picked.indicator} key={picked.id}/>;
					})}
					<MoreIndicators rootId={rootId} candidates={nodes.candidates}/>
				</PaletteColumn>
				<BlockCurves curves={[]}/>
			</BodyPalette>
		</BodyContainer>
	</NavigationEditEventBusProvider>;
};