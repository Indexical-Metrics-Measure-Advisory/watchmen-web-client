import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {ChartContainer, FullscreenButton, GraphContainer} from './widgets';
import {ButtonInk} from '../../../../basic-widgets/types';

// noinspection DuplicatedCode
export const GraphDiagram = (props: { options: any }) => {
	const {options} = props;

	// noinspection TypeScriptValidateTypes
	const containerRef = useRef<HTMLDivElement>(null);
	// noinspection TypeScriptValidateTypes
	const chartRef = useRef<HTMLDivElement>(null);
	const [fullScreen, setFullScreen] = useState(false);
	const [chartInstance, setChartInstance] = useState<EChartsType | null>(null);
	useEffect(() => {
		if (!chartInstance) {
			setChartInstance(echarts.init(chartRef.current!));
		} else {
			chartInstance.setOption(options, true);
		}
	}, [options, chartInstance]);
	useEffect(() => {
		if (chartRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				if (chartInstance) {
					chartInstance.resize();
				}
			});
			resizeObserver.observe(chartRef.current);
			return () => resizeObserver.disconnect();
		}
	});
	useEffect(() => {
		window.document.addEventListener('fullscreenchange', () => {
			if (!window.document.fullscreenElement) {
				setFullScreen(false);
			}
		});
	}, []);

	const onRequestFullscreenClicked = () => {
		if (fullScreen) {
			window.document.exitFullscreen();
			// setFullScreen(false);
		} else {
			containerRef.current?.requestFullscreen();
			setFullScreen(true);
		}
	};

	return <GraphContainer ref={containerRef}>
		<FullscreenButton ink={ButtonInk.PRIMARY} onClick={onRequestFullscreenClicked}>
			Fullscreen
		</FullscreenButton>
		<ChartContainer ref={chartRef}/>
	</GraphContainer>;
};
