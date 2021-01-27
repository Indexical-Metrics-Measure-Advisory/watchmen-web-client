import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { FAVORITE_Z_INDEX } from '../../basic-widgets/constants';

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
	font-size        : 1.2em;
	font-weight      : var(--font-demi-bold);
	font-variant     : petite-caps;
	height           : var(--height);
	padding          : 0 calc(var(--margin) / 2);
	color            : var(--invert-color);
	background-color : var(--primary-color);
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
export const FloatFavoriteItemIcon = styled(FontAwesomeIcon).attrs({ 'data-widget': 'float-favorite-item-icon' })`
	min-width    : 16px;
	margin-right : calc(var(--margin) / 4);
`;
export const FloatFavoriteItemLabel = styled.span.attrs({ 'data-widget': 'float-favorite-item-label' })`
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const FloatFavoriteNoData = styled.div.attrs({ 'data-widget': 'float-favorite-no-data' })`
	display      : flex;
	position     : relative;
	align-items  : center;
	height       : var(--height);
	padding      : 0 calc(var(--margin) / 2);
	font-variant : petite-caps;
`;