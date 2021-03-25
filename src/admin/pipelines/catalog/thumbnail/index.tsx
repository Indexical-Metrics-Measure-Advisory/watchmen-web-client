import React, { MouseEvent, useEffect, useRef } from 'react';
import { useForceUpdate } from '../../../../basic-widgets/utils';
import { GraphicsSize } from '../../../../services/graphics/graphics-types';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import { BlockRelations } from '../relation/block-relations';
import { BlockSelection } from '../selection';
import { TopicRect } from '../topic/topic-rect';
import { AssembledTopicGraphics, CatalogData } from '../types';
import { Current } from './current';
import { BodyThumbnail, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH, ThumbnailBodySvg } from './widgets';

export const Thumbnail = (props: {
	data: CatalogData;
	svgSize: Partial<GraphicsSize>;
	topicGraphicsMap: Map<string, AssembledTopicGraphics>
}) => {
	const { data, svgSize, topicGraphicsMap } = props;

	const { on, off } = useCatalogEventBus();
	const thumbnailRef = useRef<HTMLDivElement>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(CatalogEventTypes.TOPIC_MOVED, forceUpdate);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	if (!data.graphics) {
		return null;
	}

	const { width = 0, height = 0 } = svgSize;
	if (width === 0 || height === 0) {
		return null;
	}

	const onThumbnailClicked = (event: MouseEvent<HTMLDivElement>) => {
		// const { clientX, clientY } = event;
		// const { top, left, width, height } = thumbnailRef.current!.getBoundingClientRect();
		// const { x, y } = { x: clientX - left, y: clientY - top };
	};

	const horizontalRatio = THUMBNAIL_WIDTH / width;
	const verticalRatio = THUMBNAIL_HEIGHT / height;
	const ratio = Math.min(horizontalRatio, verticalRatio);

	return <BodyThumbnail onClick={onThumbnailClicked}
	                      ref={thumbnailRef}>
		<ThumbnailBodySvg {...svgSize} ratio={ratio}>
			<BlockRelations graphics={data.graphics} pipelines={data.pipelines}/>
			{data.topics.map(topic => {
				const topicGraphics = topicGraphicsMap.get(topic.topicId)!;
				return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
			})}
			<BlockSelection graphics={data.graphics}/>
		</ThumbnailBodySvg>
		<Current ratio={ratio}/>
	</BodyThumbnail>;
};