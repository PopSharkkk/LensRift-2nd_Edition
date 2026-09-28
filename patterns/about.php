<?php
/**
 * Title: About / Vision
 * Slug: montana/about
 * Categories: montana-sections
 * Keywords: about, vision, bio, lensrift
 * Description: Split layout featuring profile photography and director's bio with stats.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"lensrift-about-section","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"},"anchor":"about"} -->
<div class="wp-block-group alignfull lensrift-about-section" id="about" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
	<!-- wp:columns {"verticalAlignment":"center","className":"lensrift-about-cols","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|60","left":"var:preset|spacing|60"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center lensrift-about-cols">
		<!-- wp:column {"verticalAlignment":"center","width":"45%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:45%">
			<!-- wp:html -->
			<div class="lensrift-about-image-wrapper">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/about-2.webp' ) ); ?>" alt="LensRift Founder &amp; Director" class="lensrift-profile-img"/>
				<div class="lensrift-image-frame-border"></div>
			</div>
			<!-- /wp:html -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"55%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:55%">
			<!-- wp:group {"className":"lensrift-about-content","style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"constrained"}} -->
			<div class="wp-block-group lensrift-about-content">
				<!-- wp:paragraph {"className":"is-style-montana-eyebrow lensrift-eyebrow"} -->
				<p class="is-style-montana-eyebrow lensrift-eyebrow">ABOUT LENSRIFT</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":2,"className":"lensrift-section-title"} -->
				<h2 class="wp-block-heading lensrift-section-title">Visual Precision &amp; Cinematic Depth</h2>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"lensrift-bio-text"} -->
				<p class="lensrift-bio-text">LensRift is an independent cinematography studio &amp; photo direction practice founded by Julian Vane. Specializing in high-end commercial imagery, documentary films, and artistic portraiture, LensRift blends dark organic tones with refined lighting to create timeless visual narratives.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"lensrift-bio-text"} -->
				<p class="lensrift-bio-text">Our philosophy rests on intentionality — every frame is calculated, every grade is crafted to evoke emotion, and every project is treated as a unique cinematic signature.</p>
				<!-- /wp:paragraph -->

				<!-- wp:html -->
				<div class="lensrift-stats-grid">
					<div class="lensrift-stat-item">
						<span class="lensrift-stat-num">12+</span>
						<span class="lensrift-stat-label">Years Experience</span>
					</div>
					<div class="lensrift-stat-item">
						<span class="lensrift-stat-num">150+</span>
						<span class="lensrift-stat-label">Projects Completed</span>
					</div>
					<div class="lensrift-stat-item">
						<span class="lensrift-stat-num">18</span>
						<span class="lensrift-stat-label">Film Awards</span>
					</div>
				</div>
				<!-- /wp:html -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
