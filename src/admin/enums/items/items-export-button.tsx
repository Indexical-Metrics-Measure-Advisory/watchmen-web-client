import {Enum} from '@/services/data/tuples/enum-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_DOWNLOAD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {downloadAsCSV} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

export const ItemsExportButton = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const onExportClicked = () => {
		const content = 'code,label,replaceCode,parentCode\n' + enumeration.items.map(item => {
			return `${item.code || ''},${item.label || ''},${item.replaceCode || ''},${item.parentCode || ''}`;
		}).join('\n');
		downloadAsCSV(content, ['enum', enumeration.name || ''], {date: true});
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onExportClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
		<span>Export to File</span>
	</DwarfButton>;
};