# Vertex Automobiles - Car Sales Website

A modern, premium car sales website built with React.js for the Sri Lankan market. Features a sophisticated dark theme, intuitive navigation, and localStorage-based data management.

## Features

- 🚗 **Car Inventory Display** - Browse available cars with advanced filtering
- 🔍 **Search & Filter** - Filter by brand, fuel type, transmission, price, and more
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Premium Dark Theme** - Modern glassmorphism effects and smooth animations
- 💾 **localStorage Storage** - No backend required, easy to host anywhere
- 📞 **Contact Integration** - Phone and WhatsApp links for easy customer contact
- 🌐 **SEO Optimized** - Proper meta tags and semantic HTML

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Vanilla CSS** - Custom design system with CSS variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd /Users/inushamanawadu/Documents/Inusha/Cars
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Managing Car Data

### Viewing Current Data

Car data is stored in your browser's localStorage. To view it:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Look for the `car_inventory` key

### Adding New Cars

You can add cars in two ways:

**Option 1: Edit the sample data file**
1. Open `src/data/sampleCars.js`
2. Add your car object to the array following the existing format
3. Clear localStorage and refresh the page to reload data

**Option 2: Use browser console**
```javascript
import { addCar } from './src/utils/storage.js';

addCar({
  name: "Toyota Corolla",
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  price: 5500000,
  mileage: 35000,
  transmission: "Automatic",
  fuelType: "Hybrid",
  condition: "Excellent",
  images: ["image-url-1.jpg", "image-url-2.jpg"],
  description: "Well-maintained vehicle...",
  features: ["Feature 1", "Feature 2"],
  location: "Colombo",
  engineCapacity: "1800cc",
  color: "White"
});
```

### Clearing Data

To reset to sample data:
```javascript
localStorage.removeItem('car_inventory');
// Then refresh the page
```

## Deployment

This site can be deployed to any static hosting service:

### Netlify (Recommended)

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or connect your GitHub repository for automatic deployments.

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## Customization

### Changing Colors

Edit `src/index.css` and modify the CSS variables:
```css
:root {
  --color-accent-primary: #10b981; /* Change to your brand color */
  --color-accent-secondary: #fbbf24;
  /* ... other colors */
}
```

### Updating Contact Information

Edit the following files:
- `src/components/Footer.jsx` - Footer contact info
- `src/pages/Contact.jsx` - Contact page details
- `src/pages/CarDetail.jsx` - Call/WhatsApp buttons

### Changing Brand Name

Search and replace "AutoLanka" across all files with your brand name.

## Project Structure

```
Cars/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── CarCard.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── CarDetail.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── data/           # Sample data
│   │   └── sampleCars.js
│   ├── utils/          # Utility functions
│   │   └── storage.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles & design system
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

## Support

For questions or issues, please contact:
- Email: info@autolanka.lk
- Phone: +94 11 234 5678

---

Built with ❤️ in Sri Lanka
