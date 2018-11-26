<?php
/**
 * Course syllabus block.
 *
 * @package  LifterLMS_Blocks/Abstracts
 * @since    [version]
 * @version  [version]
 *
 * @render_hook llms_course-syllabus-block_render
 */

defined( 'ABSPATH' ) || exit;

/**
 * Course syllabus block class.
 */
class LLMS_Blocks_Course_Syllabus_Block extends LLMS_Blocks_Abstract_Block {

	/**
	 * Block ID.
	 *
	 * @var string
	 */
	protected $id = 'course-syllabus';

	/**
	 * Is block dynamic (rendered in PHP).
	 *
	 * @var bool
	 */
	protected $is_dynamic = true;

	/**
	 * Add actions attached to the render function action.
	 *
	 * @param   array  $attributes Optional. Block attributes. Default empty array.
	 * @param   string $content    Optional. Block content. Default empty string.
	 * @return  void
	 * @since   [version]
	 * @version [version]
	 */
	public function add_hooks( $attributes = array(), $content = '' ) {

		llms_log( $_REQUEST );

		// Remove all the default LifterLMS template hooks.
		remove_action( 'lifterlms_single_course_after_summary', 'lifterlms_template_single_syllabus', 90 );

		add_action( $this->get_render_hook(), 'lifterlms_template_single_syllabus', 10 );

	}

	/**
	 * Retrieve custom block attributes.
	 * Necessary to override when creating ServerSideRender blocks.
	 *
	 * @return  array
	 * @since   [version]
	 * @version [version]
	 */
	public function get_attributes() {
		return array_merge( parent::get_attributes(), array(
			'course_id' => array(
				'type' => 'int',
				'default' => 0,
			),
		) );
	}

}

return new LLMS_Blocks_Course_Syllabus_Block();
