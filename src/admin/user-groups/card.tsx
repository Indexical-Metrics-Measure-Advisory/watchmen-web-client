import {QueryUserGroup} from '@/services/data/tuples/query-user-group-types';
import React from 'react';
import {StandardTupleCard} from '../widgets/tuple-workbench/tuple-card';

export const renderCard = (userGroup: QueryUserGroup) => {
	return <StandardTupleCard key={userGroup.userGroupId} tuple={userGroup}
	                          name={() => userGroup.name}
	                          description={() => userGroup.description}/>;
};