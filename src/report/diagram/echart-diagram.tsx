import {
	BarChart,
	CustomChart,
	EffectScatterChart,
	GraphChart,
	LineChart,
	LinesChart,
	MapChart,
	PieChart,
	ScatterChart,
	SunburstChart,
	TreeChart,
	TreemapChart
} from 'echarts/charts';
import {
	AxisPointerComponent,
	DataZoomComponent,
	GeoComponent,
	GraphicComponent,
	GridComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { EChartsType } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef, useState } from 'react';
import { ChartEChartOptions } from '../chart-utils/types';
import { EChartDiagramContainer } from './widgets';

echarts.use([
	TitleComponent, TooltipComponent, GridComponent, AxisPointerComponent, DataZoomComponent,
	GeoComponent, VisualMapComponent, ToolboxComponent, GraphicComponent,
	GraphChart, CustomChart,
	BarChart, LineChart, LinesChart,
	PieChart,
	EffectScatterChart, ScatterChart,
	SunburstChart, TreeChart, TreemapChart,
	MapChart,
	CanvasRenderer
]);

export const EChartDiagram = (props: { options: ChartEChartOptions }) => {
	const { options } = props;

	const rootRef = useRef<HTMLDivElement>(null);
	const [ chartInstance, setChartInstance ] = useState<EChartsType | null>(null);
	useEffect(() => {
		if (!chartInstance) {
			setChartInstance(echarts.init(rootRef.current!));
		} else {
			chartInstance.setOption(options, true);
		}
	}, [ options, chartInstance ]);
	useEffect(() => {
		if (rootRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				if (chartInstance) {
					chartInstance.resize();
				}
			});
			resizeObserver.observe(rootRef.current);
			return () => resizeObserver.disconnect();
		}
	});

	return <EChartDiagramContainer ref={rootRef}/>;
};