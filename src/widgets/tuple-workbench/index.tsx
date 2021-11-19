import {QueryTuple, Tuple} from '@/services/data/tuples/tuple-types';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import React, {ReactNode} from 'react';
import {FixWidthPage} from '../basic/page';
import {PageHeader} from '../basic/page-header';
import {EnumStore} from './enum-store';
import {TupleEdit} from './tuple-edit';
import {HoldByTuple} from './tuple-event-bus-types';
import {TupleSearch} from './tuple-search';
import {TupleWorkbenchHeader} from './tuple-workbench-header';

export const TupleWorkbench = <T extends Tuple, QT extends QueryTuple, HBT extends HoldByTuple>(props: {
	// for report-workbench
	title: string;
	// for header
	createButtonLabel?: string;
	canCreate: boolean;
	moreButtons?: Array<{ label: string, icon: IconProp, action: () => void }>;
	searchPlaceholder?: string;
	// for search
	renderCard: (item: QT) => ReactNode;
	getKeyOfTuple: (item: QT) => string;
	// for edit
	tupleLabel: string;
	newTupleLabelPrefix?: string;
	existingTupleLabelPrefix?: string;
	tupleImage: string;
	tupleImagePosition?: string;
	canEdit?: boolean;
	renderEditor: (tuple: T, codes?: HBT) => ReactNode;
	confirmEditButtonLabel?: string;
	closeEditButtonLabel?: string;
	pageMaxWidth?: string | number;
	pageMinWidth?: string | number;
}) => {
	const {
		title,
		createButtonLabel, canCreate, moreButtons, searchPlaceholder,
		renderCard, getKeyOfTuple,
		tupleLabel, newTupleLabelPrefix, existingTupleLabelPrefix,
		tupleImage, tupleImagePosition,
		canEdit = true, renderEditor, confirmEditButtonLabel, closeEditButtonLabel,
		pageMaxWidth, pageMinWidth
	} = props;

	return <FixWidthPage maxWidth={pageMaxWidth} minWidth={pageMinWidth}>
		<EnumStore/>
		<PageHeader title={title}/>
		<TupleWorkbenchHeader createButtonLabel={createButtonLabel} canCreate={canCreate}
		                      moreButtons={moreButtons}
		                      searchPlaceholder={searchPlaceholder}/>
		<TupleSearch renderCard={renderCard} getKeyOfTuple={getKeyOfTuple}/>
		<TupleEdit tupleLabel={tupleLabel}
		           newTupleLabelPrefix={newTupleLabelPrefix} existingTupleLabelPrefix={existingTupleLabelPrefix}
		           tupleImage={tupleImage} tupleImagePosition={tupleImagePosition}
		           canEdit={canEdit} renderEditor={renderEditor}
		           confirmEditButtonLabel={confirmEditButtonLabel} closeEditButtonLabel={closeEditButtonLabel}/>
	</FixWidthPage>;
};