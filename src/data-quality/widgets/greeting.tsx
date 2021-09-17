import {findAccount} from '@/services/data/account';
import {ICON_COMMENTS} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ReactNode} from 'react';
import {GreetingContainer, GreetingDescription, GreetingIcon, GreetingTitle} from './widgets';

export const Greeting = (props: {
	title?: string;
	children?: ((props: any) => ReactNode) | ReactNode
}) => {
	const name = findAccount()?.name || 'there';
	const {title = `Hello ${name}`, children} = props;

	return <GreetingContainer>
		<GreetingIcon>
			<FontAwesomeIcon icon={ICON_COMMENTS}/>
		</GreetingIcon>
		<GreetingTitle>{title}</GreetingTitle>
		<GreetingDescription>{children}</GreetingDescription>
	</GreetingContainer>;
};