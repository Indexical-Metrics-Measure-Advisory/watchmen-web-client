import {buildSubjectShareUrl} from '@/services/data/console/connected-space';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Button} from '@/widgets/basic/button';
import {ICON_SHARE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const ShareUrl = styled.div`
	color       : var(--info-color);
	font-weight : var(--font-bold);
	padding-top : calc(var(--margin) / 2);
	word-break  : break-all;
	line-height : var(--line-height);
`;
const CopiedLabel = styled(DialogLabel).attrs<{ visible: boolean }>(({visible}) => {
	return {
		style: {
			opacity: visible ? 1 : (void 0),
			transition: visible ? 'opacity 300ms ease-in-out' : (void 0)
		}
	};
})<{ visible: boolean }>`
	flex-grow   : 1;
	color       : var(--success-color);
	font-weight : var(--font-bold);
	opacity     : 0;
	transition  : opacity 300ms ease-in-out 3s;
`;

const SubjectShare = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const {fire} = useEventBus();
	const [copied, setCopied] = useState(false);
	const [url, setUrl] = useState('');
	useEffect(() => {
		(async () => {
			const url = await buildSubjectShareUrl(connectedSpace, subject);
			setUrl(url);
		})();
	}, [connectedSpace, subject]);

	const onCopyClicked = async () => {
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 300);
	};
	const onCloseClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<ShareDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.SHARE_DIALOG_LABEL}</DialogLabel>
			<ShareUrl>{url}</ShareUrl>
		</ShareDialogBody>
		<DialogFooter>
			<CopiedLabel visible={copied}>{Lang.CONSOLE.DASHBOARD.URL_COPIED}</CopiedLabel>
			<Button ink={ButtonInk.PRIMARY} onClick={onCopyClicked}>{Lang.ACTIONS.COPY}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCloseClicked}>{Lang.ACTIONS.CLOSE}</Button>
		</DialogFooter>
	</>;
};

export const HeaderShareButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const {fire} = useEventBus();

	const onShareClicked = () => {
		fire(EventTypes.SHOW_DIALOG, <SubjectShare connectedSpace={connectedSpace} subject={subject}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SHARE} onClick={onShareClicked}>
		<FontAwesomeIcon icon={ICON_SHARE}/>
	</PageHeaderButton>;
};