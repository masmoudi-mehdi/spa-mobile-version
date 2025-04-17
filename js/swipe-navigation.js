/**
 * spa-mobile - Swipe Navigation
 * Amélioration des gestes de balayage pour la navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'appareil est tactile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    // Ne pas initialiser sur les appareils non tactiles
    if (!isTouchDevice) {
        console.log('Appareil non tactile détecté, gestes de balayage non initialisés');
        return;
    }
    
    console.log('Initialisation des gestes de balayage pour la navigation');
    
    // Classe pour gérer les gestes de balayage
    class SwipeNavigation {
        constructor() {
            this.enabled = true; // Par défaut, la navigation par balayage est activée
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.touchStartY = 0;
            this.touchEndY = 0;
            this.minHorizontalSwipe = 100; // Distance minimale pour un balayage horizontal (en pixels)
            this.maxVerticalOffset = 75;   // Tolérance verticale maximale (en pixels)
            this.sections = [];            // Sections du site
            this.currentSectionIndex = 0;  // Index de la section actuelle
            this.isAnimating = false;      // Indicateur d'animation en cours
            this.swipeIndicatorVisible = false; // Indicateur de visibilité de l'indicateur de balayage
            
            // Charger les préférences utilisateur
            this.loadPreferences();
            
            // Initialiser les sections
            this.initSections();
            
            // Initialiser les gestionnaires d'événements
            this.initEventListeners();
            
            // Initialiser les contrôles de préférences
            this.initPreferencesControl();
            
            // Créer l'indicateur de balayage
            this.createSwipeIndicator();
            
            // Mettre à jour l'index de la section actuelle au chargement
            this.updateCurrentSectionIndex();
            
            // Afficher l'indicateur de balayage après un court délai
            setTimeout(() => {
                this.showSwipeIndicator();
            }, 2000);
        }
        
        // Charger les préférences utilisateur
        loadPreferences() {
            const savedPreference = localStorage.getItem('swipe-navigation-enabled');
            if (savedPreference !== null) {
                this.enabled = savedPreference === 'true';
            }
        }
        
        // Sauvegarder les préférences utilisateur
        savePreferences() {
            localStorage.setItem('swipe-navigation-enabled', this.enabled);
        }
        
        // Initialiser les sections
        initSections() {
            // Récupérer toutes les sections du site
            this.sections = Array.from(document.querySelectorAll('section[id]'));
            
            // Ajouter la section hero si elle existe
            const hero = document.querySelector('.hero');
            if (hero) {
                this.sections.unshift(hero);
            }
            
            console.log(`${this.sections.length} sections détectées pour la navigation par balayage`);
        }
        
        // Initialiser les gestionnaires d'événements
        initEventListeners() {
            // Gestionnaire pour le début du toucher
            document.addEventListener('touchstart', (e) => {
                if (!this.enabled) return;
                
                this.touchStartX = e.changedTouches[0].screenX;
                this.touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            // Gestionnaire pour la fin du toucher
            document.addEventListener('touchend', (e) => {
                if (!this.enabled || this.isAnimating) return;
                
                this.touchEndX = e.changedTouches[0].screenX;
                this.touchEndY = e.changedTouches[0].screenY;
                
                // Calculer les distances de balayage
                const horizontalDistance = this.touchEndX - this.touchStartX;
                const verticalDistance = Math.abs(this.touchEndY - this.touchStartY);
                
                // Vérifier si c'est un balayage horizontal valide
                if (Math.abs(horizontalDistance) > this.minHorizontalSwipe && verticalDistance < this.maxVerticalOffset) {
                    // Balayage de droite à gauche (précédent)
                    if (horizontalDistance < 0) {
                        console.log('Balayage de droite à gauche détecté');
                        this.navigateToNextSection();
                    }
                    // Balayage de gauche à droite (suivant)
                    else {
                        console.log('Balayage de gauche à droite détecté');
                        this.navigateToPreviousSection();
                    }
                }
            }, { passive: true });
            
            // Gestionnaire pour le défilement
            window.addEventListener('scroll', () => {
                if (!this.enabled) return;
                
                // Mettre à jour l'index de la section actuelle lors du défilement
                this.updateCurrentSectionIndex();
            }, { passive: true });
        }
        
        // Initialiser les contrôles de préférences
        initPreferencesControl() {
            // Créer un contrôle de préférence dans les paramètres (si disponible)
            const settingsContainer = document.querySelector('.contrast-controls');
            
            if (settingsContainer) {
                // Ajouter l'option dans le menu existant
                const contrastMenu = settingsContainer.querySelector('.contrast-menu');
                
                if (contrastMenu) {
                    const swipeOption = document.createElement('button');
                    swipeOption.className = 'contrast-option swipe-option';
                    swipeOption.setAttribute('aria-label', 'Activer/désactiver la navigation par balayage');
                    swipeOption.innerHTML = `<i class="fas fa-hand-point-right"></i> Navigation par balayage: ${this.enabled ? 'Activée' : 'Désactivée'}`;
                    
                    swipeOption.addEventListener('click', () => {
                        this.enabled = !this.enabled;
                        swipeOption.innerHTML = `<i class="fas fa-hand-point-right"></i> Navigation par balayage: ${this.enabled ? 'Activée' : 'Désactivée'}`;
                        this.savePreferences();
                        
                        // Afficher ou masquer l'indicateur de balayage
                        if (this.enabled) {
                            this.showSwipeIndicator();
                            // Vibration de confirmation si disponible
                            if (window.hapticFeedback) {
                                window.hapticFeedback.mediumFeedback();
                            }
                        } else {
                            this.hideSwipeIndicator();
                        }
                    });
                    
                    contrastMenu.appendChild(swipeOption);
                }
            }
        }
        
        // Créer l'indicateur de balayage
        createSwipeIndicator() {
            // Créer le conteneur de l'indicateur
            this.swipeIndicator = document.createElement('div');
            this.swipeIndicator.className = 'swipe-indicator';
            this.swipeIndicator.style.position = 'fixed';
            this.swipeIndicator.style.bottom = '50%';
            this.swipeIndicator.style.left = '0';
            this.swipeIndicator.style.right = '0';
            this.swipeIndicator.style.display = 'flex';
            this.swipeIndicator.style.justifyContent = 'space-between';
            this.swipeIndicator.style.padding = '0 20px';
            this.swipeIndicator.style.pointerEvents = 'none';
            this.swipeIndicator.style.zIndex = '999';
            this.swipeIndicator.style.opacity = '0';
            this.swipeIndicator.style.transition = 'opacity 0.5s ease';
            
            // Créer l'indicateur gauche
            const leftIndicator = document.createElement('div');
            leftIndicator.className = 'swipe-indicator-left';
            leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
            leftIndicator.style.backgroundColor = 'rgba(0, 120, 168, 0.7)';
            leftIndicator.style.color = 'white';
            leftIndicator.style.borderRadius = '50%';
            leftIndicator.style.width = '40px';
            leftIndicator.style.height = '40px';
            leftIndicator.style.display = 'flex';
            leftIndicator.style.alignItems = 'center';
            leftIndicator.style.justifyContent = 'center';
            leftIndicator.style.fontSize = '20px';
            leftIndicator.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
            
            // Créer l'indicateur droit
            const rightIndicator = document.createElement('div');
            rightIndicator.className = 'swipe-indicator-right';
            rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
            rightIndicator.style.backgroundColor = 'rgba(0, 120, 168, 0.7)';
            rightIndicator.style.color = 'white';
            rightIndicator.style.borderRadius = '50%';
            rightIndicator.style.width = '40px';
            rightIndicator.style.height = '40px';
            rightIndicator.style.display = 'flex';
            rightIndicator.style.alignItems = 'center';
            rightIndicator.style.justifyContent = 'center';
            rightIndicator.style.fontSize = '20px';
            rightIndicator.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
            
            // Ajouter les indicateurs au conteneur
            this.swipeIndicator.appendChild(leftIndicator);
            this.swipeIndicator.appendChild(rightIndicator);
            
            // Ajouter le conteneur au body
            document.body.appendChild(this.swipeIndicator);
            
            // Référence aux indicateurs
            this.leftIndicator = leftIndicator;
            this.rightIndicator = rightIndicator;
        }
        
        // Afficher l'indicateur de balayage
        showSwipeIndicator() {
            if (!this.enabled || this.swipeIndicatorVisible) return;
            
            this.swipeIndicator.style.opacity = '1';
            this.swipeIndicatorVisible = true;
            
            // Masquer l'indicateur après 3 secondes
            setTimeout(() => {
                this.hideSwipeIndicator();
            }, 3000);
        }
        
        // Masquer l'indicateur de balayage
        hideSwipeIndicator() {
            this.swipeIndicator.style.opacity = '0';
            this.swipeIndicatorVisible = false;
        }
        
        // Mettre à jour l'index de la section actuelle
        updateCurrentSectionIndex() {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            for (let i = 0; i < this.sections.length; i++) {
                const section = this.sections[i];
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    this.currentSectionIndex = i;
                    
                    // Mettre à jour la visibilité des indicateurs
                    this.updateIndicatorsVisibility();
                    return;
                }
            }
        }
        
        // Mettre à jour la visibilité des indicateurs
        updateIndicatorsVisibility() {
            // Masquer l'indicateur gauche si nous sommes à la première section
            if (this.currentSectionIndex === 0) {
                this.leftIndicator.style.visibility = 'hidden';
            } else {
                this.leftIndicator.style.visibility = 'visible';
            }
            
            // Masquer l'indicateur droit si nous sommes à la dernière section
            if (this.currentSectionIndex === this.sections.length - 1) {
                this.rightIndicator.style.visibility = 'hidden';
            } else {
                this.rightIndicator.style.visibility = 'visible';
            }
        }
        
        // Naviguer vers la section précédente
        navigateToPreviousSection() {
            if (this.currentSectionIndex <= 0) {
                console.log('Déjà à la première section');
                this.bounceAnimation('left');
                return;
            }
            
            this.navigateToSection(this.currentSectionIndex - 1);
        }
        
        // Naviguer vers la section suivante
        navigateToNextSection() {
            if (this.currentSectionIndex >= this.sections.length - 1) {
                console.log('Déjà à la dernière section');
                this.bounceAnimation('right');
                return;
            }
            
            this.navigateToSection(this.currentSectionIndex + 1);
        }
        
        // Naviguer vers une section spécifique
        navigateToSection(index) {
            if (index < 0 || index >= this.sections.length || this.isAnimating) return;
            
            const targetSection = this.sections[index];
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            
            // Marquer comme en cours d'animation
            this.isAnimating = true;
            
            // Afficher l'indicateur de balayage
            this.showSwipeIndicator();
            
            // Faire défiler jusqu'à la section cible
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            // Retour haptique si disponible
            if (window.hapticFeedback) {
                window.hapticFeedback.lightFeedback();
            }
            
            // Mettre à jour l'index de la section actuelle
            this.currentSectionIndex = index;
            
            // Mettre à jour la visibilité des indicateurs
            this.updateIndicatorsVisibility();
            
            // Réinitialiser l'indicateur d'animation après la fin de l'animation
            setTimeout(() => {
                this.isAnimating = false;
            }, 1000);
        }
        
        // Animation de rebond lorsqu'on atteint la première ou la dernière section
        bounceAnimation(direction) {
            const indicator = direction === 'left' ? this.leftIndicator : this.rightIndicator;
            
            // Afficher l'indicateur
            this.showSwipeIndicator();
            
            // Animer l'indicateur
            indicator.style.transition = 'transform 0.3s ease-in-out';
            indicator.style.transform = direction === 'left' ? 'translateX(-10px)' : 'translateX(10px)';
            
            setTimeout(() => {
                indicator.style.transform = 'translateX(0)';
                
                // Retour haptique d'erreur si disponible
                if (window.hapticFeedback) {
                    window.hapticFeedback.errorFeedback();
                }
            }, 300);
        }
    }
    
    // Créer une instance globale
    window.swipeNavigation = new SwipeNavigation();
});
