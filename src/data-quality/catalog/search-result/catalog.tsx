import {Catalog} from '@/services/data/tuples/catalog-types';
import {QueryUserForHolder} from '@/services/data/tuples/query-user-types';
import {UserId} from '@/services/data/tuples/user-types';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useState} from 'react';
import {useUserData} from '../user-cache/useUserData';
import {CatalogCell, CatalogRowContainer, CatalogSeqCell} from './widgets';

export const CatalogRow = (props: { catalog: Catalog; index: number }) => {
	const {catalog, index} = props;

	const [changed, setChanged] = useState(false);
	const [users, setUsers] = useState<Array<QueryUserForHolder>>([]);
	const forceUpdate = useForceUpdate();
	const [onUserData] = useState(() => {
		return (users: Array<QueryUserForHolder>) => setUsers(users);
	});
	useUserData(onUserData);

	const changeOwnerId = (userId: UserId | '', owner: 'techOwnerId' | 'bizOwnerId') => {
		if (userId === '') {
			delete catalog[owner];
		} else {
			catalog[owner] = userId;
		}
		if (!changed) {
			setChanged(true);
		} else {
			forceUpdate();
		}
	};
	const onTechOwnerChanged = (option: DropdownOption) => {
		changeOwnerId(option.value, 'techOwnerId');
	};
	const onBizOwnerChanged = (option: DropdownOption) => {
		changeOwnerId(option.value, 'bizOwnerId');
	};

	const ownerOptions: Array<DropdownOption> = [
		{value: '', label: 'Not Designated Yet'},
		...users.map(user => {
			return {
				value: user.userId,
				label: user.name
			};
		}).sort((a, b) => {
			return (a.label || '').localeCompare(b.label || '', void 0, {sensitivity: 'base', caseFirst: 'upper'});
		})
	];

	return <CatalogRowContainer data-changed={changed}>
		<CatalogSeqCell>{index}</CatalogSeqCell>
		<CatalogCell>{catalog.name || 'Noname Catalog'}</CatalogCell>
		<CatalogCell>{(catalog.topics || []).length}</CatalogCell>
		<CatalogCell>
			<Dropdown value={catalog.techOwnerId ?? ''} options={ownerOptions} onChange={onTechOwnerChanged}/>
		</CatalogCell>
		<CatalogCell>
			<Dropdown value={catalog.bizOwnerId ?? ''} options={ownerOptions} onChange={onBizOwnerChanged}/>
		</CatalogCell>
	</CatalogRowContainer>;
};