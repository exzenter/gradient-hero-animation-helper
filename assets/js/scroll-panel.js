/**
 * Gradient Frontend Scroll - Scroll Animation Panel JavaScript
 * 
 * Handles scroll-based animation keyframes and export functionality
 */

(function () {
    'use strict';

    class ScrollAnimationPanel {
        constructor() {
            this.animation = null;
            this.container = null;
            this.isCollapsed = true;
            this.isEnabled = false;
            this.mappings = [];
            this.editingIndex = -1;
            this.retryCount = 0;
            this.maxRetries = 10;

            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            this.container = document.getElementById('gfs-scroll-panel');
            if (!this.container) return;

            this.bindEvents();
            this.findAnimation();
            this.startScrollTracking();
        }

        // Find the gradient animation instance
        findAnimation() {
            const block = document.querySelector('.wp-block-hero-gradient');

            if (block && block._heroGradientAnimation) {
                this.animation = block._heroGradientAnimation;
            } else {
                this.retryCount++;
                if (this.retryCount <= this.maxRetries) {
                    setTimeout(() => this.findAnimation(), 500);
                }
            }
        }

        // Start tracking scroll position
        startScrollTracking() {
            const counterEl = document.getElementById('gfs-scroll-counter');
            const valueEl = counterEl?.querySelector('.gfs-counter-value');

            const updateScroll = () => {
                const scrollY = Math.round(window.scrollY);
                if (valueEl) {
                    valueEl.textContent = scrollY.toLocaleString();
                }

                // Apply interpolated settings if enabled
                if (this.isEnabled && this.mappings.length > 0) {
                    this.applyInterpolatedSettings(scrollY);
                }
            };

            window.addEventListener('scroll', updateScroll, { passive: true });
            updateScroll(); // Initial update
        }

        // Interpolate value between two keyframes
        lerp(a, b, t) {
            return a + (b - a) * t;
        }

        // Get interpolated value for a setting at given scroll position
        getInterpolatedValue(scrollY, setting) {
            // Get all mappings for this setting, sorted by scrollY
            const settingMappings = this.mappings
                .filter(m => m.setting === setting)
                .sort((a, b) => a.scrollY - b.scrollY);

            if (settingMappings.length === 0) return null;
            if (settingMappings.length === 1) return settingMappings[0].value;

            // Find the two keyframes we're between
            let lower = settingMappings[0];
            let upper = settingMappings[settingMappings.length - 1];

            for (let i = 0; i < settingMappings.length - 1; i++) {
                if (scrollY >= settingMappings[i].scrollY && scrollY <= settingMappings[i + 1].scrollY) {
                    lower = settingMappings[i];
                    upper = settingMappings[i + 1];
                    break;
                }
            }

            // If before first keyframe, use first value
            if (scrollY <= lower.scrollY) return lower.value;
            // If after last keyframe, use last value
            if (scrollY >= upper.scrollY) return upper.value;

            // Interpolate
            const range = upper.scrollY - lower.scrollY;
            const progress = (scrollY - lower.scrollY) / range;
            return this.lerp(lower.value, upper.value, progress);
        }

        // Apply interpolated settings to animation
        applyInterpolatedSettings(scrollY) {
            // Get unique settings
            const settings = [...new Set(this.mappings.map(m => m.setting))];

            settings.forEach(setting => {
                const value = this.getInterpolatedValue(scrollY, setting);
                if (value === null) return;

                // Check if this is a container CSS setting
                if (setting.startsWith('container:')) {
                    this.applyContainerCSS(scrollY, setting, value);
                } else {
                    // Regular animation setting
                    if (!this.animation) return;
                    try {
                        this.animation.updateSetting(setting, value);
                    } catch (e) {
                        console.warn('[GFS Scroll] Error updating setting:', setting, e);
                    }
                }
            });
        }

        // Apply CSS to container element
        applyContainerCSS(scrollY, setting, value) {
            // Find all mappings for this setting to get the container selector and unit
            const relevantMappings = this.mappings.filter(m => m.setting === setting);
            if (relevantMappings.length === 0) return;

            // Use the container selector from the first mapping (they should all be the same)
            const containerSelector = relevantMappings[0].containerSelector || '.wp-block-hero-gradient.topblob';
            const unit = relevantMappings[0].unit || 'px';

            const element = document.querySelector(containerSelector);
            if (!element) {
                console.warn('[GFS Scroll] Container element not found:', containerSelector);
                return;
            }

            // Determine the CSS property name
            let cssProperty;
            if (setting === 'container:maxWidth') {
                cssProperty = 'maxWidth';
            } else if (setting === 'container:marginLeft') {
                cssProperty = 'marginLeft';
            } else if (setting === 'container:custom') {
                cssProperty = relevantMappings[0].cssProperty;
                if (!cssProperty) return;
                // Convert kebab-case to camelCase for JS style property
                cssProperty = cssProperty.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            } else {
                return;
            }

            // Apply the style
            const valueWithUnit = unit ? `${value}${unit}` : value;
            element.style[cssProperty] = valueWithUnit;
        }

        // Bind all event listeners
        bindEvents() {
            // Toggle button
            const toggleBtn = document.getElementById('gfs-scroll-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }

            // Minimize button
            const minimizeBtn = document.getElementById('gfs-scroll-minimize');
            if (minimizeBtn) {
                minimizeBtn.addEventListener('click', () => this.collapse());
            }

            // Enable checkbox
            const enableCheckbox = document.getElementById('gfs-scroll-enabled');
            if (enableCheckbox) {
                enableCheckbox.addEventListener('change', (e) => {
                    this.isEnabled = e.target.checked;
                });
            }

            // Add mapping button
            const addBtn = document.getElementById('gfs-add-mapping');
            if (addBtn) {
                addBtn.addEventListener('click', () => this.showForm());
            }

            // Form controls
            const formClose = document.getElementById('gfs-form-close');
            const formCancel = document.getElementById('gfs-form-cancel');
            const formSave = document.getElementById('gfs-form-save');

            if (formClose) formClose.addEventListener('click', () => this.hideForm());
            if (formCancel) formCancel.addEventListener('click', () => this.hideForm());
            if (formSave) formSave.addEventListener('click', () => this.saveMapping());

            // Setting change - show/hide container fields
            const settingSelect = document.getElementById('gfs-form-setting');
            if (settingSelect) {
                settingSelect.addEventListener('change', (e) => this.updateFormVisibility(e.target.value));
            }

            // Export button
            const exportBtn = document.getElementById('gfs-export-btn');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => this.showExportModal());
            }

            // Modal close
            const modalClose = document.getElementById('gfs-modal-close');
            if (modalClose) {
                modalClose.addEventListener('click', () => this.hideExportModal());
            }

            // Copy to clipboard
            const copyBtn = document.getElementById('gfs-copy-code');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => this.copyToClipboard());
            }

            // Keyboard shortcut
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideForm();
                    this.hideExportModal();
                }
            });
        }

        // Update form field visibility based on selected setting
        updateFormVisibility(setting) {
            const containerSelectorGroup = document.getElementById('gfs-container-selector-group');
            const customPropertyGroup = document.getElementById('gfs-custom-property-group');
            const unitGroup = document.getElementById('gfs-unit-group');

            const isContainerSetting = setting.startsWith('container:');
            const isCustomSetting = setting === 'container:custom';

            // Show/hide container fields
            if (containerSelectorGroup) {
                containerSelectorGroup.classList.toggle('hidden', !isContainerSetting);
            }
            if (unitGroup) {
                unitGroup.classList.toggle('hidden', !isContainerSetting);
            }
            if (customPropertyGroup) {
                customPropertyGroup.classList.toggle('hidden', !isCustomSetting);
            }
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
        }

        collapse() {
            this.container.classList.add('gfs-collapsed');
            this.isCollapsed = true;
        }

        // Show add/edit form
        showForm(index = -1) {
            const form = document.getElementById('gfs-mapping-form');
            const title = document.getElementById('gfs-form-title');
            const scrollInput = document.getElementById('gfs-form-scroll');
            const settingSelect = document.getElementById('gfs-form-setting');
            const valueInput = document.getElementById('gfs-form-value');
            const indexInput = document.getElementById('gfs-form-index');
            const containerSelectorInput = document.getElementById('gfs-form-container-selector');
            const unitSelect = document.getElementById('gfs-form-unit');
            const cssPropertyInput = document.getElementById('gfs-form-css-property');

            this.editingIndex = index;

            if (index >= 0 && this.mappings[index]) {
                // Edit mode
                const mapping = this.mappings[index];
                title.textContent = 'Edit Keyframe';
                scrollInput.value = mapping.scrollY;
                settingSelect.value = mapping.setting;
                valueInput.value = mapping.value;
                indexInput.value = index;

                // Container fields
                if (containerSelectorInput) {
                    containerSelectorInput.value = mapping.containerSelector || '.wp-block-hero-gradient.topblob';
                }
                if (unitSelect) {
                    unitSelect.value = mapping.unit || 'px';
                }
                if (cssPropertyInput) {
                    cssPropertyInput.value = mapping.cssProperty || '';
                }
            } else {
                // Add mode
                title.textContent = 'Add Keyframe';
                scrollInput.value = '';
                settingSelect.value = 'gradientSizeMultiplier';
                valueInput.value = '';
                indexInput.value = -1;

                // Reset container fields
                if (containerSelectorInput) {
                    containerSelectorInput.value = '.wp-block-hero-gradient.topblob';
                }
                if (unitSelect) {
                    unitSelect.value = 'px';
                }
                if (cssPropertyInput) {
                    cssPropertyInput.value = '';
                }
            }

            // Update form visibility based on current setting
            this.updateFormVisibility(settingSelect.value);

            form.classList.remove('hidden');
            scrollInput.focus();
        }

        hideForm() {
            const form = document.getElementById('gfs-mapping-form');
            form.classList.add('hidden');
            this.editingIndex = -1;

            // Hide container fields
            this.updateFormVisibility('gradientSizeMultiplier');
        }

        // Save mapping from form
        saveMapping() {
            const scrollInput = document.getElementById('gfs-form-scroll');
            const settingSelect = document.getElementById('gfs-form-setting');
            const valueInput = document.getElementById('gfs-form-value');
            const indexInput = document.getElementById('gfs-form-index');
            const containerSelectorInput = document.getElementById('gfs-form-container-selector');
            const unitSelect = document.getElementById('gfs-form-unit');
            const cssPropertyInput = document.getElementById('gfs-form-css-property');

            const scrollY = parseFloat(scrollInput.value);
            const setting = settingSelect.value;
            const value = parseFloat(valueInput.value);
            const index = parseInt(indexInput.value);

            if (isNaN(scrollY) || isNaN(value)) {
                alert('Please enter valid numeric values.');
                return;
            }

            const mapping = { scrollY, setting, value };

            // Add container-specific fields if this is a container setting
            if (setting.startsWith('container:')) {
                mapping.containerSelector = containerSelectorInput?.value || '.wp-block-hero-gradient.topblob';
                mapping.unit = unitSelect?.value || 'px';

                if (setting === 'container:custom') {
                    const cssProperty = cssPropertyInput?.value?.trim();
                    if (!cssProperty) {
                        alert('Please enter a CSS property name.');
                        return;
                    }
                    mapping.cssProperty = cssProperty;
                }
            }

            if (index >= 0) {
                // Update existing
                this.mappings[index] = mapping;
            } else {
                // Add new
                this.mappings.push(mapping);
            }

            // Sort by scroll position
            this.mappings.sort((a, b) => a.scrollY - b.scrollY);

            this.renderMappingsTable();
            this.hideForm();
        }

        // Delete a mapping
        deleteMapping(index) {
            if (confirm('Delete this keyframe?')) {
                this.mappings.splice(index, 1);
                this.renderMappingsTable();
            }
        }

        // Render the mappings table
        renderMappingsTable() {
            const tbody = document.getElementById('gfs-mappings-body');
            const emptyState = document.getElementById('gfs-empty-state');

            if (this.mappings.length === 0) {
                tbody.innerHTML = '';
                emptyState.classList.remove('hidden');
                return;
            }

            emptyState.classList.add('hidden');

            tbody.innerHTML = this.mappings.map((mapping, index) => {
                // Format value with unit for container settings
                let displayValue = mapping.value;
                if (mapping.setting.startsWith('container:') && mapping.unit) {
                    displayValue = `${mapping.value}${mapping.unit}`;
                }

                return `
                <tr>
                    <td>${mapping.scrollY}</td>
                    <td><span class="gfs-setting-badge${mapping.setting.startsWith('container:') ? ' gfs-container-badge' : ''}">${this.formatSettingName(mapping.setting, mapping)}</span></td>
                    <td>${displayValue}</td>
                    <td class="gfs-actions">
                        <button class="gfs-btn-mini gfs-edit-btn" data-index="${index}" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="gfs-btn-mini gfs-delete-btn" data-index="${index}" title="Delete">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
            }).join('');

            // Bind edit/delete buttons
            tbody.querySelectorAll('.gfs-edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    this.showForm(index);
                });
            });

            tbody.querySelectorAll('.gfs-delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    this.deleteMapping(index);
                });
            });
        }

        // Format setting name for display
        formatSettingName(setting, mapping = null) {
            const names = {
                gradientSpeed: 'Speed',
                gradientCount: 'Count',
                positionX: 'Pos X',
                positionY: 'Pos Y',
                scale: 'Scale',
                gradientSizeMultiplier: 'Size',
                hueStart: 'Hue Start',
                hueEnd: 'Hue End',
                hueSeparation: 'Hue Sep',
                saturationMin: 'Sat Min',
                saturationMax: 'Sat Max',
                lightnessMin: 'Light Min',
                lightnessMax: 'Light Max',
                hueRotationSpeed: 'Hue Rot',
                opacity: 'Opacity',
                blur: 'Blur',
                brightness: 'Bright',
                contrast: 'Contrast',
                saturation: 'Sat Filter',
                hue: 'Hue Rot',
                gradientFade: 'Fade',
                lineGradientAngle: 'Line Ang',
                lineGradientLength: 'Line Len',
                lineGradientWidth: 'Line W',
                maxWidth: 'Max W',
                maxHeight: 'Max H',
                'container:maxWidth': '📦 Max W',
                'container:marginLeft': '📦 Margin L',
                'container:custom': '📦 Custom'
            };

            // For custom CSS, show the property name
            if (setting === 'container:custom' && mapping?.cssProperty) {
                return `📦 ${mapping.cssProperty}`;
            }

            return names[setting] || setting;
        }

        // Show export modal
        showExportModal() {
            const modal = document.getElementById('gfs-export-modal');
            const codeArea = document.getElementById('gfs-export-code');

            codeArea.value = this.generateExportCode();
            modal.classList.remove('hidden');
        }

        hideExportModal() {
            const modal = document.getElementById('gfs-export-modal');
            modal.classList.add('hidden');
        }

        // Generate standalone export code
        generateExportCode() {
            const mappingsJSON = JSON.stringify(this.mappings, null, 2);

            return `/**
 * Gradient Scroll Animation
 * Generated by Gradient Frontend Scroll plugin
 * 
 * Add this script to your website to animate the gradient on scroll.
 * Requires the Hero Gradient block with animation enabled.
 * Supports both animation settings and container CSS properties.
 */
(function() {
    'use strict';
    
    // Scroll keyframe mappings
    const mappings = ${mappingsJSON};
    
    // Linear interpolation
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }
    
    // Get interpolated value at scroll position
    function getInterpolatedValue(scrollY, setting) {
        const settingMappings = mappings
            .filter(m => m.setting === setting)
            .sort((a, b) => a.scrollY - b.scrollY);
        
        if (settingMappings.length === 0) return null;
        if (settingMappings.length === 1) return settingMappings[0].value;
        
        let lower = settingMappings[0];
        let upper = settingMappings[settingMappings.length - 1];
        
        for (let i = 0; i < settingMappings.length - 1; i++) {
            if (scrollY >= settingMappings[i].scrollY && scrollY <= settingMappings[i + 1].scrollY) {
                lower = settingMappings[i];
                upper = settingMappings[i + 1];
                break;
            }
        }
        
        if (scrollY <= lower.scrollY) return lower.value;
        if (scrollY >= upper.scrollY) return upper.value;
        
        const range = upper.scrollY - lower.scrollY;
        const progress = (scrollY - lower.scrollY) / range;
        return lerp(lower.value, upper.value, progress);
    }
    
    // Apply CSS to container element
    function applyContainerCSS(setting, value) {
        const relevantMappings = mappings.filter(m => m.setting === setting);
        if (relevantMappings.length === 0) return;
        
        const containerSelector = relevantMappings[0].containerSelector || '.wp-block-hero-gradient.topblob';
        const unit = relevantMappings[0].unit || 'px';
        
        const element = document.querySelector(containerSelector);
        if (!element) return;
        
        let cssProperty;
        if (setting === 'container:maxWidth') {
            cssProperty = 'maxWidth';
        } else if (setting === 'container:marginLeft') {
            cssProperty = 'marginLeft';
        } else if (setting === 'container:custom') {
            cssProperty = relevantMappings[0].cssProperty;
            if (!cssProperty) return;
            cssProperty = cssProperty.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        } else {
            return;
        }
        
        const valueWithUnit = unit ? value + unit : value;
        element.style[cssProperty] = valueWithUnit;
    }
    
    // Update animation on scroll
    function updateOnScroll() {
        const block = document.querySelector('.wp-block-hero-gradient');
        const anim = block?._heroGradientAnimation;
        const scrollY = window.scrollY;
        const settings = [...new Set(mappings.map(m => m.setting))];
        
        settings.forEach(setting => {
            const value = getInterpolatedValue(scrollY, setting);
            if (value === null) return;
            
            // Check if this is a container CSS setting
            if (setting.startsWith('container:')) {
                applyContainerCSS(setting, value);
            } else {
                // Regular animation setting
                if (!anim) return;
                try {
                    anim.updateSetting(setting, value);
                } catch (e) {}
            }
        });
    }
    
    // Wait for animation to be ready
    function init() {
        const block = document.querySelector('.wp-block-hero-gradient');
        // Start immediately for container CSS, wait for animation for other settings
        const hasContainerSettings = mappings.some(m => m.setting.startsWith('container:'));
        const hasAnimationSettings = mappings.some(m => !m.setting.startsWith('container:'));
        
        if (hasContainerSettings || (block && block._heroGradientAnimation)) {
            window.addEventListener('scroll', updateOnScroll, { passive: true });
            updateOnScroll();
        } else if (hasAnimationSettings) {
            setTimeout(init, 500);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();`;
        }

        // Copy code to clipboard
        copyToClipboard() {
            const codeArea = document.getElementById('gfs-export-code');
            const copyBtn = document.getElementById('gfs-copy-code');

            navigator.clipboard.writeText(codeArea.value).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
                copyBtn.classList.add('gfs-btn-success');

                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('gfs-btn-success');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                // Fallback
                codeArea.select();
                document.execCommand('copy');
            });
        }
    }

    // Initialize
    new ScrollAnimationPanel();

})();
