import {isReportFilterEnabled, isReportFunnelEnabled} from '@/feature-switch';
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
} from '@/services/data/tuples/chart-utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {
	canHoldLegend,
	canHoldTitle,
	canUseGrid,
	canUseScript,
	canUseXAxis,
	canUseYAxis,
	isEChart
} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ICON_CLOSE} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {isTemplateConnectedSpace} from '../../../utils';
import {useReportViewEventBus} from '../../report-view-event-bus';
import {ReportViewEventTypes} from '../../report-view-event-bus-types';
import {BasicStyleSection} from '../basic-style';
import {ChartBarSettings} from '../chart-bar-settings';
import {ChartCountSettings} from '../chart-count-settings';
import {ChartMapSettings} from '../chart-map-settings';
import {ChartPieSettings} from '../chart-pie-settings';
import {ChartTreeSettings} from '../chart-tree-settings';
import {ChartTreemapSettings} from '../chart-treemap-settings';
import {DataSetTab} from '../dataset-tab';
import {EChartsGridSettings} from '../echarts/grid';
import {EChartsLegendSettings} from '../echarts/legend';
import {EChartsScriptSettings} from '../echarts/script';
import {EChartsScriptVars} from '../echarts/script-vars';
import {EChartsScriptVarsDefs} from '../echarts/script-vars-defs';
import {EChartsTitleSettings} from '../echarts/title';
import {EChartsTitleSubtextSettings} from '../echarts/title/subtext';
import {EChartsXAxisSettings} from '../echarts/xaxis';
import {EChartsYAxisSettings} from '../echarts/yaxis';
import {FilterTab} from '../filter-tab';
import {FunnelTab} from '../funnel-tab';
import {useChartType} from '../settings-effect/use-chart-type';
import {isScriptOpenedInChartOrIrrelevant} from '../utils';
import {TabBody} from './tab-body';
import {ReportDataSetAndPaletteContainer, TabHeader, TabHeaders} from './widget';

enum TABS {
	DATASET = 'dataset',
	FILTER = 'filter',
	FUNNEL = 'funnel',
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
	MAP_SETTINGS = 'map-settings',

	X_AXIS = 'x-axis',
	Y_AXIS = 'y-axis',

	SCRIPT = 'script',
	SCRIPT_VARS_DEF = 'script-vars-def',
	SCRIPT_VARS = 'script-vars'
}

