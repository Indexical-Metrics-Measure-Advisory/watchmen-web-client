import {QuerySpaceForHolder} from '@/services/data/tuples/query-space-types';
import {listSpacesForHolder} from '@/services/data/tuples/space';
import {SpaceId} from '@/services/data/tuples/space-types';
import {UserGroup} from '@/services/data/tuples/user-group-types';
import {TupleItemPicker} from '@/widgets/tuple-workbench/tuple-item-picker';
import React from 'react';

const hasSpace = (userGroup: UserGroup) => !!userGroup.spaceIds && userGroup.spaceIds.length > 0;
const getSpaceIds = (userGroup: UserGroup): Array<SpaceId> => userGroup.spaceIds;
const findNameFromSpaces = (spaceId: SpaceId, spaces: Array<QuerySpaceForHolder>): string => {
	// eslint-disable-next-line
	return spaces.find(space => space.spaceId == spaceId)!.name;
};
const removeSpace = (userGroup: UserGroup) => (spaceOrId: string | QuerySpaceForHolder) => {
	let spaceId: SpaceId;
	if (typeof spaceOrId === 'string') {
		spaceId = spaceOrId;
	} else {
		spaceId = spaceOrId.spaceId;
	}
	// eslint-disable-next-line
	const index = userGroup.spaceIds.findIndex(id => id == spaceId);
	if (index !== -1) {
		userGroup.spaceIds.splice(index, 1);
	}
};
const addSpace = (userGroup: UserGroup) => (space: QuerySpaceForHolder) => {
	const {spaceId} = space;
	// eslint-disable-next-line
	const index = userGroup.spaceIds.findIndex(id => id == spaceId);
	if (index === -1) {
		userGroup.spaceIds.push(spaceId);
	}
};
const getIdOfSpace = (space: QuerySpaceForHolder) => space.spaceId;
const getNameOfSpace = (space: QuerySpaceForHolder) => space.name;
// eslint-disable-next-line
const isSpacePicked = (userGroup: UserGroup) => (space: QuerySpaceForHolder) => userGroup.spaceIds.some(spaceId => spaceId == space.spaceId);

export const SpacePicker = (props: {
	label: string;
	userGroup: UserGroup;
	codes: Array<QuerySpaceForHolder>;
}) => {
	const {label, userGroup, codes} = props;

	return <TupleItemPicker actionLabel={label}
	                        holder={userGroup} codes={codes}
	                        isHolding={hasSpace} getHoldIds={getSpaceIds} getNameOfHold={findNameFromSpaces}
	                        listCandidates={listSpacesForHolder} getIdOfCandidate={getIdOfSpace}
	                        getNameOfCandidate={getNameOfSpace} isCandidateHold={isSpacePicked(userGroup)}
	                        removeHold={removeSpace(userGroup)} addHold={addSpace(userGroup)}/>;
};
