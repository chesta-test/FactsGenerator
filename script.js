class FactsGenerator {
    constructor() {
        this.factsCount = 0;
        this.sessionStartTime = Date.now();
        this.currentFact = '';
        this.isLoading = false;
        
        this.initializeElements();
        this.bindEvents();
        this.startSessionTimer();
        this.showWelcomeMessage();
    }

    initializeElements() {
        this.factText = document.getElementById('fact-text');
        this.factCategory = document.getElementById('fact-category');
        this.generateBtn = document.getElementById('generate-btn');
        this.shareBtn = document.getElementById('share-btn');
        this.factsCountEl = document.getElementById('facts-count');
        this.sessionTimeEl = document.getElementById('session-time');
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toast-message');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateFact());
        this.shareBtn.addEventListener('click', () => this.shareFact());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isLoading) {
                e.preventDefault();
                this.generateFact();
            }
            if (e.ctrlKey && e.key === 'c' && this.currentFact) {
                this.copyToClipboard();
            }
        });
    }

    async generateFact() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        this.updateButtonState(true);
        
        try {
            const fact = await this.fetchRandomFact();
            this.displayFact(fact);
            this.factsCount++;
            this.updateStats();
            this.shareBtn.disabled = false;
        } catch (error) {
            console.error('Error fetching fact:', error);
            this.showError();
        } finally {
            this.isLoading = false;
            this.hideLoading();
            this.updateButtonState(false);
        }
    }

    async fetchRandomFact() {
        // Using API Ninjas Facts API - free and no authentication required
        const response = await fetch('https://api.api-ninjas.com/v1/facts?limit=1', {
            headers: {
                'X-Api-Key': 'YOUR_API_KEY' // For demo purposes, using a fallback
            }
        });
        
        if (!response.ok) {
            // Fallback to a different API if the first one fails
            return await this.fetchFromFallbackAPI();
        }
        
        const data = await response.json();
        return {
            text: data[0].fact,
            category: 'General'
        };
    }

    async fetchFromFallbackAPI() {
        // Fallback to uselessfacts.jsph.pl API
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        
        if (!response.ok) {
            throw new Error('Failed to fetch from fallback API');
        }
        
        const data = await response.json();
        return {
            text: data.text,
            category: 'Random'
        };
    }

    displayFact(fact) {
        this.currentFact = fact.text;
        this.factText.textContent = fact.text;
        this.factCategory.textContent = fact.category;
        
        // Add animation
        this.factText.style.opacity = '0';
        this.factText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.factText.style.transition = 'all 0.5s ease';
            this.factText.style.opacity = '1';
            this.factText.style.transform = 'translateY(0)';
        }, 100);
    }

    showError() {
        this.factText.textContent = 'Oops! Something went wrong while fetching the fact. Please try again.';
        this.factCategory.textContent = 'Error';
        this.factCategory.style.background = '#e53e3e';
        
        setTimeout(() => {
            this.factCategory.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }, 3000);
    }

    updateStats() {
        this.factsCountEl.textContent = this.factsCount;
    }

    startSessionTimer() {
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.sessionStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.sessionTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    showLoading() {
        this.loadingOverlay.classList.add('show');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('show');
    }

    updateButtonState(loading) {
        const btnText = this.generateBtn.querySelector('span');
        const btnIcon = this.generateBtn.querySelector('i');
        
        if (loading) {
            btnText.textContent = 'Generating...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            this.generateBtn.disabled = true;
        } else {
            btnText.textContent = 'Generate New Fact';
            btnIcon.className = 'fas fa-magic';
            this.generateBtn.disabled = false;
        }
    }

    async shareFact() {
        if (!this.currentFact) return;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Amazing Fact!',
                    text: this.currentFact,
                    url: window.location.href
                });
                this.showToast('Fact shared successfully!');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    this.copyToClipboard();
                }
            }
        } else {
            this.copyToClipboard();
        }
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.currentFact);
            this.showToast('Fact copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            this.showToast('Failed to copy fact', 'error');
        }
    }

    showToast(message, type = 'success') {
        this.toastMessage.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    showWelcomeMessage() {
        const welcomeFacts = [
            "Welcome to Facts Generator! Did you know that honey never spoils?",
            "Ready to explore? A group of flamingos is called a 'flamboyance'!",
            "Let's start learning! Bananas are berries, but strawberries aren't!",
            "Welcome aboard! Octopuses have three hearts and blue blood!",
            "Time to discover! A day on Venus is longer than its year!"
        ];
        
        const randomWelcome = welcomeFacts[Math.floor(Math.random() * welcomeFacts.length)];
        setTimeout(() => {
            this.factText.textContent = randomWelcome;
            this.factCategory.textContent = 'Welcome';
            this.currentFact = randomWelcome;
            this.shareBtn.disabled = false;
        }, 1000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FactsGenerator();
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    static konamiIndex = 0;
    
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);