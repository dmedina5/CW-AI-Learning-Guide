/**
 * CW Vibe Code Guide - Navigation Module
 * Handles sidebar navigation, mobile menu, and page highlighting
 */

class NavigationManager {
    constructor() {
        this.sidebar = null;
        this.overlay = null;
        this.menuBtn = null;
        this.navLinks = [];
        this.currentPage = '';
    }

    init() {
        this.sidebar = document.querySelector('.sidebar');
        this.overlay = document.querySelector('.sidebar-overlay');
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (!this.sidebar) return;

        // Detect current page
        this.currentPage = this.getCurrentPageName();

        // Highlight active nav link
        this.highlightCurrentPage();

        // Setup mobile menu
        this.setupMobileMenu();

        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }

    highlightCurrentPage() {
        const pageName = this.currentPage || 'index';

        this.navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const linkPage = href.replace('.html', '').replace('./', '');

            // Check for index page
            const isIndex = linkPage === 'index' || linkPage === '' || linkPage === './';
            const isCurrentIndex = pageName === 'index' || pageName === '';

            if ((isIndex && isCurrentIndex) || linkPage === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupMobileMenu() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleSidebar());
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeSidebar());
        }

        // Close on nav link click (mobile)
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    this.closeSidebar();
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar?.classList.contains('open')) {
                this.closeSidebar();
            }
        });
    }

    toggleSidebar() {
        this.sidebar?.classList.toggle('open');
        this.overlay?.classList.toggle('active');

        // Update menu button icon
        if (this.menuBtn) {
            const isOpen = this.sidebar?.classList.contains('open');
            this.menuBtn.textContent = isOpen ? '✕' : '☰';
        }
    }

    openSidebar() {
        this.sidebar?.classList.add('open');
        this.overlay?.classList.add('active');
        if (this.menuBtn) this.menuBtn.textContent = '✕';
    }

    closeSidebar() {
        this.sidebar?.classList.remove('open');
        this.overlay?.classList.remove('active');
        if (this.menuBtn) this.menuBtn.textContent = '☰';
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 1024) {
            this.closeSidebar();
        }
    }
}

// Create global instance
const navManager = new NavigationManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    navManager.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { navManager, NavigationManager };
}
