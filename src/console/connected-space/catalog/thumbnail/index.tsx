import {GraphicsSize} from '@/services/data/graphics/graphics-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {ICON_CLOSE, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {BlockRelations} from '../relation/block-relations';
import {ReportRect} from '../report/report-rect';
import {BlockSelection} from '../selection';
import {SubjectRect} from '../subject/subject-rect';
import {TopicRect} from '../topic/topic-rect';
import {AssembledReportGraphics, AssembledSubjectGraphics, AssembledTopicGraphics, CatalogData} from '../types';
import {Current} from './current';
import {BodyThumbnail, CloseButton, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH, ThumbnailBodySvg} from './widgets';

export const Thumbnail = (props: {
	connectedSpace: ConnectedSpace;
	data: CatalogData;
	svgSize: Partial<GraphicsSize>;
	topicGraphicsMap: Map<string, AssembledTopicGraphics>;
	subjectGraphicsMap: Map<string, AssembledSubjectGraphics>;
	reportGraphicsMap: Map<string, AssembledReportGraphics>;
}) => {
	const {
		connectedSpace, data, svgSize,
		topicGraphicsMap, subjectGraphicsMap, reportGraphicsMap
	} = props;

	const {on, off} = useCatalogEventBus();
	const thumbnailRef = useRef<HTMLDivElement>(null);
	const [min, setMin] = useState(false);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(CatalogEventTypes.TOPIC_MOVED, forceUpdate);
		on(CatalogEventTypes.SUBJECT_MOVED, forceUpdate);
		on(CatalogEventTypes.REPORT_MOVED, forceUpdate);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, forceUpdate);
			off(CatalogEventTypes.SUBJECT_MOVED, forceUpdate);
			off(CatalogEventTypes.REPORT_MOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (!data.graphics) {
		return null;
	}

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
		{min ? null : <ThumbnailBodySvg  {...svgSize} ratio={ratio}>
			<BlockRelations graphics={data.graphics}/>
			{data.topics.map(topic => {
				const topicGraphics = topicGraphicsMap.get(topic.topicId)!;
				return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
			})}
			{connectedSpace.subjects.map(subject => {
				const subjectGraphics = subjectGraphicsMap.get(subject.subjectId)!;
				return <SubjectRect connectedSpace={connectedSpace} subject={subjectGraphics} key={subject.subjectId}/>;
			})}
			{connectedSpace.subjects.map(subject => {
				return (subject.reports || []).filter(x => !!x).map(report => {
					if (!report) {
						return null;
					}
					const reportGraphics = reportGraphicsMap.get(report.reportId)!;
					return <ReportRect connectedSpace={connectedSpace} subject={subject}
					                   report={reportGraphics}
					                   key={report.reportId}/>;
				});
			}).flat()}
			<BlockSelection graphics={data.graphics}/>
		</ThumbnailBodySvg>}
		{min ? null : <Current ratio={ratio}/>}
		<CloseButton ink={ButtonInk.WARN} visible={min}
		             onClick={onCloseClicked}>
			<FontAwesomeIcon icon={min ? ICON_EXPAND_PANEL : ICON_CLOSE}/>
		</CloseButton>
	</BodyThumbnail>;
};