import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {PageHeaderButton} from '@/basic-widgets/page-header-buttons';
import {ICON_IMPORT} from '@/basic-widgets/constants';
import {useEventBus} from '@/events/event-bus';
import {Pipeline, PipelinesGraphics, TopicGraphics} from '@/services/tuples/pipeline-types';
import {Topic} from '@/services/tuples/topic-types';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {AdminCacheData} from '@/local-persist/types';
import {EventTypes} from '@/events/types';
import {PickerDialogBody} from './widgets';
import {DialogFooter, DialogLabel} from '@/dialog/widgets';
import {Button} from '@/basic-widgets/button';
import {ButtonInk} from '@/basic-widgets/types';
import {ImportPickerTable} from './import-picker-table';
import {tryToImportTopicsAndPipelines} from '@/services/data-import/import-data';
import {AlertLabel} from '@/alert/widgets';
import {ImportDataResponse} from '@/services/data-import/import-data-types';
import {generateUuid} from '@/services/tuples/utils';
import {getCurrentTime} from '@/services/utils';
import {savePipelinesGraphics} from '@/services/tuples/pipeline';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import dayjs from 'dayjs';
import {useCatalogEventBus} from '../catalog-event-bus';

const PipelinesImport = (props: {
	topics: Array<Topic>;
	cachedTopics: Array<Topic>;
	pipelines: Array<Pipeline>;
	cachedPipelines: Array<Pipeline>;
	onSuccess: (options: { topics: Array<Topic>, pipelines: Array<Pipeline> }) => void
}) => {
	const {topics, cachedTopics, pipelines, cachedPipelines, onSuccess} = props;

	const {fire: fireGlobal} = useEventBus();
	const [candidates] = useState(() => {
		return {
			topics: topics.map(topic => ({topic, picked: true})),
			pipelines: pipelines.map(pipeline => ({pipeline, picked: true}))
		};
	});

	const onImportClicked = () => {
		const selectedTopics = candidates.topics.filter(x => x.picked).map(x => x.topic);
		const selectedPipelines = candidates.pipelines.filter(x => x.picked).map(x => x.pipeline);
		if (selectedTopics.length + selectedPipelines.length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>No item selected.</AlertLabel>);
			return;
		}

		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
			return await tryToImportTopicsAndPipelines({topics: selectedTopics, pipelines: selectedPipelines});
		}, (response: ImportDataResponse) => {
			if (!response || !response.passed) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					Something incorrect on import topics and pipelines, check with your administrator please.
				</AlertLabel>);
			} else {
				onSuccess({topics: selectedTopics, pipelines: selectedPipelines});
			}
		});
	};
	const onCancelClicked = () => {
		fireGlobal(EventTypes.HIDE_DIALOG);
	};

	return <>
		<PickerDialogBody>
			<DialogLabel>Picked topics to download, related pipelines will be included as well.</DialogLabel>
			<ImportPickerTable candidates={candidates}
			                   cachedTopics={cachedTopics} cachedPipelines={cachedPipelines}/>
		</PickerDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onImportClicked}>Try to Import</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};

export const HeaderImportButton = () => {
	const {fire: fireGlobal} = useEventBus();
	const {once: onceCache, fire: fireCache} = useAdminCacheEventBus();
	const {fire} = useCatalogEventBus();

	const onImportSuccess = (options: { topics: Array<Topic>; pipelines: Array<Pipeline> }) => {
		const {topics, pipelines} = options;

		// save these topics & pipelines into cache
		topics.forEach(topic => fireCache(AdminCacheEventTypes.SAVE_TOPIC, topic));
		pipelines.forEach(pipeline => fireCache(AdminCacheEventTypes.SAVE_PIPELINE, pipeline));
		const graphics: PipelinesGraphics = {
			pipelineGraphId: generateUuid(),
			name: `Pipelines Group Imported ${dayjs().format('YYYYMMDD')}`,
			topics: topics.map(topic => {
				return {topicId: topic.topicId} as TopicGraphics;
			}),
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		};
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await savePipelinesGraphics(graphics),
			async () => {
				fireCache(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, graphics);
				// just wait for local cache ready
				setTimeout(() => {
					fire(CatalogEventTypes.SWITCH_GRAPHICS, graphics);
					fireGlobal(EventTypes.HIDE_DIALOG);
				}, 300);
			}
		);
	};
	const onFileSelected = (input: HTMLInputElement) => async () => {
		if (!input.files || input.files.length === 0) {
			return;
		}
		const file = input.files.item(0);
		if (!file) {
			return;
		}
		const content = await file.text();
		const {topics, pipelines} = content.split('\n')
			.map(x => x.trim())
			.filter(x => x.startsWith('<a href="data:application/json;base64,'))
			.map(x => x.replace('<a href="data:application/json;base64,', ''))
			.map(x => x.substring(0, x.indexOf('"')))
			.map(x => JSON.parse(window.atob(x)))
			.reduce((all, item) => {
				if (item.pipelineId) {
					all.pipelines.push(item as Pipeline);
				} else if (item.topicId) {
					all.topics.push(item as Topic);
				}
				return all;
			}, {topics: [] as Array<Topic>, pipelines: [] as Array<Pipeline>});
		onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
			const {topics: cachedTopics, pipelines: cachedPipelines} = data || {};
			fireGlobal(EventTypes.SHOW_DIALOG,
				<PipelinesImport topics={topics} cachedTopics={cachedTopics || []}
				                 pipelines={pipelines} cachedPipelines={cachedPipelines || []}
				                 onSuccess={onImportSuccess}/>, {
					marginLeft: '25vw',
					width: '50vw'
				});
		}).fire(AdminCacheEventTypes.ASK_DATA);
	};
	const onImportClicked = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = false;
		input.accept = '.md';
		input.onchange = onFileSelected(input);
		input.click();
	};

	return <PageHeaderButton tooltip="Import" onClick={onImportClicked}>
		<FontAwesomeIcon icon={ICON_IMPORT}/>
	</PageHeaderButton>;
};