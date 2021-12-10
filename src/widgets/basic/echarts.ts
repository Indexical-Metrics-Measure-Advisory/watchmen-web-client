import 'echarts-gl';
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

export {echarts};
export type {EChartsType};