export const ReportDataSetAndPalette = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;
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
	useChartType({
		report, beforeForceUpdate: () => {
			setActiveTab(TABS.BASIC_STYLE);
		}
	});

	const onTabClicked = (tab: string) => () => {
		if (tab === activeTab) {
			return;
		}

		setActiveTab(tab);
	};
	const onCloseClicked = () => {
		setVisible(false);
	};

	const echart = isEChart(chart);
	const holdTitle = canHoldTitle(chart);
	const holdLegend = canHoldLegend(chart);
	const useGrid = canUseGrid(chart);
	const isTemplate = isTemplateConnectedSpace(connectedSpace);
	// script is opened when connected is template or declared opened for all console
	const useScript = echart && canUseScript(chart) && isScriptOpenedInChartOrIrrelevant(connectedSpace, chart);
	// variables defs always unopened for non-template connected space
	const useScriptVarsDefs = isTemplate && echart && canUseScript(chart);
	// variables always opened when script is supported by chart
	const useScriptVars = echart && canUseScript(chart);

	// @ts-ignore
	return <ReportDataSetAndPaletteContainer visible={visible}>
		<TabHeaders>
			<TabHeader active={false} zIndex={1000} onClick={onCloseClicked}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
			</TabHeader>
			<TabHeader active={activeTab === TABS.DATASET} zIndex={101} onClick={onTabClicked(TABS.DATASET)}>
				{Lang.CONSOLE.CONNECTED_SPACE.REPORT_DATA}
			</TabHeader>
			{isReportFilterEnabled()
				? <TabHeader active={activeTab === TABS.FILTER} zIndex={100} onClick={onTabClicked(TABS.FILTER)}>
					{Lang.CONSOLE.CONNECTED_SPACE.REPORT_FILTER}
				</TabHeader>
				: null}
			{isReportFunnelEnabled()
				? <TabHeader active={activeTab === TABS.FUNNEL} zIndex={99} onClick={onTabClicked(TABS.FUNNEL)}>
					{Lang.CONSOLE.CONNECTED_SPACE.REPORT_FUNNEL}
				</TabHeader>
				: null}
			<TabHeader active={activeTab === TABS.BASIC_STYLE} zIndex={90} onClick={onTabClicked(TABS.BASIC_STYLE)}>
				{Lang.CHART.SECTION_TITLE_BASIC_STYLE}
			</TabHeader>
			{echart && holdTitle
				? <TabHeader active={activeTab === TABS.TITLE} zIndex={81} onClick={onTabClicked(TABS.TITLE)}>
					{Lang.CHART.SECTION_TITLE_ECHART_TITLE}
				</TabHeader>
				: null}
			{echart && holdTitle
				? <TabHeader active={activeTab === TABS.SUBTITLE} zIndex={80} onClick={onTabClicked(TABS.SUBTITLE)}>
					{Lang.CHART.SECTION_TITLE_ECHART_SUBTITLE}
				</TabHeader>
				: null}
			{echart && useGrid
				? <TabHeader active={activeTab === TABS.GRID} zIndex={71} onClick={onTabClicked(TABS.GRID)}>
					{Lang.CHART.SECTION_TITLE_ECHART_GRID}
				</TabHeader>
				: null}
			{echart && holdLegend
				? <TabHeader active={activeTab === TABS.LEGEND} zIndex={70} onClick={onTabClicked(TABS.LEGEND)}>
					{Lang.CHART.SECTION_TITLE_ECHART_LEGEND}
				</TabHeader>
				: null}
			{isCountChart(chart)
				? <TabHeader active={activeTab === TABS.COUNT_SETTINGS} zIndex={60}
				             onClick={onTabClicked(TABS.COUNT_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_COUNT_CHART}
				</TabHeader>
				: null}
			{isBarChart(chart) || isLineChart(chart)
				? <TabHeader active={activeTab === TABS.BAR_SETTINGS} zIndex={60}
				             onClick={onTabClicked(TABS.BAR_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_BAR_CHART}
				</TabHeader>
				: null}
			{isPieChart(chart) || isDoughnutChart(chart) || isNightingaleChart(chart) || isSunburstChart(chart)
				? <TabHeader active={activeTab === TABS.PIE_SETTINGS} zIndex={60}
				             onClick={onTabClicked(TABS.PIE_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_PIE_CHART}
				</TabHeader>
				: null}
			{isTreeChart(chart)
				? <TabHeader active={activeTab === TABS.TREE_SETTINGS} zIndex={60}
				             onClick={onTabClicked(TABS.TREE_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_TREE_CHART}
				</TabHeader>
				: null}
			{isTreemapChart(chart)
				? <TabHeader active={activeTab === TABS.TREEMAP_SETTINGS} zIndex={60}
				             onClick={onTabClicked(TABS.TREEMAP_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_TREEMAP_CHART}
				</TabHeader>
				: null}
			{isMapChart(chart)
				? <TabHeader active={activeTab === TABS.MAP_SETTINGS} zIndex={60}
				             onClick={onTabClicked(TABS.MAP_SETTINGS)}>
					{Lang.CHART.SECTION_TITLE_MAP_CHART}
				</TabHeader>
				: null}
			{echart && canUseXAxis(chart)
				? <TabHeader active={activeTab === TABS.X_AXIS} zIndex={51}
				             onClick={onTabClicked(TABS.X_AXIS)}>
					{Lang.CHART.SECTION_TITLE_ECHART_XAXIS}
				</TabHeader>
				: null}
			{echart && canUseYAxis(chart)
				? <TabHeader active={activeTab === TABS.Y_AXIS} zIndex={50}
				             onClick={onTabClicked(TABS.Y_AXIS)}>
					{Lang.CHART.SECTION_TITLE_ECHART_YAXIS}
				</TabHeader>
				: null}
			{useScript
				? <TabHeader active={activeTab === TABS.SCRIPT} zIndex={12}
				             onClick={onTabClicked(TABS.SCRIPT)}>
					{Lang.CHART.SECTION_TITLE_ECHART_SCRIPT}
				</TabHeader>
				: null}
			{useScriptVarsDefs
				? <TabHeader active={activeTab === TABS.SCRIPT_VARS_DEF} zIndex={11}
				             onClick={onTabClicked(TABS.SCRIPT_VARS_DEF)}>
					{Lang.CHART.SECTION_TITLE_ECHART_SCRIPT_VARS_DEF}
				</TabHeader>
				: null}
			{useScriptVars
				? <TabHeader active={activeTab === TABS.SCRIPT_VARS} zIndex={10}
				             onClick={onTabClicked(TABS.SCRIPT_VARS)}>
					{Lang.CHART.SECTION_TITLE_ECHART_SCRIPT_VARS}
				</TabHeader>
				: null}
		</TabHeaders>
		<DataSetTab connectedSpace={connectedSpace} subject={subject} report={report}
		            active={activeTab === TABS.DATASET}/>
		{isReportFilterEnabled()
			? <FilterTab connectedSpace={connectedSpace} subject={subject} report={report}
			             active={activeTab === TABS.FILTER}/>
			: null}
		{isReportFunnelEnabled()
			? <FunnelTab connectedSpace={connectedSpace} subject={subject} report={report}
			             active={activeTab === TABS.FUNNEL}/>
			: null}
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
		<TabBody subject={subject} report={report} active={activeTab === TABS.X_AXIS}>
			<EChartsXAxisSettings report={report}/>
		</TabBody>
		<TabBody subject={subject} report={report} active={activeTab === TABS.Y_AXIS}>
			<EChartsYAxisSettings report={report}/>
		</TabBody>
		{useScript ?
			<TabBody subject={subject} report={report} active={activeTab === TABS.SCRIPT}>
				<EChartsScriptSettings report={report}/>
			</TabBody>
			: null}
		{useScriptVarsDefs
			? <TabBody subject={subject} report={report} active={activeTab === TABS.SCRIPT_VARS_DEF}>
				<EChartsScriptVarsDefs report={report}/>
			</TabBody>
			: null}
		{useScriptVars
			? <TabBody subject={subject} report={report} active={activeTab === TABS.SCRIPT_VARS}>
				<EChartsScriptVars report={report}/>
			</TabBody>
			: null}
	</ReportDataSetAndPaletteContainer>;
};