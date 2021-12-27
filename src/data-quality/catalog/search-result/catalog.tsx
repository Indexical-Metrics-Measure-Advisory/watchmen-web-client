import {saveCatalog} from '@/services/data/tuples/catalog';
import {Catalog} from '@/services/data/tuples/catalog-types';
import {QueryTopicForHolder} from '@/services/data/tuples/query-topic-types';
import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';
import {TopicId} from '@/services/data/tuples/topic-types';
import {TupleHolder} from '@/services/data/tuples/tuple-types';
import {UserId} from '@/services/data/tuples/user-types';
import {Button} from '@/widgets/basic/button';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import {InputLines} from '@/widgets/basic/input-lines';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {TupleEventBusProvider} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleItemPicker} from '@/widgets/tuple-workbench/tuple-item-picker';
import React, {ChangeEvent, useState} from 'react';
import {DQCCacheData} from '../../cache/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {useUserData} from '../user-cache/useUserData';
import {CatalogCell, CatalogEditCell, CatalogEditLabel, CatalogRowContainer, CatalogSeqCell} from './widgets';

interface EditCatalog extends Omit<Catalog, 'tags'>, TupleHolder {
	flatTags: string;
}

const getUserName = (users: Array<QueryUserForHolder>, userId?: UserId): string => {
	if (userId == null || userId.trim().length === 0) {
		return 'Not Designated';
	}
	// eslint-disable-next-line
	return users.find(user => user.userId == userId)?.name ?? 'Not Designated';
};

