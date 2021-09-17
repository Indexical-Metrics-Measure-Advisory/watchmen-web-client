import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React, {useEffect, useState} from 'react';
// noinspection ES6PreferShortImport
import {useConsoleEventBus} from '../../../../console-event-bus';
// noinspection ES6PreferShortImport
import {ConsoleEventTypes, FavoriteState} from '../../../../console-event-bus-types';
import {ChartTruncationSettings} from '../chart-truncation-settings';
import {DimensionsSection} from '../dimensions';
import {IndicatorsSection} from '../indicators';
import {ChartTypeEditor} from './chart-type';
import {SettingsBodyContainer} from './widgets';

export const SettingsBody = (props: { subject: Subject, report: Report }) => {
	const {subject, report} = props;

	const {once, on, off} = useConsoleEventBus();
	const [favoritePin, setFavoritePin] = useState(false);
	useEffect(() => {
		once && once(ConsoleEventTypes.REPLY_FAVORITE_STATE, (state: FavoriteState) => {
			setFavoritePin(state === FavoriteState.PIN);
		}).fire(ConsoleEventTypes.ASK_FAVORITE_STATE);
	}, [once]);
	useEffect(() => {
		const onPinFavorite = () => setFavoritePin(true);
		const onUnpinFavorite = () => setFavoritePin(false);
		on && on(ConsoleEventTypes.PIN_FAVORITE, onPinFavorite);
		on && on(ConsoleEventTypes.UNPIN_FAVORITE, onUnpinFavorite);
		return () => {
			off && off(ConsoleEventTypes.PIN_FAVORITE, onPinFavorite);
			off && off(ConsoleEventTypes.UNPIN_FAVORITE, onUnpinFavorite);
		};
	}, [on, off]);

	return <SettingsBodyContainer favoritePin={favoritePin}>
		<ChartTypeEditor report={report}/>
		<IndicatorsSection subject={subject} report={report}/>
		<DimensionsSection subject={subject} report={report}/>

		<ChartTruncationSettings report={report}/>
		{/*<ToolboxSection report={report}/>*/}
		{/*<DescriptionPropEditor report={report}/>*/}
	</SettingsBodyContainer>;
};