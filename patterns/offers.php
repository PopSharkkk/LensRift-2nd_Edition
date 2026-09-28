<?php
/**
 * Title: Services / Capabilities
 * Slug: montana/offers
 * Categories: montana-sections
 * Keywords: services, capabilities, cinematography, lensrift
 * Description: Icon-based capabilities section detailing Cinematography, Color Grading, Aerial/Drone, and Direction offerings.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"lensrift-services-section","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"},"anchor":"services"} -->
<div class="wp-block-group alignfull lensrift-services-section" id="services" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
	<!-- wp:group {"className":"montana-title montana-title--center","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group montana-title montana-title--center">
		<!-- wp:paragraph {"className":"is-style-montana-eyebrow lensrift-eyebrow","style":{"typography":{"textAlign":"center"}}} -->
		<p class="has-text-align-center is-style-montana-eyebrow lensrift-eyebrow">OUR CAPABILITIES</p>
		<!-- /wp:paragraph -->

		<!-- wp:heading {"level":2,"style":{"typography":{"textAlign":"center"}},"className":"lensrift-section-title"} -->
		<h2 class="wp-block-heading has-text-align-center lensrift-section-title">Services &amp; Production</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"className":"lensrift-section-desc","style":{"typography":{"textAlign":"center"}}} -->
		<p class="has-text-align-center lensrift-section-desc">Tailored production solutions crafted with state-of-the-art technology and precise artistic vision.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:html -->
	<div class="lensrift-services-grid">
		<div class="lensrift-service-card">
			<div class="lensrift-service-icon">
				<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
			</div>
			<h3 class="lensrift-service-title">Cinematography</h3>
			<p class="lensrift-service-desc">High-end narrative film, commercial production, and music video direction shot in native 6K/8K formats with cinema lenses.</p>
			<ul class="lensrift-service-list">
				<li>Commercial &amp; Brand Films</li>
				<li>Documentary Motion</li>
				<li>Anamorphic &amp; Cinema Optics</li>
			</ul>
		</div>

		<div class="lensrift-service-card">
			<div class="lensrift-service-icon">
				<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a7 7 0 1 0 10 10A10 10 0 0 1 12 2z"></path></svg>
			</div>
			<h3 class="lensrift-service-title">Color Grading</h3>
			<p class="lensrift-service-desc">Master DaVinci Resolve color grading delivering distinctive film emulation, HDR mastering, and unified visual moods.</p>
			<ul class="lensrift-service-list">
				<li>Custom Film Print Emulation</li>
				<li>HDR10 &amp; Dolby Vision</li>
				<li>Skin Tone Optimization</li>
			</ul>
		</div>

		<div class="lensrift-service-card">
			<div class="lensrift-service-icon">
				<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
			</div>
			<h3 class="lensrift-service-title">Aerial &amp; Drone</h3>
			<p class="lensrift-service-desc">Licensed FPV and heavy-lifter aerial cinema capturing sweeping landscape perspectives and dynamic pursuit shots.</p>
			<ul class="lensrift-service-list">
				<li>FAA Part 107 Certified</li>
				<li>High-Speed FPV Pursuit</li>
				<li>PRORES RAW Aerial Capture</li>
			</ul>
		</div>

		<div class="lensrift-service-card">
			<div class="lensrift-service-icon">
				<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
			</div>
			<h3 class="lensrift-service-title">Commercial Photography</h3>
			<p class="lensrift-service-desc">Medium format editorial, luxury architectural, and portrait photography designed for key visual campaigns.</p>
			<ul class="lensrift-service-list">
				<li>Fashion &amp; Editorial</li>
				<li>Architectural &amp; Interior</li>
				<li>Product &amp; Still Life</li>
			</ul>
		</div>
	</div>
	<!-- /wp:html -->
</div>
<!-- /wp:group -->
