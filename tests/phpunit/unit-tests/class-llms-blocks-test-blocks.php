<?php
/**
 * Test main plugin file.
 *
 * @package LifterLMS_Blocks/Tests
 *
 * @since 1.5.1
 * @since 1.6.0 Update `test_add_block_category` test to accommodate form fields cat.
 * @since 1.10.0 Update `test_get_dynamic_block_names` to test against core blocks available in 5.1.
 */
class LLMS_Blocks_Test_Blocks extends LLMS_Blocks_Unit_Test_Case {

	/**
	 * Test the add_block_category() method
	 *
	 * @since 1.5.1
	 * @since 1.6.0 Update test to accommodate form fields cat.
	 * @since [version] Update test to reflect updated cat order.
	 *
	 * @return void
	 */
	public function test_add_block_category() {

		$obj = new LLMS_Blocks();

		$our_cats = array(
			array(
				'slug'  => 'llms-user-info-fields',
				'title' => 'User Information',
			),
			array(
				'slug'  => 'llms-custom-fields',
				'title' => 'Custom User Information',
			),
			array(
				'slug'  => 'llms-blocks',
				'title' => 'LifterLMS Blocks',
			),
		);

		$existing = array(
			'slug'  => 'fake-cat-slug',
			'title' => 'Fake Cat Title',
		);

		$this->assertSame( $our_cats, $obj->add_block_category( array() ) );
		$this->assertSame( array( $our_cats[0], $our_cats[1], $existing, $our_cats[2] ), $obj->add_block_category( array( $existing ) ) );

	}

	/**
	 * Ensure the WP core method get_block_categories() results in the `llms-blocks` category being added.
	 *
	 * @since 1.5.1
	 *
	 * @return void
	 */
	public function test_add_block_category_integration() {

		$slugs = wp_list_pluck( get_block_categories( $this->factory->post->create_and_get() ), 'slug' );
		$this->assertTrue( in_array( 'llms-blocks', $slugs, true ) );

	}

	/**
	 * Test the admin_print_scripts() method.
	 *
	 * @since 1.5.1
	 *
	 * @return void
	 */
	public function test_admin_print_scripts() {

		$obj = new LLMS_Blocks();

		// no current screen.
		$this->assertOutputEmpty( array( $obj, 'admin_print_scripts' ) );

		// Don't Display.
		foreach ( array( 'dashboard', 'options-general', 'tools', 'users-new', 'plugin-editor', 'edit-page' ) as $screen ) {
			set_current_screen( $screen );
			$this->assertOutputEmpty( array( $obj, 'admin_print_scripts' ) );
		}

		// Display
		foreach ( array( 'post', 'page', 'course', 'llms_membership' ) as $screen ) {
			set_current_screen( $screen );
			$this->assertOutputContains( '<script>window.llms.dynamic_blocks', array( $obj, 'admin_print_scripts' ) );
		}

	}

	/**
	 * Test the get_dynamic_block_names() method.
	 *
	 * @since 1.5.1
	 * @since 1.10.0 Replace core/search with core/shortcode because search wasn't available in 5.1.
	 *
	 * @return void
	 */
	public function test_get_dynamic_block_names() {

		$obj = new LLMS_Blocks();

		$res = LLMS_Unit_Test_Util::call_method( $obj, 'get_dynamic_block_names' );

		$this->assertTrue( in_array( 'core/archives', $res, true ) );
		$this->assertTrue( in_array( 'core/shortcode', $res, true ) );
		$this->assertFalse( in_array( 'llms/course-information', $res, true ) );
		$this->assertFalse( in_array( 'llms/pricing-table', $res, true ) );

	}

	/**
	 * Test load_textdomain()
	 *
	 * @since 1.10.0
	 *
	 * @return void
	 */
	public function test_load_textdomain() {

		$main = new LLMS_Blocks();

		$dirs = array(
			WP_LANG_DIR . '/lifterlms', // "Safe" directory.
			WP_LANG_DIR . '/plugins', // Default language directory.
			LLMS_BLOCKS_PLUGIN_DIR . '/i18n', // Plugin language directory.
		);

		foreach ( $dirs as $dir ) {

			// Make sure the initial strings work.
			$this->assertEquals( 'LifterLMS Blocks', __( 'LifterLMS Blocks', 'lifterlms' ) );
			$this->assertEquals( 'Post visibility.', __( 'Post visibility.', 'lifterlms' ) );

			// Load from the "safe" directory.
			$file = LLMS_Unit_Test_Files::copy_asset( 'lifterlms-blocks-en_US.mo', $dir );
			$main->load_textdomain();

			$this->assertEquals( 'BetterLMS Blocks', __( 'LifterLMS Blocks', 'lifterlms' ) );
			$this->assertEquals( 'Item visibility.', __( 'Post visibility.', 'lifterlms' ) );

			// Clean up.
			LLMS_Unit_Test_Files::remove( $file );
			unload_textdomain( 'lifterlms' );

		}

	}

}