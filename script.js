class FactsGenerator {
    constructor() {
        this.currentFact = '';
        this.isLoading = false;
        
        this.initializeElements();
        this.bindEvents();
        this.showWelcomeMessage();
    }

    initializeElements() {
        this.factText = document.getElementById('fact-text');
        this.generateBtn = document.getElementById('generate-btn');
        this.loadingOverlay = document.getElementById('loading-overlay');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateFact());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isLoading) {
                e.preventDefault();
                this.generateFact();
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
        // Using Numbers API for math facts
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        const response = await fetch(`http://numbersapi.com/${randomNumber}/math`);
        
        if (!response.ok) {
            // Fallback to predefined math facts if API fails
            return {
                text: this.getFallbackMathFact(),
                category: 'Math'
            };
        }
        
        const factText = await response.text();
        return {
            text: factText,
            category: 'Math'
        };
    }

    getFallbackMathFact() {
        const mathFacts = [
            "The number zero was invented in India around the 5th century.",
            "Pi has been calculated to over 31 trillion digits.",
            "The Fibonacci sequence appears throughout nature, from flower petals to spiral galaxies.",
            "A googol is 1 followed by 100 zeros, but a googolplex is 1 followed by a googol zeros.",
            "The Golden Ratio (φ ≈ 1.618) is considered the most beautiful number in mathematics.",
            "There are infinitely many prime numbers, as proven by Euclid around 300 BCE.",
            "The sum of all positive integers (-1 + -2 + -3 + ...) mathematically equals -1/12.",
            "A circle has exactly 360 degrees, a tradition that dates back to ancient Babylon.",
            "The probability of shuffling a deck of cards into any specific order is 1 in 52! (about 8×10^67).",
            "Mathematics is the only language shared by all human beings across the globe.",
            "The word 'algebra' comes from the Arabic word 'al-jabr' meaning 'reunion of broken parts'.",
            "Zero is the only number that cannot be represented in Roman numerals.",
            "Every odd number greater than 1 is the sum of at most 3 prime numbers.",
            "The number 1729 is known as the Hardy-Ramanujan number - the smallest number expressible as the sum of two cubes in two different ways.",
            "A Klein bottle is a surface with no boundary and only one side.",
            "The Monty Hall problem demonstrates how our intuition about probability can be wrong."
        ];
        
        return mathFacts[Math.floor(Math.random() * mathFacts.length)];
    }

    displayFact(fact) {
        this.currentFact = fact.text;
        this.factText.textContent = fact.text;
        
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
        this.factText.textContent = 'Oops! Something went wrong while fetching the math fact. Please try again.';
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
            btnText.textContent = 'Loading...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            this.generateBtn.disabled = true;
        } else {
            btnText.textContent = 'Get New Math Fact';
            btnIcon.className = 'fas fa-refresh';
            this.generateBtn.disabled = false;
        }
    }

    showWelcomeMessage() {
        const welcomeMathFacts = [
            "Welcome to Math Facts Generator! Did you know that π (pi) is an irrational number?",
            "Ready to explore? Zero is the only number that is neither positive nor negative!",
            "Let's start learning! The sum of the first n positive integers is n(n+1)/2!",
            "Welcome aboard! The probability of getting heads on a fair coin flip is exactly 1/2!",
            "Time to discover! A prime number is only divisible by 1 and itself!"
        ];
        
        const randomWelcome = welcomeMathFacts[Math.floor(Math.random() * welcomeMathFacts.length)];
        setTimeout(() => {
            this.factText.textContent = randomWelcome;
            this.currentFact = randomWelcome;
        }, 1000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FactsGenerator();
});