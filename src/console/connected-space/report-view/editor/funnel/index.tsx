import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Lang} from '@/widgets/langs';
import {Section} from '../settings-widgets/section';
import {NoFunnel} from './widgets';

export const Funnel = (props: { subject: Subject, report: Report }) => {
	const {subject, report} = props;

	return <Section title={Lang.CHART.SECTION_TITLE_FUNNEL} defaultExpanded={true}>
		<NoFunnel>{Lang.CHART.NO_FUNNEL_DETECTED}</NoFunnel>
	</Section>;
};