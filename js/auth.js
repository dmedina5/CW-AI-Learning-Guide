/**
 * CW Vibe Code Guide - Authentication Module
 * Handles Google OAuth via Cover Whale Auth Backend
 */

const AUTH_BACKEND = 'https://coverwhale-auth.vercel.app';

// Check if running on localhost for development
const isLocalhost = window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname.startsWith('192.168.') ||
                    window.location.protocol === 'file:';

class CoverWhaleAuth {
    constructor() {
        this.token = localStorage.getItem('cw_auth_token');
        this.user = null;
        this.initialized = false;
    }

    async init() {
        // Skip auth for local development
        if (isLocalhost) {
            console.log('Local development mode - skipping authentication');
            this.initialized = true;
            this.user = { email: 'dev@coverwhale.com' };
            return true;
        }

        // Check if token in URL (from OAuth redirect)
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');

        if (tokenFromUrl) {
            this.token = tokenFromUrl;
            localStorage.setItem('cw_auth_token', tokenFromUrl);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Verify token
        if (this.token) {
            const isValid = await this.verifyToken();
            if (!isValid) {
                this.login();
                return false;
            }
            this.initialized = true;
            return true;
        } else {
            this.login();
            return false;
        }
    }

    async verifyToken() {
        try {
            const response = await fetch(`${AUTH_BACKEND}/api/verify`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });

            if (response.ok) {
                const data = await response.json();
                this.user = data.user;
                // Store email for display
                if (this.user && this.user.email) {
                    localStorage.setItem('cw_user_email', this.user.email);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    }

    login() {
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = `${AUTH_BACKEND}/api/auth?return_url=${returnUrl}`;
    }

    logout() {
        localStorage.removeItem('cw_auth_token');
        localStorage.removeItem('cw_user_email');
        this.token = null;
        this.user = null;

        if (isLocalhost) {
            // Just reload on localhost
            window.location.reload();
        } else {
            // Redirect to login on production
            this.login();
        }
    }

    getUser() {
        return this.user;
    }

    getUserEmail() {
        if (isLocalhost) {
            return 'dev@coverwhale.com (local)';
        }
        if (this.user && this.user.email) {
            return this.user.email;
        }
        return localStorage.getItem('cw_user_email') || 'user@coverwhale.com';
    }

    isAuthenticated() {
        return this.initialized && this.token !== null;
    }
}

// Create global auth instance
const auth = new CoverWhaleAuth();

// Token refresh interval (check every hour) - skip on localhost
if (!isLocalhost) {
    setInterval(() => {
        if (auth.token) {
            auth.verifyToken().then(valid => {
                if (!valid) auth.login();
            });
        }
    }, 60 * 60 * 1000);
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', async () => {
    const loading = document.getElementById('auth-loading');
    const content = document.getElementById('app-content');

    if (!loading || !content) {
        console.warn('Auth elements not found');
        return;
    }

    const isAuthed = await auth.init();

    if (isAuthed) {
        // Hide loading, show content
        loading.style.display = 'none';
        content.style.display = 'flex';

        // Update user email display
        const emailEl = document.getElementById('user-email');
        if (emailEl) {
            emailEl.textContent = auth.getUserEmail();
        }
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { auth, CoverWhaleAuth };
}
