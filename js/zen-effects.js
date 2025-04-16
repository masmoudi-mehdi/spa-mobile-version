/**
 * spa-mobile - Effets Zen
 * Script pour ajouter des effets subtils renforçant l'ambiance zen
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter la classe pour activer les transitions
    setTimeout(function() {
        document.body.classList.add('zen-loaded');
    }, 300);

    // Effet de parallaxe doux sur défilement
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Effet parallaxe sur les formes organiques
        document.querySelectorAll('.organic-shape').forEach(function(shape, index) {
            const speed = 0.05 + (index * 0.02);
            const yPos = scrollPosition * speed;
            shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${yPos * 0.02}deg)`;
        });
        
        // Effet subtil sur les images de fond
        document.querySelectorAll('.hero-image img, .concept-image img, .about-image-main img').forEach(function(img) {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const scale = 1 + (scrollPercentage * 0.05);
                img.style.transform = `scale(${Math.min(scale, 1.05)})`;
            }
        });
    });

    // Effet de respiration sur les cartes de bienfaits
    const breatheEffect = function() {
        document.querySelectorAll('.benefit-icon, .about-value-icon, .concept-feature-icon').forEach(function(icon, index) {
            setTimeout(function() {
                icon.classList.add('breathe');
                setTimeout(function() {
                    icon.classList.remove('breathe');
                }, 2000);
            }, index * 300);
        });
    };

    // Lancer l'effet de respiration périodiquement
    setInterval(breatheEffect, 8000);
    breatheEffect(); // Lancer immédiatement une première fois

    // Ajouter des ondulations d'eau sur les sections zen
    const addRippleEffect = function(event) {
        if (!event.target.classList.contains('zen-ripple-area')) return;
        
        const ripple = document.createElement('div');
        ripple.classList.add('zen-ripple');
        
        const rect = event.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - (size / 2)}px`;
        ripple.style.top = `${event.clientY - rect.top - (size / 2)}px`;
        
        event.target.appendChild(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 1000);
    };

    // Ajouter l'effet d'ondulation aux sections appropriées
    document.querySelectorAll('.section-light, .section-accent').forEach(function(section) {
        section.classList.add('zen-ripple-area');
        section.addEventListener('click', addRippleEffect);
    });

    // Ajouter un effet de flottement aux images
    const floatElements = document.querySelectorAll('.benefit-card, .about-value-card, .gallery-item');
    
    floatElements.forEach(function(element) {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
        element.classList.add('zen-float');
    });

    // Ajouter des styles CSS pour les nouveaux effets
    const zenStyles = document.createElement('style');
    zenStyles.textContent = `
        .zen-loaded * {
            transition-duration: 0.6s;
        }
        
        .zen-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: zen-ripple 1s ease-out;
            pointer-events: none;
            z-index: 0;
        }
        
        @keyframes zen-ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .zen-float {
            animation: zen-float-effect ease-in-out infinite alternate;
        }
        
        @keyframes zen-float-effect {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(-8px);
            }
        }
        
        .breathe {
            animation: zen-breathe 2s ease-in-out;
        }
        
        @keyframes zen-breathe {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .zen-theme .hero-content {
            backdrop-filter: blur(8px);
            transition: backdrop-filter 1s ease;
        }
        
        .zen-theme .hero-content:hover {
            backdrop-filter: blur(5px);
        }
    `;
    document.head.appendChild(zenStyles);
});
