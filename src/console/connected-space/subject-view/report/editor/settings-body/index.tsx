import React, { useEffect, useState } from 'react';
import { Report } from '../../../../../../services/tuples/report-types';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { useConsoleEventBus } from '../../../../../console-event-bus';
import { ConsoleEventTypes, FavoriteState } from '../../../../../console-event-bus-types';
import { ChartCountSettings } from '../chart-count-settings';
import { ChartMapSettings } from '../chart-map-settings';
import { ChartPieSettings } from '../chart-pie-settings';
import { ChartTreeSettings } from '../chart-tree-settings';
import { ChartTreemapSettings } from '../chart-treemap-settings';
import { ChartTruncationSettings } from '../chart-truncation-settings';
import { DimensionsSection } from '../dimensions';
import { EChartsGridSettings } from '../echarts/grid';
import { EChartsLegendSettings } from '../echarts/legend';
import { EChartsTitleSettings } from '../echarts/title';
import { EChartsXAxisSettings } from '../echarts/xaxis';
import { EChartsYAxisSettings } from '../echarts/yaxis';
import { IndicatorsSection } from '../indicators';
import { RectSection } from '../rect';
import { ChartTypeEditor } from './chart-type';
import { NamePropEditor } from './name-prop';
import { SettingsBodyContainer } from './widgets';

export const SettingsBody = (props: { subject: Subject, report: Report }) => {
	const { subject, report } = props;

	const { once, on, off } = useConsoleEventBus();
	const [ favoritePin, setFavoritePin ] = useState(false);
	useEffect(() => {
		once && once(ConsoleEventTypes.REPLY_FAVORITE_STATE, (state: FavoriteState) => {
			setFavoritePin(state === FavoriteState.PIN);
		}).fire(ConsoleEventTypes.ASK_FAVORITE_STATE);
	}, [ once ]);
	useEffect(() => {
		const onPinFavorite = () => setFavoritePin(true)
		const onUnpinFavorite = () => setFavoritePin(false)
		on && on(ConsoleEventTypes.PIN_FAVORITE, onPinFavorite);
		on && on(ConsoleEventTypes.UNPIN_FAVORITE, onUnpinFavorite);
		return () => {
			off && off(ConsoleEventTypes.PIN_FAVORITE, onPinFavorite);
			off && off(ConsoleEventTypes.UNPIN_FAVORITE, onUnpinFavorite);
		}
	}, [ on, off ]);


	return <SettingsBodyContainer favoritePin={favoritePin}>
		<NamePropEditor report={report}/>
		<ChartTypeEditor report={report}/>
		<IndicatorsSection subject={subject} report={report}/>
		<DimensionsSection subject={subject} report={report}/>
		<RectSection report={report}/>
		<EChartsTitleSettings report={report}/>
		<EChartsLegendSettings report={report}/>
		<ChartCountSettings report={report}/>
		<ChartTruncationSettings report={report}/>
		<ChartTreeSettings report={report}/>
		<ChartTreemapSettings report={report}/>
		<ChartMapSettings report={report}/>
		<ChartPieSettings report={report}/>
		<EChartsGridSettings report={report}/>
		<EChartsXAxisSettings report={report}/>
		<EChartsYAxisSettings report={report}/>
		{/*<DescriptionPropEditor report={report}/>*/}
	</SettingsBodyContainer>;
};