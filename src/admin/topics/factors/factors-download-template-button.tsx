import {DwarfButton} from '@/widgets/basic/button';
import {ICON_DOWNLOAD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {downloadAsZip} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {SAMPLE_FACTORS_CSV, SAMPLE_FACTORS_JSON} from './sample-factors';

export const FactorsDownloadTemplateButton = () => {
	const onDownloadClicked = async () => {
		await downloadAsZip({
			'factors-template.csv': SAMPLE_FACTORS_CSV,
			'factors-template.json': JSON.stringify(SAMPLE_FACTORS_JSON, null, '\t')
		}, 'factors-template.zip');
	};

	return <DwarfButton ink={ButtonInk.INFO} onClick={onDownloadClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
		<span>Download Structure Template</span>
	</DwarfButton>;
};