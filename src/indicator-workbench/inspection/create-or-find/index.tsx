import {CreateOrFindEditor} from './editor';
import {CreateOrFindViewer} from './viewer';
import {CreateOrFindContainer} from './widgets';

export const CreateOrFind = () => {
	return <CreateOrFindContainer>
		<CreateOrFindEditor/>
		<CreateOrFindViewer/>
	</CreateOrFindContainer>;
};