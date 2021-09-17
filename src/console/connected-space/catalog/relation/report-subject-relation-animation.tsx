import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {computeRelationPoints} from '@/widgets/graphics';
import {RelationAnimationDot} from '@/widgets/graphics/widgets';
import React, {useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledConnectedSpaceGraphics, GraphicsRole} from '../types';

export const ReportSubjectRelationAnimation = (props: { graphics: AssembledConnectedSpaceGraphics, subject: Subject, report: Report }) => {
	const {graphics, subject, report} = props;

	const {on, off} = useCatalogEventBus();
	const forceUpdate = useForceUpdate();
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onSubjectSelected = (selectedSubject: Subject) => {
			if (selectedSubject !== subject) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onSubjectMoved = (movedSubject: Subject) => {
			if (movedSubject !== subject) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onReportSelected = (selectedSubject: Subject, selectedReport: Report) => {
			if (selectedReport !== report) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onReportMoved = (movedReport: Report) => {
			if (movedReport !== report) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onSelectionClear = () => {
			setVisible(false);
		};

		on(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
		on(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
		on(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

		on(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		on(CatalogEventTypes.REPORT_MOVED, onReportMoved);

		return () => {
			off(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
			off(CatalogEventTypes.REPORT_SELECTED, onReportSelected);
			off(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

			off(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
			off(CatalogEventTypes.REPORT_MOVED, onReportMoved);
		};
	}, [on, off, subject, report, forceUpdate, visible]);

	const source = graphics.subjects.find(subjectGraphics => subjectGraphics.subject === subject);
	const target = graphics.reports.find(reportGraphics => reportGraphics.report === report);
	if (!source || !target) {
		return null;
	}

	const curvePoints = computeRelationPoints({source, target});

	return <RelationAnimationDot lattice={curvePoints} visible={visible}
	                             data-role={GraphicsRole.REPORT_SUBJECT_RELATION_ANIMATION}/>;
};