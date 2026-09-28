<?php
/**
 * Title: Footer
 * Slug: montana/footer
 * Keywords: footer, lensrift
 * Block Types: core/template-part/footer
 * Description: Minimalist cinematic footer for LensRift.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"montana-footer lensrift-footer","backgroundColor":"dark","textColor":"on-dark","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull montana-footer lensrift-footer has-on-dark-color has-dark-background-color has-text-color has-background">
	<!-- wp:group {"className":"lensrift-footer-inner","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"center"}} -->
	<div class="wp-block-group lensrift-footer-inner">
		<!-- wp:paragraph {"className":"lensrift-footer-brand"} -->
		<p class="lensrift-footer-brand">Lens<span class="lensrift-accent">Rift</span> Portfolio</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph {"className":"lensrift-footer-copy"} -->
		<p class="lensrift-footer-copy">&copy; <?php echo esc_html( date( 'Y' ) ); ?> LensRift Studio. All rights reserved. Cinematic Photography &amp; Film Direction.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
