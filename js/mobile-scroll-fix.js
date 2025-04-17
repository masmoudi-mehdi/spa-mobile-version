/**
 * spa-mobile - Mobile Scroll Fix
 * Script pour corriger les problèmes de défilement sur iOS et Android
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détecter la plateforme
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    console.log('Détection de plateforme mobile:', isIOS ? 'iOS' : isAndroid ? 'Android' : 'Autre');
    
    // Appliquer les correctifs communs
    applyCommonScrollFixes();
    
    // Appliquer les correctifs spécifiques à la plateforme
    if (isIOS) {
        applyIOSScrollFixes();
    } else if (isAndroid) {
        applyAndroidScrollFixes();
    }
    
    /**
     * Applique les correctifs de défilement communs à toutes les plateformes
     */
    function applyCommonScrollFixes() {
        // Corriger les problèmes de défilement avec les sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.position = 'relative';
        });
        
        // Corriger les problèmes de défilement avec les conteneurs
        const containers = document.querySelectorAll('.container, .section-container');
        containers.forEach(container => {
            container.style.overflow = 'visible';
        });
        
        // Corriger les problèmes avec les éléments tactiles
        const touchElements = document.querySelectorAll('[data-haptic="true"], .btn, a, button');
        touchElements.forEach(element => {
            element.style.touchAction = 'manipulation';
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
    }
    
    /**
     * Applique les correctifs de défilement spécifiques à iOS
     */
    function applyIOSScrollFixes() {
        console.log('Application des correctifs de défilement pour iOS');
        
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
        
        // Corriger les problèmes de défilement avec les éléments fixed
        const fixedElements = document.querySelectorAll('header, .fixed-element, .contrast-controls, .swipe-indicator');
        fixedElements.forEach(element => {
            element.style.webkitTransform = 'translateZ(0)';
            element.style.transform = 'translateZ(0)';
            element.style.willChange = 'transform';
        });
        
        // Corriger les problèmes de défilement avec les sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.webkitOverflowScrolling = 'touch';
            section.style.overflow = 'visible';
        });
        
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
    
    /**
     * Applique les correctifs de défilement spécifiques à Android
     */
    function applyAndroidScrollFixes() {
        console.log('Application des correctifs de défilement pour Android');
        
        // Ajouter une classe au body pour les styles spécifiques à Android
        document.body.classList.add('android-device');
        
        // Supprimer les styles qui peuvent bloquer le défilement
        document.documentElement.style.overflow = 'visible';
        document.documentElement.style.height = 'auto';
        document.body.style.overflow = 'visible';
        document.body.style.height = 'auto';
        document.body.style.position = 'static';
        
        // Corriger les problèmes de défilement avec les sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.overflow = 'visible';
            section.style.height = 'auto';
            section.style.position = 'relative';
        });
        
        // Corriger les problèmes de défilement avec les conteneurs
        const containers = document.querySelectorAll('.container, .section-container, .footer-container, .footer-content');
        containers.forEach(container => {
            container.style.overflow = 'visible';
        });
        
        // Corriger les problèmes avec les éléments fixed
        const fixedElements = document.querySelectorAll('header, .fixed-element, .contrast-controls');
        fixedElements.forEach(element => {
            element.style.willChange = 'auto';
            element.style.transform = 'none';
        });
        
        // Corriger les problèmes avec les éléments tactiles
        const touchElements = document.querySelectorAll('[data-haptic="true"], .btn, a, button');
        touchElements.forEach(element => {
            element.style.touchAction = 'auto';
        });
        
        // Désactiver certains gestionnaires d'événements qui peuvent interférer avec le défilement
        window.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        }, { passive: true });
        
        // Corriger les problèmes avec le footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.overflow = 'visible';
            footer.style.position = 'relative';
        }
        
        // Corriger les problèmes avec les éléments qui utilisent will-change
        const willChangeElements = document.querySelectorAll('[style*="will-change"]');
        willChangeElements.forEach(element => {
            element.style.willChange = 'auto';
        });
        
        // Corriger les problèmes avec les éléments qui utilisent transform
        const transformElements = document.querySelectorAll('[style*="transform"]');
        transformElements.forEach(element => {
            if (element.style.transform && element.style.transform !== 'none' && !element.classList.contains('mobile-toggle')) {
                element.style.transform = 'none';
            }
        });
        
        // Désactiver les gestionnaires de défilement personnalisés qui peuvent interférer
        if (window.swipeNavigation) {
            // Modifier le comportement de la navigation par balayage pour Android
            window.swipeNavigation.enabled = false;
        }
        
        // Forcer un rafraîchissement du défilement
        setTimeout(function() {
            window.scrollTo(0, 1);
            window.scrollTo(0, 0);
        }, 100);
    }
});
