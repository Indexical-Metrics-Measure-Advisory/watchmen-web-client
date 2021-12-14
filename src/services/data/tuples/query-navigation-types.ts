import {Navigation} from './navigation-types';

export type QueryNavigation = Pick<Navigation, 'navigationId' | 'name' | 'description' | 'createTime' | 'lastModified'>