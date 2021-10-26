const {
	override,
	addDecoratorsLegacy,
	addWebpackAlias,
	setWebpackOptimizationSplitChunks
} = require('customize-cra');
const path = require('path');

module.exports = override(
	addWebpackAlias({"@": path.resolve(__dirname, 'src')}),
	addDecoratorsLegacy(),
	setWebpackOptimizationSplitChunks({maxSize: 1024 * 400})
)