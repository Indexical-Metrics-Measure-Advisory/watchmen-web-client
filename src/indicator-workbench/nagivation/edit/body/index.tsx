import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {IndicatorRoot} from './indicator-root';
import {MoreIndicators} from './more-indicators';
import {NavigationEditEventBusProvider} from './navigation-edit-event-bus';
import {NavigationRoot} from './navigation-root';
import {buildCategoryNodes} from './utils';
import {BodyContainer, BodyPalette, PaletteColumn} from './widgets';

interface Indicators {
	loaded: boolean;
	data: Array<Indicator>;
}

export const NavigationEditPageBody = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const {fire} = useNavigationEventBus();
	const [indicators, setIndicators] = useState<Indicators>({loaded: false, data: []});
	useEffect(() => {
		fire(NavigationEventTypes.ASK_INDICATORS, (indicators: Array<Indicator>) => {
			setIndicators({loaded: true, data: indicators});
		});
	}, [fire]);

	if (!indicators.loaded) {
		return null;
	}

	const {picked, candidates} = buildCategoryNodes(navigation, indicators.data);

	return <NavigationEditEventBusProvider>
		<BodyContainer>
			<BodyPalette>
				<PaletteColumn>
					<NavigationRoot navigation={navigation}/>
				</PaletteColumn>
				<PaletteColumn>
					{picked.map(picked => {
						return <IndicatorRoot key={v4()} indicator={picked.indicator}/>;
					})}
					<MoreIndicators candidates={candidates}/>
				</PaletteColumn>
			</BodyPalette>
		</BodyContainer>
	</NavigationEditEventBusProvider>;
};