export const CatalogRow = (props: { catalog: Catalog; index: number }) => {
	const {catalog, index} = props;

	const {fire: fireGlobal} = useEventBus();
	const [changed, setChanged] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [editingCatalog] = useState<EditCatalog>({
		...catalog,
		flatTags: (catalog.tags || []).join(' ')
	});
	const [topics, setTopics] = useState<Array<QueryTopicForHolder>>([]);
	const [users, setUsers] = useState<Array<QueryUserForHolder>>([]);
	const forceUpdate = useForceUpdate();
	const [dataHolder] = useState(() => {
		return {
			onTopicData: (data?: DQCCacheData) => {
				if (data) {
					setTopics((data.topics || []).map(topic => {
						return {
							topicId: topic.topicId,
							name: topic.name
						};
					}));
				}
			},
			onUserData: (users: Array<QueryUserForHolder>) => setUsers(users)
		};
	});
	useDataQualityCacheData({onDataRetrieved: dataHolder.onTopicData});
	useUserData(dataHolder.onUserData);

	const onRowClicked = () => {
		if (!expanded) {
			setExpanded(true);
		}
	};
	const changeAndForceUpdate = () => {
		if (!changed) {
			setChanged(true);
		} else {
			forceUpdate();
		}
	};
	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		editingCatalog.name = event.target.value;
		changeAndForceUpdate();
	};
	const changeOwnerId = (userId: UserId | '', owner: 'techOwnerId' | 'bizOwnerId') => {
		if (userId === '') {
			delete editingCatalog[owner];
		} else {
			editingCatalog[owner] = userId;
		}
		changeAndForceUpdate();
	};
	const onTechOwnerChanged = (option: DropdownOption) => {
		changeOwnerId(option.value, 'techOwnerId');
	};
	const onBizOwnerChanged = (option: DropdownOption) => {
		changeOwnerId(option.value, 'bizOwnerId');
	};
	const onTagsChanged = (event: ChangeEvent<HTMLInputElement>) => {
		editingCatalog.flatTags = event.target.value;
		changeAndForceUpdate();
	};
	const onDescChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
		editingCatalog.description = event.target.value;
		changeAndForceUpdate();
	};
	const onSaveClicked = () => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => {
				const catalogToSave: Catalog = {
					...editingCatalog,
					tags: (editingCatalog.flatTags || '').split(' ').map(tag => tag.trim()).filter(tag => tag !== '').map(tag => tag.toLowerCase())
				};
				// @ts-ignore
				delete catalogToSave.flatTags;
				await saveCatalog(catalogToSave);
				return catalogToSave;
			}, (catalogToSave: Catalog) => {
				// sync data to model
				Object.keys(catalogToSave).forEach(prop => {
					// @ts-ignore
					catalog[prop as keyof Catalog] = catalogToSave[prop as keyof Catalog];
				});
				setChanged(false);
			});
	};
	const onCollapseClicked = () => setExpanded(false);

	const ownerOptions: Array<DropdownOption> = [
		{value: '', label: 'Not Designated'},
		...users.map(user => {
			return {
				value: user.userId,
				label: user.name
			};
		}).sort((a, b) => {
			return (a.label || '').localeCompare(b.label || '', void 0, {sensitivity: 'base', caseFirst: 'upper'});
		})
	];

	const isHolding = () => editingCatalog.topicIds != null && editingCatalog.topicIds.length > 0;
	const getHoldIds = () => editingCatalog.topicIds || [];
	const getNameOfHold = (topicId: TopicId, topics: Array<QueryTopicForHolder>) => {
		// eslint-disable-next-line
		return topics.find(topic => topic.topicId == topicId)?.name ?? '';
	};
	const listTopics = async (search: string): Promise<Array<QueryTopicForHolder>> => {
		return new Promise<Array<QueryTopicForHolder>>(resolve => {
			resolve(topics.filter(topic => (topic.name || '').toLowerCase().indexOf((search || '').toLowerCase()) !== -1));
		});
	};
	const getTopicId = (topic: QueryTopicForHolder) => topic.topicId;
	const getTopicName = (topic: QueryTopicForHolder) => topic.name;
	// eslint-disable-next-line
	const isTopicHold = (topic: QueryTopicForHolder) => (editingCatalog.topicIds || []).some(topicId => topic.topicId == topicId);
	const removeTopic = (topicOrId: string | QueryTopicForHolder) => {
		let topicId: TopicId;
		if (typeof topicOrId === 'string') {
			topicId = topicOrId;
		} else {
			topicId = topicOrId.topicId;
		}
		// eslint-disable-next-line
		const index = (editingCatalog.topicIds || []).findIndex(id => id == topicId);
		if (index !== -1) {
			(editingCatalog.topicIds || []).splice(index, 1);
			changeAndForceUpdate();
		}
	};
	const addTopic = (topic: QueryTopicForHolder) => {
		const {topicId} = topic;
		// eslint-disable-next-line
		const index = (editingCatalog.topicIds || []).findIndex(id => id == topicId);
		if (index === -1) {
			if (editingCatalog.topicIds == null) {
				editingCatalog.topicIds = [];
			}
			editingCatalog.topicIds.push(topicId);
			changeAndForceUpdate();
		}
	};

	return <CatalogRowContainer data-changed={changed} data-expanded={expanded} onClick={onRowClicked}>
		<CatalogSeqCell>{index}</CatalogSeqCell>
		<CatalogCell>
			{expanded
				? <Input value={editingCatalog.name || ''} onChange={onNameChanged}/>
				: (editingCatalog.name || 'Noname Catalog')}
		</CatalogCell>
		<CatalogCell>{(editingCatalog.topicIds || []).length}</CatalogCell>
		<CatalogCell>
			{expanded
				? <Dropdown value={editingCatalog.techOwnerId ?? ''} options={ownerOptions}
				            onChange={onTechOwnerChanged}/>
				: getUserName(users, editingCatalog.techOwnerId)}
		</CatalogCell>
		<CatalogCell>
			{expanded
				?
				<Dropdown value={editingCatalog.bizOwnerId ?? ''} options={ownerOptions} onChange={onBizOwnerChanged}/>
				: getUserName(users, editingCatalog.bizOwnerId)}
		</CatalogCell>
		<CatalogCell>
			{changed ? <Button ink={ButtonInk.PRIMARY} onClick={onSaveClicked}>Save</Button> : null}
			{expanded ? <Button ink={ButtonInk.PRIMARY} onClick={onCollapseClicked}>Collapse</Button> : null}
		</CatalogCell>
		<CatalogEditCell data-expanded={expanded}>
			<CatalogEditLabel>Topics</CatalogEditLabel>
			<TupleEventBusProvider>
				<TupleItemPicker actionLabel="Pick topics"
				                 holder={editingCatalog} codes={topics}
				                 isHolding={isHolding} getHoldIds={getHoldIds} getNameOfHold={getNameOfHold}
				                 listCandidates={listTopics} getIdOfCandidate={getTopicId}
				                 getNameOfCandidate={getTopicName}
				                 isCandidateHold={isTopicHold} removeHold={removeTopic} addHold={addTopic}/>
			</TupleEventBusProvider>
			<CatalogEditLabel>Tags</CatalogEditLabel>
			<Input value={editingCatalog.flatTags} onChange={onTagsChanged}
			       placeholder="Tags splitted by space character."/>
			<CatalogEditLabel>Description</CatalogEditLabel>
			<InputLines value={editingCatalog.description ?? ''} onChange={onDescChanged}/>
		</CatalogEditCell>
	</CatalogRowContainer>;
};