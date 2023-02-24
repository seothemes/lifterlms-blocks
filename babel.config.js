/**
 * Babel config
 *
 * @since 1.8.0
 * @version 1.8.0
 */

const
	presets = [ '@wordpress/default' ],
	plugins = [ '@babel/plugin-proposal-class-properties' ];

module.exports = { plugins, presets };
