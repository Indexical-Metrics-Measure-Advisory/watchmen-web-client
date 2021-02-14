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
import { BlockRelations } from './relation/block-relations';
import { BlockRelationsAnimation } from './relation/block-relations-animation';
import { BlockSelection } from './selection';
import { TopicRect } from './topic/topic-rect';
import { AssembledPipelinesGraphics, AssembledTopicGraphics, GraphicsRole } from './types';
import { BodyContainer, BodySvg, BodySvgContainer, BodySvgRelationsAnimationContainer } from './widgets';

interface CatalogData {
	initialized: boolean;
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
	graphics?: AssembledPipelinesGraphics
}

export const CatalogBody = () => {
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const { once: oncePipelines } = usePipelinesEventBus();
	const { fire } = useCatalogEventBus();
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

	if (!data.initialized || !data.graphics) {
		return null;
	}

	const clearSelection = () => {
		fire(CatalogEventTypes.CLEAR_SELECTION);
	};
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
		<BodySvgContainer ref={svgContainerRef}>
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
		</BodySvgContainer>
		{/*<Navigator connectedSpace={connectedSpace}/>*/}
		<GraphicsSave graphics={data.graphics}/>
	</BodyContainer>;
};