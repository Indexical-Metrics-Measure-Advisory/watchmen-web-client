import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import {
	ICON_FIX_COLUMN,
	ICON_SORT_ASC,
	ICON_SORT_DESC,
	ICON_UNFIX_COLUMN
} from '../../../../../../basic-widgets/constants';
import { TooltipAlignment } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import { DataColumnDef } from '../../types';
import { GridHeaderCell, GridHeaderCellButton, GridHeaderCellButtons } from './grid-widgets';

export const GridDatColumnHeaderCell = (props: {
	column: DataColumnDef;
	isFixTable: boolean;
	last: boolean;
	gridColumnIndex: number;
	selectColumn: (event: React.MouseEvent<HTMLDivElement>) => void;
	fixColumn: (event: React.MouseEvent<HTMLButtonElement>) => void;
	unfixColumn: (event: React.MouseEvent<HTMLButtonElement>) => void;
	sortColumnAsc: (event: React.MouseEvent<HTMLButtonElement>) => void;
	sortColumnDesc: (event: React.MouseEvent<HTMLButtonElement>) => void;
	dragging: boolean;
}) => {
	const {
		column, isFixTable,
		last, gridColumnIndex,
		selectColumn, fixColumn, unfixColumn, sortColumnAsc, sortColumnDesc,
		dragging
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
				tooltip={{ label: Lang.ACTIONS.SORT_ASC, alignment: TooltipAlignment.RIGHT, offsetX: 6 }}
				onClick={sortColumnAsc}>
				<FontAwesomeIcon icon={ICON_SORT_ASC}/>
			</GridHeaderCellButton>
			<GridHeaderCellButton
				tooltip={{ label: Lang.ACTIONS.SORT_DESC, alignment: TooltipAlignment.RIGHT, offsetX: 6 }}
				onClick={sortColumnDesc}>
				<FontAwesomeIcon icon={ICON_SORT_DESC}/>
			</GridHeaderCellButton>
			{isFixTable
				? <GridHeaderCellButton tooltip={{
					label: Lang.CONSOLE.CONNECTED_SPACE.UNFIX_COLUMN,
					alignment: TooltipAlignment.RIGHT,
					offsetX: 6
				}} onClick={unfixColumn}>
					<FontAwesomeIcon icon={ICON_UNFIX_COLUMN}/>
				</GridHeaderCellButton>
				: <GridHeaderCellButton tooltip={{
					label: Lang.CONSOLE.CONNECTED_SPACE.FIX_COLUMN,
					alignment: TooltipAlignment.RIGHT,
					offsetX: 6
				}} onClick={fixColumn}>
					<FontAwesomeIcon icon={ICON_FIX_COLUMN}/>
				</GridHeaderCellButton>}
		</GridHeaderCellButtons>
	</GridHeaderCell>;
};
