import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useForceUpdate} from '../basic-widgets/utils';
import {SettingsSection, SettingsSectionBody, SettingsSectionTitle} from '../basic-widgets/settings/settings-section';
import {ButtonInk} from '../basic-widgets/types';
import {Button} from '../basic-widgets/button';
import {PAT} from '../services/account/pat-types';
import {createPAT, deletePAT, fetchPATs} from '../services/account/pat';
import {ICON_DELETE} from '../basic-widgets/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Input} from '../basic-widgets/input';
import {AlertLabel} from '../alert/widgets';

const PATSectionBody = styled(SettingsSectionBody)`
	grid-template-columns: 1fr auto;
`;
const Description = styled.span`
	grid-column: span 2;
`;
const TokenTable = styled.div.attrs({'data-widget': 'pat-table'})`
	display: grid;
	grid-template-columns: 40px auto 1fr auto;
	grid-column: span 2;
	border: var(--border);
	border-radius: calc(var(--border-radius) * 2);
	margin: calc(var(--margin) / 2) 0;
`;
const TokenCell = styled.div.attrs({'data-widget': 'pat-table-cell'})`
	display: flex;
	position: relative;
	align-items: center;
	height: var(--tall-height);
	padding: 0 calc(var(--margin) / 2);
	border-bottom: var(--border);
	&:nth-last-child(-n+4) {
		border-bottom: 0;
	}
	&:nth-child(4n + 1):hover {
		+ div + div + div > button {
			opacity: 1;
			pointer-events: auto;
		}
	}
	&:nth-child(4n + 2):hover {
		+ div + div > button {
			opacity: 1;
			pointer-events: auto;
		}
	}
	&:nth-child(4n + 3):hover {
		+ div > button {
			opacity: 1;
			pointer-events: auto;
		}
	}
	&:nth-child(4n):hover {
		> button {
			opacity: 1;
			pointer-events: auto;
		}
	}

	> button {
		width: 20px;
		height: 20px;
		border-radius: 100%;
		padding: 0;
		opacity: 0;
		pointer-events: none;
	}
`;
export const PersonalAccessToken = (props: {
	title?: string;
	createLabel?: string;
	description?: string;
	beforeDeleteConfirm?: string;
	inputPlaceholder?: string;
	noteRequired?: string;
}) => {
	const {
		title = 'Personal Access Token',
		createLabel = 'Generate New Token',
		description = 'Tokens you have generated that can be used to access the Watchmen API.',
		beforeDeleteConfirm = 'Are you sure to delete token? Please note that deletion cannot be recovered.',
		inputPlaceholder = 'A note for identify purpose of token',
		noteRequired = 'Note is required for a token.'
	} = props;

	const {once, on, off, fire} = useEventBus();
	const noteRef = useRef<HTMLInputElement>(null);
	const [tokens, setTokens] = useState<Array<PAT>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		(async () => {
			const tokens = await fetchPATs();
			setTokens(tokens);
		})();
	}, []);
	useEffect(() => {
		const onLangChanged = () => {
			forceUpdate();
		};
		on(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		return () => {
			off(EventTypes.LANGUAGE_CHANGED, onLangChanged);
		};
	}, [on, off, forceUpdate]);

	const onGenerateClicked = async () => {
		const note = noteRef.current?.value || '';
		if (note.trim().length === 0) {
			once(EventTypes.ALERT_HIDDEN, () => {
				noteRef.current?.focus();
			}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{noteRequired}</AlertLabel>);
			return;
		}

		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await createPAT(note.trim()),
			(token: PAT) => {
				setTokens([...tokens, token]);
				noteRef.current && (noteRef.current.value = '');
				forceUpdate();
			});
	};
	const onDeleteClicked = (token: PAT) => () => {
		fire(EventTypes.SHOW_YES_NO_DIALOG, beforeDeleteConfirm, () => {
			fire(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await deletePAT(token.patId),
				() => {
					setTokens(tokens.filter(t => t !== token));
					fire(EventTypes.HIDE_DIALOG);
					forceUpdate();
				});
		}, () => fire(EventTypes.HIDE_DIALOG));
	};

	return <SettingsSection>
		<SettingsSectionTitle>{title}</SettingsSectionTitle>
		<PATSectionBody>
			{tokens.length !== 0
				? <><Description>{description}</Description>
					<TokenTable>
						{tokens.map((token, index) => {
							return <Fragment key={token.patId}>
								<TokenCell>{index + 1}</TokenCell>
								<TokenCell>{token.note}</TokenCell>
								<TokenCell>{token.token}</TokenCell>
								<TokenCell>
									<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked(token)}>
										<FontAwesomeIcon icon={ICON_DELETE}/>
									</Button>
								</TokenCell>
							</Fragment>;
						})}
					</TokenTable>
				</>
				: null}
			<Description>{inputPlaceholder}</Description>
			<Input ref={noteRef}/>
			<Button ink={ButtonInk.WARN} onClick={onGenerateClicked}>
				<span>{createLabel}</span>
			</Button>
		</PATSectionBody>
	</SettingsSection>;
};