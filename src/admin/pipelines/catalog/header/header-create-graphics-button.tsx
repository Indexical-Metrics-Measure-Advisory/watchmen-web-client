import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_PIPELINE} from '@/basic-widgets/constants';
import {PageHeaderButton} from '@/basic-widgets/page-header-buttons';
import {PipelinesGraphics} from '@/services/tuples/pipeline-types';
import {generateUuid} from '@/services/tuples/utils';
import {getCurrentTime} from '@/services/utils';
import {savePipelinesGraphics} from '@/services/tuples/pipeline';
import {EventTypes} from '@/events/types';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {useEventBus} from '@/events/event-bus';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';

export const HeaderCreateGraphicsButton = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {fire} = useCatalogEventBus();

	const onCreatePipelineGraphicsClicked = async () => {
		const graphics: PipelinesGraphics = {
			pipelineGraphId: generateUuid(),
			name: `Pipelines Group ${btoa(generateUuid()).substr(0, 12)}`,
			topics: [],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		};
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await savePipelinesGraphics(graphics),
			async () => {
				fireCache(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, graphics);
				fire(CatalogEventTypes.SWITCH_GRAPHICS, graphics);
			}
		);
	};

	return <PageHeaderButton tooltip="New Pipeline Group" onClick={onCreatePipelineGraphicsClicked}>
		<FontAwesomeIcon icon={ICON_PIPELINE}/>
	</PageHeaderButton>;
};