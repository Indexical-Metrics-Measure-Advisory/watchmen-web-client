import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import {DwarfButton} from '@/basic-widgets/button';
import {ICON_DOWNLOAD} from '@/basic-widgets/constants';
import {ButtonInk} from '@/basic-widgets/types';
import {Enum} from '@/services/tuples/enum-types';

export const ItemsExportButton = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const onExportClicked = () => {
		const content = 'code,label,parentCode\n' + enumeration.items.map(item => {
			return `${item.code || ''},${item.label || ''},${item.parentCode || ''}`;
		}).join('\n');
		const link = document.createElement('a');
		link.href = 'data:text/csv;charset=utf-8,' + encodeURI(content);
		link.target = '_blank';
		//provide the name for the CSV file to be downloaded
		link.download = `enum-${enumeration.name}-${dayjs().format('YYYYMMDDHHmmss')}.csv`;
		link.click();
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onExportClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
		<span>Export to File</span>
	</DwarfButton>;
};