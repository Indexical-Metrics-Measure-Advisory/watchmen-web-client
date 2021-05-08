export const cleanUselessValues = (options: any): typeof options => {
	const optionsType = typeof options;
	if (optionsType !== 'object') {
		return options;
	}

	Object.keys(options).forEach(key => {
		if (options[key] == null) {
			delete options[key];
		} else {
			cleanUselessValues(options[key]);
		}
	});

	return options;
};