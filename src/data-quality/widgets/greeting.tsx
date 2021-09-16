import {ReactNode} from 'react';
import {GreetingContainer, GreetingDescription, GreetingIcon, GreetingTitle} from './widgets';
import {ICON_COMMENTS} from '@/basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {findAccount} from '@/services/account';

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