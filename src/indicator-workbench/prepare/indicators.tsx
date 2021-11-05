import {fetchIndicator} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect, useState} from 'react';
import {CreateOrFind} from './create-or-find';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from './indicators-event-bus-types';
import {MeasureMethods} from './measure-methods';
import {PickTopic} from './pick-topic';
import {Relevant} from './relevant';
import {SaveIndicator} from './save-indicator';
import {PrepareStep} from './types';
import {createIndicator} from './utils';
import {IndicatorsContainer} from './widgets';

const IndicatorState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useIndicatorsEventBus();
	const [, setData] = useState<IndicatorsData>({});
	useEffect(() => {
		const onCreateIndicator = (onCreated: (indicator: Indicator) => void) => {
			const indicator = createIndicator();
			setData({indicator});
			onCreated(indicator);
		};
		on(IndicatorsEventTypes.CREATE_INDICATOR, onCreateIndicator);
		return () => {
			off(IndicatorsEventTypes.CREATE_INDICATOR, onCreateIndicator);
		};
	}, [on, off]);
	useEffect(() => {
		const onPickIndicator = async (indicatorId: IndicatorId, onData: (data: IndicatorsData) => void) => {
			try {
				const data = await fetchIndicator(indicatorId);
				setData(data);
				onData(data);
			} catch {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					Failed to load indicator, retry again or contact your administrator for more information.
				</AlertLabel>);
			}
		};
		on(IndicatorsEventTypes.PICK_INDICATOR, onPickIndicator);
		return () => {
			off(IndicatorsEventTypes.PICK_INDICATOR, onPickIndicator);
		};
	}, [on, off, fireGlobal]);
	useEffect(() => {
		const onPickTopic = async (data: IndicatorsData, onData: (data: IndicatorsData) => void) => {
			onData(data);
		};
		on(IndicatorsEventTypes.PICK_TOPIC, onPickTopic);
		return () => {
			off(IndicatorsEventTypes.PICK_TOPIC, onPickTopic);
		};
	}, [on, off]);

	return <Fragment/>;
};

export const Indicators = () => {
	const {fire} = useIndicatorsEventBus();
	useEffect(() => {
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.CREATE_OR_FIND);
	}, [fire]);

	return <IndicatorsContainer>
		<IndicatorState/>
		<CreateOrFind/>
		<PickTopic/>
		<MeasureMethods/>
		<SaveIndicator/>
		<Relevant/>
	</IndicatorsContainer>;
};