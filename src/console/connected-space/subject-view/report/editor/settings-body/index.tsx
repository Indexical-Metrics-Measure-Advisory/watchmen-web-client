import React from 'react';
import { Report } from '../../../../../../services/tuples/report-types';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { ChartCountSettings } from '../chart-count-settings';
import { DimensionsSection } from '../dimensions';
import { EChartsGridSettings } from '../echarts/grid';
import { EChartsLegendSettings } from '../echarts/legend';
import { EChartsTitleSettings } from '../echarts/title';
import { EChartsXAxisSettings } from '../echarts/xaxis';
import { IndicatorsSection } from '../indicators';
import { RectSection } from '../rect';
import { BasicStylesSection } from '../styles';
import { ChartTypeEditor } from './chart-type';
import { DescriptionPropEditor } from './description-prop';
import { NamePropEditor } from './name-prop';
import { SettingsBodyContainer } from './widgets';

export const SettingsBody = (props: { subject: Subject, report: Report }) => {
	const { subject, report } = props;

	return <SettingsBodyContainer>
		<NamePropEditor report={report}/>
		<ChartTypeEditor report={report}/>
		<IndicatorsSection subject={subject} report={report}/>
		<DimensionsSection subject={subject} report={report}/>
		<RectSection report={report}/>
		<ChartCountSettings report={report}/>
		<EChartsTitleSettings report={report}/>
		<EChartsLegendSettings report={report}/>
		<EChartsGridSettings report={report}/>
		<EChartsXAxisSettings report={report}/>
		<BasicStylesSection report={report}/>
		<DescriptionPropEditor report={report}/>
	</SettingsBodyContainer>;
};