<?php
/**
 * Title: Portfolio/Gallery: Dynamic Masonry & Cinematic Video 16:9 Grid
 * Slug: montana/featured-rooms
 * Categories: montana-sections
 * Keywords: portfolio, gallery, masonry, video, lensrift
 * Description: Dynamic portfolio layout with photography masonry grid, 16:9 video thumbnails, subtle hover overlay zoom, and interactive category filters.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"lensrift-portfolio-section","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"},"anchor":"portfolio"} -->
<div class="wp-block-group alignfull lensrift-portfolio-section" id="portfolio" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
	<!-- wp:group {"className":"montana-title montana-title--center","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group montana-title montana-title--center">
		<!-- wp:paragraph {"className":"is-style-montana-eyebrow lensrift-eyebrow","style":{"typography":{"textAlign":"center"}}} -->
		<p class="has-text-align-center is-style-montana-eyebrow lensrift-eyebrow">SELECTED WORKS</p>
		<!-- /wp:paragraph -->

		<!-- wp:heading {"level":2,"style":{"typography":{"textAlign":"center"}},"className":"lensrift-section-title"} -->
		<h2 class="wp-block-heading has-text-align-center lensrift-section-title">Portfolio Showcase</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"className":"lensrift-section-desc","style":{"typography":{"textAlign":"center"}}} -->
		<p class="has-text-align-center lensrift-section-desc">A curated collection of commercial films, artistic photography, and high-impact visual campaigns.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:html -->
	<div class="lensrift-filter-wrapper">
		<ul class="lensrift-filters">
			<li class="lensrift-filter-btn active" data-filter="all">All Works</li>
			<li class="lensrift-filter-btn" data-filter="cinematic">Cinematic</li>
			<li class="lensrift-filter-btn" data-filter="commercial">Commercial</li>
			<li class="lensrift-filter-btn" data-filter="portrait">Portrait</li>
		</ul>
	</div>
	<!-- /wp:html -->

	<!-- Photography Masonry Grid -->
	<div class="lensrift-gallery-header">
		<h3 class="lensrift-subsection-heading">Featured Photography</h3>
	</div>

	<!-- wp:html -->
	<div class="lensrift-masonry-grid">
		<div class="lensrift-masonry-item portrait" data-category="portrait">
			<div class="lensrift-card">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-1.webp' ) ); ?>" alt="Editorial Fashion Portrait" class="lensrift-media"/>
				<div class="lensrift-card-overlay">
					<span class="lensrift-card-cat">Portrait</span>
					<h4 class="lensrift-card-title">Shadow &amp; Silhouettes</h4>
					<p class="lensrift-card-meta">Editorial Photography</p>
				</div>
			</div>
		</div>

		<div class="lensrift-masonry-item commercial" data-category="commercial">
			<div class="lensrift-card">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-2.webp' ) ); ?>" alt="Architectural Commercial Structure" class="lensrift-media"/>
				<div class="lensrift-card-overlay">
					<span class="lensrift-card-cat">Commercial</span>
					<h4 class="lensrift-card-title">Monolith Modernism</h4>
					<p class="lensrift-card-meta">Architectural Campaign</p>
				</div>
			</div>
		</div>

		<div class="lensrift-masonry-item cinematic" data-category="cinematic">
			<div class="lensrift-card">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-3.webp' ) ); ?>" alt="Cinematic Horizon" class="lensrift-media"/>
				<div class="lensrift-card-overlay">
					<span class="lensrift-card-cat">Cinematic</span>
					<h4 class="lensrift-card-title">Golden Hour Ridge</h4>
					<p class="lensrift-card-meta">Landscape Cinematography</p>
				</div>
			</div>
		</div>

		<div class="lensrift-masonry-item portrait" data-category="portrait">
			<div class="lensrift-card">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-4.webp' ) ); ?>" alt="Character Fine Art Portrait" class="lensrift-media"/>
				<div class="lensrift-card-overlay">
					<span class="lensrift-card-cat">Portrait</span>
					<h4 class="lensrift-card-title">Vanguard Expressions</h4>
					<p class="lensrift-card-meta">Fine Art Portraiture</p>
				</div>
			</div>
		</div>

		<div class="lensrift-masonry-item commercial" data-category="commercial">
			<div class="lensrift-card">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-5.webp' ) ); ?>" alt="Luxury Brand Commercial" class="lensrift-media"/>
				<div class="lensrift-card-overlay">
					<span class="lensrift-card-cat">Commercial</span>
					<h4 class="lensrift-card-title">Aura Luxury Watch</h4>
					<p class="lensrift-card-meta">Product Photography</p>
				</div>
			</div>
		</div>

		<div class="lensrift-masonry-item cinematic" data-category="cinematic">
			<div class="lensrift-card">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/about-1.webp' ) ); ?>" alt="Cinematic Nature Study" class="lensrift-media"/>
				<div class="lensrift-card-overlay">
					<span class="lensrift-card-cat">Cinematic</span>
					<h4 class="lensrift-card-title">Solitude &amp; Timber</h4>
					<p class="lensrift-card-meta">Documentary Photography</p>
				</div>
			</div>
		</div>
	</div>
	<!-- /wp:html -->

	<!-- Cinematic Video 16:9 Grid -->
	<div class="lensrift-gallery-header" style="margin-top: 4rem;">
		<h3 class="lensrift-subsection-heading">Cinematic Reel &amp; Films</h3>
	</div>

	<!-- wp:html -->
	<div class="lensrift-video-grid">
		<div class="lensrift-video-item cinematic" data-category="cinematic">
			<div class="lensrift-video-card">
				<div class="lensrift-thumb-wrapper ratio-16-9">
					<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/wide-1.webp' ) ); ?>" alt="The Silent Ridge Film Reel" class="lensrift-media"/>
					<div class="lensrift-play-badge">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
					</div>
					<div class="lensrift-card-overlay">
						<span class="lensrift-card-cat">Cinematic</span>
						<h4 class="lensrift-card-title">The Silent Ridge</h4>
						<p class="lensrift-card-meta">Short Narrative Film — 4K</p>
					</div>
				</div>
			</div>
		</div>

		<div class="lensrift-video-item commercial" data-category="commercial">
			<div class="lensrift-video-card">
				<div class="lensrift-thumb-wrapper ratio-16-9">
					<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/wide-2.webp' ) ); ?>" alt="Velocity Motors Commercial" class="lensrift-media"/>
					<div class="lensrift-play-badge">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
					</div>
					<div class="lensrift-card-overlay">
						<span class="lensrift-card-cat">Commercial</span>
						<h4 class="lensrift-card-title">Velocity Motors</h4>
						<p class="lensrift-card-meta">Global Commercial Campaign</p>
					</div>
				</div>
			</div>
		</div>

		<div class="lensrift-video-item cinematic" data-category="cinematic">
			<div class="lensrift-video-card">
				<div class="lensrift-thumb-wrapper ratio-16-9">
					<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/wide-3.webp' ) ); ?>" alt="Alpine Horizons Drone Reel" class="lensrift-media"/>
					<div class="lensrift-play-badge">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
					</div>
					<div class="lensrift-card-overlay">
						<span class="lensrift-card-cat">Cinematic</span>
						<h4 class="lensrift-card-title">Alpine Horizons</h4>
						<p class="lensrift-card-meta">Aerial 6K Documentary</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /wp:html -->
</div>
<!-- /wp:group -->
