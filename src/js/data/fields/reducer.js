/**
 * Redux data store reducer
 *
 * @since 2.0.0
 * @version 2.0.0
 */

// WP deps.
import { combineReducers } from '@wordpress/data';

// Internal Deps.
import { DEFAULT_FIELDS } from './default-fields';
import { fieldsObjectToArray, fieldsArrayToObject } from './util';

/**
 * Create a new field
 *
 * @since 2.0.0
 *
 * @param {Object} fieldsToAdd Current fields object derived from the state tree.
 * @param {Object} field       Field to add.
 * @return {Object} Updated fields object.
 */
function addField( fieldsToAdd, field ) {
	return {
		...fieldsToAdd,
		[ field.name ]: {
			...field,
		},
	};
}

/**
 * Delete a field
 *
 * Note: persisted fields (those stored in the database) should be unloaded instead of deleted.
 *
 * @since 2.0.0
 *
 * @param {Object} fieldsToDelete Current fields object derived from the state tree.
 * @param {string} nameToDelete   Name of the field to delete.
 * @return {Object} Updated fields object.
 */
function deleteField( fieldsToDelete, nameToDelete ) {
	fieldsToDelete = fieldsObjectToArray( fieldsToDelete ).filter(
		( { name } ) => name !== nameToDelete
	);
	return fieldsArrayToObject( fieldsToDelete );
}

/**
 * Edit an existing field
 *
 * Note: the `name` attribute should not be edited, instead use `renameField()` and then `editField()`.
 *
 * @since 2.0.0
 *
 * @param {Object} fieldsToEdit Current fields object derived from the state tree.
 * @param {string} name         Name of the field to be edited.
 * @param {Object} edits        Full or partial object of edits to make to the field.
 * @return {Object} Updated fields object.
 */
function editField( fieldsToEdit, name, edits ) {
	return {
		...fieldsToEdit,
		[ name ]: {
			...fieldsToEdit[ name ],
			...edits,
		},
	};
}

/**
 * Rename a field
 *
 * @since 2.0.0
 *
 * @param {Object} fieldsToRename Current fields object derived from the state tree.
 * @param {string} oldName        Current/old name of the field.
 * @param {string} newName        New name of the field.
 * @return {Object} Updated fields object.
 */
function renameField( fieldsToRename, oldName, newName ) {
	const copy = {
		...fieldsToRename[ oldName ],
	};
	fieldsToRename = deleteField( fieldsToRename, oldName );
	return addField( fieldsToRename, {
		...copy,
		name: newName,
	} );
}

/**
 * Reset fields to the default state.
 *
 * @since 2.0.0
 *
 * @return {Object} Object of field objects.
 */
function resetFields() {
	return DEFAULT_FIELDS;
}

/**
 * Fields reducer
 *
 * @since 2.0.0
 *
 * @param {Object} state  Current fields object derived from the state tree.
 * @param {Object} action Dispached action object.
 * @return {Object} Updated state.
 */
export function fields( state = DEFAULT_FIELDS, action ) {
	const { type } = action;

	switch ( type ) {
		case 'ADD_FIELD':
			return addField( state, action.field );

		case 'DELETE_FIELD':
			return deleteField( state, action.name );

		case 'EDIT_FIELD':
			return editField( state, action.name, action.edits );

		case 'RECEIVE_FIELDS':
			return fieldsArrayToObject( action.fields );

		case 'RENAME_FIELD':
			return renameField( state, action.oldName, action.newName );

		case 'RESET_FIELDS':
			return resetFields();

		default:
			return state;
	}
}

export default combineReducers( {
	fields,
} );
