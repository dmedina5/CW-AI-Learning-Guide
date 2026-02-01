/**
 * CW Vibe Code Guide - Theme Toggle
 * Handles dark/light mode switching with persistence
 */

class ThemeManager {
    constructor() {
        this.storageKey = 'cw_theme';
        this.theme = 'dark';
        this.toggleBtn = null;
    }

    init() {
        this.toggleBtn = document.querySelector('.theme-toggle');

        // Load saved preference or detect system preference
        this.theme = this.getSavedTheme() || this.getSystemTheme();

        // Apply initial theme
        this.applyTheme(this.theme);

        // Bind toggle button
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }

        // Listen for system theme changes
        this.watchSystemTheme();
    }

    getSavedTheme() {
        return localStorage.getItem(this.storageKey);
    }

    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }

    watchSystemTheme() {
        if (!window.matchMedia) return;

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            if (!this.getSavedTheme()) {
                this.applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }

    applyTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);

        // Update toggle button aria-label
        if (this.toggleBtn) {
            this.toggleBtn.setAttribute('aria-label',
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }

        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme }
        }));
    }

    toggle() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        localStorage.setItem(this.storageKey, newTheme);
    }

    getTheme() {
        return this.theme;
    }

    isDark() {
        return this.theme === 'dark';
    }

    isLight() {
        return this.theme === 'light';
    }
}

// Create global instance
const themeManager = new ThemeManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { themeManager, ThemeManager };
}
