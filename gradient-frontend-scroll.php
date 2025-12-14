<?php
/**
 * Plugin Name: Gradient Frontend Scroll
 * Plugin URI: https://github.com/exzenter/gradient-hero
 * Description: A floating settings menu for controlling Hero Gradient animation settings live on the frontend.
 * Version: 1.2.0
 * Author: Exzenter
 * Author URI: https://github.com/exzenter
 * License: GPL-2.0+
 * Text Domain: gradient-frontend-scroll
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class GradientFrontendScroll {
    
    private static $instance = null;
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueueAssets'));
        add_action('wp_footer', array($this, 'renderFloatingMenu'));
    }
    
    public function enqueueAssets() {
        // Only load if user is logged in as admin (for now)
        if (!current_user_can('manage_options')) {
            return;
        }
        
        wp_enqueue_style(
            'gradient-frontend-scroll-style',
            plugin_dir_url(__FILE__) . 'assets/css/floating-menu.css',
            array(),
            '1.2.0'
        );
        
        wp_enqueue_script(
            'gradient-frontend-scroll-script',
            plugin_dir_url(__FILE__) . 'assets/js/floating-menu.js',
            array(),
            '1.2.0',
            true
        );
        
        wp_enqueue_script(
            'gradient-frontend-scroll-panel',
            plugin_dir_url(__FILE__) . 'assets/js/scroll-panel.js',
            array(),
            '1.2.0',
            true
        );
    }
    
    public function renderFloatingMenu() {
        // Only render if user is logged in as admin
        if (!current_user_can('manage_options')) {
            return;
        }
        
        include plugin_dir_path(__FILE__) . 'templates/floating-menu.php';
        include plugin_dir_path(__FILE__) . 'templates/scroll-panel.php';
    }
}

// Initialize the plugin
GradientFrontendScroll::getInstance();

