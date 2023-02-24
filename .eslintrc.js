module.exports = {
	parser: '@babel/eslint-parser',
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended-with-formatting' ],
	rules: {
		/**
		 * For the time being display warnings for these but leave them alone
		 *
		 * @todo Clean these up.
		 */
		'no-shadow': [ 1 ],

		/**
		 * Allows the use of UNSAFE_ prefixes for deprecated lifecycle methods.
		 *
		 * @todo Fix deprecated lifecycle methods such as `componentWillMount`.
		 */
		camelcase: [
			'error', {
				ignoreDestructuring: true,
				allow: [
					'UNSAFE_componentWillMount',
					'data_store*',
					'llms_*',
					'label_show_empty',
					'options_preset',
					'last_column',
					'html_attrs',
					'min_strength',
					'meter_description',
					'user_id',
					'catalog_search',
					'per_page',
					'post_id',
				],
			},
		],
	},
};
