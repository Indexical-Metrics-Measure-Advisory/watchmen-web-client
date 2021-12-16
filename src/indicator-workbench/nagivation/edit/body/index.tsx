import {IndicatorCandidates} from '@/indicator-workbench/nagivation/edit/body/indicator-candidates';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {NavigationEditEventBusProvider} from './navigation-edit-event-bus';
import {NavigationRoot} from './navigation-root';
import {PickedIndicators} from './picked-indicators';
import {BodyContainer, BodyPalette, PaletteColumn} from './widgets';

interface Indicators {
	loaded: boolean;
	data: Array<Indicator>;
}

const Palette = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const {fire} = useNavigationEventBus();
	const [paletteId] = useState(v4());
	const [rootId] = useState(v4());
	const [indicators, setIndicators] = useState<Indicators>({loaded: false, data: []});
	useEffect(() => {
		fire(NavigationEventTypes.ASK_INDICATORS, (indicators: Array<Indicator>) => {
			setIndicators({loaded: true, data: indicators});
		});
	}, [fire, navigation]);

	if (!indicators.loaded) {
		return null;
	}

	return <BodyPalette id={paletteId}>
		<PaletteColumn>
			<NavigationRoot id={rootId} navigation={navigation}/>
		</PaletteColumn>
		<PaletteColumn>
			<PickedIndicators rootId={rootId} paletteId={paletteId}
			                  navigation={navigation} indicators={indicators.data}/>
			<IndicatorCandidates paletteId={paletteId} rootId={rootId}
			                     navigation={navigation} indicators={indicators.data}/>
		</PaletteColumn>
	</BodyPalette>;
};

export const NavigationEditPageBody = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	return <NavigationEditEventBusProvider>
		<BodyContainer>
			<Palette navigation={navigation}/>
		</BodyContainer>
	</NavigationEditEventBusProvider>;
};