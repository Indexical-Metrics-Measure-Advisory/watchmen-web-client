import {isChartScriptInConsoleEnabled} from '@/feature-switch';
import {isAdmin} from '@/services/data/account';
import {Chart} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {canUseScript} from '@/services/data/tuples/echarts/echarts-utils';
import {isTemplateConnectedSpace} from '../../utils';

/**
 * returns true when
 * 1. chart cannot use script,
 * 2. current user is admin,
 * 3. script open to console,
 * 4. is template connected space
 */
export const isScriptOpenedInChartOrIrrelevant = (connectedSpace: ConnectedSpace, chart: Chart): boolean => {
	if (canUseScript(chart)) {
		// not a customized chart, treat it as opened anyway
		return true;
	}
	if (isChartScriptInConsoleEnabled()) {
		// open script editing in console
		return true;
	}
	// noinspection RedundantIfStatementJS
	if (isTemplateConnectedSpace(connectedSpace)) {
		// is template connected space
		return true;
	}
	return isAdmin();
};
