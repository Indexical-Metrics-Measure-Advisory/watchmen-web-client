import {Report, ReportFunnel} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ReportFunnelLabels} from '../../../widgets/funnel/widgets';
import {PropName} from '../settings-widgets/widgets';
import {DateEditor} from './value-editor/date-editor';
import {
	AmPmEditor,
	DayKindEditor,
	DayOfWeekEditor,
	HalfMonthEditor,
	HalfWeekEditor,
	HalfYearEditor,
	HourEditor,
	HourKindEditor,
	MonthEditor,
	QuarterEditor,
	TenDaysEditor,
	WeekOfMonthEditor
} from './value-editor/fixed-dropdown-editor';
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
			<DateEditor report={report} funnel={funnel}/>
			<YearEditor report={report} funnel={funnel}/>
			<HalfYearEditor report={report} funnel={funnel}/>
			<QuarterEditor report={report} funnel={funnel}/>
			<MonthEditor report={report} funnel={funnel}/>
			<HalfMonthEditor report={report} funnel={funnel}/>
			<TenDaysEditor report={report} funnel={funnel}/>
			<WeekOfMonthEditor report={report} funnel={funnel}/>
			<HalfWeekEditor report={report} funnel={funnel}/>
			<DayKindEditor report={report} funnel={funnel}/>
			<DayOfWeekEditor report={report} funnel={funnel}/>
			<HourEditor report={report} funnel={funnel}/>
			<HourKindEditor report={report} funnel={funnel}/>
			<AmPmEditor report={report} funnel={funnel}/>
		</FunnelItemContainer>
	</>;
};