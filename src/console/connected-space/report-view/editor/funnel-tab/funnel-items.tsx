import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {FunnelItem} from './funnel-item';
import {useFunnelAddedOrRemoved} from './use-funnel-added-or-removed';
import {FunnelsContainer} from './widgets';

export const FunnelItems = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {subject, report} = props;

	useFunnelAddedOrRemoved(report);

	const funnels = (report.funnels || []).filter(funnel => funnel.enabled);

	if (funnels.length === 0) {
		return null;
	}

	return <FunnelsContainer>
		{funnels.map(funnel => {
			return <FunnelItem key={funnel.funnelId}
			                   subject={subject} report={report} funnel={funnel}/>;
		})}
	</FunnelsContainer>;
};