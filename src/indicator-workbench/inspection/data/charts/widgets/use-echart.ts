import {echarts, EChartsType} from '@/widgets/basic/echarts';
import {useEffect, useRef, useState} from 'react';
import {ChartParams} from '../types';
import {useChartResize} from './use-resize';

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
		// console.log(build, JSON.stringify(options));
		instance.setOption(options, {notMerge: true});
		setChartInstance(instance);
		// eslint-disable-next-line
	}, [build, params]);

	return {containerRef, chartInstance};
};