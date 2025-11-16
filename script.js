// Constants
const OWNER_WHATSAPP = "919023919924"; // WhatsApp number for customer redirection

// DOM Elements
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
const bookingForm = document.getElementById('bookingForm');
const summaryModal = document.getElementById('summaryModal');
const summaryContent = document.getElementById('summaryContent');
const editBtn = document.getElementById('editBtn');
const confirmBtn = document.getElementById('confirmBtn');
const galleryImages = document.querySelectorAll('.gallery__grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxClose = document.querySelector('.lightbox__close');
// const testimonials = document.querySelectorAll('.testimonial');
// const prevBtn = document.querySelector('.carousel-btn.prev');
// const nextBtn = document.querySelector('.carousel-btn.next');

// Navigation toggle for mobile
navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('nav--active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile nav if open
            navList.classList.remove('nav--active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Form validation
function validateForm(formData) {
    const errors = [];

    // Required fields
    const requiredFields = ['fullName', 'address', 'carMake', 'carModel', 'carYear'];
    requiredFields.forEach(field => {
        if (!formData.get(field).trim()) {
            errors.push(`${field} is required`);
        }
    });

    // Services selection
    const services = formData.get('services');
    if (!services) {
        errors.push('Please select a service');
    }

    // Consent checkbox
    if (!formData.get('consent')) {
        errors.push('Please agree to be contacted via WhatsApp/call');
    }

    return errors;
}

// Generate booking summary
function generateSummary(formData) {
    const services = formData.getAll('services').join(', ');
    const summary = `
        <p><strong>Name:</strong> ${formData.get('fullName')}</p>
        <p><strong>Address:</strong> ${formData.get('address')}</p>
        <p><strong>Car:</strong> ${formData.get('carMake')} ${formData.get('carModel')} (${formData.get('carYear')})</p>
        <p><strong>Services:</strong> ${services}</p>
    `;
    return summary;
}

// Encode message for WhatsApp
function encodeMessage(summary) {
    const message = `Comrades CarSpa Booking Request:\n\n${summary.replace(/<[^>]*>/g, '')}`;
    return encodeURIComponent(message);
}

// Submit booking form
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);

    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert('Please correct the following errors:\n' + errors.join('\n'));
        return;
    }

    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Simulate processing delay for better UX
    setTimeout(() => {
        // Generate and show summary
        const summary = generateSummary(formData);
        summaryContent.innerHTML = summary;
        summaryModal.classList.add('modal--active');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
});

// Edit button in modal
editBtn.addEventListener('click', () => {
    summaryModal.classList.remove('modal--active');
});

// Confirm booking
confirmBtn.addEventListener('click', () => {
    const formData = new FormData(bookingForm);
    const summary = generateSummary(formData);
    const encodedMessage = encodeMessage(summary);

    // Store in localStorage
    const bookingData = {
        summary: summary,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastBooking', JSON.stringify(bookingData));

    // Try WhatsApp first
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank');

    // Fallback to mailto if WhatsApp fails
    setTimeout(() => {
        if (!whatsappWindow || whatsappWindow.closed) {
            const mailtoUrl = `mailto:info@comradescarspa.com?subject=Comrades%20CarSpa%20Booking%20Request&body=${encodedMessage}`;
            window.location.href = mailtoUrl;
        }
    }, 1000);

    // Close modal and show confirmation
    summaryModal.classList.remove('modal--active');
    alert('Message sent to WhatsApp — we\'ll confirm your slot soon.');
});

// Gallery lightbox
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('lightbox--active');
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('lightbox--active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('lightbox--active');
    }
});

// Testimonials carousel - commented out since testimonials section is removed
// let currentTestimonial = 0;

// function showTestimonial(index) {
//     testimonials.forEach((testimonial, i) => {
//         testimonial.classList.toggle('active', i === index);
//     });
// }

// function nextTestimonial() {
//     currentTestimonial = (currentTestimonial + 1) % testimonials.length;
//     showTestimonial(currentTestimonial);
// }

// function prevTestimonial() {
//     currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
//     showTestimonial(currentTestimonial);
// }

// prevBtn.addEventListener('click', prevTestimonial);
// nextBtn.addEventListener('click', nextTestimonial);

// Auto-rotate testimonials
// setInterval(nextTestimonial, 5000);

// Lazy loading for gallery images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

galleryImages.forEach(img => {
    imageObserver.observe(img);
});

// Form field enhancements
// Set minimum date for date picker
const today = new Date().toISOString().split('T')[0];
document.getElementById('preferredDate').setAttribute('min', today);

// Phone number formatting (basic)
document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('91') && value.length > 10) {
        value = value.slice(2);
    }
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('lightbox--active');
        summaryModal.classList.remove('modal--active');
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Event tracking for Google Analytics
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track form interactions
bookingForm.addEventListener('submit', () => {
    trackEvent('form_submit', {
        event_category: 'engagement',
        event_label: 'booking_form'
    });
});

// Track gallery interactions
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        trackEvent('gallery_view', {
            event_category: 'engagement',
            event_label: `image_${index + 1}`
        });
    });
});

// Track WhatsApp booking confirmations
confirmBtn.addEventListener('click', () => {
    trackEvent('booking_confirmed', {
        event_category: 'conversion',
        event_label: 'whatsapp_booking'
    });
});

// Track navigation clicks
document.querySelectorAll('.nav__list a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            trackEvent('navigation_click', {
                event_category: 'navigation',
                event_label: href.substring(1)
            });
        }
    });
});

// Performance: Preload critical resources
// This would be handled by the server in production, but for demo purposes:
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.href = 'brand-font.woff2';
preloadLink.as = 'font';
preloadLink.type = 'font/woff2';
preloadLink.crossOrigin = 'anonymous';
document.head.appendChild(preloadLink);
