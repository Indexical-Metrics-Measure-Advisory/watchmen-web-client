import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../basic-widgets/button';
import { ButtonInk } from '../../basic-widgets/types';
import { DialogBody, DialogFooter, DialogLabel } from '../../dialog/widgets';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { buildDashboardShareUrl } from '../../services/console/dashboard';
import { Dashboard } from '../../services/tuples/dashboard-types';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const ShareUrl = styled.div`
	color       : var(--info-color);
	font-weight : var(--font-bold);
	line-height : calc(var(--line-height) * 2);
`;
const CopiedLabel = styled(DialogLabel).attrs<{ visible: boolean }>(({ visible }) => {
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

export const DashboardShare = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const { fire } = useEventBus();
	const [ copied, setCopied ] = useState(false);
	const [ url, setUrl ] = useState('');
	useEffect(() => {
		(async () => {
			const url = await buildDashboardShareUrl(dashboard);
			setUrl(url);
		})();
	}, [ dashboard ]);

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
			<Button ink={ButtonInk.PRIMARY} onClick={onCloseClicked}>{Lang.ACTIONS.CLOSE}</Button>
		</DialogFooter>
	</>;
};