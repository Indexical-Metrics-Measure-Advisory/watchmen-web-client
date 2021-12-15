import {listIndicators} from '@/services/data/tuples/indicator';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect, useState} from 'react';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';

interface IndicatorState {
	loaded: boolean;
	data: Array<Indicator>;
}

type AskingRequest = (indicators: Array<Indicator>) => void;
type AskingRequestQueue = Array<AskingRequest>;

export const Indicators = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useNavigationEventBus();
	const [loading, setLoading] = useState(false);
	const [queue] = useState<AskingRequestQueue>([]);
	const [state, setState] = useState<IndicatorState>({loaded: false, data: []});
	useEffect(() => {
		const onAskIndicators = (onData: (indicators: Array<Indicator>) => void) => {
			if (state.loaded) {
				onData(state.data);
			} else if (loading) {
				queue.push(onData);
			} else {
				setLoading(true);

				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await listIndicators(),
					(indicators: Array<Indicator>) => {
						setState({loaded: true, data: indicators});
						setLoading(false);
						onData(indicators);
					}, () => {
						onData([]);
						setLoading(false);
					});
			}
		};
		if (!loading && queue.length !== 0) {
			queue.forEach(onData => onData(state.data));
			// clear queue
			queue.length = 0;
		}
		on(NavigationEventTypes.ASK_INDICATORS, onAskIndicators);
		return () => {
			off(NavigationEventTypes.ASK_INDICATORS, onAskIndicators);
		};
	}, [fireGlobal, on, off, loading, queue, state.loaded, state.data]);

	return <Fragment/>;
};