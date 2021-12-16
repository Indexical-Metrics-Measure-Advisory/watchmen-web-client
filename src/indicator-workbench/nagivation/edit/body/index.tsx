import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useRef, useState} from 'react';
import {v4} from 'uuid';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {IndicatorCandidates} from './indicator-candidates';
import {NavigationEditEventBusProvider, useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {NavigationRoot} from './navigation-root';
import {PickedIndicators} from './picked-indicators';
import {BodyContainer, BodyPalette, PaletteColumn} from './widgets';

interface Indicators {
	loaded: boolean;
	data: Array<Indicator>;
}

const Palette = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useNavigationEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();
	const [paletteId] = useState(v4());
	const [rootId] = useState(v4());
	const [indicators, setIndicators] = useState<Indicators>({loaded: false, data: []});
	useEffect(() => {
		fire(NavigationEventTypes.ASK_INDICATORS, (indicators: Array<Indicator>) => {
			setIndicators({loaded: true, data: indicators});
		});
	}, [fire, navigation]);
	useEffect(() => {
		if (ref.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				// must do await, or will not trigger repaint
				// seems layout didn't finish yet
				setTimeout(() => fireEdit(NavigationEditEventTypes.REPAINT), 100);
			});
			resizeObserver.observe(ref.current);
			return () => resizeObserver.disconnect();
		}
	}, [fireEdit]);

	if (!indicators.loaded) {
		return null;
	}

	return <BodyPalette id={paletteId} ref={ref}>
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