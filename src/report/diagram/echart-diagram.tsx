import { EChartOption, EChartsResponsiveOption } from 'echarts';
import echarts from 'echarts/lib/echarts';
import React, { useEffect, useRef } from 'react';
import { useForceUpdate } from '../../basic-widgets/utils';
import { EChartDiagramContainer } from './widgets';

export const EChartDiagram = (props: { options: EChartOption | EChartsResponsiveOption }) => {
	const { options } = props;

	const rootRef = useRef<HTMLDivElement>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const chartInstance = echarts.init(rootRef.current!);
		chartInstance.setOption(options, true);
		forceUpdate();
	}, [ options, forceUpdate ]);

	return <EChartDiagramContainer ref={rootRef}>

	</EChartDiagramContainer>;
};