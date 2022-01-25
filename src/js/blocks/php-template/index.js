/**
 * BLOCK: llms/php-template
 *
 * @since [version]
 */

// WP deps.
import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';

/**
 * Block Name.
 *
 * @type {String}
 */
export const name = 'llms/php-template';

/**
 * Register Block.
 *
 * @since [version]
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 * @return {Object} Block settings object.
 */
export const settings = {
	title: __( 'LifterLMS PHP Template', 'lifterlms' ),
	category: 'llms-blocks', // common, formatting, layout widgets, embed. see https://wordpress.org/gutenberg/handbook/block-api/#category.
	keywords: [ __( 'LifterLMS', 'lifterlms' ) ],
	attributes: {
		template: {
			type: 'string',
			default: '',
		},
		title: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		html: false,
		multiple: false,
		reusable: false,
		inserter: false,
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 *
	 * This represents what the editor will render when the block is used.
	 * The "edit" property must be a valid function.
	 *
	 * @since [version]
	 *
	 * @param {Object} props Block properties.
	 * @return {Element} Edit component.
	 */
	edit: ( props ) => {
		console.log(LLMS_Block_Templates_l10n);
		const { attributes } = props;
		const blockProps = useBlockProps();
		const title = attributes.title ?
			attributes.title
			:
			( LLMS_Block_Templates_l10n && LLMS_Block_Templates_l10n.hasOwnProperty( attributes.template ) ? LLMS_Block_Templates_l10n[attributes.template] : attributes.template );

		return (
			<div { ...blockProps }>
				<Placeholder
					label={ title }
					className="wp-block-liftelrms-php-template__placeholder"
				>
					<div className="wp-block-liftelrms-php-template__placeholder-copy">
						<p className="wp-block-liftelrms-php-template__placeholder-warning">
							<strong>
								{ __(
									'Attention: Do not remove this block!',
									'lifterlms'
								) }
							</strong>{ ' ' }
							{ __(
								'Removal will cause unintended effects on your LMS site.',
								'lifterlms'
							) }
						</p>
						<p>
							{ sprintf(
								/* translators: %s is the template title */
								__(
									'This is an editor placeholder for the %s. On your site this will be replaced by the relevant template. You can move this placeholder around and add further blocks around it to extend the template.',
									'lifterlms'
								),
								title
							) }
						</p>
					</div>
			</Placeholder>
		</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @since [version]
	 *
	 * @return {null} Save function disabled for "dynamic" block.
	 */
	save: () => {
		return null;
	},
};
