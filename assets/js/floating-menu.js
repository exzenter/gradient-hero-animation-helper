/**
 * Gradient Frontend Scroll - Floating Menu JavaScript
 * 
 * Handles all interactions with the gradient animation settings
 */

(function() {
    'use strict';
    
    // Main controller class
    class GradientFrontendScroll {
        constructor() {
            this.animation = null;
            this.container = null;
            this.isCollapsed = true;
            this.retryCount = 0;
            this.maxRetries = 10;
            
            this.init();
        }
        
        init() {
            // Wait for DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }
        
        setup() {
            this.container = document.getElementById('gfs-floating-menu');
            if (!this.container) return;
            
            this.bindEvents();
            this.findAnimation();
        }
        
        // Find the gradient animation instance
        findAnimation() {
            const block = document.querySelector('.wp-block-hero-gradient');
            
            if (block && block._heroGradientAnimation) {
                this.animation = block._heroGradientAnimation;
                this.updateStatus('connected', 'Connected to animation');
                this.syncControlsFromAnimation();
            } else {
                this.retryCount++;
                
                if (this.retryCount <= this.maxRetries) {
                    this.updateStatus('searching', `Searching... (${this.retryCount}/${this.maxRetries})`);
                    setTimeout(() => this.findAnimation(), 500);
                } else {
                    this.updateStatus('error', 'No animation found on page');
                }
            }
        }
        
        // Update status indicator
        updateStatus(status, text) {
            const statusEl = document.getElementById('gfs-status');
            if (!statusEl) return;
            
            statusEl.className = 'gfs-status ' + status;
            statusEl.querySelector('.gfs-status-text').textContent = text;
        }
        
        // Sync UI controls with current animation values
        syncControlsFromAnimation() {
            if (!this.animation || !this.animation.settings) return;
            
            const settings = this.animation.settings;
            
            // Sync all range inputs
            this.container.querySelectorAll('.gfs-range').forEach(input => {
                const settingName = input.dataset.setting;
                if (settingName && settings[settingName] !== undefined) {
                    input.value = settings[settingName];
                    this.updateRangeValue(input);
                }
            });
            
            // Sync all select inputs
            this.container.querySelectorAll('.gfs-select').forEach(select => {
                const settingName = select.dataset.setting;
                if (settingName && settings[settingName] !== undefined) {
                    select.value = settings[settingName];
                }
            });
            
            // Sync all checkbox inputs
            this.container.querySelectorAll('.gfs-checkbox').forEach(checkbox => {
                const settingName = checkbox.dataset.setting;
                if (settingName && settings[settingName] !== undefined) {
                    checkbox.checked = settings[settingName];
                }
            });
            
            // Sync color inputs
            const bgColorInput = this.container.querySelector('[data-setting="backgroundColor"]');
            if (bgColorInput && settings.backgroundColor) {
                bgColorInput.value = this.colorToHex(settings.backgroundColor);
            }
            
            // Sync palette colors
            if (settings.paletteColors && Array.isArray(settings.paletteColors)) {
                const colorInputs = this.container.querySelectorAll('#gfs-palette-colors .gfs-color-input');
                settings.paletteColors.forEach((color, index) => {
                    if (colorInputs[index]) {
                        colorInputs[index].value = this.colorToHex(color);
                    }
                });
            }
            
            // Update color mode visibility
            this.updateColorModeVisibility(settings.colorMode || 'hue-range');
        }
        
        // Convert color to hex format
        colorToHex(color) {
            if (!color) return '#000000';
            if (color.startsWith('#')) return color;
            
            // Handle rgb/rgba
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                const r = parseInt(match[1]).toString(16).padStart(2, '0');
                const g = parseInt(match[2]).toString(16).padStart(2, '0');
                const b = parseInt(match[3]).toString(16).padStart(2, '0');
                return '#' + r + g + b;
            }
            
            return '#000000';
        }
        
        // Update the displayed value for a range input
        updateRangeValue(input) {
            const wrapper = input.closest('.gfs-range-wrapper');
            if (!wrapper) return;
            
            const valueDisplay = wrapper.querySelector('.gfs-range-value');
            if (valueDisplay) {
                let value = parseFloat(input.value);
                // Format based on step
                const step = parseFloat(input.step) || 1;
                if (step < 1) {
                    value = value.toFixed(2);
                }
                valueDisplay.textContent = value;
            }
        }
        
        // Update a setting on the animation
        updateSetting(name, value) {
            if (!this.animation) {
                console.warn('[GFS] No animation connected');
                return false;
            }
            
            try {
                this.animation.updateSetting(name, value);
                return true;
            } catch (error) {
                console.error('[GFS] Error updating setting:', error);
                return false;
            }
        }
        
        // Bind all event listeners
        bindEvents() {
            // Toggle button
            const toggleBtn = document.getElementById('gfs-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }
            
            // Minimize button
            const minimizeBtn = document.getElementById('gfs-minimize');
            if (minimizeBtn) {
                minimizeBtn.addEventListener('click', () => this.collapse());
            }
            
            // Tab switching
            this.container.querySelectorAll('.gfs-tab').forEach(tab => {
                tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.section));
            });
            
            // Range inputs
            this.container.querySelectorAll('.gfs-range').forEach(input => {
                input.addEventListener('input', (e) => {
                    this.updateRangeValue(e.target);
                    
                    const settingName = e.target.dataset.setting;
                    let value = parseFloat(e.target.value);
                    
                    this.updateSetting(settingName, value);
                });
            });
            
            // Select inputs
            this.container.querySelectorAll('.gfs-select').forEach(select => {
                select.addEventListener('change', (e) => {
                    const settingName = e.target.dataset.setting;
                    const value = e.target.value;
                    
                    this.updateSetting(settingName, value);
                    
                    // Handle color mode change
                    if (settingName === 'colorMode') {
                        this.updateColorModeVisibility(value);
                    }
                });
            });
            
            // Checkbox inputs
            this.container.querySelectorAll('.gfs-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const settingName = e.target.dataset.setting;
                    const value = e.target.checked;
                    
                    this.updateSetting(settingName, value);
                });
            });
            
            // Background color input
            const bgColorInput = this.container.querySelector('[data-setting="backgroundColor"]');
            if (bgColorInput) {
                bgColorInput.addEventListener('input', (e) => {
                    this.updateSetting('backgroundColor', e.target.value);
                });
            }
            
            // Palette apply button
            const applyPaletteBtn = document.getElementById('gfs-apply-palette');
            if (applyPaletteBtn) {
                applyPaletteBtn.addEventListener('click', () => this.applyPalette());
            }
            
            // Preset buttons
            this.container.querySelectorAll('.gfs-preset').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.applyPreset(e.target.dataset.preset);
                });
            });
            
            // Keyboard shortcut (Escape to close)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !this.isCollapsed) {
                    this.collapse();
                }
            });
        }
        
        // Toggle panel open/close
        toggle() {
            if (this.isCollapsed) {
                this.expand();
            } else {
                this.collapse();
            }
        }
        
        expand() {
            this.container.classList.remove('gfs-collapsed');
            this.isCollapsed = false;
            
            // Re-sync controls when opening
            if (this.animation) {
                this.syncControlsFromAnimation();
            }
        }
        
        collapse() {
            this.container.classList.add('gfs-collapsed');
            this.isCollapsed = true;
        }
        
        // Switch active tab
        switchTab(section) {
            // Update tab buttons
            this.container.querySelectorAll('.gfs-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.section === section);
            });
            
            // Update sections
            this.container.querySelectorAll('.gfs-section').forEach(sec => {
                sec.classList.toggle('active', sec.dataset.section === section);
            });
        }
        
        // Update visibility of color mode controls
        updateColorModeVisibility(mode) {
            const hueControls = document.getElementById('gfs-hue-controls');
            const paletteControls = document.getElementById('gfs-palette-controls');
            
            if (hueControls) {
                hueControls.classList.toggle('hidden', mode !== 'hue-range');
            }
            if (paletteControls) {
                paletteControls.classList.toggle('hidden', mode !== 'palette');
            }
        }
        
        // Apply palette colors
        applyPalette() {
            const colorInputs = this.container.querySelectorAll('#gfs-palette-colors .gfs-color-input');
            const colors = Array.from(colorInputs).map(input => input.value);
            
            this.updateSetting('paletteColors', colors);
        }
        
        // Apply preset configurations
        applyPreset(presetName) {
            if (!this.animation) return;
            
            const presets = {
                neon: {
                    backgroundColor: '#0a0a0f',
                    blendMode: 'screen',
                    blur: 20,
                    brightness: 150,
                    colorMode: 'hue-range',
                    hueStart: 280,
                    hueEnd: 340,
                    saturationMin: 90,
                    saturationMax: 100
                },
                sunset: {
                    colorMode: 'palette',
                    paletteColors: ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'],
                    gradientSpeed: 0.3,
                    blur: 0,
                    brightness: 100
                },
                matrix: {
                    backgroundColor: '#000000',
                    colorMode: 'hue-range',
                    hueStart: 120,
                    hueEnd: 140,
                    saturationMin: 100,
                    saturationMax: 100,
                    lightnessMin: 30,
                    lightnessMax: 60,
                    blendMode: 'screen',
                    blur: 0
                }
            };
            
            const preset = presets[presetName];
            if (!preset) return;
            
            // Apply all preset settings
            Object.entries(preset).forEach(([key, value]) => {
                this.updateSetting(key, value);
            });
            
            // Sync UI with new values
            setTimeout(() => this.syncControlsFromAnimation(), 100);
        }
    }
    
    // Initialize when ready
    new GradientFrontendScroll();
    
})();
