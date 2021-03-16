import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DwarfButton } from '../../../basic-widgets/button';
import { ICON_DOWNLOAD } from '../../../basic-widgets/constants';
import { ButtonInk } from '../../../basic-widgets/types';
import { Enum } from '../../../services/tuples/enum-types';

export const ItemsExportButton = (props: { enumeration: Enum }) => {
	const { enumeration } = props;

	const onExportClicked = () => {
		// TODO
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onExportClicked}>
		<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
		<span>Export to File</span>
	</DwarfButton>;
};