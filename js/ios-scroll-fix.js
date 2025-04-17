/**
 * spa-mobile - iOS Scroll Fix
 * Corrections pour les problèmes de défilement sur iOS
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détecter iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
        console.log('iOS détecté, application des correctifs de défilement');
        
        // Ajouter une classe au body pour les styles spécifiques à iOS
        document.body.classList.add('ios-device');
        
        // Corriger le problème de hauteur du viewport sur iOS
        function fixIOSViewportHeight() {
            // Définir la hauteur du viewport à la hauteur de la fenêtre
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }
        
        // Appliquer la correction au chargement et au redimensionnement
        fixIOSViewportHeight();
        window.addEventListener('resize', fixIOSViewportHeight);
        window.addEventListener('orientationchange', fixIOSViewportHeight);
        
        // Corriger les problèmes de défilement sur les éléments avec des gestionnaires d'événements tactiles
        const touchElements = document.querySelectorAll('[data-haptic="true"], .btn, .btn-oxygen, .btn-primary, .btn-outline, a, button');
        touchElements.forEach(element => {
            element.style.touchAction = 'manipulation';
        });
        
        // Corriger les problèmes de défilement avec les éléments fixed
        const fixedElements = document.querySelectorAll('header, .fixed-element, .contrast-controls, .swipe-indicator');
        fixedElements.forEach(element => {
            element.style.webkitTransform = 'translateZ(0)';
            element.style.transform = 'translateZ(0)';
        });
        
        // Corriger les problèmes de défilement avec les sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.webkitOverflowScrolling = 'touch';
            section.style.overflow = 'visible';
        });
        
        // Corriger les problèmes de défilement avec les conteneurs
        const containers = document.querySelectorAll('.container, .section-container');
        containers.forEach(container => {
            container.style.overflow = 'visible';
        });
        
        // Désactiver temporairement les animations pendant le défilement pour améliorer les performances
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!document.body.classList.contains('is-scrolling')) {
                document.body.classList.add('is-scrolling');
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                document.body.classList.remove('is-scrolling');
            }, 100);
        }, { passive: true });
        
        // Corriger les problèmes de défilement avec les gestionnaires d'événements tactiles
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function(e) {
            // Permettre le défilement par défaut
            if (e.target.closest('.no-scroll')) {
                // Sauf pour les éléments avec la classe .no-scroll
                e.preventDefault();
            }
        }, { passive: false });
        
        // Corriger les problèmes de défilement avec les éléments avec height: 100vh
        const fullHeightElements = document.querySelectorAll('.full-height, .hero');
        fullHeightElements.forEach(element => {
            element.style.height = 'calc(var(--vh, 1vh) * 100)';
        });
        
        // Corriger les problèmes de défilement avec les gestionnaires de défilement personnalisés
        if (window.swipeNavigation) {
            // Modifier le comportement de la navigation par balayage pour iOS
            const originalNavigateToSection = window.swipeNavigation.navigateToSection;
            window.swipeNavigation.navigateToSection = function(index) {
                // Appeler la méthode originale
                originalNavigateToSection.call(window.swipeNavigation, index);
                
                // Forcer un petit délai pour s'assurer que le défilement fonctionne
                setTimeout(function() {
                    window.scrollBy(0, 1);
                    window.scrollBy(0, -1);
                }, 100);
            };
        }
        
        // Ajouter un gestionnaire de défilement factice pour forcer le défilement
        setInterval(function() {
            if (!document.body.classList.contains('is-scrolling')) {
                window.scrollBy(0, 0);
            }
        }, 1000);
    }
});
