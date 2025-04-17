/**
 * spa-mobile - Footer Mobile Fix
 * Correction urgente pour le footer en version mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Désactiver le comportement d'accordéon qui cause des problèmes
    disableFooterAccordion();
    
    // Améliorer l'accessibilité des liens du footer
    enhanceFooterAccessibility();
    
    /**
     * Désactive le comportement d'accordéon du footer
     */
    function disableFooterAccordion() {
        // Récupérer tous les titres du footer
        const footerTitles = document.querySelectorAll('.footer-col h3');
        
        // Supprimer les gestionnaires d'événements des titres
        footerTitles.forEach(title => {
            // Cloner le titre pour supprimer tous les gestionnaires d'événements
            const newTitle = title.cloneNode(true);
            title.parentNode.replaceChild(newTitle, title);
            
            // Supprimer les classes et attributs liés à l'accordéon
            newTitle.classList.remove('active');
            newTitle.removeAttribute('style');
        });
        
        // Récupérer tous les contenus du footer
        const footerContents = document.querySelectorAll('.footer-col .footer-content');
        
        // S'assurer que tous les contenus sont visibles
        footerContents.forEach(content => {
            // Supprimer les classes et attributs liés à l'accordéon
            content.classList.remove('active');
            content.style.maxHeight = 'none';
            content.style.overflow = 'visible';
            content.style.display = 'block';
            content.style.opacity = '1';
            content.style.visibility = 'visible';
        });
    }
    
    /**
     * Améliore l'accessibilité des liens du footer
     */
    function enhanceFooterAccessibility() {
        // Récupérer tous les liens du footer
        const footerLinks = document.querySelectorAll('.footer-col a');
        
        // Ajouter des attributs ARIA pour l'accessibilité
        footerLinks.forEach(link => {
            link.setAttribute('role', 'link');
            
            // Ajouter un gestionnaire d'événements pour le retour haptique
            link.addEventListener('click', function() {
                // Ajouter un retour haptique si disponible
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(30);
                }
            });
        });
        
        // Améliorer l'accessibilité du formulaire de newsletter
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            
            if (emailInput) {
                // Ajouter des attributs ARIA pour l'accessibilité
                emailInput.setAttribute('aria-label', 'Votre adresse email');
                emailInput.setAttribute('aria-required', 'true');
            }
            
            if (submitButton) {
                // Ajouter des attributs ARIA pour l'accessibilité
                submitButton.setAttribute('aria-label', 'S\'abonner à la newsletter');
            }
        }
    }
});
