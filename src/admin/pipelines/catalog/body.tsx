import React, { useEffect, useRef, useState } from 'react';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { GraphicsSize } from '../../../services/graphics/graphics-types';
import { Pipeline, PipelinesGraphics } from '../../../services/tuples/pipeline-types';
import { Topic } from '../../../services/tuples/topic-types';
import { usePipelinesEventBus } from '../pipelines-event-bus';
import { PipelinesEventTypes } from '../pipelines-event-bus-types';
import { useCatalogEventBus } from './catalog-event-bus';
import { CatalogEventTypes } from './catalog-event-bus-types';
import { GraphicsSave } from './graphics-save';
import { asTopicGraphicsMap, computeGraphics, createInitGraphics } from './graphics-utils';
import { Navigator } from './navigator';
import { BlockRelations } from './relation/block-relations';
import { BlockRelationsAnimation } from './relation/block-relations-animation';
import { BlockSelection } from './selection';
import { Thumbnail } from './thumbnail';
import { TopicRect } from './topic/topic-rect';
import { AssembledTopicGraphics, CatalogData, GraphicsRole } from './types';
import { BodyContainer, BodySvg, BodySvgContainer, BodySvgRelationsAnimationContainer } from './widgets';

export const CatalogBody = () => {
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const { once: oncePipelines } = usePipelinesEventBus();
	const { fire, on, off } = useCatalogEventBus();
	const [ data, setData ] = useState<CatalogData>({ initialized: false, topics: [], pipelines: [] });
	const [ svgSize, setSvgSize ] = useState<Partial<GraphicsSize>>({});

	const forceUpdate = useForceUpdate();
	useEffect(() => {
		oncePipelines(PipelinesEventTypes.REPLY_TOPICS, (topics: Array<Topic>) => {
			oncePipelines(PipelinesEventTypes.REPLY_PIPELINES, (pipelines: Array<Pipeline>) => {
				oncePipelines(PipelinesEventTypes.REPLY_GRAPHICS, (graphics: PipelinesGraphics) => {
					setData({
						initialized: true,
						topics, pipelines,
						graphics: createInitGraphics({ topics, graphics })
					});
				}).fire(PipelinesEventTypes.ASK_GRAPHICS);
			}).fire(PipelinesEventTypes.ASK_PIPELINES);
		}).fire(PipelinesEventTypes.ASK_TOPICS);
	}, [ oncePipelines ]);
	useEffect(() => {
		if (data.graphics && svgContainerRef.current && svgRef.current) {
			const { width, height } = computeGraphics({ graphics: data.graphics, svg: svgRef.current });
			setSvgSize({ width, height });
		}
	}, [ data.graphics, forceUpdate ]);
	useEffect(() => {
		const onTopicMoved = (topic: Topic, graphics: AssembledTopicGraphics) => {
			const { width = 0, height = 0 } = svgSize;
			const { coordinate: { x, y }, frame: { width: topicWidth, height: topicHeight } } = graphics.rect;
			const newWidth = x + topicWidth > width ? width * 2 : width;
			const newHeight = y + topicHeight > height ? height * 2 : height;
			if (newWidth !== width || newHeight !== height) {
				setSvgSize({ width: newWidth, height: newHeight });
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		};
	}, [ on, off, svgSize ]);
	useEffect(() => {
		if (svgContainerRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				fire(CatalogEventTypes.RESIZE);
			});
			resizeObserver.observe(svgContainerRef.current);
			return () => resizeObserver.disconnect();
		}
	});

	if (!data.initialized || !data.graphics) {
		return null;
	}

	const clearSelection = () => {
		fire(CatalogEventTypes.CLEAR_SELECTION);
	};
	const onBodyScroll = () => fire(CatalogEventTypes.SCROLL);
	const onSvgMouseDown = (event: React.MouseEvent) => {
		const { button, target } = event;
		if (button === 2 || button === 1) {
			return;
		}

		const element = target as SVGGraphicsElement;
		const tagName = element.tagName.toUpperCase();
		if (tagName === 'SVG') {
			clearSelection();
			return;
		}

		const role = element.getAttribute('data-role') || '';
		switch (role) {
			case GraphicsRole.TOPIC_FRAME:
			case GraphicsRole.TOPIC_NAME:
				const topicRect = element.parentElement! as unknown as SVGGElement;
				const topicId = topicRect.getAttribute('data-topic-id')!;
				fire(CatalogEventTypes.TOPIC_SELECTED, topicGraphicsMap.get(topicId)!.topic);
				break;
			default:
				clearSelection();
				break;
		}
	};

	const topicGraphicsMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(data.graphics);

	return <BodyContainer>
		<BodySvgContainer ref={svgContainerRef} onScroll={onBodyScroll}>
			<BodySvg onMouseDown={onSvgMouseDown} {...svgSize} ref={svgRef}>
				<BlockRelations graphics={data.graphics} pipelines={data.pipelines}/>
				{data.topics.map(topic => {
					const topicGraphics = topicGraphicsMap.get(topic.topicId)!;
					return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
				})}
				<BlockSelection graphics={data.graphics}/>
			</BodySvg>
			<BodySvgRelationsAnimationContainer>
				<BlockRelationsAnimation graphics={data.graphics} pipelines={data.pipelines}/>
			</BodySvgRelationsAnimationContainer>
			<Thumbnail data={data} svgSize={svgSize} topicGraphicsMap={topicGraphicsMap}/>
		</BodySvgContainer>
		<Navigator pipelines={data.pipelines} topics={data.topics}/>
		<GraphicsSave graphics={data.graphics}/>
	</BodyContainer>;
};