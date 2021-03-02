/**
 * BLOCK: llms/form-field-user-username
 *
 * @since 1.6.0
 * @since 1.8.0 Updated lodash imports.
 * @since 1.12.0 Add data store support.
 */

// WP Deps.
import { __ } from '@wordpress/i18n';

// External Deps.
import { cloneDeep } from 'lodash';

// Internal Deps.
import { settings as textSettings } from './text';

/**
 * Block Name
 *
 * @type {string}
 */
const name = 'llms/form-field-user-username';

/**
 * Array of supported post types.
 *
 * @type {Array}
 */
const postTypes = [ 'llms_form' ];

/**
 * Is this a default or composed field?
 *
 * Composed fields serve specific functions (like the User Email Address field)
 * and are automatically added to the form builder UI.
 *
 * Default (non-composed) fields can be added by developers to perform custom functions
 * and are not registered as a block by default
 *
 * @type {string}
 */
const composed = true;

// Setup the field settings.
const settings = cloneDeep( textSettings );

settings.title = __( 'Username', 'lifterlms' );
settings.description = __(
	"A special field used to collect a user's account username. If this field is omitted a username will be automatically generated based off their email address. Users can always login using either their email address or username.",
	'lifterlms'
);

settings.icon.src = 'admin-users';

settings.supports.multiple = false; // Can only have a single email address field.

settings.supports.llms_field_inspector.id = false;
settings.supports.llms_field_inspector.name = false;
settings.supports.llms_field_inspector.required = false;
settings.supports.llms_field_inspector.match = false;
settings.supports.llms_field_inspector.storage = false;

settings.attributes.id.__default = 'user_login';
settings.attributes.label.__default = __( 'Username', 'lifterlms' );
settings.attributes.name.__default = 'user_login';
settings.attributes.required.__default = true;
settings.attributes.data_store.__default = 'users';

delete settings.transforms;

export { name, postTypes, composed, settings };
