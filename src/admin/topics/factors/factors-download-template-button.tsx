import {DwarfButton} from '@/widgets/basic/button';
import {ICON_DOWNLOAD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {downloadAsZip} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import SampleFactorsJSON from './sample-factors.json';

const SampleFactorsCSVHeader = 'name,label,type,enumId,defaultValue,indexGroup,flatten,encrypt,description';
const SampleFactorsCSVBody = [
	'"Name of factor, in snake case or camel case"',
	'Label of factor',
	'sequence|number|unsigned|text|address|continent|region|country|province|city|district|road|community|floor|residence-type|residential-area|email|phone|mobile|fax|datetime|full-datetime|date|time|year|half-year|quarter|month|half-month|ten-days|week-of-year|week-of-month|half-week|day-of-month|day-of-week|day-kind|hour|hour-kind|minute|second|millisecond|am-pm|gender|occupation|date-of-birth|age|id-no|religion|nationality|biz-trade|biz-scale|boolean|enum|object|array',
	'"Delete Property When Type Is Not ""enum"", or fill with enumId(ask your administrator)"',
	'Appropriate value of appointed type|Delete property when no default value',
	'i-1~i-10 for index|u-1~u-10 for unique index|Delete property when no index',
	'"boolean value(in sample is string, just for describe how to use it)|Delete property in non-raw topic or non-flatten"',
	'AES256-PKCS5-PADDING|MD5|SHA256|MASK-MAIL|MASK-CENTER-3|MASK-CENTER-5|MASK-LAST-3|MASK-LAST-6|MASK-DAY|MASK-MONTH|MASK-MONTH-DAY|Delete property when no encryption',
	'Delete property when no description'
];
const SampleFactorsCSV = `${SampleFactorsCSVHeader}
${SampleFactorsCSVBody.join(',')}
Factor.Name1,Factor Label 1,text,,,i-1,false,,
Factor.Name2,Factor Label 2,text,,,i-1,true,,`;

export const FactorsDownloadTemplateButton = () => {
	const onDownloadClicked = async () => {
		await downloadAsZip({
			'factors-template.csv': SampleFactorsCSV,
			'factors-template.json': JSON.stringify(SampleFactorsJSON, null, '\t')
		}, 'factors-template.zip');
	};

	return <DwarfButton ink={ButtonInk.INFO} onClick={onDownloadClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
		<span>Download Factors Template</span>
	</DwarfButton>;
};