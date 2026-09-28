<?php
/**
 * Title: Contact: Project Inquiry & Social Links
 * Slug: montana/contact
 * Categories: montana-sections
 * Keywords: contact, inquiry, form, social, lensrift
 * Description: Minimalist, elegant contact form with project inquiry fields and styled social media icons.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"lensrift-contact-section","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"},"anchor":"contact"} -->
<div class="wp-block-group alignfull lensrift-contact-section" id="contact" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
	<!-- wp:group {"className":"montana-title montana-title--center","style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group montana-title montana-title--center">
		<!-- wp:paragraph {"className":"is-style-montana-eyebrow lensrift-eyebrow","style":{"typography":{"textAlign":"center"}}} -->
		<p class="has-text-align-center is-style-montana-eyebrow lensrift-eyebrow">GET IN TOUCH</p>
		<!-- /wp:paragraph -->

		<!-- wp:heading {"level":2,"style":{"typography":{"textAlign":"center"}},"className":"lensrift-section-title"} -->
		<h2 class="wp-block-heading has-text-align-center lensrift-section-title">Start a Project Inquiry</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"className":"lensrift-section-desc","style":{"typography":{"textAlign":"center"}}} -->
		<p class="has-text-align-center lensrift-section-desc">Available for global commissions, commercial productions, and artistic collaborations.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:columns {"className":"lensrift-contact-cols","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|60","left":"var:preset|spacing|60"}}}} -->
	<div class="wp-block-columns lensrift-contact-cols">
		<!-- wp:column {"width":"60%"} -->
		<div class="wp-block-column" style="flex-basis:60%">
			<!-- wp:html -->
			<form class="lensrift-contact-form" action="#" method="post" onsubmit="event.preventDefault(); alert('Thank you for your inquiry. The LensRift team will respond shortly.');">
				<div class="lensrift-form-row">
					<div class="lensrift-form-group">
						<label for="inquiry-name">Your Name *</label>
						<input type="text" id="inquiry-name" name="name" placeholder="Julian Vane" required/>
					</div>
					<div class="lensrift-form-group">
						<label for="inquiry-email">Email Address *</label>
						<input type="email" id="inquiry-email" name="email" placeholder="julian@example.com" required/>
					</div>
				</div>

				<div class="lensrift-form-row">
					<div class="lensrift-form-group">
						<label for="inquiry-service">Project Scope *</label>
						<select id="inquiry-service" name="service">
							<option value="cinematography">Cinematography / Film Production</option>
							<option value="commercial">Commercial Photography</option>
							<option value="color-grading">Post Production / Color Grading</option>
							<option value="drone">Aerial &amp; Drone Capture</option>
						</select>
					</div>
					<div class="lensrift-form-group">
						<label for="inquiry-budget">Estimated Budget</label>
						<select id="inquiry-budget" name="budget">
							<option value="5k-10k">$5,000 — $10,000</option>
							<option value="10k-25k">$10,000 — $25,000</option>
							<option value="25k+">$25,000+</option>
						</select>
					</div>
				</div>

				<div class="lensrift-form-group">
					<label for="inquiry-message">Project Details *</label>
					<textarea id="inquiry-message" name="message" rows="5" placeholder="Tell us about your project vision, timeline, and key deliverables..." required></textarea>
				</div>

				<button type="submit" class="lensrift-submit-btn">Send Inquiry</button>
			</form>
			<!-- /wp:html -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"40%"} -->
		<div class="wp-block-column" style="flex-basis:40%">
			<!-- wp:html -->
			<div class="lensrift-contact-info-card">
				<h3 class="lensrift-info-heading">Direct Contact</h3>
				<p class="lensrift-info-sub">Feel free to reach out directly via email or call our studio representative.</p>
				
				<div class="lensrift-info-item">
					<span class="lensrift-info-label">Email Inquiry</span>
					<a href="mailto:inquiries@lensrift.com" class="lensrift-info-value">inquiries@lensrift.com</a>
				</div>

				<div class="lensrift-info-item">
					<span class="lensrift-info-label">Studio Phone</span>
					<a href="tel:+14065550147" class="lensrift-info-value">+1 (406) 555-0147</a>
				</div>

				<div class="lensrift-info-item">
					<span class="lensrift-info-label">Studio Location</span>
					<span class="lensrift-info-value">Los Angeles &amp; Montana, USA</span>
				</div>

				<div class="lensrift-social-wrapper">
					<span class="lensrift-info-label">Connect</span>
					<div class="lensrift-social-icons">
						<a href="#" class="lensrift-social-link" aria-label="Instagram">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
						</a>
						<a href="#" class="lensrift-social-link" aria-label="Vimeo">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9c.5 3 2.5 9 6.5 9 5 0 11.5-7 12-11.5 0-2.5-1.5-3.5-3.5-3.5-3 0-5 3.5-5.5 5 1-.5 2 0 2 1 0 1.5-2 4-3 4-1 0-1.5-1-1.5-2 0-2.5 1.5-6.5.5-7.5C9 3 7 4.5 5.5 6.5c-1 1.5-2 2.5-3 2.5z"></path></svg>
						</a>
						<a href="#" class="lensrift-social-link" aria-label="YouTube">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
						</a>
						<a href="#" class="lensrift-social-link" aria-label="LinkedIn">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
						</a>
					</div>
				</div>
			</div>
			<!-- /wp:html -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
