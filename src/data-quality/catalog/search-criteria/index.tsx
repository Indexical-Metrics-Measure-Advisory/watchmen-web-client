import {Catalog} from '@/services/data/tuples/catalog-types';
import {CatalogCriteria} from '@/services/data/tuples/query-catalog-types';
import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {UserId} from '@/services/data/tuples/user-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {base64Encode} from '@/services/utils';
import {Button} from '@/widgets/basic/button';
import {ICON_SEARCH} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, useState} from 'react';
import {DQCCacheData} from '../../cache/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {useUserData} from '../user-cache/use-user-data';
import {SearchCriteriaButtons, SearchCriteriaContainer, SearchLabel} from './widgets';

interface StateDataHolder {
	onTopicData: (data?: DQCCacheData) => void;
	onUserData: (users: Array<QueryUserForHolder>) => void;
}

const createCatalog = (): Catalog => {
	const catalogId = generateUuid();
	return {
		catalogId,
		name: `Catalog ${base64Encode(catalogId).substring(0, 12)}`,
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

export const SearchCriteria = () => {
	const {fire} = useCatalogEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const [users, setUsers] = useState<Array<QueryUserForHolder>>([]);
	const [criteria, setCriteria] = useState<CatalogCriteria>({});
	const [dataHolder] = useState<StateDataHolder>(() => {
		return {
			onTopicData: (data?: DQCCacheData) => {
				if (data) {
					setTopics(data.topics);
				}
			},
			onUserData: (users: Array<QueryUserForHolder>) => setUsers(users)
		};
	});
	useDataQualityCacheData({onDataRetrieved: dataHolder.onTopicData});
	useUserData(dataHolder.onUserData);

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setCriteria({...criteria, name: event.target.value});
	};
	const onTopicChanged = (option: DropdownOption) => {
		if (option.value === '') {
			setCriteria(criteria => {
				const newCriteria = {...criteria};
				delete newCriteria.topicId;
				return newCriteria;
			});
		} else {
			setCriteria({...criteria, topicId: option.value as TopicId});
		}
	};
	const onTechOwnerChanged = (option: DropdownOption) => {
		if (option.value === '') {
			setCriteria(criteria => {
				const newCriteria = {...criteria};
				delete newCriteria.techOwnerId;
				return newCriteria;
			});
		} else {
			setCriteria({...criteria, techOwnerId: option.value as UserId});
		}
	};
	const onBizOwnerChanged = (option: DropdownOption) => {
		if (option.value === '') {
			setCriteria(criteria => {
				const newCriteria = {...criteria};
				delete newCriteria.bizOwnerId;
				return newCriteria;
			});
		} else {
			setCriteria({...criteria, bizOwnerId: option.value as UserId});
		}
	};
	const onSearchClicked = () => {
		fire(CatalogEventTypes.DO_SEARCH, criteria);
	};
	const onCreateClicked = () => {
		const catalog = createCatalog();
		fire(CatalogEventTypes.DO_CREATE_CATALOG, catalog);
	};

	const topicOptions: Array<DropdownOption> = [
		{value: '', label: 'Any Topic'},
		...topics.map(topic => {
			return {
				value: topic.topicId,
				label: topic.name
			};
		}).sort((a, b) => {
			return (a.label || '').localeCompare(b.label || '', void 0, {sensitivity: 'base', caseFirst: 'upper'});
		})
	];
	const ownerOptions: Array<DropdownOption> = [
		{value: '', label: 'Anyone'},
		...users.map(user => {
			return {
				value: user.userId,
				label: user.name
			};
		}).sort((a, b) => {
			return (a.label || '').localeCompare(b.label || '', void 0, {sensitivity: 'base', caseFirst: 'upper'});
		})
	];

	return <SearchCriteriaContainer>
		<SearchLabel>Name or Tag</SearchLabel>
		<Input value={criteria.name ?? ''} onChange={onNameChanged}/>
		<SearchLabel>Topic</SearchLabel>
		<Dropdown options={topicOptions} value={criteria.topicId ?? ''} onChange={onTopicChanged}/>
		<SearchLabel>Technical Owner</SearchLabel>
		<Dropdown options={ownerOptions} value={criteria.techOwnerId ?? ''} onChange={onTechOwnerChanged}/>
		<SearchLabel>Business Owner</SearchLabel>
		<Dropdown options={ownerOptions} value={criteria.bizOwnerId ?? ''} onChange={onBizOwnerChanged}/>
		<SearchCriteriaButtons>
			<Button ink={ButtonInk.PRIMARY} onClick={onSearchClicked}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
				<span>Find</span>
			</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCreateClicked}>
				<span>Create New Catalog</span>
			</Button>
		</SearchCriteriaButtons>
	</SearchCriteriaContainer>;
};