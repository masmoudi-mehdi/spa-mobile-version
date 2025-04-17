/**
 * spa-mobile - Performance Loader
 * Optimisations de chargement pour les appareils mobiles
 */

// Exécuter immédiatement pour optimiser le chargement initial
(function() {
    // Détecter la connexion réseau
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let connectionType = 'unknown';
    let connectionSpeed = 'high';
    
    if (connection) {
        connectionType = connection.effectiveType || connection.type || 'unknown';
        
        // Déterminer la vitesse de connexion
        if (connectionType === '2g' || connectionType === 'slow-2g') {
            connectionSpeed = 'low';
        } else if (connectionType === '3g') {
            connectionSpeed = 'medium';
        }
        
        // Écouter les changements de connexion
        connection.addEventListener('change', function() {
            connectionType = connection.effectiveType || connection.type || 'unknown';
            
            if (connectionType === '2g' || connectionType === 'slow-2g') {
                connectionSpeed = 'low';
            } else if (connectionType === '3g') {
                connectionSpeed = 'medium';
            } else {
                connectionSpeed = 'high';
            }
            
            // Appliquer les optimisations en fonction de la nouvelle connexion
            applyConnectionOptimizations();
        });
    }
    
    // Détecter les appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Ajouter des classes au body pour les optimisations CSS
    document.body.classList.add('connection-' + connectionSpeed);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Appliquer les optimisations en fonction de la connexion
    function applyConnectionOptimizations() {
        // Mettre à jour les classes du body
        document.body.classList.remove('connection-low', 'connection-medium', 'connection-high');
        document.body.classList.add('connection-' + connectionSpeed);
        
        // Optimiser les images en fonction de la connexion
        if (connectionSpeed === 'low') {
            // Charger des images de qualité inférieure pour les connexions lentes
            document.querySelectorAll('img:not([data-src-loaded])').forEach(img => {
                if (img.src && !img.dataset.srcLoaded) {
                    // Sauvegarder l'URL originale
                    img.dataset.srcOriginal = img.src;
                    
                    // Remplacer par une version de qualité inférieure
                    if (img.src.includes('&q=')) {
                        img.src = img.src.replace(/&q=\d+/, '&q=50');
                    } else if (img.src.includes('?')) {
                        img.src = img.src + '&q=50';
                    } else {
                        img.src = img.src + '?q=50';
                    }
                    
                    img.dataset.srcLoaded = 'true';
                }
            });
            
            // Désactiver les animations complexes
            document.body.classList.add('reduce-animations');
        } else {
            // Restaurer les images originales pour les connexions plus rapides
            document.querySelectorAll('img[data-src-original]').forEach(img => {
                if (connectionSpeed === 'high' && img.dataset.srcOriginal) {
                    img.src = img.dataset.srcOriginal;
                    delete img.dataset.srcOriginal;
                    delete img.dataset.srcLoaded;
                }
            });
            
            // Réactiver les animations
            document.body.classList.remove('reduce-animations');
        }
    }
    
    // Appliquer les optimisations initiales
    applyConnectionOptimizations();
    
    // Optimiser le chargement des ressources
    document.addEventListener('DOMContentLoaded', function() {
        // Charger les polices de manière optimisée
        if ('fonts' in document) {
            // Charger les polices avec une priorité appropriée
            Promise.all([
                document.fonts.load('1em Montserrat'),
                document.fonts.load('1em "Open Sans"')
            ]).then(() => {
                document.body.classList.add('fonts-loaded');
            }).catch(() => {
                // En cas d'échec, utiliser les polices de secours
                document.body.classList.add('fonts-fallback');
            });
        }
        
        // Charger les scripts non essentiels de manière différée
        if (connectionSpeed !== 'low') {
            // Charger les scripts supplémentaires uniquement pour les connexions moyennes et rapides
            loadNonEssentialScripts();
        }
        
        // Précharger les pages liées
        if (connectionSpeed === 'high') {
            // Précharger les pages uniquement pour les connexions rapides
            prefetchLinkedPages();
        }
    });
    
    // Charger les scripts non essentiels
    function loadNonEssentialScripts() {
        // Liste des scripts non essentiels à charger
        const nonEssentialScripts = [
            // Ajouter ici les scripts non essentiels
        ];
        
        nonEssentialScripts.forEach(scriptSrc => {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            document.body.appendChild(script);
        });
    }
    
    // Précharger les pages liées
    function prefetchLinkedPages() {
        // Précharger uniquement les pages importantes
        const importantLinks = document.querySelectorAll('a[href^="#"]');
        
        importantLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                const linkElement = document.createElement('link');
                linkElement.rel = 'prefetch';
                linkElement.href = href;
                document.head.appendChild(linkElement);
            }
        });
    }
})();
