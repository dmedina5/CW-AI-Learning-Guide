/**
 * CW Vibe Code Guide - Copy to Clipboard
 * Handles copy functionality for all code blocks
 */

class CopyCodeManager {
    constructor() {
        this.copyButtons = [];
    }

    init() {
        // Wrap existing code blocks and add copy buttons
        this.wrapCodeBlocks();

        // Bind events to all copy buttons
        this.copyButtons = document.querySelectorAll('.copy-btn');
        this.copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCopy(e));
        });
    }

    wrapCodeBlocks() {
        // Find all pre elements that aren't already wrapped
        const preElements = document.querySelectorAll('pre:not(.wrapped)');

        preElements.forEach(pre => {
            // Skip if already in a code-wrapper
            if (pre.closest('.code-wrapper')) return;

            // Detect language from class or content
            const code = pre.querySelector('code');
            const lang = this.detectLanguage(pre, code);

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';

            // Create header
            const header = document.createElement('div');
            header.className = 'code-header';
            header.innerHTML = `
                <span class="code-lang">${lang}</span>
                <button class="copy-btn" aria-label="Copy code" type="button">
                    <span class="copy-icon">&#128203;</span>
                    <span class="copy-text">Copy</span>
                </button>
            `;

            // Wrap the pre element
            pre.classList.add('wrapped');
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(header);
            wrapper.appendChild(pre);
        });
    }

    detectLanguage(pre, code) {
        // Check for language class on code element
        if (code) {
            const classes = Array.from(code.classList);
            const langClass = classes.find(c => c.startsWith('language-'));
            if (langClass) {
                return langClass.replace('language-', '');
            }
        }

        // Check for data attribute
        if (pre.dataset.lang) {
            return pre.dataset.lang;
        }

        // Try to detect from content
        const content = (code || pre).textContent.trim();

        if (content.startsWith('#!') || content.includes('npm ') || content.includes('cd ')) {
            return 'bash';
        }
        if (content.includes('function ') || content.includes('const ') || content.includes('=>')) {
            return 'javascript';
        }
        if (content.includes('def ') || content.includes('import ') && content.includes(':')) {
            return 'python';
        }
        if (content.includes('<!DOCTYPE') || content.includes('<html')) {
            return 'html';
        }
        if (content.includes('{') && content.includes(':') && content.includes(';')) {
            return 'css';
        }

        return 'code';
    }

    async handleCopy(event) {
        const btn = event.currentTarget;
        const wrapper = btn.closest('.code-wrapper');
        const pre = wrapper?.querySelector('pre');
        const code = pre?.querySelector('code') || pre;

        if (!code) return;

        const text = code.textContent;

        try {
            await navigator.clipboard.writeText(text);
            this.showCopied(btn);
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopy(text);
            this.showCopied(btn);
        }
    }

    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    showCopied(btn) {
        const textEl = btn.querySelector('.copy-text');
        const iconEl = btn.querySelector('.copy-icon');
        const originalText = textEl?.textContent;
        const originalIcon = iconEl?.innerHTML;

        btn.classList.add('copied');
        if (textEl) textEl.textContent = 'Copied!';
        if (iconEl) iconEl.innerHTML = '&#10003;';

        setTimeout(() => {
            btn.classList.remove('copied');
            if (textEl) textEl.textContent = originalText;
            if (iconEl) iconEl.innerHTML = originalIcon;
        }, 2000);
    }
}

// Create global instance
const copyCodeManager = new CopyCodeManager();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    copyCodeManager.init();
});

// Re-initialize when tabs change (for dynamically shown content)
document.addEventListener('tabChanged', () => {
    setTimeout(() => copyCodeManager.init(), 100);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { copyCodeManager, CopyCodeManager };
}
