import {Report} from '@/services/data/tuples/report-types';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {echarts, EChartsType} from '../../basic/echarts';
import {ChartOptions} from '../chart-utils/types';
import {useReportEventBus} from '../report-event-bus';
import {ReportEventTypes} from '../report-event-bus-types';
import {EChartDiagramContainer} from './widgets';

export const EChartDiagram = (props: { report: Report; thumbnail: boolean }) => {
	const {report, thumbnail} = props;
	// console.log(JSON.stringify(options));

	const {on, off, fire} = useReportEventBus();
	// noinspection TypeScriptValidateTypes
	const rootRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<EChartsType | null>(null);
	useLayoutEffect(() => {
		const onChartOptionsReady = (aReport: Report, options: ChartOptions) => {
			if (aReport !== report) {
				return;
			}
			if (chartInstance) {
				chartInstance.dispose();
			}
			const instance = echarts.init(rootRef.current!);
			const onFinished = () => {
				fire(ReportEventTypes.REPAINTED, report);
				instance.off('finished', onFinished);
				setTimeout(() => {
					if (thumbnail) {
						const image = new Image();
						image.onload = () => {
							const canvas = document.createElement('canvas');
							canvas.width = 400;
							canvas.height = 300;
							const ctx = canvas.getContext('2d');
							let width = image.width;
							let height = image.height;
							if (width > canvas.width || height > canvas.height) {
								const ratio = Math.min(canvas.width / width, canvas.height / height);
								width = width * ratio;
								height = height * ratio;
							}
							const dx = (canvas.width - width) / 2;
							const dy = (canvas.height - height) / 2;
							ctx?.drawImage(image, dx, dy, width, height);
							report.simulateThumbnail = canvas.toDataURL('png', {pixelRatio: window.devicePixelRatio});
							fire(ReportEventTypes.THUMBNAIL_CAUGHT, report);
						};
						image.src = instance.getDataURL({type: 'png', pixelRatio: window.devicePixelRatio});
					}
				}, 1000);
			};
			instance.on('finished', onFinished);
			instance.clear();
			instance.setOption(options, {notMerge: true});
			setChartInstance(instance);
		};
		on(ReportEventTypes.CHART_OPTIONS_READY, onChartOptionsReady);
		return () => {
			off(ReportEventTypes.CHART_OPTIONS_READY, onChartOptionsReady);
		};
	}, [fire, on, off, report, thumbnail, chartInstance]);
	useEffect(() => {
		if (rootRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				chartInstance && chartInstance.resize();
			});
			resizeObserver.observe(rootRef.current);
			return () => resizeObserver.disconnect();
		}
	});
	useEffect(() => {
		const onAskDownloadChart = (aReport: Report, onChartBase64Ready: (base64?: string) => void) => {
			if (report !== aReport) {
				return;
			}
			const base64 = chartInstance?.getDataURL({type: 'png', pixelRatio: window.devicePixelRatio});
			onChartBase64Ready(base64);
		};
		on(ReportEventTypes.ASK_DOWNLOAD_CHART, onAskDownloadChart);
		return () => {
			off(ReportEventTypes.ASK_DOWNLOAD_CHART, onAskDownloadChart);
		};
	}, [on, off, fire, chartInstance, report]);

	return <EChartDiagramContainer ref={rootRef}/>;
};