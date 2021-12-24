import {CatalogCriteria} from '@/services/data/data-quality/catalog-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {UserId} from '@/services/data/tuples/user-types';
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
import {SearchCriteriaContainer, SearchLabel} from './widgets';

export const SearchCriteria = () => {
	const {fire} = useCatalogEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const [criteria, setCriteria] = useState<CatalogCriteria>({});
	useDataQualityCacheData({
		onDataRetrieved: (data?: DQCCacheData) => {
			if (data) {
				setTopics(data.topics);
			}
		}
	});

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

	const topicOptions: Array<DropdownOption> = [
		{value: '', label: 'Any Topic'},
		...topics.map(topic => {
			return {
				value: topic.topicId,
				label: topic.name
			};
		}).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
	];
	const ownerOptions: Array<DropdownOption> = [
		{value: '', label: 'Anyone'}
	];

	return <SearchCriteriaContainer>
		<SearchLabel>Name</SearchLabel>
		<Input value={criteria.name ?? ''} onChange={onNameChanged}/>
		<SearchLabel>Topic</SearchLabel>
		<Dropdown options={topicOptions} value={criteria.topicId ?? ''} onChange={onTopicChanged}/>
		<SearchLabel>Technical Owner</SearchLabel>
		<Dropdown options={ownerOptions} value={criteria.techOwnerId ?? ''} onChange={onTechOwnerChanged}/>
		<SearchLabel>Business Owner</SearchLabel>
		<Dropdown options={ownerOptions} value={criteria.bizOwnerId ?? ''} onChange={onBizOwnerChanged}/>
		<Button ink={ButtonInk.PRIMARY} onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
			<span>Find</span>
		</Button>
	</SearchCriteriaContainer>;
};