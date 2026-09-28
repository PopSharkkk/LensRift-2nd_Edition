<?php
/**
 * Title: Header
 * Slug: montana/header
 * Keywords: header, navigation
 * Block Types: core/template-part/header
 * Description: Editorial Minimalist Header for LensRift.
 *
 * @package Montana
 */

defined( 'ABSPATH' ) || exit;
?>
<!-- wp:group {"align":"full","className":"ed-header","layout":{"type":"default"}} -->
<header class="ed-header">
	<div class="ed-header-inner">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="ed-brand">
			<span class="ed-brand-box">LensRift<span class="ed-brand-dot"></span></span>
		</a>

		<nav class="ed-nav">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="ed-nav-link active">Home</a>
			<a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>" class="ed-nav-link">Portfolio &darr;</a>
			<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="ed-nav-link">About</a>
			<a href="#contact" class="ed-nav-link">Contact</a>
		</nav>
	</div>
</header>
<!-- /wp:group -->
