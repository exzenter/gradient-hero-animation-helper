<?php
/**
 * Floating Menu Template
 * 
 * Renders the floating settings panel for gradient animation control
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="gfs-floating-menu" class="gfs-floating-menu gfs-collapsed">
    <!-- Toggle Button -->
    <button class="gfs-toggle-btn" id="gfs-toggle" title="Toggle Gradient Settings">
        <svg class="gfs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
    </button>
    
    <!-- Panel Content -->
    <div class="gfs-panel">
        <!-- Header -->
        <div class="gfs-header">
            <h3 class="gfs-title">Gradient Settings</h3>
            <div class="gfs-header-actions">
                <button class="gfs-btn gfs-btn-icon" id="gfs-minimize" title="Minimize">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Status -->
        <div class="gfs-status" id="gfs-status">
            <span class="gfs-status-dot"></span>
            <span class="gfs-status-text">Searching for animation...</span>
        </div>
        
        <!-- Section Tabs -->
        <div class="gfs-tabs">
            <button class="gfs-tab active" data-section="animation">Animation</button>
            <button class="gfs-tab" data-section="colors">Colors</button>
            <button class="gfs-tab" data-section="effects">Effects</button>
            <button class="gfs-tab" data-section="advanced">Advanced</button>
        </div>
        
        <!-- Sections Container -->
        <div class="gfs-sections">
            
            <!-- Animation Section -->
            <div class="gfs-section active" data-section="animation">
                <div class="gfs-control-group">
                    <label class="gfs-label">Speed</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="gradientSpeed" min="0.01" max="35" step="0.01" value="0.5">
                        <span class="gfs-range-value">0.5</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Gradient Count</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="gradientCount" min="1" max="10" step="1" value="5">
                        <span class="gfs-range-value">5</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Position X</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="positionX" min="0" max="1" step="0.01" value="0.5">
                        <span class="gfs-range-value">0.5</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Position Y</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="positionY" min="0" max="1" step="0.01" value="0.5">
                        <span class="gfs-range-value">0.5</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Scale</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="scale" min="0.1" max="3" step="0.01" value="1">
                        <span class="gfs-range-value">1</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Size Multiplier</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="gradientSizeMultiplier" min="0.1" max="5" step="0.1" value="1">
                        <span class="gfs-range-value">1</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Size Mode</label>
                    <select class="gfs-select" data-setting="gradientSizeMode">
                        <option value="base">Base</option>
                        <option value="drawing">Drawing</option>
                    </select>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Movement Mode</label>
                    <select class="gfs-select" data-setting="movementMode">
                        <option value="orbit">Orbit</option>
                        <option value="wave">Wave</option>
                        <option value="pulse">Pulse</option>
                        <option value="drift">Drift</option>
                        <option value="bounce">Bounce</option>
                        <option value="spiral">Spiral</option>
                        <option value="sway">Sway</option>
                        <option value="chaos">Chaos</option>
                        <option value="figure-eight">Figure Eight</option>
                        <option value="vertical-wave">Vertical Wave</option>
                    </select>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Amplitude X (%)</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="amplitudeX" min="0" max="100" step="1" value="10">
                        <span class="gfs-range-value">10</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Amplitude Y (%)</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="amplitudeY" min="0" max="100" step="1" value="15">
                        <span class="gfs-range-value">15</span>
                    </div>
                </div>
            </div>
            
            <!-- Colors Section -->
            <div class="gfs-section" data-section="colors">
                <div class="gfs-control-group">
                    <label class="gfs-label">Color Mode</label>
                    <select class="gfs-select" data-setting="colorMode" id="gfs-color-mode">
                        <option value="hue-range">Hue Range</option>
                        <option value="palette">Palette</option>
                    </select>
                </div>
                
                <!-- Hue Range Controls -->
                <div class="gfs-subsection" id="gfs-hue-controls">
                    <div class="gfs-control-group">
                        <label class="gfs-label">Hue Start</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range gfs-hue-range" data-setting="hueStart" min="0" max="360" step="1" value="200">
                            <span class="gfs-range-value">200</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Hue End</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range gfs-hue-range" data-setting="hueEnd" min="0" max="360" step="1" value="280">
                            <span class="gfs-range-value">280</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Hue Separation %</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="hueSeparation" min="0" max="200" step="1" value="100">
                            <span class="gfs-range-value">100</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group gfs-checkbox-group">
                        <label class="gfs-checkbox-label">
                            <input type="checkbox" class="gfs-checkbox" data-setting="evenlySpacedColors" checked>
                            <span>Evenly Spaced Colors</span>
                        </label>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Saturation Min %</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="saturationMin" min="0" max="100" step="1" value="60">
                            <span class="gfs-range-value">60</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Saturation Max %</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="saturationMax" min="0" max="100" step="1" value="100">
                            <span class="gfs-range-value">100</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Lightness Min %</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="lightnessMin" min="0" max="100" step="1" value="20">
                            <span class="gfs-range-value">20</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Lightness Max %</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="lightnessMax" min="0" max="100" step="1" value="50">
                            <span class="gfs-range-value">50</span>
                        </div>
                    </div>
                </div>
                
                <!-- Palette Controls -->
                <div class="gfs-subsection hidden" id="gfs-palette-controls">
                    <div class="gfs-control-group">
                        <label class="gfs-label">Palette Colors</label>
                        <div class="gfs-palette-colors" id="gfs-palette-colors">
                            <input type="color" class="gfs-color-input" value="#ff6b6b" data-index="0">
                            <input type="color" class="gfs-color-input" value="#4ecdc4" data-index="1">
                            <input type="color" class="gfs-color-input" value="#ffe66d" data-index="2">
                            <input type="color" class="gfs-color-input" value="#95e1d3" data-index="3">
                            <input type="color" class="gfs-color-input" value="#f38181" data-index="4">
                        </div>
                        <button class="gfs-btn gfs-btn-small" id="gfs-apply-palette">Apply Palette</button>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Hue Rotation Speed</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="hueRotationSpeed" min="0" max="1" step="0.01" value="0">
                        <span class="gfs-range-value">0</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Background Color</label>
                    <input type="color" class="gfs-color-input gfs-bg-color" data-setting="backgroundColor" value="#000000">
                </div>
            </div>
            
            <!-- Effects Section -->
            <div class="gfs-section" data-section="effects">
                <div class="gfs-control-group">
                    <label class="gfs-label">Opacity</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="opacity" min="0" max="1" step="0.01" value="1">
                        <span class="gfs-range-value">1</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Blur (px)</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="blur" min="0" max="100" step="1" value="0">
                        <span class="gfs-range-value">0</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Brightness %</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="brightness" min="0" max="300" step="1" value="100">
                        <span class="gfs-range-value">100</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Contrast %</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="contrast" min="0" max="300" step="1" value="100">
                        <span class="gfs-range-value">100</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Saturation Filter %</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="saturation" min="0" max="300" step="1" value="100">
                        <span class="gfs-range-value">100</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Hue Rotate (deg)</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="hue" min="0" max="360" step="1" value="0">
                        <span class="gfs-range-value">0</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Gradient Fade</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="gradientFade" min="0" max="1" step="0.01" value="0.5">
                        <span class="gfs-range-value">0.5</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Blend Mode</label>
                    <select class="gfs-select" data-setting="blendMode">
                        <option value="normal">Normal</option>
                        <option value="multiply">Multiply</option>
                        <option value="screen">Screen</option>
                        <option value="overlay">Overlay</option>
                        <option value="darken">Darken</option>
                        <option value="lighten">Lighten</option>
                        <option value="color-dodge">Color Dodge</option>
                        <option value="color-burn">Color Burn</option>
                        <option value="hard-light">Hard Light</option>
                        <option value="soft-light">Soft Light</option>
                        <option value="difference">Difference</option>
                        <option value="exclusion">Exclusion</option>
                    </select>
                </div>
            </div>
            
            <!-- Advanced Section -->
            <div class="gfs-section" data-section="advanced">
                <div class="gfs-control-group gfs-checkbox-group">
                    <label class="gfs-checkbox-label">
                        <input type="checkbox" class="gfs-checkbox" data-setting="radialGradientsEnabled" checked>
                        <span>Radial Gradients</span>
                    </label>
                </div>
                
                <div class="gfs-control-group gfs-checkbox-group">
                    <label class="gfs-checkbox-label">
                        <input type="checkbox" class="gfs-checkbox" data-setting="lineGradientsEnabled">
                        <span>Line Gradients</span>
                    </label>
                </div>
                
                <div class="gfs-subsection" id="gfs-line-controls">
                    <div class="gfs-control-group">
                        <label class="gfs-label">Line Angle (deg)</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="lineGradientAngle" min="0" max="360" step="1" value="0">
                            <span class="gfs-range-value">0</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Line Length (px)</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="lineGradientLength" min="10" max="1000" step="10" value="200">
                            <span class="gfs-range-value">200</span>
                        </div>
                    </div>
                    
                    <div class="gfs-control-group">
                        <label class="gfs-label">Line Width (px)</label>
                        <div class="gfs-range-wrapper">
                            <input type="range" class="gfs-range" data-setting="lineGradientWidth" min="10" max="500" step="10" value="100">
                            <span class="gfs-range-value">100</span>
                        </div>
                    </div>
                </div>
                
                <div class="gfs-control-group gfs-checkbox-group">
                    <label class="gfs-checkbox-label">
                        <input type="checkbox" class="gfs-checkbox" data-setting="gradientBlendModeEnabled">
                        <span>Enable Gradient Blending</span>
                    </label>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Gradient Blend Mode</label>
                    <select class="gfs-select" data-setting="gradientBlendMode">
                        <option value="normal">Normal</option>
                        <option value="multiply">Multiply</option>
                        <option value="screen">Screen</option>
                        <option value="overlay">Overlay</option>
                        <option value="darken">Darken</option>
                        <option value="lighten">Lighten</option>
                        <option value="color-dodge">Color Dodge</option>
                        <option value="color-burn">Color Burn</option>
                        <option value="hard-light">Hard Light</option>
                        <option value="soft-light">Soft Light</option>
                        <option value="difference">Difference</option>
                        <option value="exclusion">Exclusion</option>
                    </select>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Fadeout Mode</label>
                    <select class="gfs-select" data-setting="fadeoutMode">
                        <option value="none">None</option>
                        <option value="auto">Auto</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Fadeout Time (s)</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="fadeoutTime" min="1" max="60" step="1" value="10">
                        <span class="gfs-range-value">10</span>
                    </div>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Max Width (px)</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="maxWidth" min="0" max="3840" step="1" value="0">
                        <span class="gfs-range-value">0</span>
                    </div>
                    <span class="gfs-text-muted">0 = no limit</span>
                </div>
                
                <div class="gfs-control-group">
                    <label class="gfs-label">Max Height (px)</label>
                    <div class="gfs-range-wrapper">
                        <input type="range" class="gfs-range" data-setting="maxHeight" min="0" max="2160" step="1" value="0">
                        <span class="gfs-range-value">0</span>
                    </div>
                    <span class="gfs-text-muted">0 = no limit</span>
                </div>
            </div>
            
        </div>
        
        <!-- Presets -->
        <div class="gfs-presets">
            <label class="gfs-label">Quick Presets</label>
            <div class="gfs-preset-buttons">
                <button class="gfs-btn gfs-preset" data-preset="neon">Neon Glow</button>
                <button class="gfs-btn gfs-preset" data-preset="sunset">Sunset</button>
                <button class="gfs-btn gfs-preset" data-preset="matrix">Matrix</button>
            </div>
        </div>
        
    </div>
</div>
