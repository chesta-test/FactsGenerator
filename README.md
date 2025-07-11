# Facts Generator 🧠💡

A beautiful and interactive web application that fetches random facts from openly available APIs and displays them with a modern, responsive UI.

## Features

✨ **Modern Design**: Clean, responsive interface with smooth animations
🎲 **Random Facts**: Fetches interesting facts from multiple APIs
📊 **Session Statistics**: Track your learning progress
🔗 **Easy Sharing**: Share facts via Web Share API or copy to clipboard
⌨️ **Keyboard Shortcuts**: Press spacebar to generate new facts
📱 **Mobile Friendly**: Fully responsive design for all devices
🎨 **Smooth Animations**: Engaging visual feedback

## APIs Used

- **Primary**: [API Ninjas Facts API](https://api.api-ninjas.com/)
- **Fallback**: [Useless Facts API](https://uselessfacts.jsph.pl/)

## How to Use

1. **Generate Facts**: Click the "Generate New Fact" button or press spacebar
2. **Share Facts**: Use the share button to copy facts or share them directly
3. **Track Progress**: View your session statistics in real-time
4. **Mobile Experience**: Works perfectly on mobile devices

## Features Overview

### 🎯 Core Functionality
- Fetches random facts from reliable APIs
- Fallback system ensures facts are always available
- Error handling for network issues
- Loading states with smooth animations

### 🎨 User Experience
- Beautiful gradient backgrounds
- Glassmorphism design elements
- Hover effects and micro-interactions
- Toast notifications for user feedback
- Session timer and fact counter

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Adaptive layouts

### ⌨️ Keyboard Shortcuts
- `Spacebar`: Generate new fact
- `Ctrl+C`: Copy current fact to clipboard
- `Konami Code`: Secret easter egg! 🎉

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and animations
- **JavaScript (ES6+)**: Async/await, classes, and modern APIs
- **Web APIs**: Fetch API, Clipboard API, Web Share API
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Installation

1. Clone the repository:
```bash
git clone https://github.com/chesta-test/FactsGenerator.git
```

2. Open `index.html` in your browser or serve it using a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## Customization

### Changing Colors
Edit the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --background-color: #f7fafc;
    --text-color: #2d3748;
}
```

### Adding More APIs
Extend the `fetchRandomFact()` method in `script.js` to include additional fact APIs:

```javascript
async fetchFromCustomAPI() {
    const response = await fetch('YOUR_API_ENDPOINT');
    const data = await response.json();
    return {
        text: data.fact,
        category: data.category
    };
}
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to [API Ninjas](https://api.api-ninjas.com/) for providing free fact APIs
- Thanks to [Useless Facts API](https://uselessfacts.jsph.pl/) for the fallback service
- Font Awesome for the beautiful icons
- Google Fonts for the Inter font family

---

**Made with ❤️ by [chesta-test](https://github.com/chesta-test)**

*Start discovering amazing facts today!* 🚀