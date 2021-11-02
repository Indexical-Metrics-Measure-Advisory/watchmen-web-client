import {Indicator} from '@/services/data/indicators/types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_DETECT} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {IndicatorDetectButton} from './widgets';

export const IndicatorDetect = () => {
	const {once: onceGlobal, fire: fireGlobal} = useEventBus();
	const {fire} = useIndicatorsEventBus();

	const onDetectClicked = () => {
		onceGlobal(EventTypes.ALERT_HIDDEN, () => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
				// TODO send indicator detect request to remote
				return new Promise<Array<Indicator>>(resolve => {
					setTimeout(() => {
						resolve([]);
					}, 5000);
				});
			}, (indicators: Array<Indicator>) => {
				if (indicators.length === 0) {
					fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>No new indicator detected.</AlertLabel>);
				} else {
					fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
						`${indicators.length} new indicators detected, do you want to show them?`,
						() => {
							fireGlobal(EventTypes.HIDE_DIALOG);
							// TODO switch to list page
						},
						() => fireGlobal(EventTypes.HIDE_DIALOG));
				}
				fire(IndicatorsEventTypes.INDICATOR_DETECTED, indicators);
			}, () => {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					Failed to detect new indicator, contact administrator for more information.
				</AlertLabel>);
			});
		}).fire(EventTypes.SHOW_ALERT, <AlertLabel>
			Request sent, will be notified once detecting is accomplished.
		</AlertLabel>);
	};

	return <IndicatorDetectButton onClick={onDetectClicked}>
		<FontAwesomeIcon icon={ICON_DETECT}/>
		<span>Detect New Indicators</span>
	</IndicatorDetectButton>;
};