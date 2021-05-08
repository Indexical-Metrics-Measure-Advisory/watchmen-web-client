import color from 'color';

const baseColors1 = ['#60ACFC', '#32D3EB', '#5BC49F', '#FEB64D', '#FF7C7C', '#9287E7'];
const baseColors2 = ['#238EE4', '#42B1C2', '#8DD86F', '#FD8C56', '#E14D7C', '#6163D9'];
const baseColors3 = ['#31A3E5', '#39C6BB', '#CCED48', '#F66B5B', '#CA4697', '#5057D6'];
const baseColors4 = ['#2EB1D9', '#55CEA3', '#FED535', '#F75559', '#A542AF', '#5479CD'];

export const BASE_COLORS_6 = baseColors1;
export const BASE_COLORS_12 = [...baseColors1, ...baseColors2];
export const BASE_COLORS_24 = [...baseColors1, ...baseColors2, ...baseColors3, ...baseColors4];

const base24 = BASE_COLORS_24.map(c => color(c));
export const DARK_COLORS_24 = base24.map(c => c.darken(0.1).rgb().toString());
export const LIGHT_COLORS_24 = base24.map(c => c.lighten(0.2).rgb().toString());
export const LIGHTER_COLORS_24 = base24.map(c => c.lighten(0.4).rgb().toString());

export const [DARK_COLORS_12, LIGHT_COLORS_12, LIGHTER_COLORS_12] = [DARK_COLORS_24, LIGHT_COLORS_24, LIGHTER_COLORS_24].map(series => {
	return series.filter((c, index) => index % 2 === 0);
});
export const [DARK_COLORS_6, LIGHT_COLORS_6, LIGHTER_COLORS_6] = [DARK_COLORS_24, LIGHT_COLORS_24, LIGHTER_COLORS_24].map(series => {
	return series.filter((c, index) => index % 4 === 0);
});