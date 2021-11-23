import {fetchIndicator, saveIndicator} from '@/services/data/tuples/indicator';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {Fragment, useEffect, useState} from 'react';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsData, IndicatorsEventTypes} from './indicators-event-bus-types';
import {createIndicator} from './utils';

export const IndicatorState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useIndicatorsEventBus();
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
					{Lang.INDICATOR_WORKBENCH.PREPARE.FAILED_TO_LOAD_INDICATOR}
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
	useEffect(() => {
		const onSaveIndicator = (indicator: Indicator, onSaved: (indicator: Indicator, saved: boolean) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveIndicator(indicator),
				() => {
					fire(IndicatorsEventTypes.INDICATOR_SAVED, indicator);
					onSaved(indicator, true);
				},
				() => {
					fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.ERROR.UNPREDICTED}</AlertLabel>, () => {
						onSaved(indicator, false);
					});
				});
		};
		on(IndicatorsEventTypes.SAVE_INDICATOR, onSaveIndicator);
		return () => {
			off(IndicatorsEventTypes.SAVE_INDICATOR, onSaveIndicator);
		};
	}, [on, off, fire, fireGlobal]);

	return <Fragment/>;
};