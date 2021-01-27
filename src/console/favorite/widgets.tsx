import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { FAVORITE_Z_INDEX, PIN_FAVORITE_Z_INDEX } from '../../basic-widgets/constants';
import { TooltipButton } from '../../basic-widgets/tooltip-button';

export const FloatFavoriteContainer = styled.div.attrs<{ visible: boolean, top: number, left: number }>(
	({ visible, top, left }) => {
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

export const FloatFavoriteTitle = styled.div.attrs({ 'data-widget': 'float-favorite-title' })`
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
export const FloatFavoritePinButton = styled(TooltipButton).attrs({ 'data-widget': 'float-favorite-pin-button' })`
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

export const FloatFavoriteItem = styled.div.attrs({ 'data-widget': 'float-favorite-item' })`
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
	}
`;
export const FavoriteItemIcon = styled(FontAwesomeIcon).attrs({ 'data-widget': 'favorite-item-icon' })`
	min-width    : 16px;
	margin-right : calc(var(--margin) / 4);
`;
export const FavoriteItemLabel = styled.span.attrs({ 'data-widget': 'favorite-item-label' })`
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const FavoriteNoData = styled.div.attrs({ 'data-widget': 'float-favorite-no-data' })`
	display      : flex;
	position     : relative;
	align-items  : center;
	height       : var(--height);
	padding      : 0 calc(var(--margin) / 2);
	font-variant : petite-caps;
`;
export const PinFavoriteContainer = styled.div.attrs<{ visible: boolean, left: number }>(({ visible, left }) => {
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
`;
export const PinFavoriteTitle = styled.div.attrs({ 'data-widget': 'pin-favorite-title' })`
	display          : flex;
	position         : relative;
	align-items      : center;
	font-size        : 1.2em;
	font-weight      : var(--font-demi-bold);
	font-variant     : petite-caps;
	padding          : 0 calc(var(--margin)) 0 calc(var(--margin) / 2);
	color            : var(--invert-color);
	background-color : var(--primary-color);
`;
export const PinFavoriteBody = styled.div.attrs({
	'data-widget': 'pin-favorite-body'
})`
	display          : flex;
	position         : relative;
	flex-wrap        : nowrap;
	align-items      : center;
	overflow-x       : hidden;
	background-color : var(--bg-color);
	border-radius    : calc(var(--height) * 0.6);
	margin           : 0 calc(var(--margin) / -2);
	z-index          : 1;
`;
export const PinFavoriteItem = styled.div.attrs({ 'data-widget': 'pin-favorite-item' })`
	display          : flex;
	position         : relative;
	align-items      : center;
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
	}
`;
export const UnpinFavoriteButton = styled.div.attrs({ 'data-widget': 'pin-favorite-unpin-button' })`
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