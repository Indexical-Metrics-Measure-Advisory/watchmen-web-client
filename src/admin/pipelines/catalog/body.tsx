import React, {useEffect, useRef, useState} from 'react';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {GraphicsSize} from '../../../services/graphics/graphics-types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {Topic} from '../../../services/tuples/topic-types';
import {useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {GraphicsSave} from './graphics-save';
import {asTopicGraphicsMap, computeGraphics} from './graphics-utils';
import {Navigator} from './navigator';
import {BlockRelations} from './relation/block-relations';
import {BlockRelationsAnimation} from './relation/block-relations-animation';
import {BlockSelection} from './selection';
import {Thumbnail} from './thumbnail';
import {TopicRect} from './topic/topic-rect';
import {AssembledPipelinesGraphics, AssembledTopicGraphics, GraphicsRole} from './types';
import {BodyContainer, BodySvg, BodySvgContainer, BodySvgRelationsAnimationContainer} from './widgets';

export const CatalogBody = (props: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
	graphics: AssembledPipelinesGraphics;
}) => {
	const {topics, pipelines, graphics} = props;

	const svgContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const {fire, on, off} = useCatalogEventBus();
	const [svgSize, setSvgSize] = useState<Partial<GraphicsSize>>({});

	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (graphics && svgContainerRef.current && svgRef.current) {
			const {width, height} = computeGraphics({graphics: graphics, svg: svgRef.current});
			setSvgSize({width, height});
		}
	}, [graphics, forceUpdate]);
	useEffect(() => {
		const onTopicsSelected = () => forceUpdate();
		on(CatalogEventTypes.TOPICS_SELECTED, onTopicsSelected);
		return () => {
			off(CatalogEventTypes.TOPICS_SELECTED, onTopicsSelected);
		};
	}, [on, off, forceUpdate]);
	useEffect(() => {
		const onTopicMoved = (topic: Topic, graphics: AssembledTopicGraphics) => {
			const {width = 0, height = 0} = svgSize;
			const {coordinate: {x, y}, frame: {width: topicWidth, height: topicHeight}} = graphics.rect;
			const newWidth = x + topicWidth > width ? width * 2 : width;
			const newHeight = y + topicHeight > height ? height * 2 : height;
			if (newWidth !== width || newHeight !== height) {
				setSvgSize({width: newWidth, height: newHeight});
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		};
	}, [on, off, svgSize]);
	useEffect(() => {
		if (svgContainerRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				fire(CatalogEventTypes.RESIZE);
				if (graphics && svgContainerRef.current && svgRef.current) {
					const {width, height} = computeGraphics({graphics: graphics, svg: svgRef.current});
					if (width > (svgSize.width || 0) || height > (svgSize.height || 0)) {
						setSvgSize({width, height});
					}
				}
			});
			resizeObserver.observe(svgContainerRef.current);
			return () => resizeObserver.disconnect();
		}
	}, [fire, graphics, svgSize.width, svgSize.height]);

	const clearSelection = () => {
		fire(CatalogEventTypes.CLEAR_SELECTION);
	};
	const onBodyScroll = () => fire(CatalogEventTypes.SCROLL);
	const onSvgMouseDown = (event: React.MouseEvent) => {
		const {button, target} = event;
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

	const topicGraphicsMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(graphics);

	return <BodyContainer>
		<BodySvgContainer ref={svgContainerRef} onScroll={onBodyScroll}>
			<BodySvg onMouseDown={onSvgMouseDown} {...svgSize} ref={svgRef}>
				<BlockRelations graphics={graphics} pipelines={pipelines}/>
				{topics.map(topic => {
					const topicGraphics = topicGraphicsMap.get(topic.topicId);
					if (!topicGraphics) {
						return null;
					}
					return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
				})}
				<BlockSelection graphics={graphics}/>
			</BodySvg>
			<BodySvgRelationsAnimationContainer>
				<BlockRelationsAnimation graphics={graphics} pipelines={pipelines}/>
			</BodySvgRelationsAnimationContainer>
			<Thumbnail pipelines={pipelines} topics={topics} graphics={graphics}
			           svgSize={svgSize}
			           topicGraphicsMap={topicGraphicsMap}/>
		</BodySvgContainer>
		<Navigator pipelines={pipelines} topics={topics}/>
		<GraphicsSave graphics={graphics}/>
	</BodyContainer>;
};