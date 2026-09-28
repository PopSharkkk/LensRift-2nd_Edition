<?php
/**
 * Title: Editorial Home Page Landing Experience
 * Slug: montana/page-home
 * Categories: montana-pages
 * Description: Editorial visual portfolio homepage inspired by Wanderlight.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"ed-page-home","layout":{"type":"default"}} -->
<div class="ed-page-home">
	
	<!-- SECTION 1: HERO -->
	<section class="ed-hero-section">
		<div class="ed-hero-bg">
			<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/hero-1.webp' ) ); ?>" alt="Landscape Background"/>
			<div class="ed-hero-overlay"></div>
		</div>

		<div class="ed-hero-content">
			<h1 class="ed-hero-title">The World, Unfiltered</h1>
			<p class="ed-hero-subtitle">Journeys captured beyond the postcard view</p>
			<a href="#vignettes" class="ed-pill-btn">
				<span>Explore Projects</span>
				<span class="ed-btn-dot"></span>
			</a>
		</div>

		<div class="ed-hero-photographer">
			<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/about-2.webp' ) ); ?>" alt="Photographer with Camera"/>
		</div>
	</section>

	<!-- SECTION 2: VIGNETTES FROM THE EDGE -->
	<section id="vignettes" class="ed-vignettes-section">
		<div class="ed-vignettes-grid">
			<div class="ed-vignettes-photos">
				<div class="ed-photo-item ed-photo-main portfolio-item"
					 data-item-type="photo"
					 data-title="Tokyo's Neon Pulse"
					 data-category="URBAN &amp; NIGHT"
					 data-src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-2.webp' ) ); ?>"
					 data-description="Atmospheric rain-slicked streets of Shinjuku. Capturing vibrant neon reflections and dynamic city motion at twilight.">
					<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-2.webp' ) ); ?>" alt="Tokyo Street"/>
					<span class="ed-photo-caption">Tokyo's Neon Pulse</span>
				</div>

				<div class="ed-photo-item ed-photo-tall portfolio-item"
					 data-item-type="photo"
					 data-title="Echoes of the Andean Peaks"
					 data-category="LANDSCAPE &amp; MOUNTAIN"
					 data-src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-3.webp' ) ); ?>"
					 data-description="Weathered rock formations rising above high-altitude desert plains. Long exposure natural lighting study.">
					<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-3.webp' ) ); ?>" alt="Andean Rock Formation"/>
					<span class="ed-photo-caption">Echoes of the Andean Peaks</span>
				</div>
			</div>

			<div class="ed-vignettes-text-col">
				<span class="ed-eyebrow">Vignettes from the edge</span>
				<h2 class="ed-section-heading">A curated selection of recent expeditions and untold stories</h2>
			</div>
		</div>
	</section>

	<!-- SECTION 3: STORY & SPLIT IMAGE -->
	<section class="ed-story-section">
		<div class="ed-story-bg">
			<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/hero-2.webp' ) ); ?>" alt="Mountain Valley Landscape"/>
			<div class="ed-story-overlay"></div>
		</div>

		<div class="ed-story-content">
			<h2 class="ed-story-title">LensRift is a visual storyteller driven by an insatiable curiosity for the world and its inhabitants. My work is a testament to the beauty found in fleeting, honest moments.</h2>
			<div class="ed-story-card">
				<div class="ed-story-center-img">
					<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/about-2.webp' ) ); ?>" alt="Photographer Portrait"/>
				</div>
				<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="ed-pill-btn dark">
					<span>My Story</span>
					<span class="ed-btn-dot"></span>
				</a>
			</div>
		</div>

		<div class="ed-story-labels">
			<span>Beyond the frame</span>
			<span>Stories in motion</span>
		</div>
	</section>

	<!-- SECTION 4: PHILOSOPHY -->
	<section class="ed-philosophy-section">
		<div class="ed-philosophy-content">
			<span class="ed-eyebrow">The philosophy of presence</span>
			<h2 class="ed-philosophy-heading">My approach is simple: be present. I don't stage moments; I wait for them to unfold. The camera is my passport to genuine human connection and the untamed spirit of a place. It's about capturing the feeling, not just the view.</h2>
		</div>

		<div class="ed-philosophy-photos">
			<div class="ed-photo-stack photo-small portfolio-item"
				 data-item-type="photo"
				 data-title="Urban Intersection"
				 data-category="STREET PHOTOGRAPHY"
				 data-src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-1.webp' ) ); ?>"
				 data-description="A top-down view of city pedestrian flow and afternoon shadows.">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/gallery-1.webp' ) ); ?>" alt="City Street Top View"/>
			</div>
			<div class="ed-photo-stack photo-large portfolio-item"
				 data-item-type="photo"
				 data-title="Alpine Reflection Lake"
				 data-category="DOCUMENTARY &amp; TRAVEL"
				 data-src="<?php echo esc_url( get_theme_file_uri( 'assets/images/about-1.webp' ) ); ?>"
				 data-description="Quiet moments alongside glacial mountain waters in Sumatra, Indonesia.">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/about-1.webp' ) ); ?>" alt="Hiker by Mountain Lake"/>
			</div>
		</div>
	</section>

	<!-- SECTION 5: LET'S CREATE TOGETHER / FOOTER -->
	<section id="contact" class="ed-contact-section">
		<div class="ed-contact-inner">
			<h2 class="ed-contact-title">Let's Create Together</h2>
			
			<div class="ed-contact-grid">
				<div class="ed-contact-left">
					<div class="ed-contact-meta">
						<a href="mailto:info@lensrift.com">info@lensrift.com</a>
						<a href="tel:+14065550147">+1 (406) 555-0147</a>
					</div>
					<div class="ed-contact-photo-card">
						<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/offer-1.webp' ) ); ?>" alt="Hikers on Bridge"/>
					</div>
				</div>

				<div class="ed-contact-right">
					<p class="ed-contact-desc">Have a project in mind or wish to acquire a print? Get in touch.</p>
					
					<form class="ed-form" action="#" method="post" onsubmit="event.preventDefault(); alert('Thank you for reaching out!');">
						<div class="ed-form-field">
							<input type="text" placeholder="Your Name" required/>
						</div>
						<div class="ed-form-field">
							<input type="email" placeholder="Your Email" required/>
						</div>
						<div class="ed-form-field">
							<textarea rows="3" placeholder="Tell us about your project..." required></textarea>
						</div>
						<button type="submit" class="ed-pill-btn white">
							<span>Contact Me</span>
							<span class="ed-btn-dot"></span>
						</button>
					</form>

					<div class="ed-footer-meta">
						<div class="ed-footer-links">
							<a href="#">Privacy Policy</a>
							<a href="#">Accessibility Statement</a>
						</div>
						<div class="ed-footer-address">
							<p>Based in Indonesia</p>
							<p>Jakarta &amp; Bali, ID</p>
						</div>
					</div>
				</div>
			</div>

			<div class="ed-footer-copy">
				<p>&copy; <?php echo esc_html( date('Y') ); ?> LensRift Studio. Powered &amp; Secured.</p>
			</div>
		</div>
	</section>

</div>
<!-- /wp:group -->
