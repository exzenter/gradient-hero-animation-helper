<?php
/**
 * Scroll Animation Panel Template
 * 
 * Renders the floating scroll animation panel for configuring scroll-based gradient animations
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="gfs-scroll-panel" class="gfs-scroll-panel gfs-collapsed">
    <!-- Toggle Button -->
    <button class="gfs-toggle-btn gfs-scroll-toggle" id="gfs-scroll-toggle" title="Toggle Scroll Animation">
        <svg class="gfs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
    </button>
    
    <!-- Panel Content -->
    <div class="gfs-panel gfs-scroll-panel-content">
        <!-- Header -->
        <div class="gfs-header">
            <h3 class="gfs-title">Scroll Animation</h3>
            <div class="gfs-header-actions">
                <button class="gfs-btn gfs-btn-icon" id="gfs-scroll-minimize" title="Minimize">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Scroll Counter -->
        <div class="gfs-scroll-counter-section">
            <label class="gfs-label">Current Scroll Position</label>
            <div class="gfs-scroll-counter" id="gfs-scroll-counter">
                <span class="gfs-counter-value">0</span>
                <span class="gfs-counter-unit">px</span>
            </div>
        </div>
        
        <!-- Enable Toggle -->
        <div class="gfs-scroll-enable">
            <label class="gfs-checkbox-label">
                <input type="checkbox" class="gfs-checkbox" id="gfs-scroll-enabled">
                <span>Enable Scroll Animation</span>
            </label>
        </div>
        
        <!-- Mappings Section -->
        <div class="gfs-mappings-section">
            <div class="gfs-mappings-header">
                <label class="gfs-label">Scroll Keyframes</label>
                <button class="gfs-btn gfs-btn-small" id="gfs-add-mapping">+ Add</button>
            </div>
            
            <div class="gfs-mappings-table-wrapper">
                <table class="gfs-mappings-table" id="gfs-mappings-table">
                    <thead>
                        <tr>
                            <th>Scroll (px)</th>
                            <th>Setting</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="gfs-mappings-body">
                        <!-- Mappings will be added here dynamically -->
                    </tbody>
                </table>
                <div class="gfs-empty-state" id="gfs-empty-state">
                    <p>No keyframes added yet.</p>
                    <p class="gfs-text-muted">Click "+ Add" to create scroll-based animations.</p>
                </div>
            </div>
        </div>
        
        <!-- Add/Edit Mapping Form -->
        <div class="gfs-mapping-form hidden" id="gfs-mapping-form">
            <div class="gfs-form-header">
                <span id="gfs-form-title">Add Keyframe</span>
                <button class="gfs-btn gfs-btn-icon gfs-form-close" id="gfs-form-close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="gfs-form-content">
                <div class="gfs-control-group">
                    <label class="gfs-label">Scroll Position (px)</label>
                    <input type="number" class="gfs-input" id="gfs-form-scroll" min="0" step="1" placeholder="e.g., 600">
                </div>
                <div class="gfs-control-group">
                    <label class="gfs-label">Setting</label>
                    <select class="gfs-select" id="gfs-form-setting">
                        <optgroup label="Animation">
                            <option value="gradientSpeed">Speed</option>
                            <option value="gradientCount">Gradient Count</option>
                            <option value="positionX">Position X</option>
                            <option value="positionY">Position Y</option>
                            <option value="scale">Scale</option>
                            <option value="gradientSizeMultiplier">Size Multiplier</option>
                        </optgroup>
                        <optgroup label="Colors">
                            <option value="hueStart">Hue Start</option>
                            <option value="hueEnd">Hue End</option>
                            <option value="hueSeparation">Hue Separation</option>
                            <option value="saturationMin">Saturation Min</option>
                            <option value="saturationMax">Saturation Max</option>
                            <option value="lightnessMin">Lightness Min</option>
                            <option value="lightnessMax">Lightness Max</option>
                            <option value="hueRotationSpeed">Hue Rotation Speed</option>
                        </optgroup>
                        <optgroup label="Effects">
                            <option value="opacity">Opacity</option>
                            <option value="blur">Blur</option>
                            <option value="brightness">Brightness</option>
                            <option value="contrast">Contrast</option>
                            <option value="saturation">Saturation Filter</option>
                            <option value="hue">Hue Rotate</option>
                            <option value="gradientFade">Gradient Fade</option>
                        </optgroup>
                        <optgroup label="Line Gradients">
                            <option value="lineGradientAngle">Line Angle</option>
                            <option value="lineGradientLength">Line Length</option>
                            <option value="lineGradientWidth">Line Width</option>
                        </optgroup>
                        <optgroup label="Canvas">
                            <option value="maxWidth">Max Width</option>
                            <option value="maxHeight">Max Height</option>
                        </optgroup>
                        <optgroup label="Container CSS">
                            <option value="container:maxWidth">Container Max Width</option>
                            <option value="container:marginLeft">Container Margin Left</option>
                            <option value="container:custom">Custom CSS Property</option>
                        </optgroup>
                    </select>
                </div>
                
                <!-- Container Selector (shown for container: settings) -->
                <div class="gfs-control-group gfs-container-fields hidden" id="gfs-container-selector-group">
                    <label class="gfs-label">Target Element Selector</label>
                    <input type="text" class="gfs-input" id="gfs-form-container-selector" placeholder=".wp-block-hero-gradient.topblob" value=".wp-block-hero-gradient.topblob">
                    <span class="gfs-hint">CSS selector for the element to animate</span>
                </div>
                
                <!-- Custom CSS Property Name (shown for container:custom) -->
                <div class="gfs-control-group gfs-custom-css-fields hidden" id="gfs-custom-property-group">
                    <label class="gfs-label">CSS Property Name</label>
                    <input type="text" class="gfs-input" id="gfs-form-css-property" placeholder="e.g., border-radius, padding, transform">
                </div>
                
                <!-- Unit Selector (shown for container: settings) -->
                <div class="gfs-control-group gfs-container-fields hidden" id="gfs-unit-group">
                    <label class="gfs-label">Unit</label>
                    <select class="gfs-select" id="gfs-form-unit">
                        <option value="px">px (pixels)</option>
                        <option value="%">% (percent)</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                        <option value="vw">vw (viewport width)</option>
                        <option value="vh">vh (viewport height)</option>
                        <option value="deg">deg (degrees)</option>
                        <option value="">none (unitless)</option>
                    </select>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Value</label>
                    <input type="number" class="gfs-input" id="gfs-form-value" step="0.01" placeholder="e.g., 2.0">
                </div>
                <input type="hidden" id="gfs-form-index" value="-1">
                <div class="gfs-form-actions">
                    <button class="gfs-btn gfs-btn-secondary" id="gfs-form-cancel">Cancel</button>
                    <button class="gfs-btn" id="gfs-form-save">Save Keyframe</button>
                </div>
            </div>
        </div>
        
        
        <!-- Export Section -->
        <div class="gfs-export-section">
            <div class="gfs-export-header">
                <label class="gfs-label">Export Standalone Code</label>
            </div>
            <p class="gfs-text-muted gfs-export-description">
                Generate JavaScript code that works independently without this plugin.
            </p>
            <button class="gfs-btn gfs-btn-export" id="gfs-export-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export Code
            </button>
        </div>
        
        <!-- Export Modal -->
        <div class="gfs-export-modal hidden" id="gfs-export-modal">
            <div class="gfs-modal-content">
                <div class="gfs-modal-header">
                    <h4>Exported Code</h4>
                    <button class="gfs-btn gfs-btn-icon" id="gfs-modal-close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div class="gfs-modal-body">
                    <p class="gfs-text-muted">Add this code to your website to animate the gradient on scroll:</p>
                    <textarea class="gfs-export-code" id="gfs-export-code" readonly></textarea>
                </div>
                <div class="gfs-modal-footer">
                    <button class="gfs-btn" id="gfs-copy-code">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
