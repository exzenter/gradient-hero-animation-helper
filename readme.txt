=== Gradient Frontend Scroll ===
Contributors: exzenter
Tags: gradient, animation, frontend, settings, control panel, scroll animation
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.1.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A floating settings menu for controlling Hero Gradient animation settings live on the frontend, with scroll-based animation keyframes and export functionality.

== Description ==

Gradient Frontend Scroll adds floating control panels to the frontend of your WordPress site that allow administrators to adjust all Hero Gradient animation settings in real-time.

**Features:**

* **Live Preview** - See changes instantly as you adjust settings
* **Organized Tabs** - Settings grouped into Animation, Colors, Effects, and Advanced
* **Quick Presets** - Apply pre-made configurations like Neon Glow, Sunset, and Matrix
* **Modern UI** - Glassmorphism-styled interface with smooth animations
* **Admin Only** - Only visible to administrators

**NEW in v1.1.0 - Scroll Animation Panel:**

* **Live Scroll Counter** - Real-time display of current scroll position in pixels
* **Scroll Keyframes** - Configure animation settings at specific scroll positions
* **Smooth Interpolation** - Values animate smoothly between keyframes as you scroll
* **Export Functionality** - Generate standalone JavaScript code that works without the plugin

**Available Settings:**

Animation & Movement:
* Speed, Gradient Count, Position X/Y, Scale, Size Multiplier, Size Mode

Colors:
* Color Mode (Hue Range / Palette)
* Hue Range: Start/End, Separation, Saturation/Lightness Min/Max
* Palette: Custom color picker
* Hue Rotation Speed, Background Color

Effects:
* Opacity, Blur, Brightness, Contrast, Saturation Filter
* Hue Rotate, Gradient Fade, Blend Mode

Advanced:
* Radial/Line Gradients, Gradient Blending, Fadeout Mode/Time

== How to Use Scroll Animation ==

1. **Open the panel** - Click the down-arrow button on the bottom-left of the screen
2. **Add keyframes** - Click "+ Add" and configure:
   - Scroll position (in pixels)
   - Setting to animate
   - Target value at that scroll position
3. **Enable animation** - Check "Enable Scroll Animation"
4. **Scroll the page** - Watch the gradient animate between keyframes
5. **Export** - Click "Export Code" to get standalone JavaScript

**Example Configuration:**

```
Scroll 0px    → gradientSizeMultiplier: 0.5
Scroll 600px  → gradientSizeMultiplier: 2.0
Scroll 1200px → gradientSizeMultiplier: 0.5
```

This creates a pulsing size effect as the user scrolls down the page.

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/gradient-frontend-scroll/`
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Visit any page with a Hero Gradient block
4. Click the floating settings button (bottom-right corner) for live controls
5. Click the scroll button (bottom-left corner) for scroll-based animations

== Frequently Asked Questions ==

= Who can see the floating menus? =

Only logged-in administrators can see and use the floating settings panels.

= Does this require the Hero Gradient plugin? =

Yes, this plugin works with the Hero Gradient block. It looks for elements with the class `.wp-block-hero-gradient`.

= Are changes saved permanently? =

No, changes made through these panels are for live preview only. They reset when the page is refreshed. To save permanent changes, use the block editor.

= How do I use the exported code? =

Click "Export Code" in the scroll panel, then copy the generated JavaScript. Add it to your website (in a custom script or theme file) and it will automatically animate the gradient on scroll - no plugin required!

== Changelog ==

= 1.1.0 =
* NEW: Scroll Animation Panel (bottom-left)
* NEW: Live scroll position counter
* NEW: Scroll keyframe mappings table
* NEW: Smooth interpolation between keyframes
* NEW: Export standalone JavaScript code
* Updated slider ranges for Speed and Gradient Count

= 1.0.0 =
* Initial release
* Full control over all animation settings
* Tab-organized interface
* Quick preset buttons
* Modern glassmorphism design

== Upgrade Notice ==

= 1.1.0 =
New scroll animation panel with keyframe support and export functionality!

= 1.0.0 =
Initial release of Gradient Frontend Scroll.

