import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {canUseScript, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {v4} from 'uuid';
import {isANumber, onNumberChange} from '../../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';
import {NumberValue} from '../../settings-widgets/number-value';
import {DefItem, InputItem, ItemType} from './types';
import {isNumberItem, isSectionItem} from './utils';
import {NoVariable} from './widgets';

const SectionBodyItem = (props: { report: Report; item: InputItem }) => {
	const {report, item} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, report);
	};

	const vars = (chart as ECharts).settings?.scriptVars ?? {};

	if (isNumberItem(item)) {
		return <NumberValue label={item.label}
		                    value={vars[item.key]}
		                    validate={isANumber}
		                    onValueChange={onNumberChange({
			                    report,
			                    chart,
			                    prop: `scriptVars.${item.key}` as any,
			                    done: onValueChange
		                    })}/>;
	}

	return <></>;
};

const Section = (props: { report: Report; items: Array<DefItem> }) => {
	const {report, items} = props;

	const [first, ...rest] = items;
	if (isSectionItem(first)) {

		return <>
			<TabBodySectionTitle>{first.label}</TabBodySectionTitle>
			<TabBodySectionBody>
				{rest.map(item => {
					return <SectionBodyItem report={report} item={item as InputItem} key={(item as InputItem).key}/>;
				})}
			</TabBodySectionBody>
		</>;
	} else {
		return <TabBodySectionBody>
			{items.map(item => {
				return <SectionBodyItem report={report} item={item as InputItem} key={(item as InputItem).key}/>;
			})}
		</TabBodySectionBody>;
	}
};

export const EChartsScriptVars = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	useChartType({report});

	if (!isEChart(chart) || !canUseScript(chart)) {
		return null;
	}

	const defs = (chart.settings?.scriptVarsDefs ?? '').trim();
	if (defs.length == 0) {
		return <NoVariable>{Lang.CHART.NO_SCRIPT_VARS}</NoVariable>;
	}

	const items: Array<DefItem> = (() => {
		try {
			return eval(defs);
		} catch {
			return [];
		}
	})();

	if (!Array.isArray(items) || items.length === 0) {
		return <NoVariable>{Lang.CHART.NO_SCRIPT_VARS}</NoVariable>;
	}

	if (items.filter(item => !!item).filter(item => item.type !== ItemType.SECTION).length === 0) {
		return <NoVariable>{Lang.CHART.NO_SCRIPT_VARS}</NoVariable>;
	}

	const renderItems: Array<Array<DefItem>> = items.filter(item => !!item).reduce((items, item) => {
		if (item != null) {
			if (isSectionItem(item)) {
				items.push([item]);
			} else {
				if (items.length === 0) {
					items.push([]);
				}
				items[items.length - 1].push(item);
			}
		}
		return items;
	}, [] as Array<Array<DefItem>>).filter(items => {
		return items.length !== 1 || !isSectionItem(items[0]);
	});

	if (renderItems.length === 0) {
		return <NoVariable>{Lang.CHART.NO_SCRIPT_VARS}</NoVariable>;
	}

	return <TabBodySection>
		{renderItems.map(items => {
			return <Section report={report} items={items} key={v4()}/>;
		})}
	</TabBodySection>;
};