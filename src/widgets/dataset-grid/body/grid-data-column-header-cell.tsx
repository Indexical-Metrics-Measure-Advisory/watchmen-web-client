import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useRef} from 'react';
import {ICON_FIX_COLUMN, ICON_SORT_ASC, ICON_SORT_DESC, ICON_UNFIX_COLUMN} from '../../basic/constants';
import {TooltipAlignment} from '../../basic/types';
import {Lang} from '../../langs';
import {DataColumnDef} from '../types';
import {GridHeaderCell, GridHeaderCellButton, GridHeaderCellButtons} from './grid-widgets';

export const GridDatColumnHeaderCell = (props: {
	column: DataColumnDef;
	isFixTable: boolean;
	last: boolean;
	gridColumnIndex: number;
	selectColumn: (event: MouseEvent<HTMLDivElement>) => void;
	fixColumn: (event: MouseEvent<HTMLButtonElement>) => void;
	unfixColumn: (event: MouseEvent<HTMLButtonElement>) => void;
	sortColumnAsc: (event: MouseEvent<HTMLButtonElement>) => void;
	sortColumnDesc: (event: MouseEvent<HTMLButtonElement>) => void;
	dragging: boolean;
	languagesSupport: boolean;
}) => {
	const {
		column, isFixTable,
		last, gridColumnIndex,
		selectColumn, fixColumn, unfixColumn, sortColumnAsc, sortColumnDesc,
		dragging, languagesSupport
	} = props;

	const cellRef = useRef<HTMLDivElement>(null);

	return <GridHeaderCell lastColumn={last} column={gridColumnIndex}
	                       onClick={selectColumn}
	                       data-dragging={dragging}
	                       data-last-column={last}
	                       ref={cellRef}>
		<span>{column.name}</span>
		<GridHeaderCellButtons>
			<GridHeaderCellButton
				tooltip={{
					label: languagesSupport ? Lang.ACTIONS.SORT_ASC : 'Sort Ascending',
					alignment: TooltipAlignment.RIGHT,
					offsetX: 6
				}}
				onClick={sortColumnAsc}>
				<FontAwesomeIcon icon={ICON_SORT_ASC}/>
			</GridHeaderCellButton>
			<GridHeaderCellButton
				tooltip={{
					label: languagesSupport ? Lang.ACTIONS.SORT_DESC : 'Sort Descending',
					alignment: TooltipAlignment.RIGHT,
					offsetX: 6
				}}
				onClick={sortColumnDesc}>
				<FontAwesomeIcon icon={ICON_SORT_DESC}/>
			</GridHeaderCellButton>
			{isFixTable
				? <GridHeaderCellButton tooltip={{
					label: languagesSupport ? Lang.DATASET.UNFIX_COLUMN : 'Unfix Me and Follows',
					alignment: TooltipAlignment.RIGHT,
					offsetX: 6
				}} onClick={unfixColumn}>
					<FontAwesomeIcon icon={ICON_UNFIX_COLUMN}/>
				</GridHeaderCellButton>
				: <GridHeaderCellButton tooltip={{
					label: languagesSupport ? Lang.DATASET.FIX_COLUMN : 'Fix Columns to Here',
					alignment: TooltipAlignment.RIGHT,
					offsetX: 6
				}} onClick={fixColumn}>
					<FontAwesomeIcon icon={ICON_FIX_COLUMN}/>
				</GridHeaderCellButton>}
		</GridHeaderCellButtons>
	</GridHeaderCell>;
};
