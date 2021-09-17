import {Button} from '@/widgets/basic/button';
import {FAVORITE_Z_INDEX, PIN_FAVORITE_Z_INDEX} from '@/widgets/basic/constants';
import {TooltipButton} from '@/widgets/basic/tooltip-button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const FloatFavoriteContainer = styled.div.attrs<{ visible: boolean, top: number, left: number }>(
	({visible, top, left}) => {
		return {
			'data-widget': 'float-favorite',
			style: {
				pointerEvents: visible ? 'auto' : (void 0),
				opacity: visible ? 1 : (void 0),
				transform: visible ? '' : 'scaleX(0)',
				top,
				left
			}
		};
	})<{ visible: boolean, top: number, left: number }>`
	display          : flex;
	flex-direction   : column;
	position         : fixed;
	border-radius    : var(--border-radius);
	z-index          : ${FAVORITE_Z_INDEX};
	overflow         : hidden;
	box-shadow       : var(--hover-shadow);
	min-width        : 300px;
	max-width        : 400px;
	pointer-events   : none;
	opacity          : 0;
	transform-origin : 15% top;
	transition       : transform 300ms ease-in-out, opacity 300ms ease-in-out;
`;

export const FloatFavoriteTitle = styled.div.attrs({'data-widget': 'float-favorite-title'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : space-between;
	font-size        : 1.2em;
	font-weight      : var(--font-demi-bold);
	font-variant     : petite-caps;
	height           : var(--height);
	padding          : 0 calc(var(--margin) / 2);
	color            : var(--invert-color);
	background-color : var(--primary-color);
`;
export const FloatFavoritePinButton = styled(TooltipButton).attrs({'data-widget': 'float-favorite-pin-button'})`
	color         : var(--invert-color);
	border-radius : 100%;
	width         : calc(var(--height) / 1.2);
	height        : calc(var(--height) / 1.2);
	padding       : 0;
	> svg {
		font-size : 0.8em;
	}
`;
export const FloatFavoriteBody = styled.div.attrs({
	'data-widget': 'float-favorite-body',
	'data-v-scroll': ''
})`
	display          : flex;
	flex-direction   : column;
	position         : relative;
	max-height       : calc(var(--height) * 8);
	background-color : var(--bg-color);
	overflow-y       : auto;
`;

export const FloatFavoriteItem = styled.div.attrs({'data-widget': 'float-favorite-item'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	min-height   : var(--height);
	height       : var(--height);
	padding      : 0 calc(var(--margin) / 2);
	font-variant : petite-caps;
	cursor       : pointer;
	&:hover {
		background-color : var(--hover-color);
		> button[data-widget="float-favorite-item-remove-button"] {
			right          : calc(var(--margin) / 4);
			width          : calc(var(--height) * 0.8);
			opacity        : 1;
			pointer-events : auto;
			transition     : opacity 300ms ease-in-out 500ms, width 300ms ease-in-out 500ms, color 300ms ease-in-out, background-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
			&:hover {
				color            : var(--invert-color);
				background-color : var(--danger-color);
				box-shadow       : var(--danger-hover-shadow);
			}
		}
	}
`;
export const FavoriteItemIcon = styled(FontAwesomeIcon).attrs({'data-widget': 'favorite-item-icon'})`
	min-width    : 16px;
	margin-right : calc(var(--margin) / 4);
`;
export const FavoriteItemLabel = styled.span.attrs({'data-widget': 'favorite-item-label'})`
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const FloatFavoriteItemRemoveButton = styled(Button).attrs({'data-widget': 'float-favorite-item-remove-button'})`
	position       : absolute;
	right          : 0;
	width          : 0;
	height         : calc(var(--height) * 0.8);
	padding        : 0;
	overflow-x     : hidden;
	pointer-events : none;
	transition     : opacity 300ms ease-in-out, width 300ms ease-in-out;
`;
export const FavoriteNoData = styled.div.attrs({'data-widget': 'float-favorite-no-data'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	height       : var(--height);
	padding      : 0 calc(var(--margin) / 2);
	font-variant : petite-caps;
`;
export const PinFavoriteContainer = styled.div.attrs<{ visible: boolean, left: number }>(({visible, left}) => {
	return {
		'data-widget': 'pin-favorite',
		style: {
			top: visible ? 0 : 'calc(var(--pin-favorite-height) * -1)',
			left,
			width: `calc(100vw - ${left}px)`,
			opacity: visible ? 1 : (void 0)
		}
	};
})<{ visible: boolean, left: number }>`
	display               : grid;
	position              : fixed;
	grid-template-columns : auto 1fr auto;
	grid-template-rows    : var(--pin-favorite-height);
	justify-items         : stretch;
	opacity               : 0;
	transition            : top 300ms ease-in-out, opacity 300ms ease-in-out;
	z-index               : ${PIN_FAVORITE_Z_INDEX};
	&:hover {
		div[data-scrollable] {
			opacity        : 0.9;
			pointer-events : auto;
		}
	}
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		height           : 1px;
		width            : 100%;
		bottom           : 0;
		background-color : var(--primary-color);
		opacity          : 0.3;
		z-index          : 2;
	}
	@media print {
		display : none;
	}
`;
export const PinFavoriteTitle = styled.div.attrs({'data-widget': 'pin-favorite-title'})`
	display          : flex;
	position         : relative;
	grid-row         : 1;
	grid-column      : 1;
	align-items      : center;
	font-size        : 1.2em;
	font-weight      : var(--font-demi-bold);
	font-variant     : petite-caps;
	padding          : 0 calc(var(--margin)) 0 calc(var(--margin) / 2);
	color            : var(--invert-color);
	background-color : var(--primary-color);
`;
export const PinFavoriteBody = styled.div.attrs({'data-widget': 'pin-favorite-body'})`
	display          : flex;
	position         : relative;
	grid-column      : 2;
	flex-wrap        : nowrap;
	align-items      : center;
	overflow-x       : hidden;
	background-color : var(--bg-color);
	border-radius    : calc(var(--height) * 0.6);
	margin           : 0 calc(var(--margin) / -2);
	z-index          : 1;
`;
export const PinFavoriteScrollButton = styled.div.attrs<{ left: boolean, scrollable: boolean }>(
	({left, scrollable}) => {
		return {
			'data-widget': 'pin-favorite-body-scroll-button',
			'data-scrollable': scrollable ? '' : (void 0),
			style: {
				left: left ? 'calc(100% - var(--margin) / 2 + 2px)' : (void 0),
				right: left ? (void 0) : 'calc(100% - var(--margin) / 2 + 2px)',
				borderRadius: left
					? 'calc((var(--pin-favorite-height) - 4px) / 2) calc(var(--border-radius) * 2) calc(var(--border-radius) * 2) calc((var(--pin-favorite-height) - 4px) / 2)'
					: 'calc(var(--border-radius) * 2) calc((var(--pin-favorite-height) - 4px) / 2) calc((var(--pin-favorite-height) - 4px) / 2) calc(var(--border-radius) * 2)'
			}
		};
	})<{ left: boolean, scrollable: boolean }>`
	display          : flex;
	position         : absolute;
	align-items      : center;
	justify-content  : center;
	font-size        : 1.3em;
	top              : 2px;
	width            : var(--height);
	height           : calc(var(--pin-favorite-height) - 4px);
	background-color : var(--scrollbar-thumb-bg-color);
	color            : var(--invert-color);
	opacity          : 0;
	pointer-events   : none;
	cursor           : pointer;
	transition       : opacity 300ms ease-in-out;
	z-index          : 1;
`;
export const PinFavoriteItem = styled.div.attrs({'data-widget': 'pin-favorite-item'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	max-width        : 250px;
	min-height       : var(--height);
	height           : var(--height);
	padding          : 0 calc(var(--margin) / 2);
	margin-left      : calc(var(--margin) / 2);
	border-radius    : calc(var(--height) / 2);
	border           : var(--border);
	background-color : var(--bg-color);
	font-variant     : petite-caps;
	cursor           : pointer;
	&:hover {
		background-color : var(--hover-color);
		> button[data-widget="pin-favorite-item-remove-button"] {
			left           : 0;
			opacity        : 1;
			pointer-events : auto;
			transition     : opacity 300ms ease-in-out 500ms, left 300ms ease-in-out 500ms, color 300ms ease-in-out, background-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
			&:hover {
				color            : var(--invert-color);
				background-color : var(--danger-color);
				box-shadow       : var(--danger-hover-shadow);
			}
		}
	}
`;
export const PinFavoriteItemRemoveButton = styled(Button).attrs({'data-widget': 'pin-favorite-item-remove-button'})`
	position         : absolute;
	top              : 0;
	left             : calc(var(--height) * -1 + 2px);
	width            : calc(var(--height) - 2px);
	height           : calc(var(--height) - 2px);
	padding          : 0;
	background-color : var(--bg-color);
	box-shadow       : var(--primary-hover-color);
	border-radius    : 100%;
	overflow-x       : hidden;
	opacity          : 0;
	pointer-events   : none;
	transition       : opacity 300ms ease-in-out, left 300ms ease-in-out, color 300ms ease-in-out, background-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
`;
// avoid the last item adsorbs to unpin button
export const PinFavoriteItemTail = styled.div.attrs({'data-widget': 'pin-favorite-item-tail'})`
	display   : block;
	min-width : calc(var(--margin) / 2);
	height    : var(--height);
`;
export const UnpinFavoriteButton = styled.div.attrs({'data-widget': 'pin-favorite-unpin-button'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	font-size        : 1.2em;
	font-weight      : var(--font-demi-bold);
	font-variant     : petite-caps;
	padding          : 0 calc(var(--margin) / 2) 0 calc(var(--margin));
	color            : var(--invert-color);
	background-color : var(--primary-color);
	cursor           : pointer;
`;