/**
 * CW Vibe Code Guide - Skill Level Filter
 * Handles filtering content by beginner/intermediate/advanced levels
 */

class SkillFilterManager {
    constructor() {
        this.storageKey = 'cw_skill_filters';
        this.filters = {
            beginner: true,
            intermediate: true,
            advanced: true
        };
        this.filterBar = null;
        this.checkboxes = [];
    }

    init() {
        this.filterBar = document.querySelector('.skill-filter-bar');
        if (!this.filterBar) return;

        this.checkboxes = this.filterBar.querySelectorAll('input[data-level]');

        // Load saved preferences
        this.loadFilters();

        // Apply initial filter state (without animation for instant load)
        this.applyFiltersInstant();

        // Bind events
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleChange(e));
        });
    }

    loadFilters() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                this.filters = JSON.parse(saved);
            } catch (e) {
                // Use defaults on parse error
            }
        }

        // Sync checkboxes with loaded state
        this.checkboxes.forEach(checkbox => {
            const level = checkbox.dataset.level;
            checkbox.checked = this.filters[level] !== false;
        });
    }

    saveFilters() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.filters));
    }

    applyFiltersInstant() {
        // Apply filters without animation (for initial page load)
        const skillElements = document.querySelectorAll('[data-skill]');

        skillElements.forEach(el => {
            const skill = el.dataset.skill;
            const shouldShow = this.filters[skill] !== false;

            // Clear any animation classes
            el.classList.remove('hiding', 'showing');

            if (shouldShow) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
    }

    handleChange(event) {
        const checkbox = event.target;
        const level = checkbox.dataset.level;

        this.filters[level] = checkbox.checked;
        this.saveFilters();
        this.applyFilters();

        // Update chip visual state
        const chip = checkbox.closest('.filter-chip');
        if (chip) {
            chip.classList.toggle('active', checkbox.checked);
        }
    }

    applyFilters() {
        // Find all elements with data-skill attribute
        const skillElements = document.querySelectorAll('[data-skill]');
        const animationDuration = 250; // Match CSS --transition-normal (0.25s)

        skillElements.forEach(el => {
            const skill = el.dataset.skill;
            const shouldShow = this.filters[skill] !== false;
            const isCurrentlyHidden = el.classList.contains('hidden');
            const isAnimating = el.classList.contains('hiding') || el.classList.contains('showing');

            // Skip if already in the correct state or animating
            if (isAnimating) return;

            if (shouldShow && isCurrentlyHidden) {
                // Show with animation
                this.showElement(el, animationDuration);
            } else if (!shouldShow && !isCurrentlyHidden) {
                // Hide with animation
                this.hideElement(el, animationDuration);
            }
        });

        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('filtersChanged', {
            detail: { filters: this.filters }
        }));
    }

    showElement(el, duration) {
        // Remove hidden state first
        el.classList.remove('hidden');

        // Force reflow to ensure transition plays
        el.offsetHeight;

        // Add showing class to trigger animation
        el.classList.add('showing');

        // Remove showing class after animation completes
        setTimeout(() => {
            el.classList.remove('showing');
        }, duration);
    }

    hideElement(el, duration) {
        // Add hiding class to trigger exit animation
        el.classList.add('hiding');

        // After animation completes, add hidden class and remove hiding
        setTimeout(() => {
            el.classList.add('hidden');
            el.classList.remove('hiding');
        }, duration);
    }

    setFilter(level, enabled) {
        this.filters[level] = enabled;

        // Update checkbox
        const checkbox = this.filterBar?.querySelector(`input[data-level="${level}"]`);
        if (checkbox) {
            checkbox.checked = enabled;
        }

        this.saveFilters();
        this.applyFilters();
    }

    showAll() {
        Object.keys(this.filters).forEach(level => {
            this.filters[level] = true;
        });

        this.checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });

        this.saveFilters();
        this.applyFilters();
    }

    hideAll() {
        Object.keys(this.filters).forEach(level => {
            this.filters[level] = false;
        });

        this.checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        this.saveFilters();
        this.applyFilters();
    }

    getFilters() {
        return { ...this.filters };
    }
}

// Create global instance
const skillFilterManager = new SkillFilterManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    skillFilterManager.init();
});

// Re-apply filters when tabs change (instant, no animation)
document.addEventListener('tabChanged', () => {
    setTimeout(() => skillFilterManager.applyFiltersInstant(), 100);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { skillFilterManager, SkillFilterManager };
}
