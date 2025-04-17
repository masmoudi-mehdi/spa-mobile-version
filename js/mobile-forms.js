/**
 * spa-mobile - Mobile Forms Enhancements
 * Améliorations des formulaires pour les appareils mobiles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
        // Amélioration des formulaires
        enhanceForms();
    }
    
    /**
     * Améliore les formulaires sur les appareils mobiles
     */
    function enhanceForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Ajouter des attributs d'accessibilité
            form.setAttribute('novalidate', 'true');
            
            // Améliorer les champs de formulaire
            enhanceFormFields(form);
            
            // Ajouter une validation en temps réel
            addRealTimeValidation(form);
            
            // Améliorer la soumission du formulaire
            enhanceFormSubmission(form);
        });
    }
    
    /**
     * Améliore les champs de formulaire
     */
    function enhanceFormFields(form) {
        // Améliorer les champs de texte
        const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        
        textInputs.forEach(input => {
            // Ajouter des attributs d'accessibilité
            input.setAttribute('aria-required', input.hasAttribute('required') ? 'true' : 'false');
            
            // Ajouter des étiquettes si elles n'existent pas
            if (!input.labels || input.labels.length === 0) {
                const placeholder = input.getAttribute('placeholder');
                
                if (placeholder) {
                    const label = document.createElement('label');
                    label.textContent = placeholder;
                    label.setAttribute('for', input.id || '');
                    label.style.display = 'none'; // Masquer visuellement mais disponible pour les lecteurs d'écran
                    
                    input.parentNode.insertBefore(label, input);
                }
            }
            
            // Améliorer l'expérience de saisie
            input.addEventListener('focus', function() {
                this.style.backgroundColor = '#f8f9fa';
            });
            
            input.addEventListener('blur', function() {
                this.style.backgroundColor = '';
            });
            
            // Ajouter un bouton de suppression pour les champs de texte
            if (input.type !== 'textarea') {
                const clearButton = document.createElement('button');
                clearButton.type = 'button';
                clearButton.className = 'clear-input';
                clearButton.innerHTML = '&times;';
                clearButton.setAttribute('aria-label', 'Effacer le texte');
                clearButton.style.position = 'absolute';
                clearButton.style.right = '10px';
                clearButton.style.top = '50%';
                clearButton.style.transform = 'translateY(-50%)';
                clearButton.style.background = 'none';
                clearButton.style.border = 'none';
                clearButton.style.fontSize = '1.2rem';
                clearButton.style.color = '#999';
                clearButton.style.cursor = 'pointer';
                clearButton.style.display = 'none';
                
                input.parentNode.style.position = 'relative';
                input.parentNode.appendChild(clearButton);
                
                input.addEventListener('input', function() {
                    clearButton.style.display = this.value ? 'block' : 'none';
                });
                
                clearButton.addEventListener('click', function() {
                    input.value = '';
                    clearButton.style.display = 'none';
                    input.focus();
                });
            }
        });
        
        // Améliorer les boutons de soumission
        const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
        
        submitButtons.forEach(button => {
            // Ajouter un effet de chargement
            button.addEventListener('click', function() {
                if (form.checkValidity()) {
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
                    this.disabled = true;
                    
                    // Réinitialiser après 5 secondes si le formulaire n'a pas été soumis
                    setTimeout(() => {
                        if (this.disabled) {
                            this.innerHTML = this.tagName === 'BUTTON' ? 'Envoyer' : '';
                            this.disabled = false;
                        }
                    }, 5000);
                }
            });
        });
    }
    
    /**
     * Ajoute une validation en temps réel aux formulaires
     */
    function addRealTimeValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Valider lors de la saisie
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            // Valider lors de la perte de focus
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
        
        // Fonction de validation d'un champ
        function validateInput(input) {
            // Supprimer les messages d'erreur existants
            const existingError = input.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
                input.classList.remove('error');
            }
            
            // Valider le champ
            if (!input.checkValidity()) {
                // Créer un message d'erreur
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.color = '#dc3545';
                errorMessage.style.fontSize = '0.85rem';
                errorMessage.style.marginTop = '5px';
                
                // Définir le message d'erreur en fonction du type d'erreur
                if (input.validity.valueMissing) {
                    errorMessage.textContent = 'Ce champ est requis';
                } else if (input.validity.typeMismatch) {
                    if (input.type === 'email') {
                        errorMessage.textContent = 'Veuillez entrer une adresse email valide';
                    } else {
                        errorMessage.textContent = 'Format invalide';
                    }
                } else if (input.validity.tooShort) {
                    errorMessage.textContent = `Minimum ${input.minLength} caractères requis`;
                } else if (input.validity.tooLong) {
                    errorMessage.textContent = `Maximum ${input.maxLength} caractères autorisés`;
                } else if (input.validity.patternMismatch) {
                    errorMessage.textContent = 'Format invalide';
                } else {
                    errorMessage.textContent = 'Valeur invalide';
                }
                
                // Ajouter le message d'erreur
                input.parentNode.appendChild(errorMessage);
                input.classList.add('error');
                
                // Ajouter des styles pour le champ en erreur
                input.style.borderColor = '#dc3545';
                input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
                
                // Réinitialiser les styles lors de la saisie
                input.addEventListener('input', function() {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }, { once: true });
            }
        }
    }
    
    /**
     * Améliore la soumission des formulaires
     */
    function enhanceFormSubmission(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valider tous les champs
            const inputs = form.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                }
            });
            
            // Si le formulaire est valide, simuler l'envoi
            if (isValid) {
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                
                if (submitButton) {
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
                    submitButton.disabled = true;
                }
                
                // Simuler un délai d'envoi
                setTimeout(() => {
                    // Afficher un message de succès
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt!';
                    successMessage.style.color = '#28a745';
                    successMessage.style.padding = '15px';
                    successMessage.style.marginTop = '20px';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.textAlign = 'center';
                    
                    // Réinitialiser le formulaire
                    form.reset();
                    
                    // Réinitialiser le bouton de soumission
                    if (submitButton) {
                        submitButton.innerHTML = submitButton.tagName === 'BUTTON' ? 'Envoyer' : '';
                        submitButton.disabled = false;
                    }
                    
                    // Ajouter le message de succès
                    form.appendChild(successMessage);
                    
                    // Faire défiler jusqu'au message de succès
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Supprimer le message après 5 secondes
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
});
