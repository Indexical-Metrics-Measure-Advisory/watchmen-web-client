import React, {ReactNode} from 'react';
import {FixWidthPage} from '../../../basic-widgets/page';
import {PageHeader} from '../../../basic-widgets/page-header';
import {QueryTuple, Tuple} from '../../../services/tuples/tuple-types';
import {TupleEdit} from './tuple-edit';
import {HoldByTuple} from './tuple-event-bus-types';
import {TupleSearch} from './tuple-search';
import {TupleWorkbenchHeader} from './tuple-workbench-header';

export const TupleWorkbench = <T extends Tuple, QT extends QueryTuple, HBT extends HoldByTuple>(props: {
    // for workbench
    title: string;
    // for header
    createButtonLabel?: string;
    canCreate: boolean;
    searchPlaceholder?: string;
    // for search
    renderCard: (item: QT) => ReactNode;
    getKeyOfTuple: (item: QT) => string;
    // for edit
    tupleLabel: string;
    tupleImage: string;
    tupleImagePosition?: string;
    canEdit?: boolean;
    renderEditor: (tuple: T, codes?: HBT) => ReactNode;
}) => {
    const {
        title,
        createButtonLabel, canCreate, searchPlaceholder,
        renderCard, getKeyOfTuple,
        tupleLabel, tupleImage, tupleImagePosition, canEdit = true, renderEditor
    } = props;

    return <FixWidthPage>
        <PageHeader title={title}/>
        <TupleWorkbenchHeader createButtonLabel={createButtonLabel} canCreate={canCreate}
                              searchPlaceholder={searchPlaceholder}/>
        <TupleSearch renderCard={renderCard} getKeyOfTuple={getKeyOfTuple}/>
        <TupleEdit tupleLabel={tupleLabel} tupleImage={tupleImage} tupleImagePosition={tupleImagePosition}
                   canEdit={canEdit} renderEditor={renderEditor}/>
    </FixWidthPage>;
};