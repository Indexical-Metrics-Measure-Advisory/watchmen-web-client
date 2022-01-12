import {Router} from '@/routes/types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_PIPELINES_CATALOG} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {usePipelinesEventBus} from '../../pipelines-event-bus';
import {PipelinesEventTypes} from '../../pipelines-event-bus-types';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';
import {useValidate} from '../validator/use-validate';

export const HeaderCatalogButton = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire: firePipelines} = usePipelinesEventBus();
	const {fire} = usePipelineEventBus();
	const validate = useValidate();

	const onCatalogClicked = () => {
		firePipelines(PipelinesEventTypes.ASK_TOPICS, async (topics: Array<Topic>) => {
			const result = await validate(pipeline, topics);
			if (!result.pass) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{result.message || ''}
				</AlertLabel>, () => history.push(Router.ADMIN_PIPELINES));
			} else {
				fire(PipelineEventTypes.SAVE_PIPELINE, pipeline, (saved: boolean) => {
					if (saved) {
						history.push(Router.ADMIN_PIPELINES);
					}
				});
			}
		});
	};

	return <PageHeaderButton tooltip="Back to Catalog"
	                         onClick={onCatalogClicked}>
		<FontAwesomeIcon icon={ICON_PIPELINES_CATALOG}/>
	</PageHeaderButton>;
};