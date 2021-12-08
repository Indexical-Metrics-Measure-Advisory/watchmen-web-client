import {Inspection} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {useEffect, useRef, useState} from 'react';
import {Columns} from '../../../types';
import {useChartResize} from './use-resize';

export interface ChartParams {
	inspection: Inspection;
	data: Array<RowOfAny>;
	columns: Columns;
}

export const useEChart = <Opt extends any>(options: ChartParams & {
	build: (params: ChartParams) => Opt;
}) => {
	const {inspection, data, columns, build} = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<EChartsType | null>(null);
	useChartResize(containerRef, chartInstance);
	useEffect(() => {
		if (chartInstance) {
			chartInstance.dispose();
		}
		const instance = echarts.init(containerRef.current!);
		const options: any = build({inspection, data, columns});
		instance.setOption(options, {notMerge: true});
		setChartInstance(instance);
	}, [inspection, data, columns]);

	return {containerRef, chartInstance};
};