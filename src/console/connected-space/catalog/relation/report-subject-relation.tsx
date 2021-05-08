import React, {useEffect, useRef} from 'react';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {Report} from '../../../../services/tuples/report-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {computeRelationPoints} from '../graphics-utils';
import {AssembledConnectedSpaceGraphics, GraphicsRole} from '../types';
import {Curve} from './widgets';

export const ReportSubjectRelation = (props: { graphics: AssembledConnectedSpaceGraphics, subject: Subject, report: Report }) => {
	const {graphics, subject, report} = props;

	const {on, off} = useCatalogEventBus();
	const containerRef = useRef<SVGGElement>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSubjectMoved = (movedSubject: Subject) => {
			if (movedSubject !== subject) {
				return;
			}
			forceUpdate();
		};
		const onReportMoved = (movedReport: Report) => {
			if (movedReport !== report) {
				return;
			}
			forceUpdate();
		};

		on(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		on(CatalogEventTypes.REPORT_MOVED, onReportMoved);
		return () => {
			off(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
			off(CatalogEventTypes.REPORT_MOVED, onReportMoved);
		};
	}, [on, off, subject, report, forceUpdate]);

	const source = graphics.subjects.find(subjectGraphics => subjectGraphics.subject === subject);
	const target = graphics.reports.find(reportGraphics => reportGraphics.report === report);
	if (!source || !target) {
		return null;
	}

	const curvePoints = computeRelationPoints({source, target});

	return <g data-role={GraphicsRole.REPORT_SUBJECT_RELATION} ref={containerRef}>
		<Curve lattice={curvePoints} data-role={GraphicsRole.REPORT_SUBJECT_RELATION_LINK}/>
	</g>;
};