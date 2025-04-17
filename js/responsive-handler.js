/**
 * spa-mobile - Responsive Handler
 * Gestion avancée de la responsivité pour tous les types d'écrans
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détection des tailles d'écran
    const screenSizes = {
        xs: window.matchMedia('(max-width: 375px)'),
        sm: window.matchMedia('(min-width: 376px) and (max-width: 576px)'),
        md: window.matchMedia('(min-width: 577px) and (max-width: 767px)'),
        lg: window.matchMedia('(min-width: 768px) and (max-width: 991px)'),
        xl: window.matchMedia('(min-width: 992px) and (max-width: 1199px)'),
        xxl: window.matchMedia('(min-width: 1200px)')
    };
    
    // Détection de l'orientation
    const orientation = {
        portrait: window.matchMedia('(orientation: portrait)'),
        landscape: window.matchMedia('(orientation: landscape)')
    };
    
    // Fonction pour appliquer les classes appropriées au body
    function applyScreenClasses() {
        // Supprimer toutes les classes de taille d'écran
        document.body.classList.remove('screen-xs', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl', 'screen-xxl');
        
        // Ajouter la classe correspondant à la taille d'écran actuelle
        if (screenSizes.xs.matches) document.body.classList.add('screen-xs');
        if (screenSizes.sm.matches) document.body.classList.add('screen-sm');
        if (screenSizes.md.matches) document.body.classList.add('screen-md');
        if (screenSizes.lg.matches) document.body.classList.add('screen-lg');
        if (screenSizes.xl.matches) document.body.classList.add('screen-xl');
        if (screenSizes.xxl.matches) document.body.classList.add('screen-xxl');
        
        // Ajouter la classe d'orientation
        document.body.classList.remove('orientation-portrait', 'orientation-landscape');
        if (orientation.portrait.matches) document.body.classList.add('orientation-portrait');
        if (orientation.landscape.matches) document.body.classList.add('orientation-landscape');
        
        // Détecter les appareils à ratio d'aspect inhabituel (téléphones pliables, etc.)
        const aspectRatio = window.innerWidth / window.innerHeight;
        document.body.classList.remove('unusual-aspect-ratio');
        if (aspectRatio < 0.5 || aspectRatio > 2.1) {
            document.body.classList.add('unusual-aspect-ratio');
        }
        
        // Détecter les écrans à haute densité de pixels
        document.body.classList.remove('high-dpi');
        if (window.devicePixelRatio > 2) {
            document.body.classList.add('high-dpi');
        }
    }
    
    // Appliquer les classes au chargement
    applyScreenClasses();
    
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', function() {
        // Utiliser un délai pour éviter trop d'appels lors du redimensionnement
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(function() {
            applyScreenClasses();
            
            // Ajuster les éléments spécifiques en fonction de la taille d'écran
            adjustElementsForScreenSize();
        }, 250);
    });
    
    // Écouter les changements d'orientation
    window.addEventListener('orientationchange', function() {
        // Attendre que le navigateur ait mis à jour les dimensions
        setTimeout(function() {
            applyScreenClasses();
            adjustElementsForScreenSize();
        }, 300);
    });
    
    // Fonction pour ajuster des éléments spécifiques en fonction de la taille d'écran
    function adjustElementsForScreenSize() {
        // Ajuster la hauteur du menu mobile
        const nav = document.querySelector('nav');
        if (nav) {
            if (screenSizes.xs.matches) {
                nav.style.maxHeight = '80vh';
            } else if (screenSizes.sm.matches || screenSizes.md.matches) {
                nav.style.maxHeight = '75vh';
            } else {
                nav.style.maxHeight = '';
            }
        }
        
        // Ajuster la taille des images de la galerie pour les petits écrans
        const galleryItems = document.querySelectorAll('.gallery-item img');
        galleryItems.forEach(img => {
            if (screenSizes.xs.matches || screenSizes.sm.matches) {
                img.style.height = '200px';
            } else {
                img.style.height = '';
            }
        });
        
        // Ajuster les boutons pour les petits écrans
        const heroBtns = document.querySelectorAll('.hero-buttons .btn');
        if (screenSizes.xs.matches) {
            heroBtns.forEach(btn => {
                btn.style.width = '100%';
            });
        } else {
            heroBtns.forEach(btn => {
                btn.style.width = '';
            });
        }
        
        // Ajuster la disposition des caractéristiques pour les petits écrans
        const heroFeatures = document.querySelector('.hero-features');
        if (heroFeatures) {
            if (screenSizes.xs.matches || (screenSizes.sm.matches && orientation.portrait.matches)) {
                heroFeatures.style.flexDirection = 'column';
            } else {
                heroFeatures.style.flexDirection = '';
            }
        }
    }
    
    // Appliquer les ajustements au chargement
    adjustElementsForScreenSize();
});
