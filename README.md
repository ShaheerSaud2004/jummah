# Rutgers Jumu'ah Website

A modern, responsive website for the Rutgers Jumu'ah community built with React and Tailwind CSS.

## Features

- **Homepage**: Hero section with weekly khutbah information and community highlights
- **Khateebs Page**: Grid of upcoming and past khateebs with detailed information
- **Weekly Updates**: Qur'an ayat and Du'as with Arabic text, transliteration, and translations
- **Community Section**: Forms, applications, and social media links
- **About Page**: Mission, programs, and community information
- **Responsive Design**: Mobile-first approach with Instagram-inspired styling
- **Rutgers Branding**: Deep red (#8B0000) color scheme matching the Instagram theme

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Deployment**: Vercel
- **Fonts**: Inter, Playfair Display, Amiri (Arabic)

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
│   ├── Navbar.js          # Navigation component
│   └── Footer.js          # Footer component
├── pages/
│   ├── Homepage.js        # Main landing page
│   ├── Khateebs.js        # Khateebs grid page
│   ├── WeeklyUpdates.js   # Weekly content page
│   ├── Community.js       # Forms and community links
│   └── About.js           # About page
├── data/
│   ├── khateebs.json      # Khateeb data
│   └── weeklyContent.json # Weekly content data
├── App.js                 # Main app component
├── index.js              # App entry point
└── index.css             # Global styles and Tailwind imports
```

## Customization

### Adding New Khateebs

Edit `src/data/khateebs.json` to add new khateebs:

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

### Adding Weekly Content

Edit `src/data/weeklyContent.json` to add new ayat or du'as:

```json
{
  "id": 5,
  "type": "ayah",
  "arabic": "Arabic text here",
  "translation": "English translation here",
  "reference": "Quran 1:1"
}
```

### Updating Forms

Edit the `forms` array in `src/pages/Community.js` to add or modify community forms.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Build

```bash
npm run build
```

The build folder contains the production-ready files.

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

## Contact

- Email: rutgersjumuah@gmail.com
- Instagram: [@rutgersjumuah](https://instagram.com/rutgersjumuah)
- Facebook: [Rutgers Jumu'ah](https://facebook.com/rutgersjumuah)

---

**Rutgers Jumu'ah • Built for the community**
# jummah
