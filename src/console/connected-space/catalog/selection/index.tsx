import {GraphicsPosition, GraphicsSize} from '@/services/data/graphics/graphics-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {computeReportSelection, computeSubjectSelection, computeTopicSelection} from '../graphics-utils';
import {AssembledConnectedSpaceGraphics, GraphicsRole} from '../types';
import {Container, Rect} from './widgets';

interface SelectionState {
	visible: boolean;
	topic?: Topic;
	subject?: Subject;
	report?: Report;
	rect: GraphicsPosition & GraphicsSize;
}

export const BlockSelection = (props: { graphics: AssembledConnectedSpaceGraphics }) => {
	const {graphics} = props;

	const {on, off} = useCatalogEventBus();
	const [selection, setSelection] = useState<SelectionState>({
		visible: false,
		rect: {x: 0, y: 0, width: 0, height: 0}
	});
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setSelection({
				visible: true,
				topic,
				rect: computeTopicSelection({topicId: topic.topicId, graphics})
			});
		};
		const onSubjectSelected = (subject: Subject) => {
			setSelection({
				visible: true,
				subject,
				rect: computeSubjectSelection({subjectId: subject.subjectId, graphics})
			});
		};
		const onReportSelected = (subject: Subject, report: Report) => {
			setSelection({
				visible: true,
				report,
				rect: computeReportSelection({reportId: report.reportId, graphics})
			});
		};
		const onSelectionClear = () => {
			setSelection({visible: false, rect: {x: 0, y: 0, width: 0, height: 0}});
		};

		const onTopicMoved = (topic: Topic) => {
			if (topic !== selection.topic) {
				return;
			}
			setSelection({
				visible: true,
				topic,
				rect: computeTopicSelection({topicId: topic.topicId, graphics})
			});
		};
		const onSubjectMoved = (subject: Subject) => {
			if (subject !== selection.subject) {
				return;
			}
			setSelection({
				visible: true,
				subject,
				rect: computeSubjectSelection({subjectId: subject.subjectId, graphics})
			});
		};
		const onReportMoved = (report: Report) => {
			if (report !== selection.report) {
				return;
			}
			setSelection({
				visible: true,
				report,
				rect: computeReportSelection({reportId: report.reportId, graphics})
			});
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		on(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
		on(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
		on(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		on(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		on(CatalogEventTypes.REPORT_MOVED, onReportMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
			off(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
			off(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
			off(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
			off(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
			off(CatalogEventTypes.REPORT_MOVED, onReportMoved);
		};
	}, [on, off, graphics, selection.topic, selection.subject, selection.report]);

	return <Container data-role={GraphicsRole.BLOCK_SELECTION} visible={selection.visible}>
		<Rect rect={selection.rect}/>
	</Container>;

};