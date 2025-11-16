# Comrades CarSpa - Single Page Website

A professional, responsive single-page website for Comrades CarSpa, a car detailing business. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation
- **SEO Optimized**: Meta tags, structured data, Open Graph
- **Performance**: Lazy loading, preloading, minimal external resources
- **Booking System**: Full front-end booking with WhatsApp integration
- **Gallery**: Lightbox modal for image viewing with staggered animations
- **Performance**: Font display swap, preloading, lazy loading, loading states
- **Analytics**: Google Analytics integration with event tracking
- **Contact**: Google Maps integration and social media links
- **Animations**: Professional staggered animations for hero, services, and gallery
- **Form Validation**: Client-side validation with error messages

## File Structure

```
/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript functionality
├── assets/             # Images and fonts
│   ├── logo.png
│   ├── bg.jpg
│   ├── img1.jpg - img5.jpg
│   └── brand-font.woff2
└── README.md           # This file
```

## Setup Instructions

1. **Clone or download** the files to your project directory.

2. **Update Assets**:
   - Place all images (`logo.png`, `bg.jpg`, `img1.jpg` to `img5.jpg`) in an `/assets/` folder relative to `index.html`.
   - Place the brand font (`brand-font.woff2`) in `/assets/`.

3. **Configure WhatsApp Integration**:
   - Open `script.js`
   - Find the line: `const OWNER_WHATSAPP = "PHONE_NUMBER_HERE";`
   - Replace `"PHONE_NUMBER_HERE"` with your WhatsApp number in E.164 format without the `+` sign.
   - Example: `const OWNER_WHATSAPP = "919876543210";`

4. **Update Business Information**:
   - In `index.html`, update the contact information in the Contact section.
   - Update prices in the Pricing section.
   - Modify testimonials, services descriptions, etc., as needed.

5. **Deployment**:
   - Upload all files to your web server.
   - For GitHub Pages: Push to a GitHub repository and enable Pages in repository settings.
   - For Netlify: Drag and drop the files or connect your Git repository.

## Customization

### Colors and Branding
- Edit CSS variables in `style.css` under `:root` for easy theme changes.
- Update the brand font by replacing `brand-font.woff2` and adjusting the `@font-face` declaration.

### Content
- Modify service descriptions, pricing, testimonials, and FAQ in `index.html`.
- Update meta tags for SEO.

### Functionality
- The booking form is easily adaptable for backend integration.
- Look for the `submitBooking(data)` function comment in `script.js` for future API integration.

## Testing Checklist

### Form Validation
1. Submit form with empty required fields → Should show error messages.
2. Enter invalid phone number → Should show validation error.
3. Enter invalid email → Should show validation error.
4. Don't select any services → Should show error.
5. Don't check consent → Should show error.

### WhatsApp Integration
1. Fill form correctly and submit.
2. Click "Book Slot" in summary modal.
3. WhatsApp should open with pre-filled message containing all booking details.
4. If WhatsApp is blocked, should fallback to email.

### Gallery
1. Click on gallery images → Lightbox should open.
2. Click outside or close button → Lightbox should close.

### Responsiveness
1. Test on mobile, tablet, and desktop viewports.
2. Navigation should become hamburger menu on mobile.
3. All sections should be readable and functional.

### Accessibility
1. Tab through all interactive elements.
2. Use screen reader to navigate.
3. Check color contrast.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used, with fallbacks where necessary
- Mobile browsers supported

## Performance Notes

- Images are lazy-loaded.
- Critical font is preloaded.
- Minimal external dependencies.
- CSS uses efficient selectors.

## Future Enhancements

- Backend integration for booking system
- Dynamic time slot availability
- Payment integration
- Admin dashboard for managing bookings
- Multi-language support

## License

This project is provided as-is for educational and commercial use. Modify and distribute as needed.

## Support

For questions or issues, please check the code comments or contact the developer.
