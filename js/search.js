/**
 * CW Vibe Code Guide - Search Module
 * Handles Ctrl+K search across all documentation pages
 */

class SearchManager {
    constructor() {
        this.modal = null;
        this.input = null;
        this.resultsContainer = null;
        this.searchIndex = [];
        this.results = [];
        this.selectedIndex = 0;
    }

    init() {
        this.modal = document.getElementById('search-modal');
        this.input = this.modal?.querySelector('input');
        this.resultsContainer = this.modal?.querySelector('.search-results');

        if (!this.modal) return;

        // Build search index
        this.buildIndex();

        // Bind events
        this.bindEvents();
    }

    buildIndex() {
        // Index current page content
        this.indexCurrentPage();

        // Define all pages for cross-page search
        this.pages = [
            { url: 'index.html', title: 'Home', icon: '&#127968;' },
            { url: 'installation.html', title: 'Installation', icon: '&#128230;' },
            { url: 'fundamentals.html', title: 'Fundamentals', icon: '&#129504;' },
            { url: 'tips-tricks.html', title: 'Tips & Tricks', icon: '&#128161;' },
            { url: 'use-cases.html', title: 'Use Cases', icon: '&#128011;' },
            { url: 'workflows.html', title: 'Workflows', icon: '&#128260;' },
            { url: 'advanced.html', title: 'Advanced', icon: '&#127919;' },
            { url: 'cheatsheet.html', title: 'Cheatsheet', icon: '&#128203;' }
        ];
    }

    indexCurrentPage() {
        // Index headings
        document.querySelectorAll('h1, h2, h3, h4').forEach(heading => {
            const text = heading.textContent.trim();
            const id = heading.id || this.slugify(text);

            this.searchIndex.push({
                type: 'heading',
                text: text,
                anchor: id,
                page: window.location.pathname.split('/').pop() || 'index.html',
                element: heading
            });
        });

        // Index paragraphs and list items
        document.querySelectorAll('.page-content p, .page-content li').forEach(el => {
            const text = el.textContent.trim();
            if (text.length > 20 && text.length < 500) {
                // Find nearest heading for context
                const section = el.closest('section') || el.closest('.tab-content');
                const heading = section?.querySelector('h2, h3, h4');

                this.searchIndex.push({
                    type: 'content',
                    text: text,
                    anchor: heading?.id || '',
                    context: heading?.textContent || '',
                    page: window.location.pathname.split('/').pop() || 'index.html'
                });
            }
        });

        // Index code blocks
        document.querySelectorAll('pre code').forEach(code => {
            const text = code.textContent.trim();
            if (text.length > 10) {
                const section = code.closest('section') || code.closest('.tab-content');
                const heading = section?.querySelector('h2, h3, h4');

                this.searchIndex.push({
                    type: 'code',
                    text: text,
                    anchor: heading?.id || '',
                    context: heading?.textContent || 'Code example',
                    page: window.location.pathname.split('/').pop() || 'index.html'
                });
            }
        });
    }

    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    bindEvents() {
        // Keyboard shortcut (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }

            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });

        // Search trigger button
        const trigger = document.querySelector('.search-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => this.open());
        }

        // Close on backdrop click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Input handling
        this.input?.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Keyboard navigation in results
        this.input?.addEventListener('keydown', (e) => this.handleKeyNav(e));
    }

    open() {
        this.modal?.classList.add('active');
        this.input?.focus();
        this.input.value = '';
        this.clearResults();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    isOpen() {
        return this.modal?.classList.contains('active');
    }

    handleSearch(query) {
        if (!query || query.length < 2) {
            this.clearResults();
            return;
        }

        const q = query.toLowerCase();

        // Search in index
        this.results = this.searchIndex
            .filter(item => item.text.toLowerCase().includes(q))
            .slice(0, 10)
            .map(item => ({
                ...item,
                highlighted: this.highlight(item.text, query)
            }));

        // Also search page names
        this.pages.forEach(page => {
            if (page.title.toLowerCase().includes(q)) {
                this.results.unshift({
                    type: 'page',
                    text: page.title,
                    url: page.url,
                    icon: page.icon,
                    highlighted: this.highlight(page.title, query)
                });
            }
        });

        this.results = this.results.slice(0, 10);
        this.selectedIndex = 0;
        this.renderResults();
    }

    highlight(text, query) {
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    renderResults() {
        if (!this.resultsContainer) return;

        if (this.results.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="search-no-results">
                    No results found. Try a different search term.
                </div>
            `;
            return;
        }

        this.resultsContainer.innerHTML = this.results.map((result, index) => {
            const isSelected = index === this.selectedIndex;
            const icon = result.type === 'page' ? result.icon :
                         result.type === 'heading' ? '&#128196;' :
                         result.type === 'code' ? '&#128187;' : '&#128221;';

            const subtitle = result.type === 'page' ? 'Page' :
                            result.context || result.page;

            // Truncate long text
            let displayText = result.highlighted;
            if (displayText.length > 100) {
                displayText = displayText.substring(0, 100) + '...';
            }

            return `
                <div class="search-result ${isSelected ? 'selected' : ''}"
                     data-index="${index}"
                     role="option"
                     aria-selected="${isSelected}">
                    <div class="search-result-title">${icon} ${displayText}</div>
                    <div class="search-result-page">${subtitle}</div>
                </div>
            `;
        }).join('');

        // Bind click events to results
        this.resultsContainer.querySelectorAll('.search-result').forEach(el => {
            el.addEventListener('click', () => {
                const index = parseInt(el.dataset.index);
                this.selectResult(index);
            });

            el.addEventListener('mouseenter', () => {
                this.selectedIndex = parseInt(el.dataset.index);
                this.updateSelection();
            });
        });
    }

    updateSelection() {
        this.resultsContainer?.querySelectorAll('.search-result').forEach((el, index) => {
            el.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    clearResults() {
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = '';
        }
        this.results = [];
        this.selectedIndex = 0;
    }

    handleKeyNav(e) {
        if (this.results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex + 1) % this.results.length;
                this.updateSelection();
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex - 1 + this.results.length) % this.results.length;
                this.updateSelection();
                break;

            case 'Enter':
                e.preventDefault();
                this.selectResult(this.selectedIndex);
                break;
        }
    }

    selectResult(index) {
        const result = this.results[index];
        if (!result) return;

        this.close();

        if (result.type === 'page') {
            // Navigate to page
            window.location.href = result.url;
        } else if (result.anchor) {
            // Scroll to anchor on current page
            const el = document.getElementById(result.anchor) || result.element;
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Add highlight effect
                el.style.background = 'rgba(0, 212, 170, 0.2)';
                setTimeout(() => {
                    el.style.background = '';
                }, 2000);
            }
        } else if (result.url) {
            window.location.href = result.url + (result.anchor ? '#' + result.anchor : '');
        }
    }
}

// Create global instance
const searchManager = new SearchManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    searchManager.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { searchManager, SearchManager };
}
