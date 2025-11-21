# Rutgers Jumu'ah Website

A modern, responsive Progressive Web App (PWA) for the Rutgers Jumu'ah community built with React and Tailwind CSS.

## Features

### Core Features
- **Homepage**: Hero section with weekly khutbah information, livestream support, and community highlights
- **Khateebs Page**: Grid of upcoming and past khateebs with detailed information and bio pages
- **Weekly Updates**: Qur'an ayat and Du'as with Arabic text, transliteration, and translations
- **Community Section**: Forms, applications, parking permits, and social media links
- **About Page**: Mission, programs, and community information
- **Admin Panel**: Password-protected content management system for editing website content
- **Chatbot**: Interactive FAQ assistant for inquiries and event questions

### Additional Pages
- **Gems**: Weekly pearls of wisdom and Islamic knowledge
- **Salawaat Series**: Dedicated series on sending blessings upon the Prophet (PBUH)
- **Al-Kahf Circle**: Weekly study circle with Instagram clips (12:30 PM)
- **Friday Sunnah Reminders**: Reminders of blessed practices for Friday
- **HOJ (House of Jumu'ah)**: Overview of community and resources
- **Adab & Conduct**: Guidelines for respectful conduct in the musalla
- **Team**: Team highlight page with photos and quotes
- **Parking Form**: Student parking permit requests
- **Team Application**: Application page for joining the team

### Mobile & PWA Optimizations
- **Progressive Web App**: Installable with standalone mode and portrait orientation
- **Mobile-First Design**: Responsive layout with flexible grids and mobile-optimized padding
- **Touch Optimizations**: 
  - 44x44px minimum touch targets for all interactive elements
  - `touch-action: manipulation` for better touch response
  - Active states with scale feedback on touch
  - Improved button spacing and padding
- **Pull-to-Refresh**: Native pull-to-refresh on homepage for mobile devices
- **Overscroll Control**: Prevents unwanted scroll behaviors
- **Horizontal Scroll Prevention**: Prevents accidental horizontal scrolling
- **Reduced Motion Support**: Respects user's motion preferences
- **iOS Optimizations**: 
  - Smooth scrolling with `-webkit-overflow-scrolling: touch`
  - Font smoothing and text rendering
  - Word wrapping for long text
  - Shorter animations on mobile for better performance
- **Chatbot & BackToTop**: Properly positioned to avoid overlap on mobile
- **Mobile Menu**: Improved touch targets and proper spacing

### Design
- **Responsive Design**: Mobile-first approach with Instagram-inspired styling
- **Rutgers Branding**: Deep red (#8B0000) color scheme matching the Instagram theme
- **Theme Color**: #8B0000 for browser UI and PWA

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: localStorage with event-based updates
- **Deployment**: Vercel
- **Fonts**: Inter, Playfair Display, Amiri (Arabic)
- **PWA**: Service Worker ready, manifest.json with icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rutgers-jumuah-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component with mobile menu
│   ├── Footer.js          # Footer component
│   ├── Chatbot.js         # Interactive FAQ chatbot
│   ├── BackToTop.js       # Back to top button
│   ├── OptimizedImage.js  # Image component with error handling
│   ├── LivestreamEmbed.js # Livestream embedding component
│   └── AdminRoute.js      # Protected admin route wrapper
├── pages/
│   ├── Homepage.js        # Main landing page with pull-to-refresh
│   ├── Khateebs.js        # Khateebs grid page
│   ├── KhateebDetail.js   # Individual khateeb detail page
│   ├── WeeklyUpdates.js   # Weekly content page
│   ├── Community.js       # Forms and community links
│   ├── About.js           # About page
│   ├── Gems.js            # Gems page
│   ├── Salawaat.js        # Salawaat series page
│   ├── KahfCircle.js      # Al-Kahf Circle page
│   ├── SunnahReminders.js # Friday Sunnah reminders
│   ├── HOJ.js             # House of Jumu'ah page
│   ├── Adab.js            # Adab & Conduct page
│   ├── Team.js            # Team highlight page
│   ├── Parking.js          # Parking form page
│   ├── TeamApplication.js # Team application page
│   ├── AdminLogin.js      # Admin login page
│   ├── AdminDashboard.js  # Admin dashboard
│   └── admin/             # Admin management pages
│       ├── AdminKhateebs.js
│       ├── AdminWeeklyContent.js
│       ├── AdminGems.js
│       ├── AdminSalawaat.js
│       ├── AdminKahfCircle.js
│       ├── AdminLivestream.js
│       ├── AdminTeam.js
│       ├── AdminSunnahReminders.js
│       └── AdminSettings.js
├── utils/
│   ├── dataManager.js     # Centralized data management with localStorage
│   └── adminAuth.js        # Admin authentication
├── data/
│   ├── khateebs.json      # Khateeb data
│   ├── weeklyContent.json # Weekly content data
│   ├── gems.json          # Gems data
│   ├── salawaat.json      # Salawaat data
│   ├── kahfCircle.json   # Al-Kahf Circle data
│   ├── livestream.json    # Livestream configuration
│   ├── team.json          # Team data
│   └── sunnahReminders.json # Sunnah reminders data
├── App.js                 # Main app component with routing
├── index.js              # App entry point
└── index.css             # Global styles, Tailwind imports, and mobile optimizations

public/
├── manifest.json         # PWA manifest with icons and configuration
├── index.html            # HTML template with PWA meta tags
├── favicon.ico           # Favicon
├── logo192.png          # 192x192 PWA icon
├── logo512.png          # 512x512 PWA icon
└── apple-touch-icon.png # 180x180 Apple touch icon
```

## Admin Panel

The website includes a password-protected admin panel for content management.

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Default password: `jummah2025` (change in Settings after login)
3. Session lasts 24 hours

### Admin Features

- **Manage Khateebs**: Add, edit, delete, and reorder khateebs with drag-and-drop
- **Manage Weekly Content**: Add/edit Qur'an ayat and Du'as
- **Manage Gems**: Add/edit weekly gems
- **Manage Salawaat Series**: Add/edit salawaat installments
- **Manage Al-Kahf Circle**: Add/edit Instagram clips
- **Configure Livestream**: Set livestream status, platform, and URLs
- **Manage Team**: Edit team members and subteams
- **Manage Sunnah Reminders**: Add/edit Friday Sunnah reminders
- **Settings**: Change admin password

All changes are saved to browser localStorage and persist across page refreshes. Changes are immediately visible on the public site.

## Customization

### Adding Content via Admin Panel (Recommended)

Use the admin panel at `/admin/login` to add and manage content directly on the website.

### Adding Content via JSON Files

Alternatively, edit JSON files in `src/data/`:

**Khateebs** (`khateebs.json`):
```json
{
  "id": 7,
  "name": "Br. New Khateeb",
  "date": "2025-02-16",
  "title": "Community Leader",
  "bio": "Description of the khateeb...",
  "image": "https://example.com/image.jpg",
  "isUpcoming": true
}
```

**Weekly Content** (`weeklyContent.json`):
```json
{
  "id": 5,
  "type": "ayah",
  "arabic": "Arabic text here",
  "transliteration": "Transliteration here",
  "translation": "English translation here",
  "reference": "Quran 1:1"
}
```

### Updating Forms

Edit the `forms` array in `src/pages/Community.js` to add or modify community forms.

## Mobile & PWA Features

### Progressive Web App (PWA)

The website is configured as a PWA with:

- **Manifest**: `public/manifest.json` with icons, theme color, and standalone mode
- **Icons**: 
  - `logo192.png` (192x192) for Android
  - `logo512.png` (512x512) for Android
  - `apple-touch-icon.png` (180x180) for iOS
- **Theme Color**: #8B0000 (Rutgers red)
- **Orientation**: Portrait preferred
- **Display Mode**: Standalone (app-like experience)

### Mobile Optimizations

- **Touch Targets**: All interactive elements have minimum 44x44px touch targets
- **Touch Action**: `touch-action: manipulation` for better touch response
- **Active States**: Scale feedback (0.95-0.98) on touch
- **Pull-to-Refresh**: Native pull-to-refresh on homepage (mobile only)
- **Overscroll Control**: Prevents unwanted scroll behaviors
- **Horizontal Scroll Prevention**: Prevents accidental horizontal scrolling
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **iOS Smooth Scrolling**: `-webkit-overflow-scrolling: touch`
- **Font Smoothing**: Better text rendering on mobile
- **Word Wrapping**: Long text wraps properly
- **Mobile Menu**: Improved touch targets and spacing
- **Responsive Padding**: `p-4 sm:p-6` for mobile-optimized spacing
- **Chatbot & BackToTop**: Properly positioned to avoid overlap on mobile

## Deployment

### Vercel (Recommended)

The website is deployed to Vercel at: `https://rutgers-jummah-jh4l64n3b-shaheers-projects-02efc33d.vercel.app`

**Deployment Steps:**

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel auto-detects Create React App and configures build
4. Deploy automatically on every push

**Vercel Configuration** (`vercel.json`):
- Build command: `npm run build`
- Output directory: `build`
- Framework: create-react-app
- Rewrites: All routes to `/index.html` for SPA routing
- Headers: Static assets cached for 1 year

### Manual Build

```bash
npm run build
```

The build folder contains the production-ready files optimized for deployment.

### Testing Locally

```bash
# Development server
npm start

# Production build test
npm run build
npx serve -s build
```

## Color Scheme

- **Primary Red**: #8B0000 (rutgers-red)
- **Light Red**: #A52A2A (rutgers-light-red)
- **Dark Red**: #660000 (rutgers-dark-red)
- **White**: #FFFFFF
- **Gray**: Various shades for text and backgrounds

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is built for the Rutgers Jumu'ah community.

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari 12+, Chrome Mobile, Samsung Internet
- **PWA Support**: Installable on Android and iOS (iOS 11.3+)
- **Features**: 
  - localStorage for data persistence
  - CSS Grid and Flexbox for layouts
  - ES6+ JavaScript features

## Performance

- **Build Size**: ~90KB JS, ~7KB CSS (gzipped)
- **Code Splitting**: React Router handles route-based splitting
- **Image Optimization**: OptimizedImage component with lazy loading
- **Mobile Performance**: Reduced animations and shorter transitions on mobile
- **Font Loading**: Preconnect to Google Fonts for faster loading

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile and desktop
5. Submit a pull request

## License

This project is built for the Rutgers Jumu'ah community.

## Contact

- **Email**: rutgersjumuah@gmail.com
- **Instagram**: [@rutgersjumuah](https://instagram.com/rutgersjumuah)
- **Facebook**: [Rutgers Jumu'ah](https://facebook.com/rutgersjumuah)
- **Website**: [Live Site](https://rutgers-jummah-jh4l64n3b-shaheers-projects-02efc33d.vercel.app)

---

**Rutgers Jumu'ah • Built for the community**
