import {DataPage} from '../../query/data-page';
import {QuerySpace, QuerySpaceForHolder} from '../../tuples/query-space-types';
import {QueryTopicForHolder} from '../../tuples/query-topic-types';
import {QueryUserGroupForHolder} from '../../tuples/query-user-group-types';
import {Space} from '../../tuples/space-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';

export const listMockSpaces = async (options: {
    search: string;
    pageNumber?: number;
    pageSize?: number;
}): Promise<DataPage<QuerySpace>> => {
    const {pageNumber = 1, pageSize = 9} = options;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        spaceId: '1',
                        name: 'Quotation & Policy',
                        description: 'All Sales Data',
                        topicCount: 3,
                        reportCount: 2,
                        groupCount: 2,
                        connectionCount: 8
                    } as QuerySpace
                ],
                itemCount: 0,
                pageNumber,
                pageSize,
                pageCount: 1
            });
        }, 1000);
    });
};

export const fetchMockSpace = async (spaceId: string): Promise<{ space: Space; groups: Array<QueryUserGroupForHolder>; topics: Array<QueryTopicForHolder> }> => {
    return {
        space: {
            spaceId,
            name: 'Quotation & Policy',
            description: 'All Sales Data',
            topicIds: ['1', '2'],
            userGroupIds: [],
            createTime: getCurrentTime(),
            lastModifyTime: getCurrentTime()
        },
        groups: [{userGroupId: '1', name: 'Oklahoma'}],
        topics: [
            {topicId: '1', name: 'Quotation'},
            {topicId: '2', name: 'Policy'},
            {topicId: '3', name: 'Participant'}
        ]
    };
};

let newSpaceId = 10000;
export const saveMockSpace = async (space: Space): Promise<void> => {
    return new Promise((resolve) => {
        if (isFakedUuid(space)) {
            space.spaceId = `${newSpaceId++}`;
        }
        setTimeout(() => resolve(), 500);
    });
};

export const listMockSpacesForHolder = async (search: string): Promise<Array<QuerySpaceForHolder>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                [{spaceId: '1', name: 'Quotation & Policy', description: 'All Sales Data'}].filter((x) =>
                    x.name.toUpperCase().includes(search.toUpperCase())
                )
            );
        }, 500);
    });
};