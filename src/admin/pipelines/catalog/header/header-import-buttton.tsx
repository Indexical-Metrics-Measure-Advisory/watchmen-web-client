import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {AssembledPipelinesGraphics} from '../types';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {ICON_IMPORT} from '../../../../basic-widgets/constants';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';

export const HeaderImportButton = (props: { graphics: AssembledPipelinesGraphics }) => {
	// const {graphics} = props;
	const {fire: fireGlobal} = useEventBus();
	// const {once: onceCache} = useAdminCacheEventBus();

	const onImportClicked = () => {
		fireGlobal(EventTypes.SHOW_NOT_IMPLEMENT);
	};

	return <PageHeaderButton tooltip="Import" onClick={onImportClicked}>
		<FontAwesomeIcon icon={ICON_IMPORT}/>
	</PageHeaderButton>;
};