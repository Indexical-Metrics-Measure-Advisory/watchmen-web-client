import {Router} from '@/routes/types';
import {saveAccountIntoSession} from '@/services/data/account';
import {login} from '@/services/data/login';
import {Account} from '@/services/data/login/types';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {faKey, faUserAstronaut} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
	Error,
	Form,
	FormBody,
	FormFooter,
	FormPart,
	FormRow,
	FormRowIcon,
	FormRowInput,
	Greeting,
	Image,
	ImagePart,
	LoginBody,
	LoginContainer,
	LoginHeader,
	LoginHeaderLogo,
	LoginHeaderTitle,
	SubmitButton
} from './widgets';

const LoginIndex = () => {
	const history = useHistory();
	const nameRef = useRef<HTMLInputElement>(null);
	const credentialRef = useRef<HTMLInputElement>(null);
	const [account, setAccount] = useState<Account>({} as Account);
	const [avoid, setAvoid] = useState(false);
	const [ing, setIng] = useState(false);
	const [error, setError] = useState('');
	useEffect(() => {
		nameRef.current && nameRef.current.focus() && nameRef.current.select();
	}, []);

	const onValueChange = (prop: keyof Account) => (event: ChangeEvent<HTMLInputElement>) => {
		setAccount({...account, [prop]: event.target.value});
	};
	const onNameFocused = () => nameRef.current!.select();
	const onPasswordFocused = () => {
		credentialRef.current!.select();
		setAvoid(true);
	};
	const onPasswordBlurred = () => setAvoid(false);
	const onLoginClicked = async () => {
		if ((account.name || '').trim().length === 0) {
			setError(Lang.LOGIN.NAME_EMPTY);
			nameRef.current!.focus();
			return;
		}
		if ((account.credential || '').trim().length === 0) {
			setError(Lang.LOGIN.CREDENTIAL_EMPTY);
			credentialRef.current!.focus();
			return;
		}
		setError('');
		setIng(true);

		try {
			const {pass, admin, super: superAdmin, tenantId, error} = await login(account);
			if (!pass) {
				setError(error || Lang.LOGIN.FAIL);
				return;
			}

			saveAccountIntoSession({
				name: (account.name || '').trim(),
				admin,
				super: superAdmin,
				tenantId
			});
			if (admin || superAdmin) {
				history.replace(Router.ADMIN);
			} else {
				history.replace(Router.CONSOLE);
			}
		} catch {
			setError(Lang.ERROR.UNPREDICTED);
			setIng(false);
		}
	};

	const hour = dayjs().hour();
	const hello = (hour < 5 || hour > 21) ? Lang.LOGIN.EVENING : (hour < 12 ? Lang.LOGIN.MORNING : Lang.LOGIN.AFTERNOON);

	return <LoginContainer>
		<LoginHeader>
			<LoginHeaderLogo/>
			<LoginHeaderTitle>{Lang.LOGIN.PRODUCT_TITLE}</LoginHeaderTitle>
		</LoginHeader>
		<LoginBody>
			<ImagePart>
				<Image avoid={avoid}/>
			</ImagePart>
			<FormPart>
				<Form>
					<Greeting>{hello}</Greeting>
					<FormBody>
						<FormRow>
							<FormRowIcon icon={faUserAstronaut}/>
							<FormRowInput value={account.name || ''} onChange={onValueChange('name')}
							              onFocus={onNameFocused}
							              ref={nameRef}/>
						</FormRow>
						<FormRow>
							<FormRowIcon icon={faKey}/>
							<FormRowInput type="password"
							              value={account.credential || ''} onChange={onValueChange('credential')}
							              onFocus={onPasswordFocused} onBlur={onPasswordBlurred}
							              ref={credentialRef}/>
						</FormRow>
					</FormBody>
					<FormFooter>
						<Error>{error}</Error>
						<SubmitButton ink={ButtonInk.PRIMARY} spin={ing}
						              onClick={onLoginClicked}>
							<span>{Lang.LOGIN.BUTTON}</span>
						</SubmitButton>
					</FormFooter>
				</Form>
			</FormPart>
		</LoginBody>
	</LoginContainer>;
};

export {LoginIndex};
export default LoginIndex;