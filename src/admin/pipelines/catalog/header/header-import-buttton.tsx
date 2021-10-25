import {ImportTPSCSType, tryToImportTopicsAndPipelines} from '@/services/data/data-import/import-data';
import {ImportDataResponse} from '@/services/data/data-import/import-data-types';
import {listConnectedSpacesForExport} from '@/services/data/tuples/connected-space';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {savePipelinesGraphics} from '@/services/data/tuples/pipeline';
import {Pipeline, PipelinesGraphics, TopicGraphics} from '@/services/data/tuples/pipeline-types';
import {listSpacesForExport} from '@/services/data/tuples/space';
import {Space} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {AdminCacheData} from '@/services/local-persist/types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {CheckBox} from '@/widgets/basic/checkbox';
import {ICON_IMPORT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {uploadFile, UploadFileType} from '@/widgets/basic/utils';
import {DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, {useState} from 'react';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {ImportPickerTable} from './import-picker-table';
import {ImportType, ImportTypes, ImportTypesLabel, PICKER_DIALOG_HEIGHT, PickerDialogBody} from './widgets';

const PipelinesImport = (props: {
	topics: Array<Topic>; cachedTopics: Array<Topic>;
	pipelines: Array<Pipeline>; cachedPipelines: Array<Pipeline>;
	spaces: Array<Space>; cachedSpaces: Array<Space>;
	connectedSpaces: Array<ConnectedSpace>; cachedConnectedSpaces: Array<ConnectedSpace>;
	onSuccess: (options: { topics: Array<Topic>, pipelines: Array<Pipeline> }) => void
}) => {
	const {
		topics, cachedTopics,
		pipelines, cachedPipelines,
		spaces, cachedSpaces,
		connectedSpaces, cachedConnectedSpaces,
		onSuccess
	} = props;

	const {fire: fireGlobal} = useEventBus();
	const [candidates] = useState(() => {
		return {
			topics: topics.map(topic => ({topic, picked: true})),
			pipelines: pipelines.map(pipeline => ({pipeline, picked: true})),
			spaces: spaces.map(space => ({space, picked: true})),
			connectedSpaces: connectedSpaces.map(connectedSpace => ({connectedSpace, picked: true})),
			subjects: connectedSpaces.map(connectedSpace => connectedSpace.subjects || [])
				.flat().map(subject => ({subject, picked: true}))
		};
	});
	const [importType, setImportType] = useState<ImportTPSCSType>(ImportTPSCSType.NON_REDUNDANT);

	const onImportTypeChange = (type: ImportTPSCSType) => () => {
		setImportType(type);
	};
	const onCheckValueChange = () => {
	};
	const onImportClicked = () => {
		const selectedTopics = candidates.topics.filter(x => x.picked).map(x => x.topic);
		const selectedPipelines = candidates.pipelines.filter(x => x.picked).map(x => x.pipeline);
		const selectedSpaces = candidates.spaces.filter(x => x.picked).map(x => x.space);
		if ([...selectedTopics, ...selectedPipelines, ...selectedSpaces].length === 0) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>No item selected.</AlertLabel>);
			return;
		}

		const selectedConnectedSpaces = candidates.connectedSpaces.filter(x => x.picked).map(x => x.connectedSpace);
		const selectedSubjects = candidates.subjects.filter(x => x.picked).map(x => x.subject);

		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
			return await tryToImportTopicsAndPipelines({
				topics: selectedTopics,
				pipelines: selectedPipelines,
				spaces: selectedSpaces,
				connectedSpaces: selectedConnectedSpaces.map(connectedSpace => JSON.parse(JSON.stringify(connectedSpace)) as ConnectedSpace)
					.map(connectedSpace => {
						connectedSpace.subjects = (connectedSpace.subjects || [])
							// eslint-disable-next-line
							.filter(subject => selectedSubjects.some(selectedSubject => selectedSubject.subjectId == subject.subjectId));
						if (connectedSpace.subjects.length === 0) {
							return null;
						}
						return connectedSpace;
					}).filter(x => !!x) as Array<ConnectedSpace>,
				importType
			});
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
			<DialogLabel>Pick items to import.</DialogLabel>
			<ImportPickerTable candidates={candidates}
			                   cachedTopics={cachedTopics} cachedPipelines={cachedPipelines}
			                   cachedSpaces={cachedSpaces} cachedConnectedSpaces={cachedConnectedSpaces}/>
		</PickerDialogBody>
		<DialogFooter>
			<ImportTypes>
				<ImportTypesLabel>Import Type:</ImportTypesLabel>
				<ImportType onClick={onImportTypeChange(ImportTPSCSType.NON_REDUNDANT)}>
					<CheckBox value={importType === ImportTPSCSType.NON_REDUNDANT} onChange={onCheckValueChange}/>
					<span>Non Redundant</span>
				</ImportType>
				<ImportType onClick={onImportTypeChange(ImportTPSCSType.REPLACE)}>
					<CheckBox value={importType === ImportTPSCSType.REPLACE} onChange={onCheckValueChange}/>
					<span>Replace</span>
				</ImportType>
				<ImportType onClick={onImportTypeChange(ImportTPSCSType.FORCE_NEW)}>
					<CheckBox value={importType === ImportTPSCSType.FORCE_NEW} onChange={onCheckValueChange}/>
					<span>Force New</span>
				</ImportType>
			</ImportTypes>
			<Button ink={ButtonInk.PRIMARY} onClick={onImportClicked}>Try to Import</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>Cancel</Button>
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
	const onFileSelected = async (file: File) => {
		const content = await file.text();
		const {topics, pipelines, spaces, connectedSpaces} = content.split('\n')
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
				} else if (item.connectId) {
					all.connectedSpaces.push(item as ConnectedSpace);
				} else if (item.spaceId) {
					all.spaces.push(item as Space);
				}
				return all;
			}, {
				topics: [] as Array<Topic>,
				pipelines: [] as Array<Pipeline>,
				spaces: [] as Array<Space>,
				connectedSpaces: [] as Array<ConnectedSpace>
			});
		onceCache(AdminCacheEventTypes.REPLY_DATA, async (data?: AdminCacheData) => {
			const {topics: cachedTopics, pipelines: cachedPipelines} = data || {};
			const [cachedSpaces, cachedConnectedSpaces] = await Promise.all([listSpacesForExport(), listConnectedSpacesForExport()]);
			fireGlobal(EventTypes.SHOW_DIALOG,
				<PipelinesImport topics={topics} cachedTopics={cachedTopics || []}
				                 pipelines={pipelines} cachedPipelines={cachedPipelines || []}
				                 spaces={spaces} cachedSpaces={cachedSpaces}
				                 connectedSpaces={connectedSpaces} cachedConnectedSpaces={cachedConnectedSpaces}
				                 onSuccess={onImportSuccess}/>, {
					marginTop: '10vh',
					marginLeft: '20%',
					width: '60%',
					height: PICKER_DIALOG_HEIGHT
				});
		}).fire(AdminCacheEventTypes.ASK_DATA);
	};
	const onImportClicked = () => {
		uploadFile(UploadFileType.MARKDOWN, onFileSelected);
	};

	return <PageHeaderButton tooltip="Import" onClick={onImportClicked}>
		<FontAwesomeIcon icon={ICON_IMPORT}/>
	</PageHeaderButton>;
};