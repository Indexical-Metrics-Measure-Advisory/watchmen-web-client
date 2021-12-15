import {Navigation} from '@/services/data/tuples/navigation-types';
import {Lang} from '@/widgets/langs';
import {BodyContainer, BodyPalette, NavigationRoot} from './widgets';

export const NavigationEditPageBody = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	return <BodyContainer>
		<BodyPalette>
			<NavigationRoot>
				{navigation.name || Lang.INDICATOR_WORKBENCH.NAVIGATION.ROOT}
			</NavigationRoot>
		</BodyPalette>
	</BodyContainer>;
};