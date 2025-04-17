/**
 * spa-mobile - Android Scroll Fix
 * Script pour corriger les problèmes de défilement sur Android
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détecter Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
        console.log('Android détecté, application des correctifs de défilement');
        
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
