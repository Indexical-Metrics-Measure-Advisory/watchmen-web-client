import {DROPDOWN_HEIGHT} from './constants';

export const getPosition = (container: HTMLDivElement) => {
	const rect = container.getBoundingClientRect();
	return {top: rect.top, left: rect.left, width: rect.width, height: rect.height};
};

export const atBottom = (top: number, height: number) => {
	return top + height + DROPDOWN_HEIGHT + 2 < window.innerHeight;
};

export const hsb2hsl = (hue: number, saturation: number, brightness: number) => {
	const hsl = {hue, lightness: (2 - saturation) * brightness, saturation: saturation * brightness};
	if (hsl.lightness <= 1 && hsl.lightness > 0) {
		hsl.saturation /= hsl.lightness;
	} else {
		hsl.saturation = hsl.saturation / (2 - hsl.lightness) || 0;
	}
	hsl.lightness /= 2;
	if (hsl.saturation > 1) {
		hsl.saturation = 1;
	}
	return hsl;
};
const hue2rgb = (p: number, q: number, t: number) => {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) {
		return p + (q - p) * 6 * t;
	}
	if (t < 1 / 2) {
		return q;
	}
	if (t < 2 / 3) {
		return p + (q - p) * (2 / 3 - t) * 6;
	}
	return p;
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes s and l are contained in the set [0, 1] and h is
 * contained in the set [0, 360], returns r, g, and b in the
 * set [0, 255].
 *
 * @param   {number}  hue       The hue
 * @param   {number}  saturation       The saturation
 * @param   {number}  lightness       The lightness
 * @return  {Array}           The RGB representation
 */
// hsl颜色转为rgb颜色
export const hsl2rgb = (hue: number, saturation: number, lightness: number) => {
	hue = hue / 360;
	let red, green, blue;
	if (saturation === 0) {
		red = green = blue = lightness; // achromatic
	} else {
		const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
		const p = 2 * lightness - q;
		red = hue2rgb(p, q, hue + 1 / 3);
		green = hue2rgb(p, q, hue);
		blue = hue2rgb(p, q, hue - 1 / 3);
	}
	return {red, green, blue};
};
// rgb to hex
export const rgb2hex = (red: number, green: number, blue: number) => {
	return '#' + (16777216 | (blue * 255) | ((green * 255) << 8) | ((red * 255) << 16)).toString(16).slice(1);
};
export const hex2rgb = (hex: string) => {
	if (hex.startsWith('#')) {
		hex = hex.substring(1);
	}
	const [d1, d2, d3, d4, d5, d6] = hex.split('');
	return {red: parseInt(`${d1}${d2}`, 16), green: parseInt(`${d3}${d4}`, 16), blue: parseInt(`${d5}${d6}`, 16)};
};
