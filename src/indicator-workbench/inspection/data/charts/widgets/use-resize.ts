import {EChartsType} from 'echarts/core';
import {RefObject, useEffect} from 'react';

export const useChartResize = (containerRef: RefObject<HTMLElement>, chartInstance: EChartsType | null) => {
	useEffect(() => {
		if (containerRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				chartInstance && chartInstance.resize();
			});
			resizeObserver.observe(containerRef.current);
			return () => resizeObserver.disconnect();
		}
	});
};