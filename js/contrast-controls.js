/**
 * spa-mobile - Contrast Controls
 * Contrôles d'ajustement du contraste pour une meilleure accessibilité
 */

document.addEventListener("DOMContentLoaded", function () {
  // Créer le bouton de contrôle du contraste
  createContrastControls();

  // Appliquer les préférences de contraste sauvegardées
  applyContrastPreferences();

  /**
   * Crée les contrôles d'ajustement du contraste
   */
  function createContrastControls() {
    // Créer le conteneur des contrôles
    const contrastControls = document.createElement("div");
    contrastControls.className = "contrast-controls";
    contrastControls.setAttribute("aria-label", "Contrôles de contraste");
    contrastControls.style.position = "fixed";
    contrastControls.style.bottom = "80px";
    contrastControls.style.right = "20px";
    contrastControls.style.zIndex = "1000";
    contrastControls.style.display = "flex";
    contrastControls.style.flexDirection = "column";
    contrastControls.style.gap = "10px";

    // Créer le bouton principal
    const contrastButton = document.createElement("button");
    contrastButton.className = "contrast-button";
    contrastButton.setAttribute("aria-label", "Ajuster le contraste");
    contrastButton.innerHTML = '<i class="fas fa-adjust"></i>';
    contrastButton.style.width = "44px";
    contrastButton.style.height = "44px";
    contrastButton.style.borderRadius = "50%";
    contrastButton.style.backgroundColor = "#0078a8";
    contrastButton.style.color = "white";
    contrastButton.style.border = "none";
    contrastButton.style.display = "flex";
    contrastButton.style.alignItems = "center";
    contrastButton.style.justifyContent = "center";
    contrastButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    contrastButton.style.cursor = "pointer";

    // Créer le menu des options
    const contrastMenu = document.createElement("div");
    contrastMenu.className = "contrast-menu";
    contrastMenu.style.display = "none";
    contrastMenu.style.flexDirection = "column";
    contrastMenu.style.gap = "5px";
    contrastMenu.style.backgroundColor = "white";
    contrastMenu.style.padding = "10px";
    contrastMenu.style.borderRadius = "10px";
    contrastMenu.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    contrastMenu.style.position = "absolute";
    contrastMenu.style.bottom = "55px";
    contrastMenu.style.right = "0";
    contrastMenu.style.width = "220px";

    // Options de contraste
    const contrastOptions = [
      { label: "Normal", value: "normal", icon: "fas fa-circle" },
      {
        label: "Contraste élevé",
        value: "high-contrast",
        icon: "fas fa-adjust",
      },
      {
        label: "Contraste très élevé",
        value: "very-high-contrast",
        icon: "fas fa-circle-half-stroke",
      },
    ];

    // Créer les options
    contrastOptions.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.className = "contrast-option";
      optionButton.setAttribute("data-contrast", option.value);
      optionButton.setAttribute("aria-label", option.label);
      optionButton.innerHTML = `<i class="${option.icon}"></i> ${option.label}`;
      optionButton.style.display = "flex";
      optionButton.style.alignItems = "center";
      optionButton.style.gap = "10px";
      optionButton.style.padding = "10px";
      optionButton.style.border = "none";
      optionButton.style.borderRadius = "5px";
      optionButton.style.backgroundColor = "transparent";
      optionButton.style.cursor = "pointer";
      optionButton.style.width = "100%";
      optionButton.style.textAlign = "left";

      // Ajouter l'événement de clic
      optionButton.addEventListener("click", function () {
        const contrast = this.getAttribute("data-contrast");
        setContrast(contrast);
        contrastMenu.style.display = "none";
      });

      // Ajouter l'option au menu
      contrastMenu.appendChild(optionButton);
    });

    // Ajouter l'événement de clic au bouton principal
    contrastButton.addEventListener("click", function () {
      if (contrastMenu.style.display === "none") {
        contrastMenu.style.display = "flex";
      } else {
        contrastMenu.style.display = "none";
      }
    });

    // Ajouter les éléments au conteneur
    contrastControls.appendChild(contrastButton);
    contrastControls.appendChild(contrastMenu);

    // Ajouter le conteneur au body
    document.body.appendChild(contrastControls);

    // Fermer le menu lorsque l'utilisateur clique en dehors
    document.addEventListener("click", function (event) {
      if (!contrastControls.contains(event.target)) {
        contrastMenu.style.display = "none";
      }
    });
  }

  /**
   * Applique les préférences de contraste sauvegardées
   */
  function applyContrastPreferences() {
    const savedContrast = localStorage.getItem("contrast-preference");

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
    document.body.classList.remove(
      "normal-contrast",
      "high-contrast",
      "very-high-contrast"
    );

    // Ajouter la classe de contraste appropriée
    document.body.classList.add(contrast + "-contrast");

    // Sauvegarder la préférence
    localStorage.setItem("contrast-preference", contrast);

    // Appliquer les styles spécifiques en fonction du niveau de contraste
    applyContrastStyles(contrast);
  }

  /**
   * Applique les styles spécifiques en fonction du niveau de contraste
   * @param {string} contrast - Le niveau de contraste à appliquer
   */
  function applyContrastStyles(contrast) {
    // Supprimer la feuille de style de contraste existante
    const existingStyle = document.getElementById("dynamic-contrast-styles");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Si le contraste est normal, ne rien faire de plus
    if (contrast === "normal") {
      return;
    }

    // Créer une nouvelle feuille de style
    const styleElement = document.createElement("style");
    styleElement.id = "dynamic-contrast-styles";

    // Définir les styles en fonction du niveau de contraste
    let styles = "";

    if (contrast === "high-contrast") {
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
    } else if (contrast === "very-high-contrast") {
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
