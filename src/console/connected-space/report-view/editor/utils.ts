import {isChartScriptInConsoleEnabled} from '@/feature-switch';
import {isAdmin} from '@/services/data/account';
import {ChartType} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {isTemplateConnectedSpace} from '../../utils';

export const isScriptOpened = (connectedSpace: ConnectedSpace, chartType: ChartType): boolean => {
	if (chartType !== ChartType.CUSTOMIZED) {
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
