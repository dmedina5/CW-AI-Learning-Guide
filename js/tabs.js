/**
 * CW Vibe Code Guide - Tab System
 * Handles Claude/Gemini tab switching and platform sub-tabs across all pages
 */

class TabManager {
    constructor() {
        this.storageKey = 'cw_active_tab';
        this.platformStorageKey = 'cw_active_platform';
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

        // Initialize platform tabs
        this.initPlatformTabs();
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

    // Platform sub-tabs functionality
    initPlatformTabs() {
        const platformTabGroups = document.querySelectorAll('.platform-tabs');

        if (platformTabGroups.length === 0) return;

        // Get saved platform preference or detect OS
        const savedPlatform = localStorage.getItem(this.platformStorageKey);
        const detectedPlatform = this.detectPlatform();
        const defaultPlatform = savedPlatform || detectedPlatform;

        platformTabGroups.forEach(group => {
            const buttons = group.querySelectorAll('.platform-tab-btn');
            const groupId = group.dataset.group;

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.switchPlatformTab(groupId, btn.dataset.platform);
                });
            });

            // Initialize with default platform if available in this group
            const hasDefaultPlatform = Array.from(buttons).some(
                btn => btn.dataset.platform === defaultPlatform
            );

            if (hasDefaultPlatform) {
                this.switchPlatformTab(groupId, defaultPlatform);
            } else {
                // Fall back to first platform tab
                const firstPlatform = buttons[0]?.dataset.platform;
                if (firstPlatform) this.switchPlatformTab(groupId, firstPlatform);
            }
        });
    }

    detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('mac')) return 'mac';
        if (userAgent.includes('linux')) return 'linux';
        return 'windows';
    }

    switchPlatformTab(groupId, platform) {
        // Find the tab group
        const group = document.querySelector(`.platform-tabs[data-group="${groupId}"]`);
        if (!group) return;

        // Update buttons in this group
        const buttons = group.querySelectorAll('.platform-tab-btn');
        buttons.forEach(btn => {
            if (btn.dataset.platform === platform) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update content panels for this group
        const contents = document.querySelectorAll(`.platform-content[data-group="${groupId}"]`);
        contents.forEach(content => {
            if (content.dataset.platform === platform) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Save preference
        localStorage.setItem(this.platformStorageKey, platform);

        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('platformTabChanged', {
            detail: { group: groupId, platform: platform }
        }));
    }

    getCurrentPlatform() {
        return localStorage.getItem(this.platformStorageKey) || this.detectPlatform();
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
