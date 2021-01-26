import color from 'color';

const baseColors1 = [ '#60ACFC', '#32D3EB', '#5BC49F', '#FEB64D', '#FF7C7C', '#9287E7' ];
const baseColors2 = [ '#238EE4', '#42B1C2', '#8DD86F', '#FD8C56', '#E14D7C', '#6163D9' ];
const baseColors3 = [ '#31A3E5', '#39C6BB', '#CCED48', '#F66B5B', '#CA4697', '#5057D6' ];
const baseColors4 = [ '#2EB1D9', '#55CEA3', '#FED535', '#F75559', '#A542AF', '#5479CD' ];

export const BaseColors6 = baseColors1;
export const BaseColors12 = [ ...baseColors1, ...baseColors2 ];
export const BaseColors24 = [ ...baseColors1, ...baseColors2, ...baseColors3, ...baseColors4 ];

const base24 = BaseColors24.map(c => color(c));
export const DarkenColors24 = base24.map(c => c.darken(0.1).rgb().toString());
export const LightColors24 = base24.map(c => c.lighten(0.2).rgb().toString());
export const LighterColors24 = base24.map(c => c.lighten(0.4).rgb().toString());

export const [ DarkenColors12, LightColors12, LighterColors12 ] = [ DarkenColors24, LightColors24, LighterColors24 ].map(series => {
	return series.filter((c, index) => index % 2 === 0);
});
export const [ DarkenColors6, LightColors6, LighterColors6 ] = [ DarkenColors24, LightColors24, LighterColors24 ].map(series => {
	return series.filter((c, index) => index % 4 === 0);
});