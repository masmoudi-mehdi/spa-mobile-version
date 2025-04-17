/**
 * spa-mobile - Heading Structure
 * Script pour améliorer l'accessibilité et la structure des titres (h1-h6)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier qu'il n'y a qu'un seul h1 sur la page
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length > 1) {
        console.warn('Attention: Il y a plus d\'un élément h1 sur la page. Pour une meilleure accessibilité, il ne devrait y avoir qu\'un seul h1.');
    }
    
    // Ajouter des attributs ARIA aux titres qui n'en ont pas encore
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        // Si le titre n'a pas déjà un attribut role="heading"
        if (!heading.hasAttribute('role')) {
            heading.setAttribute('role', 'heading');
            
            // Définir le niveau ARIA en fonction du niveau du titre
            const level = parseInt(heading.tagName.substring(1));
            if (!heading.hasAttribute('aria-level')) {
                heading.setAttribute('aria-level', level.toString());
            }
        }
    });
    
    // Ajouter des IDs uniques aux titres de section pour améliorer la navigation
    const sectionTitles = document.querySelectorAll('h2.section-title');
    sectionTitles.forEach((title, index) => {
        if (!title.hasAttribute('id')) {
            // Créer un ID basé sur le texte du titre ou utiliser un ID générique
            let titleText = title.textContent.trim().toLowerCase();
            titleText = titleText.replace(/[^a-z0-9]+/g, '-');
            
            // Si le titre est vide ou ne génère pas d'ID valide, utiliser un ID générique
            const titleId = titleText || `section-title-${index + 1}`;
            
            // Vérifier que l'ID n'est pas déjà utilisé
            if (!document.getElementById(titleId)) {
                title.setAttribute('id', titleId);
            } else {
                title.setAttribute('id', `${titleId}-${index + 1}`);
            }
        }
    });
    
    // Améliorer la navigation au clavier pour les titres
    headings.forEach(heading => {
        heading.setAttribute('tabindex', '0');
        
        // Ajouter un gestionnaire d'événements pour la navigation au clavier
        heading.addEventListener('keydown', function(event) {
            // Si l'utilisateur appuie sur Entrée ou Espace, simuler un clic
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                heading.click();
            }
        });
    });
    
    // Ajouter un outline pour les titres lors de la navigation au clavier
    const style = document.createElement('style');
    style.textContent = `
        h1:focus, h2:focus, h3:focus, h4:focus, h5:focus, h6:focus {
            outline: 2px solid #0078a8;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});
