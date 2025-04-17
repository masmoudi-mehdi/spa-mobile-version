/**
 * spa-mobile - Mobile Navigation Enhancements
 * Améliorations de la navigation pour les appareils mobiles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
        // Amélioration du menu mobile
        enhanceMobileMenu();
        
        // Amélioration du défilement
        enhanceScrolling();
        
        // Amélioration des interactions tactiles
        enhanceTouchInteractions();
        
        // Amélioration de la navigation par gestes
        enhanceGestureNavigation();
    }
    
    /**
     * Améliore le menu mobile avec des fonctionnalités supplémentaires
     */
    function enhanceMobileMenu() {
        const nav = document.querySelector('nav');
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        if (nav && mobileToggle) {
            // Ajouter un attribut aria-expanded pour l'accessibilité
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-controls', 'mobile-menu');
            mobileToggle.setAttribute('aria-label', 'Menu mobile');
            
            // Ajouter un ID au menu pour l'accessibilité
            nav.setAttribute('id', 'mobile-menu');
            
            // Améliorer l'interaction avec le menu
            mobileToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Empêcher le défilement du body lorsque le menu est ouvert
                document.body.style.overflow = isExpanded ? '' : 'hidden';
                
                // Ajouter une classe pour l'animation
                if (!isExpanded) {
                    nav.classList.add('animating');
                    setTimeout(() => {
                        nav.classList.remove('animating');
                    }, 300);
                }
            });
            
            // Fermer le menu lorsqu'un lien est cliqué
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    
                    // Ajouter un délai pour permettre au menu de se fermer avant de défiler
                    setTimeout(() => {
                        const targetId = this.getAttribute('href');
                        if (targetId.startsWith('#') && targetId !== '#') {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                const headerHeight = document.querySelector('header').offsetHeight;
                                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                                
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }, 300);
                });
            });
            
            // Fermer le menu lorsque l'utilisateur clique en dehors
            document.addEventListener('click', function(event) {
                if (mobileToggle.getAttribute('aria-expanded') === 'true' && 
                    !nav.contains(event.target) && 
                    !mobileToggle.contains(event.target)) {
                    mobileToggle.click();
                }
            });
            
            // Fermer le menu lorsque l'utilisateur fait défiler la page
            let lastScrollTop = 0;
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (Math.abs(scrollTop - lastScrollTop) > 50 && mobileToggle.getAttribute('aria-expanded') === 'true') {
                    mobileToggle.click();
                }
                
                lastScrollTop = scrollTop;
            });
        }
    }
    
    /**
     * Améliore le défilement sur les appareils mobiles
     */
    function enhanceScrolling() {
        // Ajouter un bouton "Retour en haut" pour les longues pages
        const backToTopButton = document.createElement('button');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.setAttribute('aria-label', 'Retour en haut de la page');
        backToTopButton.style.position = 'fixed';
        backToTopButton.style.bottom = '20px';
        backToTopButton.style.right = '20px';
        backToTopButton.style.zIndex = '999';
        backToTopButton.style.width = '44px';
        backToTopButton.style.height = '44px';
        backToTopButton.style.borderRadius = '50%';
        backToTopButton.style.backgroundColor = '#0078a8';
        backToTopButton.style.color = 'white';
        backToTopButton.style.border = 'none';
        backToTopButton.style.display = 'flex';
        backToTopButton.style.alignItems = 'center';
        backToTopButton.style.justifyContent = 'center';
        backToTopButton.style.opacity = '0';
        backToTopButton.style.transition = 'opacity 0.3s ease';
        backToTopButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        
        document.body.appendChild(backToTopButton);
        
        // Afficher/masquer le bouton en fonction de la position de défilement
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
            }
        });
        
        // Action du bouton
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Améliorer le défilement des ancres
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * Améliore les interactions tactiles sur les appareils mobiles
     */
    function enhanceTouchInteractions() {
        // Améliorer les interactions avec les cartes
        const cards = document.querySelectorAll('.benefit-card, .testimonial-card, .gallery-item');
        
        cards.forEach(card => {
            // Ajouter un effet de feedback tactile
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
            
            // Améliorer l'accessibilité
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
        });
        
        // Améliorer les interactions avec les boutons
        const buttons = document.querySelectorAll('.btn, .btn-oxygen');
        
        buttons.forEach(button => {
            // Ajouter un effet de feedback tactile
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    /**
     * Améliore la navigation par gestes sur les appareils mobiles
     */
    function enhanceGestureNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Détecter les gestes de balayage
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        // Gérer les gestes de balayage
        function handleSwipe() {
            const swipeThreshold = 100; // Seuil de détection du balayage
            
            // Balayage de droite à gauche (précédent)
            if (touchEndX + swipeThreshold < touchStartX) {
                // Navigation vers la section précédente
                navigateToPreviousSection();
            }
            
            // Balayage de gauche à droite (suivant)
            if (touchEndX > touchStartX + swipeThreshold) {
                // Navigation vers la section suivante
                navigateToNextSection();
            }
        }
        
        // Naviguer vers la section précédente
        function navigateToPreviousSection() {
            const sections = Array.from(document.querySelectorAll('section'));
            const currentPosition = window.pageYOffset + window.innerHeight / 2;
            
            // Trouver la section actuelle
            let currentSectionIndex = -1;
            
            for (let i = 0; i < sections.length; i++) {
                const sectionTop = sections[i].offsetTop;
                const sectionBottom = sectionTop + sections[i].offsetHeight;
                
                if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
                    currentSectionIndex = i;
                    break;
                }
            }
            
            // Naviguer vers la section précédente si elle existe
            if (currentSectionIndex > 0) {
                const previousSection = sections[currentSectionIndex - 1];
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: previousSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
        
        // Naviguer vers la section suivante
        function navigateToNextSection() {
            const sections = Array.from(document.querySelectorAll('section'));
            const currentPosition = window.pageYOffset + window.innerHeight / 2;
            
            // Trouver la section actuelle
            let currentSectionIndex = -1;
            
            for (let i = 0; i < sections.length; i++) {
                const sectionTop = sections[i].offsetTop;
                const sectionBottom = sectionTop + sections[i].offsetHeight;
                
                if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
                    currentSectionIndex = i;
                    break;
                }
            }
            
            // Naviguer vers la section suivante si elle existe
            if (currentSectionIndex >= 0 && currentSectionIndex < sections.length - 1) {
                const nextSection = sections[currentSectionIndex + 1];
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: nextSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    }
});
