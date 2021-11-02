export enum ColorPickerEventTypes {
	HUE_CHANGED = 'hue-changed',
	ALPHA_CHANGED = 'alpha-changed',
	SATURATION_AND_BRIGHTNESS_CHANGED = 'saturation-and-brightness-changed',

	RGB_CHANGED = 'rgb-changed',
	RGBA_CHANGED = 'rgba-changed',

	ASK_COLOR = 'ask-color',
}

export interface ColorPickerEventBus {
	fire(type: ColorPickerEventTypes.HUE_CHANGED, hue: number): this;
	on(type: ColorPickerEventTypes.HUE_CHANGED, listener: (hue: number) => void): this;
	off(type: ColorPickerEventTypes.HUE_CHANGED, listener: (hue: number) => void): this;

	fire(type: ColorPickerEventTypes.ALPHA_CHANGED, alpha: number): this;
	on(type: ColorPickerEventTypes.ALPHA_CHANGED, listener: (alpha: number) => void): this;
	off(type: ColorPickerEventTypes.ALPHA_CHANGED, listener: (alpha: number) => void): this;

	fire(type: ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, saturation: number, brightness: number): this;
	on(type: ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, listener: (saturation: number, brightness: number) => void): this;
	off(type: ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, listener: (saturation: number, brightness: number) => void): this;

	fire(type: ColorPickerEventTypes.RGB_CHANGED, hex: string): this;
	on(type: ColorPickerEventTypes.RGB_CHANGED, listener: (hex: string) => void): this;
	off(type: ColorPickerEventTypes.RGB_CHANGED, listener: (hex: string) => void): this;

	fire(type: ColorPickerEventTypes.RGBA_CHANGED, red: number, green: number, blue: number, alpha: number): this;
	on(type: ColorPickerEventTypes.RGBA_CHANGED, listener: (red: number, green: number, blue: number, alpha: number) => void): this;
	off(type: ColorPickerEventTypes.RGBA_CHANGED, listener: (red: number, green: number, blue: number, alpha: number) => void): this;

	fire(type: ColorPickerEventTypes.ASK_COLOR, onData: (color?: string) => void): this;
	on(type: ColorPickerEventTypes.ASK_COLOR, listener: (onData: (color?: string) => void) => void): this;
	off(type: ColorPickerEventTypes.ASK_COLOR, listener: (onData: (color?: string) => void) => void): this;
}
