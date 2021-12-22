import {Navigation} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {ScoreSumLabel, ScoreSumNode} from './widgets';

export const ScoreSum = (props: { navigation: Navigation }) => {
	return <ScoreSumNode>
		<ScoreSumLabel>
			{Lang.INDICATOR_WORKBENCH.NAVIGATION.SCORE_SUM_LABEL}
		</ScoreSumLabel>
	</ScoreSumNode>;
};