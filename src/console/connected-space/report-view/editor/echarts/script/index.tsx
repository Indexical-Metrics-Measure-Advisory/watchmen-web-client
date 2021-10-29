import {canUseScript, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import {getCurrentTheme} from '@/widgets/theme/theme-wrapper';
import MonacoEditor, {loader} from '@monaco-editor/react';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';

loader.config({
	paths: {vs: `${process.env.REACT_APP_WEB_CONTEXT === '/' ? '' : process.env.REACT_APP_WEB_CONTEXT}/static/monaco-editor@0.29.1/min/vs`}
	// 'vs/nls': {availableLanguages: {'*': ''}}
});

const ScriptTemplate = `// Follow script template as below,
// 1. Script must follow the es5 syntax; asynchronized function is not allowed,
// 2. Define an anonymous and self-executing function, returns an echarts configuration option JSON object,
// 3. Variable "options" is in context, can be used in this script,
// 4. Use "const" or "let" to define variables. never use "var", it will expose variables to global and leads memory leak,
// 5. If you see this means there is no script defined, simply add a white space anywhere to see what happens.

(() => {
	// default color series, title and subtitle settings, dataset, variables(if exists) will be passed via variable "options".
	// uncomment the follow line and open dev-tools to find what the options is.
	// console.log(options);
	
	// here is a sample to render a line chart, more examples can be found at https://echarts.apache.org/examples/en/index.html
	// your code starts
	return {
	    xAxis: {
	        type: 'category',
	        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [
	        {
	            data: [150, 230, 224, 218, 135, 147, 260],
	            type: 'line'
	        }
	    ]
	};
	// your code ends
})();
`;

// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
// https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroverrideservices.html
export const EChartsScriptSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isEChart(chart) || !canUseScript(chart)) {
		return null;
	}

	const onValueChange = (value?: string) => {
		if (!chart.settings) {
			chart.settings = {};
		}
		chart.settings.script = value;
		fire(ReportEditEventTypes.ECHART_SCRIPT_CHANGED, report);
	};

	const script = chart.settings?.script;

	return <MonacoEditor language="javascript"
	                     value={script || ScriptTemplate}
	                     onChange={onValueChange}
	                     theme={getCurrentTheme().codeEditorTheme}
	                     loading={Lang.PLAIN.LOADING}
	                     options={{
		                     minimap: {enabled: false}
	                     }}/>;
};