import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_PAGE_SIZE } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { ButtonInk } from '../../../../basic-widgets/types';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../subject-event-bus';
import { SubjectEventTypes } from '../subject-event-bus-types';

export const HeaderShowPageButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { subject } = props;

	const { on, off, fire } = useSubjectEventBus();
	const [ showPage, setShowPage ] = useState(false);
	useEffect(() => {
		const onAskShowPrintPageSize = () => fire(SubjectEventTypes.REPLY_SHOW_PRINT_PAGE_SIZE, showPage);
		on(SubjectEventTypes.ASK_SHOW_PRINT_PAGE_SIZE, onAskShowPrintPageSize);
		return () => {
			off(SubjectEventTypes.ASK_SHOW_PRINT_PAGE_SIZE, onAskShowPrintPageSize);
		};
	}, [ on, off, fire, showPage ]);
	useEffect(() => {
		setShowPage(false);
	}, [ subject ]);

	const onShowPageClicked = () => {
		setShowPage(!showPage);
		fire(SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, !showPage);
	};

	return <PageHeaderButton
		tooltip={showPage ? Lang.CONSOLE.CONNECTED_SPACE.HIDE_PRINT_PAGE : Lang.CONSOLE.CONNECTED_SPACE.SHOW_PRINT_PAGE}
		ink={showPage ? ButtonInk.PRIMARY : (void 0)}
		onClick={onShowPageClicked}>
		<FontAwesomeIcon icon={ICON_PAGE_SIZE}/>
	</PageHeaderButton>;
};