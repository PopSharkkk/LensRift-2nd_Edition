<?php
/**
 * Title: Hero: Full-Screen Cinematic Reel
 * Slug: montana/hero
 * Categories: montana-sections
 * Keywords: hero, cinematic, video, lensrift
 * Description: Full-screen cinematic hero background with bold LensRift branding and Explore CTA.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"lensrift-hero-frame","layout":{"type":"default"},"anchor":"hero"} -->
<div class="wp-block-group alignfull lensrift-hero-frame" id="hero">
	<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri( 'assets/images/hero-1.webp' ) ); ?>","dimRatio":60,"overlayColor":"dark","isUserOverlayColor":true,"minHeight":100,"minHeightUnit":"vh","className":"lensrift-hero-cover","layout":{"type":"constrained"}} -->
	<div class="wp-block-cover lensrift-hero-cover" style="min-height:100vh">
		<img class="wp-block-cover__image-background" alt="Cinematic Studio Background" src="<?php echo esc_url( get_theme_file_uri( 'assets/images/hero-1.webp' ) ); ?>" data-object-fit="cover"/>
		<span aria-hidden="true" class="wp-block-cover__background has-dark-background-color has-background-dim-60 has-background-dim"></span>
		
		<div class="wp-block-cover__inner-container">
			<!-- wp:group {"className":"lensrift-hero-content","style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"constrained"}} -->
			<div class="wp-block-group lensrift-hero-content">
				<!-- wp:paragraph {"className":"is-style-montana-eyebrow lensrift-eyebrow","style":{"typography":{"textAlign":"center"}}} -->
				<p class="has-text-align-center is-style-montana-eyebrow lensrift-eyebrow">PHOTO &amp; CINEMATOGRAPHY PORTFOLIO</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":1,"className":"lensrift-hero-title","style":{"typography":{"textAlign":"center"}},"textColor":"overlay"} -->
				<h1 class="wp-block-heading has-text-align-center lensrift-hero-title has-overlay-color has-text-color">LENSRIFT</h1>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"lensrift-hero-tagline","style":{"typography":{"textAlign":"center"}},"textColor":"overlay"} -->
				<p class="has-text-align-center lensrift-hero-tagline has-overlay-color has-text-color">Capturing motion, depth, and timeless light through high-end visual storytelling.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}}} -->
				<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--40)">
					<!-- wp:button {"className":"lensrift-explore-btn"} -->
					<div class="wp-block-button lensrift-explore-btn">
						<a class="wp-block-button__link wp-element-button" href="#portfolio">
							<span>Explore Portfolio</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
						</a>
					</div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->
			</div>
			<!-- /wp:group -->
		</div>
	</div>
	<!-- /wp:cover -->
</div>
<!-- /wp:group -->
