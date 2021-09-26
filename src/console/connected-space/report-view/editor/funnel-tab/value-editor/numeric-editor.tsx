import {useFunnelRange} from '@/console/connected-space/report-view/editor/funnel-tab/use-funnel-range';
import {useReportEditEventBus} from '@/console/connected-space/report-view/editor/report-edit-event-bus';
import {ReportEditEventTypes} from '@/console/connected-space/report-view/editor/report-edit-event-bus-types';
import {NumberValue} from '@/console/connected-space/report-view/editor/settings-widgets/number-value';
import {Report, ReportFunnel, ReportFunnelType} from '@/services/data/tuples/report-types';
import React from 'react';

export const NumericEditor = (props: { report: Report, funnel: ReportFunnel }) => {
	const {report, funnel} = props;

	const {fire} = useReportEditEventBus();
	useFunnelRange(report, funnel);

	if (!funnel.enabled || funnel.type !== ReportFunnelType.NUMERIC || funnel.range) {
		return null;
	}

	const validate = (value: string) => !isNaN(value as any);
	const onValueChange = (value?: string): number | undefined => {
		let numberValue = value ? parseFloat(value) : (void 0);
		numberValue = isNaN(numberValue as any) ? (void 0) : numberValue;
		if (numberValue == null) {
			delete funnel.values;
		} else {
			funnel.values = [`${numberValue}`];
		}
		fire(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report, funnel);
		return numberValue;
	};

	const value = (() => {
		if (funnel.values == null || funnel.values[0] == null) {
			return (void 0);
		}
		try {
			return Number(funnel.values[0]);
		} catch {
			return (void 0);
		}
	})();

	return <NumberValue value={value} validate={validate} onValueChange={onValueChange}/>;
};