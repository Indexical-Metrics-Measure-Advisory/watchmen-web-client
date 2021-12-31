import {savePipelinesGraphics} from '@/services/data/tuples/pipeline';
import {PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {base64Encode} from '@/services/utils';
import {ICON_PIPELINE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';

export const HeaderCreateGraphicsButton = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {fire} = useCatalogEventBus();

	const onCreatePipelineGraphicsClicked = async () => {
		const graphics: PipelinesGraphics = {
			pipelineGraphId: generateUuid(),
			name: `Pipelines Group ${base64Encode(generateUuid()).substring(0, 12)}`,
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