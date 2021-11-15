import {QueryUserGroup} from '@/services/data/tuples/query-user-group-types';
import {StandardTupleCard} from '@/widgets/tuple-workbench/tuple-card';
import React from 'react';

export const renderCard = (userGroup: QueryUserGroup) => {
	return <StandardTupleCard key={userGroup.userGroupId} tuple={userGroup}
	                          name={() => userGroup.name}
	                          description={() => userGroup.description}/>;
};