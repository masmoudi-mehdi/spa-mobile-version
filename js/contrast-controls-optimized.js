/**
 * spa-mobile - Contrast Controls (Optimized)
 * Contrôles d'ajustement du contraste pour une meilleure accessibilité
 */

document.addEventListener('DOMContentLoaded', function() {
    // Créer et insérer les éléments HTML pour les contrôles de contraste
    createContrastControls();
    
    // Appliquer les préférences de contraste sauvegardées
    applyContrastPreferences();
    
    /**
     * Crée les contrôles d'ajustement du contraste
     */
    function createContrastControls() {
        // Créer le HTML pour les contrôles de contraste
        const contrastControlsHTML = `
            <div class="contrast-controls">
                <div class="contrast-menu">
                    <button class="contrast-option" data-contrast="normal">
                        <i class="fas fa-circle"></i> Normal
                    </button>
                    <button class="contrast-option" data-contrast="high-contrast">
                        <i class="fas fa-adjust"></i> Contraste élevé
                    </button>
                    <button class="contrast-option" data-contrast="very-high-contrast">
                        <i class="fas fa-circle-half-stroke"></i> Contraste très élevé
                    </button>
                </div>
                <button class="contrast-button" aria-label="Ajuster le contraste">
                    <i class="fas fa-adjust"></i>
                </button>
            </div>
        `;
        
        // Insérer les contrôles dans le body
        document.body.insertAdjacentHTML('beforeend', contrastControlsHTML);
        
        // Récupérer les éléments
        const contrastControls = document.querySelector('.contrast-controls');
        const contrastButton = document.querySelector('.contrast-button');
        const contrastMenu = document.querySelector('.contrast-menu');
        const contrastOptions = document.querySelectorAll('.contrast-option');
        
        // Ajouter l'événement de clic au bouton principal
        contrastButton.addEventListener('click', function() {
            // Toggle la classe active pour afficher/masquer le menu
            contrastMenu.classList.toggle('active');
            
            // Ajouter un retour haptique si disponible
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        });
        
        // Ajouter les événements de clic aux options
        contrastOptions.forEach(option => {
            option.addEventListener('click', function() {
                const contrast = this.getAttribute('data-contrast');
                setContrast(contrast);
                contrastMenu.classList.remove('active');
                
                // Ajouter un retour haptique si disponible
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(50);
                }
            });
        });
        
        // Fermer le menu lorsque l'utilisateur clique en dehors
        document.addEventListener('click', function(event) {
            if (!contrastControls.contains(event.target)) {
                contrastMenu.classList.remove('active');
            }
        });
        
        // Ajouter des attributs ARIA pour l'accessibilité
        contrastControls.setAttribute('role', 'region');
        contrastControls.setAttribute('aria-label', 'Contrôles de contraste');
        contrastMenu.setAttribute('role', 'menu');
        contrastMenu.setAttribute('aria-hidden', 'true');
        
        contrastOptions.forEach(option => {
            option.setAttribute('role', 'menuitem');
        });
        
        // Ajouter des événements pour l'accessibilité au clavier
        contrastButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        contrastOptions.forEach(option => {
            option.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    /**
     * Applique les préférences de contraste sauvegardées
     */
    function applyContrastPreferences() {
        const savedContrast = localStorage.getItem('contrast-preference');
        
        if (savedContrast) {
            setContrast(savedContrast);
        }
    }
    
    /**
     * Définit le niveau de contraste
     * @param {string} contrast - Le niveau de contraste à appliquer
     */
    function setContrast(contrast) {
        // Supprimer les classes de contraste existantes
        document.body.classList.remove('normal-contrast', 'high-contrast', 'very-high-contrast');
        
        // Ajouter la classe de contraste appropriée
        document.body.classList.add(contrast);
        
        // Mettre à jour l'apparence du bouton sélectionné
        document.querySelectorAll('.contrast-option').forEach(option => {
            if (option.getAttribute('data-contrast') === contrast) {
                option.classList.add('selected');
                option.setAttribute('aria-selected', 'true');
            } else {
                option.classList.remove('selected');
                option.setAttribute('aria-selected', 'false');
            }
        });
        
        // Mettre à jour l'attribut aria-hidden du menu
        const contrastMenu = document.querySelector('.contrast-menu');
        if (contrastMenu) {
            contrastMenu.setAttribute('aria-hidden', contrastMenu.classList.contains('active') ? 'false' : 'true');
        }
        
        // Sauvegarder la préférence
        localStorage.setItem('contrast-preference', contrast);
        
        // Appliquer les styles spécifiques en fonction du niveau de contraste
        applyContrastStyles(contrast);
    }
    
    /**
     * Applique les styles spécifiques en fonction du niveau de contraste
     * @param {string} contrast - Le niveau de contraste à appliquer
     */
    function applyContrastStyles(contrast) {
        // Supprimer la feuille de style de contraste existante
        const existingStyle = document.getElementById('dynamic-contrast-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Si le contraste est normal, ne rien faire de plus
        if (contrast === 'normal') {
            return;
        }
        
        // Créer une nouvelle feuille de style
        const styleElement = document.createElement('style');
        styleElement.id = 'dynamic-contrast-styles';
        
        // Définir les styles en fonction du niveau de contraste
        let styles = '';
        
        if (contrast === 'high-contrast') {
            styles = `
                body {
                    color: #000000 !important;
                }
                
                h1, h2, h3, h4, h5, h6 {
                    color: #004d6d !important;
                }
                
                a {
                    color: #004d6d !important;
                    text-decoration: underline !important;
                }
                
                .btn, .btn-oxygen, .btn-primary, .btn-outline {
                    background-color: #004d6d !important;
                    color: #ffffff !important;
                    border: 2px solid #000000 !important;
                }
                
                .hero-content {
                    background-color: rgba(0, 0, 0, 0.7) !important;
                }
                
                .hero h1, .hero p, .hero-feature {
                    color: #ffffff !important;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7) !important;
                }
                
                .oxygen-benefit, .benefit-card, .testimonial-card {
                    border: 2px solid #000000 !important;
                    background-color: #ffffff !important;
                }
                
                .oxygen-benefit-icon, .benefit-icon, .concept-feature-icon {
                    color: #004d6d !important;
                }
                
                footer {
                    background-color: #111111 !important;
                }
                
                .footer-col ul li a, .copyright {
                    color: #ffffff !important;
                }
            `;
        } else if (contrast === 'very-high-contrast') {
            styles = `
                body {
                    color: #000000 !important;
                    background-color: #ffffff !important;
                }
                
                h1, h2, h3, h4, h5, h6 {
                    color: #000000 !important;
                }
                
                a {
                    color: #000000 !important;
                    text-decoration: underline !important;
                    font-weight: bold !important;
                }
                
                .btn, .btn-oxygen, .btn-primary, .btn-outline {
                    background-color: #000000 !important;
                    color: #ffffff !important;
                    border: 3px solid #ffffff !important;
                    outline: 1px solid #000000 !important;
                }
                
                .hero-overlay {
                    background: rgba(0, 0, 0, 0.8) !important;
                }
                
                .hero-content {
                    background-color: #000000 !important;
                    border: 3px solid #ffffff !important;
                }
                
                .hero h1, .hero p, .hero-feature {
                    color: #ffffff !important;
                    text-shadow: none !important;
                }
                
                .hero-feature i {
                    color: #ffffff !important;
                }
                
                .oxygen-therapy-section, .section-light, .section-dark, .section-accent {
                    background: #ffffff !important;
                }
                
                .oxygen-benefit, .benefit-card, .testimonial-card {
                    border: 3px solid #000000 !important;
                    background-color: #ffffff !important;
                    box-shadow: none !important;
                }
                
                .oxygen-benefit-icon, .benefit-icon, .concept-feature-icon {
                    color: #000000 !important;
                    background-color: #ffffff !important;
                    border: 2px solid #000000 !important;
                }
                
                .oxygen-badge {
                    background: #000000 !important;
                    color: #ffffff !important;
                    border: 2px solid #ffffff !important;
                }
                
                footer {
                    background-color: #000000 !important;
                    border-top: 3px solid #ffffff !important;
                }
                
                .footer-col h3, .footer-col ul li a, .copyright {
                    color: #ffffff !important;
                }
                
                .social-links a {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                    border: 2px solid #000000 !important;
                }
                
                header {
                    background-color: #ffffff !important;
                    border-bottom: 3px solid #000000 !important;
                }
                
                .logo, .logo span {
                    color: #000000 !important;
                }
                
                nav ul li a {
                    color: #000000 !important;
                }
                
                .mobile-toggle span {
                    background-color: #000000 !important;
                }
            `;
        }
        
        // Ajouter les styles au document
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
});
