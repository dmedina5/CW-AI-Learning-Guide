/**
 * CW Vibe Code Guide - Tab System
 * Handles Claude/Gemini tab switching across all pages
 */

class TabManager {
    constructor() {
        this.storageKey = 'cw_active_tab';
        this.tabs = [];
        this.contents = [];
    }

    init() {
        this.tabs = document.querySelectorAll('.tab-btn');
        this.contents = document.querySelectorAll('.tab-content');

        if (this.tabs.length === 0) return;

        // Restore saved tab preference
        const savedTab = localStorage.getItem(this.storageKey);

        // Bind click events
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Initialize with saved preference or first tab
        if (savedTab && this.hasTab(savedTab)) {
            this.switchTab(savedTab);
        } else {
            const firstTab = this.tabs[0]?.dataset.tab;
            if (firstTab) this.switchTab(firstTab);
        }
    }

    hasTab(tabId) {
        return Array.from(this.tabs).some(tab => tab.dataset.tab === tabId);
    }

    switchTab(tabId) {
        // Update tab buttons
        this.tabs.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update tab contents
        this.contents.forEach(content => {
            if (content.dataset.tab === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Save preference
        localStorage.setItem(this.storageKey, tabId);

        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('tabChanged', {
            detail: { tab: tabId }
        }));
    }

    getCurrentTab() {
        return localStorage.getItem(this.storageKey) || 'claude';
    }
}

// Create global instance
const tabManager = new TabManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    tabManager.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { tabManager, TabManager };
}
