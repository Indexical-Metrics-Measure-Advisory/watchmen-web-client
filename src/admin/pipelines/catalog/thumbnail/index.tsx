import {GraphicsSize} from '@/services/data/graphics/graphics-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_CLOSE, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {BlockRelations} from '../relation/block-relations';
import {BlockSelection} from '../selection';
import {TopicRect} from '../topic/topic-rect';
import {AssembledPipelinesGraphics, AssembledTopicGraphics} from '../types';
import {Current} from './current';
import {BodyThumbnail, CloseButton, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH, ThumbnailBodySvg} from './widgets';

export const Thumbnail = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	graphics: AssembledPipelinesGraphics;
	svgSize: Partial<GraphicsSize>;
	topicGraphicsMap: Map<string, AssembledTopicGraphics>
}) => {
	const {pipelines, topics, graphics, svgSize, topicGraphicsMap} = props;

	const {on, off} = useCatalogEventBus();
	const thumbnailRef = useRef<HTMLDivElement>(null);
	const [min, setMin] = useState(false);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(CatalogEventTypes.TOPIC_MOVED, forceUpdate);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const {width = 0, height = 0} = svgSize;
	if (width === 0 || height === 0) {
		return null;
	}

	const onThumbnailClicked = (event: MouseEvent<HTMLDivElement>) => {
		const {clientX, clientY} = event;
		const thumbnail = thumbnailRef.current!;
		const {top: svgTop, left: svgLeft} = thumbnail.querySelector('svg')!.getBoundingClientRect();
		const {x, y} = {x: clientX - svgLeft, y: clientY - svgTop};
		// always try to use this point to be center
		const parent = thumbnail.parentElement!;
		const {width: parentWidth, height: parentHeight} = parent.getBoundingClientRect();
		const scrollTop = y / ratio - parentHeight / 2;
		const scrollLeft = x / ratio - parentWidth / 2;
		parent.scrollTo({top: scrollTop, left: scrollLeft, behavior: 'smooth'});
	};
	const onCloseClicked = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setMin(!min);
	};

	const horizontalRatio = THUMBNAIL_WIDTH / width;
	const verticalRatio = THUMBNAIL_HEIGHT / height;
	const ratio = Math.min(horizontalRatio, verticalRatio);

	return <BodyThumbnail onClick={onThumbnailClicked} minimize={min}
	                      ref={thumbnailRef}>
		{min ? null : <ThumbnailBodySvg {...svgSize} ratio={ratio}>
			<BlockRelations graphics={graphics} pipelines={pipelines} topics={topics}/>
			{topics.map(topic => {
				const topicGraphics = topicGraphicsMap.get(topic.topicId);
				if (!topicGraphics) {
					return null;
				}
				return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
			})}
			<BlockSelection graphics={graphics}/>
		</ThumbnailBodySvg>}
		{min ? null : <Current ratio={ratio}/>}
		<CloseButton ink={ButtonInk.WARN} visible={min}
		             onClick={onCloseClicked}>
			<FontAwesomeIcon icon={min ? ICON_EXPAND_PANEL : ICON_CLOSE}/>
		</CloseButton>
	</BodyThumbnail>;
};