import { EChartOption, ECharts, EChartsResponsiveOption } from 'echarts';
import * as echarts from 'echarts/lib/echarts';
import React, { useEffect, useRef, useState } from 'react';
import { EChartDiagramContainer } from './widgets';

export const EChartDiagram = (props: { options: EChartOption | EChartsResponsiveOption }) => {
	const { options } = props;

	const rootRef = useRef<HTMLDivElement>(null);
	const [ chartInstance, setChartInstance ] = useState<ECharts | null>(null);
	useEffect(() => {
		if (!chartInstance) {
			setChartInstance(echarts.init(rootRef.current!));
		} else {
			chartInstance.setOption(options, true);
		}
	}, [ options, chartInstance ]);

	return <EChartDiagramContainer ref={rootRef}>
	</EChartDiagramContainer>;
};