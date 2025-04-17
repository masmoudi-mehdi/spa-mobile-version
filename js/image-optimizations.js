/**
 * spa-mobile - Image Optimizations
 * Optimisations d'images pour les appareils mobiles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Target all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    
    // Optimize background images for mobile
    if (isMobile) {
        // Find elements with background images
        const elementsWithBgImages = document.querySelectorAll('[data-mobile-bg]');
        
        elementsWithBgImages.forEach(element => {
            const mobileBg = element.getAttribute('data-mobile-bg');
            if (mobileBg) {
                element.style.backgroundImage = `url(${mobileBg})`;
            }
        });
    }
    
    // Add loading="lazy" to images that don't have it
    document.querySelectorAll('img:not([loading])').forEach(img => {
        // Skip hero image which should load eagerly
        if (!img.closest('.hero-image')) {
            img.setAttribute('loading', 'lazy');
        }
    });
    
    // Add srcset to images that don't have it but have a data-srcset attribute
    document.querySelectorAll('img[data-srcset]:not([srcset])').forEach(img => {
        img.setAttribute('srcset', img.getAttribute('data-srcset'));
    });
});
