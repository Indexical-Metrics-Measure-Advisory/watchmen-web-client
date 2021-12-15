import {Navigation} from '@/services/data/tuples/navigation-types';
import {RootNode} from './navigation-root';
import {BodyContainer, BodyPalette} from './widgets';

export const NavigationEditPageBody = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	return <BodyContainer>
		<BodyPalette>
			<RootNode navigation={navigation}/>
		</BodyPalette>
	</BodyContainer>;
};