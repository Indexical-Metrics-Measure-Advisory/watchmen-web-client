import {ConnectedSpace} from '../../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../../services/tuples/subject-types';
import {Report} from '../../../../../services/tuples/report-types';
import {ReportDataSetAndPaletteContainer, TabHeader, TabHeaders} from './widget';
import {useReportViewEventBus} from '../../report-view-event-bus';
import React, {useEffect, useState} from 'react';
import {ReportViewEventTypes} from '../../report-view-event-bus-types';
import {Lang} from '../../../../../langs';
import {canHoldLegend, canHoldTitle, canUseGrid, isEChart} from '../../../../../services/tuples/echarts/echarts-utils';
import {BasicStyleSection} from '../basic-style';
import {TabBody} from './tab-body';
import {EChartsTitleSettings} from '../echarts/title';
import {EChartsTitleSubtextSettings} from '../echarts/title/subtext';
import {EChartsLegendSettings} from '../echarts/legend';
import {useChartType} from '../settings-effect/use-chart-type';
import {EChartsGridSettings} from '../echarts/grid';
import {ChartCountSettings} from '../chart-count-settings';
import {
	isBarChart,
	isCountChart,
	isDoughnutChart,
	isLineChart,
	isMapChart,
	isNightingaleChart,
	isPieChart,
	isSunburstChart,
	isTreeChart,
	isTreemapChart
} from '../../../../../services/tuples/chart-utils';
import {ChartBarSettings} from '../chart-bar-settings';
import {ChartPieSettings} from '../chart-pie-settings';
import {ChartTreeSettings} from '../chart-tree-settings';
import {ChartTreemapSettings} from '../chart-treemap-settings';
import {ChartMapSettings} from '../chart-map-settings';

enum TABS {
	DATASET = 'dataset',
	BASIC_STYLE = 'basic-style',
	TITLE = 'title',
	SUBTITLE = 'subtitle',
	LEGEND = 'legend',
	GRID = 'grid',

	COUNT_SETTINGS = 'count-settings',
	BAR_SETTINGS = 'bar-settings',
	PIE_SETTINGS = 'pie-settings',
	TREE_SETTINGS = 'tree-settings',
	TREEMAP_SETTINGS = 'treemap-settings',
	MAP_SETTINGS = 'map-settings'
}

