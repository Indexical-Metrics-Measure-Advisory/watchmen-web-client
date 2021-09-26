import {Report, ReportFunnel} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ReportFunnelLabels} from '../../../widgets/funnel/widgets';
import {PropName} from '../settings-widgets/widgets';
import {NumericEditor} from './value-editor/numeric-editor';
import {YearEditor} from './value-editor/year-editor';
import {FunnelItemContainer} from './widgets';

export const FunnelItem = (props: { subject: Subject, report: Report, funnel: ReportFunnel }) => {
	const {subject, report, funnel} = props;

	// eslint-disable-next-line
	const column = subject.dataset.columns.find(column => column.columnId == funnel.columnId);

	return <>
		<PropName>{column?.alias} - {ReportFunnelLabels[funnel.type]}</PropName>
		<FunnelItemContainer>
			<NumericEditor report={report} funnel={funnel}/>
			<YearEditor report={report} funnel={funnel}/>
		</FunnelItemContainer>
	</>;
};