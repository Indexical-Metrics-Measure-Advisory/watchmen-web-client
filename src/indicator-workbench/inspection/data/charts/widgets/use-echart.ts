import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import {
	BarChart,
	BoxplotChart,
	CandlestickChart,
	CustomChart,
	EffectScatterChart,
	FunnelChart,
	GaugeChart,
	GraphChart,
	HeatmapChart,
	LineChart,
	LinesChart,
	MapChart,
	ParallelChart,
	PictorialBarChart,
	PieChart,
	RadarChart,
	SankeyChart,
	ScatterChart,
	SunburstChart,
	ThemeRiverChart,
	TreeChart,
	TreemapChart
} from 'echarts/charts';
import {
	AriaComponent,
	AxisPointerComponent,
	BrushComponent,
	CalendarComponent,
	DatasetComponent,
	DataZoomComponent,
	DataZoomInsideComponent,
	DataZoomSliderComponent,
	GeoComponent,
	GraphicComponent,
	GridComponent,
	GridSimpleComponent,
	LegendComponent,
	LegendPlainComponent,
	LegendScrollComponent,
	MarkAreaComponent,
	MarkLineComponent,
	MarkPointComponent,
	ParallelComponent,
	PolarComponent,
	RadarComponent,
	SingleAxisComponent,
	TimelineComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	TransformComponent,
	VisualMapComponent,
	VisualMapContinuousComponent,
	VisualMapPiecewiseComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {useEffect, useRef, useState} from 'react';
import {Columns} from '../../../types';
import {useChartResize} from './use-resize';

export interface ChartParams {
	inspection: Inspection;
	data: Array<RowOfAny>;
	columns: Columns;
	arithmetic: IndicatorAggregateArithmetic;
}

echarts.use([
	TitleComponent, TooltipComponent, GridComponent, AxisPointerComponent, DataZoomComponent,
	GeoComponent, VisualMapComponent, ToolboxComponent, GraphicComponent, LegendComponent, AriaComponent, BrushComponent, DatasetComponent,
	// for customized
	CalendarComponent, DataZoomInsideComponent, DataZoomSliderComponent, GridSimpleComponent, LegendPlainComponent, LegendScrollComponent,
	MarkAreaComponent, MarkLineComponent, MarkPointComponent, ParallelComponent, PolarComponent, RadarComponent, SingleAxisComponent,
	TimelineComponent, TransformComponent, VisualMapContinuousComponent, VisualMapPiecewiseComponent,

	GraphChart, CustomChart, BarChart, LineChart, LinesChart, PieChart, EffectScatterChart, ScatterChart, SunburstChart, TreeChart, TreemapChart, MapChart,
	// for customized
	CandlestickChart, FunnelChart, GaugeChart, HeatmapChart, ParallelChart, BoxplotChart, PictorialBarChart, SankeyChart, RadarChart, ThemeRiverChart,
	CanvasRenderer
]);

export const useEChart = <Opt extends any>(params: ChartParams, build: (params: ChartParams) => Opt) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<EChartsType | null>(null);
	useChartResize(containerRef, chartInstance);
	useEffect(() => {
		if (chartInstance) {
			chartInstance.dispose();
		}
		const instance = echarts.init(containerRef.current!);
		const options: any = build(params);
		// console.log(JSON.stringify(options));
		instance.setOption(options, {notMerge: true});
		setChartInstance(instance);
		// eslint-disable-next-line
	}, [build, params]);

	return {containerRef, chartInstance};
};