export const ReportDataSetAndPalette = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {subject, report} = props;
	const {chart} = report;

	const {on, off} = useReportViewEventBus();
	const [visible, setVisible] = useState(false);
	const [activeTab, setActiveTab] = useState('');
	useEffect(() => {
		const onToggleDataSet = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}
			if (visible) {
				if (activeTab !== TABS.DATASET) {
					setActiveTab(TABS.DATASET);
				} else {
					setVisible(false);
				}
			} else {
				setActiveTab(TABS.DATASET);
				setVisible(true);
			}
		};
		const onTogglePalette = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}

			if (visible) {
				if (activeTab === TABS.DATASET || activeTab === '') {
					setActiveTab(TABS.BASIC_STYLE);
				} else {
					setVisible(false);
				}
			} else {
				setActiveTab(TABS.BASIC_STYLE);
				setVisible(true);
			}
		};
		on(ReportViewEventTypes.TOGGLE_DATASET, onToggleDataSet);
		on(ReportViewEventTypes.TOGGLE_PALETTE, onTogglePalette);
		return () => {
			off(ReportViewEventTypes.TOGGLE_DATASET, onToggleDataSet);
			off(ReportViewEventTypes.TOGGLE_PALETTE, onTogglePalette);
		};
	}, [on, off, visible, activeTab, report]);
	useChartType({report});

	const onTabClicked = (tab: string) => () => {
		if (tab === activeTab) {
			return;
		}

		setActiveTab(tab);
	};

	const echart = isEChart(chart);
	const holdTitle = canHoldTitle(chart);
	const holdLegend = canHoldLegend(chart);
	const useGrid = canUseGrid(chart);

	// @ts-ignore
	return <ReportDataSetAndPaletteContainer visible={visible}>
		<TabHeaders>
			<TabHeader active={activeTab === TABS.DATASET} zIndex={9999} onClick={onTabClicked(TABS.DATASET)}>
				{Lang.CONSOLE.CONNECTED_SPACE.REPORT_DATA}
			</TabHeader>
			<TabHeader active={activeTab === TABS.BASIC_STYLE} zIndex={9998} onClick={onTabClicked(TABS.BASIC_STYLE)}>
				{Lang.CHART.SECTION_TITLE_BASIC_STYLE}
			</TabHeader>
			{echart && holdTitle
				? <TabHeader active={activeTab === TABS.TITLE} zIndex={9997} onClick={onTabClicked(TABS.TITLE)}>
					{Lang.CHART.SECTION_TITLE_ECHART_TITLE}
				</TabHeader>
				: null}
			{echart && holdTitle
				? <TabHeader active={activeTab === TABS.SUBTITLE} zIndex={9996} onClick={onTabClicked(TABS.SUBTITLE)}>
					{Lang.CHART.SECTION_TITLE_ECHART_SUBTITLE}
				</TabHeader>
				: null}
			{echart && useGrid
				? <TabHeader active={activeTab === TABS.GRID} zIndex={9995} onClick={onTabClicked(TABS.GRID)}>
					{Lang.CHART.SECTION_TITLE_ECHART_GRID}
				</TabHeader>
				: null}
			{echart && holdLegend
				? <TabHeader active={activeTab === TABS.LEGEND} zIndex={9994} onClick={onTabClicked(TABS.LEGEND)}>
					{Lang.CHART.SECTION_TITLE_ECHART_LEGEND}
				</TabHeader>
				: null}
			{isCountChart(chart)
				? <TabHeader active={activeTab === TABS.COUNT_SETTINGS} zIndex={9993}
				             onClick={onTabClicked(TABS.COUNT_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_COUNT_CHART}
				</TabHeader>
				: null}
			{isBarChart(chart) || isLineChart(chart)
				? <TabHeader active={activeTab === TABS.BAR_SETTINGS} zIndex={9992}
				             onClick={onTabClicked(TABS.BAR_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_BAR_CHART}
				</TabHeader>
				: null}
			{isPieChart(chart) || isDoughnutChart(chart) || isNightingaleChart(chart) || isSunburstChart(chart)
				? <TabHeader active={activeTab === TABS.PIE_SETTINGS} zIndex={9991}
				             onClick={onTabClicked(TABS.PIE_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_PIE_CHART}
				</TabHeader>
				: null}
			{isTreeChart(chart)
				? <TabHeader active={activeTab === TABS.TREE_SETTINGS} zIndex={9990}
				             onClick={onTabClicked(TABS.TREE_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_TREE_CHART}
				</TabHeader>
				: null}
			{isTreemapChart(chart)
				? <TabHeader active={activeTab === TABS.TREEMAP_SETTINGS} zIndex={9989}
				             onClick={onTabClicked(TABS.TREEMAP_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_TREEMAP_CHART}
				</TabHeader>
				: null}
			{isMapChart(chart)
				? <TabHeader active={activeTab === TABS.MAP_SETTINGS} zIndex={9988}
				             onClick={onTabClicked(TABS.MAP_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_MAP_CHART}
				</TabHeader>
				: null}
		</TabHeaders>
		<TabBody subject={subject} report={report} active={activeTab === TABS.BASIC_STYLE}>
			<BasicStyleSection report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.TITLE}>
			<EChartsTitleSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.SUBTITLE}>
			<EChartsTitleSubtextSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.LEGEND}>
			<EChartsLegendSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.GRID}>
			<EChartsGridSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.COUNT_SETTINGS}>
			<ChartCountSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.BAR_SETTINGS}>
			<ChartBarSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.PIE_SETTINGS}>
			<ChartPieSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.TREE_SETTINGS}>
			<ChartTreeSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.TREEMAP_SETTINGS}>
			<ChartTreemapSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.MAP_SETTINGS}>
			<ChartMapSettings report={report}/>
		</TabBody>
	</ReportDataSetAndPaletteContainer>;
};