/**
 * spa-mobile - Footer Mobile
 * Script pour améliorer l'expérience du footer sur mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'appareil est mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Ajouter la classe footer-mobile au footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.classList.add('footer-mobile');
        }
        
        // Envelopper le contenu de chaque colonne du footer dans un div
        const footerCols = document.querySelectorAll('.footer-col');
        footerCols.forEach(col => {
            // Récupérer le titre h3
            const title = col.querySelector('h3');
            
            // Récupérer tous les éléments après le titre
            let content = document.createElement('div');
            content.className = 'footer-content';
            
            // Déplacer tous les éléments après le titre dans le div content
            let nextElement = title.nextElementSibling;
            while (nextElement) {
                const temp = nextElement.nextElementSibling;
                content.appendChild(nextElement);
                nextElement = temp;
            }
            
            // Ajouter le div content après le titre
            title.after(content);
            
            // Ajouter un gestionnaire d'événements au titre
            title.addEventListener('click', function() {
                // Toggle la classe active sur le titre
                this.classList.toggle('active');
                
                // Toggle la classe active sur le contenu
                content.classList.toggle('active');
                
                // Ajouter un retour haptique si disponible
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(50);
                }
            });
        });
        
        // Ouvrir la première section par défaut
        if (footerCols.length > 0) {
            const firstTitle = footerCols[0].querySelector('h3');
            const firstContent = footerCols[0].querySelector('.footer-content');
            
            if (firstTitle && firstContent) {
                firstTitle.classList.add('active');
                firstContent.classList.add('active');
            }
        }
    }
    
    // Améliorer l'accessibilité des liens du footer
    const footerLinks = document.querySelectorAll('.footer-col a');
    footerLinks.forEach(link => {
        // Ajouter des attributs ARIA pour l'accessibilité
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
            
            // Ajouter un gestionnaire d'événements pour le focus
            emailInput.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            emailInput.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        }
        
        if (submitButton) {
            // Ajouter des attributs ARIA pour l'accessibilité
            submitButton.setAttribute('aria-label', 'S\'abonner à la newsletter');
        }
        
        // Ajouter un gestionnaire d'événements pour le formulaire
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const emailValue = emailInput.value.trim();
            
            if (emailValue) {
                // Afficher un message de succès
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.textContent = 'Merci de vous être abonné à notre newsletter !';
                
                // Remplacer le formulaire par le message de succès
                this.style.display = 'none';
                this.parentElement.appendChild(successMessage);
                
                // Ajouter un retour haptique si disponible
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate([50, 100, 50]);
                }
            }
        });
    }
});
