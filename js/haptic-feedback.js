/**
 * spa-mobile - Haptic Feedback
 * Implémentation du retour haptique pour les interactions importantes
 */

document.addEventListener("DOMContentLoaded", function () {
  // Vérifier si l'API de vibration est disponible et fonctionnelle
  let hasVibrationSupport = false;

  // Vérification plus robuste de l'API Vibration
  if ("vibrate" in navigator) {
    console.log("API Vibration détectée dans navigator");
    try {
      // Certains navigateurs ont l'API mais elle ne fonctionne pas
      // Essayons d'appeler la fonction avec une durée de 0 pour vérifier
      navigator.vibrate(0);
      hasVibrationSupport = true;
      console.log("API Vibration fonctionnelle confirmée");
    } catch (e) {
      console.error("API Vibration détectée mais non fonctionnelle:", e);
      hasVibrationSupport = false;
    }
  } else {
    console.log("API Vibration non détectée dans navigator");
  }

  // Classe pour gérer les retours haptiques
  class HapticFeedback {
    constructor() {
      this.enabled = true; // Par défaut, le retour haptique est activé
      this.initialized = false;

      // Vérifier les préférences utilisateur sauvegardées
      this.loadPreferences();

      // Initialiser les contrôles de préférences
      this.initPreferencesControl();
    }

    // Charger les préférences utilisateur
    loadPreferences() {
      const savedPreference = localStorage.getItem("haptic-feedback-enabled");
      if (savedPreference !== null) {
        this.enabled = savedPreference === "true";
      }
    }

    // Sauvegarder les préférences utilisateur
    savePreferences() {
      localStorage.setItem("haptic-feedback-enabled", this.enabled);
    }

    // Initialiser les contrôles de préférences
    initPreferencesControl() {
      if (this.initialized) return;

      // Créer un contrôle de préférence dans les paramètres (si disponible)
      const settingsContainer = document.querySelector(".contrast-controls");

      if (settingsContainer) {
        // Ajouter l'option dans le menu existant
        const contrastMenu = settingsContainer.querySelector(".contrast-menu");

        if (contrastMenu) {
          const hapticOption = document.createElement("button");
          hapticOption.className = "contrast-option haptic-option";
          hapticOption.setAttribute(
            "aria-label",
            "Activer/désactiver le retour haptique"
          );
          hapticOption.innerHTML = `<i class="fas fa-vibrate"></i> Retour haptique: ${
            this.enabled ? "Activé" : "Désactivé"
          }`;

          hapticOption.addEventListener("click", () => {
            this.enabled = !this.enabled;
            hapticOption.innerHTML = `<i class="fas fa-vibrate"></i> Retour haptique: ${
              this.enabled ? "Activé" : "Désactivé"
            }`;
            this.savePreferences();

            // Fournir un feedback immédiat
            if (this.enabled) {
              this.mediumFeedback();
            }
          });

          contrastMenu.appendChild(hapticOption);
        }
      }

      this.initialized = true;
    }

    // Retour haptique léger (pour les interactions mineures)
    lightFeedback() {
      console.log("Tentative de retour haptique léger");
      if (!this.enabled) {
        console.log("Retour haptique désactivé par l'utilisateur");
        return;
      }
      if (!hasVibrationSupport) {
        console.log("API Vibration non supportée sur cet appareil");
        return;
      }
      console.log("Exécution vibration légère (10ms)");
      try {
        navigator.vibrate(10);
      } catch (e) {
        console.error("Erreur lors de la vibration:", e);
      }
    }

    // Retour haptique moyen (pour les interactions standard)
    mediumFeedback() {
      console.log("Tentative de retour haptique moyen");
      if (!this.enabled) {
        console.log("Retour haptique désactivé par l'utilisateur");
        return;
      }
      if (!hasVibrationSupport) {
        console.log("API Vibration non supportée sur cet appareil");
        return;
      }
      console.log("Exécution vibration moyenne (100ms)");
      try {
        // Augmentons la durée pour rendre la vibration plus perceptible
        navigator.vibrate(100);
      } catch (e) {
        console.error("Erreur lors de la vibration:", e);
      }
    }

    // Retour haptique fort (pour les interactions importantes)
    strongFeedback() {
      console.log("Tentative de retour haptique fort");
      if (!this.enabled) {
        console.log("Retour haptique désactivé par l'utilisateur");
        return;
      }
      if (!hasVibrationSupport) {
        console.log("API Vibration non supportée sur cet appareil");
        return;
      }
      console.log("Exécution vibration forte (200ms)");
      try {
        // Augmentons la durée pour rendre la vibration plus perceptible
        navigator.vibrate(200);
      } catch (e) {
        console.error("Erreur lors de la vibration:", e);
      }
    }

    // Retour haptique de succès (pour les actions réussies)
    successFeedback() {
      console.log("Tentative de retour haptique de succès");
      if (!this.enabled) {
        console.log("Retour haptique désactivé par l'utilisateur");
        return;
      }
      if (!hasVibrationSupport) {
        console.log("API Vibration non supportée sur cet appareil");
        return;
      }
      console.log("Exécution vibration de succès");
      try {
        // Motif plus perceptible
        navigator.vibrate([100, 50, 100]);
      } catch (e) {
        console.error("Erreur lors de la vibration:", e);
      }
    }

    // Retour haptique d'erreur (pour les actions échouées)
    errorFeedback() {
      console.log("Tentative de retour haptique d'erreur");
      if (!this.enabled) {
        console.log("Retour haptique désactivé par l'utilisateur");
        return;
      }
      if (!hasVibrationSupport) {
        console.log("API Vibration non supportée sur cet appareil");
        return;
      }
      console.log("Exécution vibration d'erreur");
      try {
        // Motif plus perceptible
        navigator.vibrate([100, 50, 100, 50, 100]);
      } catch (e) {
        console.error("Erreur lors de la vibration:", e);
      }
    }

    // Retour haptique de notification (pour les alertes)
    notificationFeedback() {
      console.log("Tentative de retour haptique de notification");
      if (!this.enabled) {
        console.log("Retour haptique désactivé par l'utilisateur");
        return;
      }
      if (!hasVibrationSupport) {
        console.log("API Vibration non supportée sur cet appareil");
        return;
      }
      console.log("Exécution vibration de notification");
      try {
        // Motif plus perceptible
        navigator.vibrate([50, 100, 50, 100, 50]);
      } catch (e) {
        console.error("Erreur lors de la vibration:", e);
      }
    }
  }

  // Créer une instance globale
  window.hapticFeedback = new HapticFeedback();

  // Appliquer le retour haptique aux éléments interactifs
  applyHapticFeedback();

  /**
   * Applique le retour haptique aux éléments interactifs
   */
  function applyHapticFeedback() {
    // Éléments avec l'attribut data-haptic
    document.querySelectorAll('[data-haptic="true"]').forEach((element) => {
      console.log("Ajout du gestionnaire de retour haptique à:", element);
      element.addEventListener("click", () => {
        console.log("Clic sur élément avec data-haptic");
        window.hapticFeedback.mediumFeedback();
      });
    });

    // Boutons principaux (pour compatibilité avec les éléments sans data-haptic)
    document
      .querySelectorAll(".btn, .btn-oxygen, .btn-primary, .btn-outline")
      .forEach((button) => {
        if (!button.hasAttribute("data-haptic")) {
          button.addEventListener("click", () => {
            console.log("Clic sur bouton sans data-haptic");
            window.hapticFeedback.mediumFeedback();
          });
        }
      });

    // Menu mobile
    const mobileToggle = document.querySelector(".mobile-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        window.hapticFeedback.mediumFeedback();
      });
    }

    // Liens de navigation
    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        window.hapticFeedback.lightFeedback();
      });
    });

    // Cartes et éléments cliquables
    document
      .querySelectorAll(
        ".benefit-card, .testimonial-card, .gallery-item, .oxygen-benefit"
      )
      .forEach((card) => {
        card.addEventListener("click", () => {
          window.hapticFeedback.lightFeedback();
        });

        // Ajouter un attribut pour indiquer que l'élément est interactif
        card.setAttribute("role", "button");
        if (!card.hasAttribute("tabindex")) {
          card.setAttribute("tabindex", "0");
        }
      });

    // Formulaires
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      // Retour haptique à la soumission du formulaire
      form.addEventListener("submit", () => {
        window.hapticFeedback.successFeedback();
      });

      // Retour haptique pour les champs de formulaire
      const formInputs = form.querySelectorAll("input, textarea, select");
      formInputs.forEach((input) => {
        // Retour haptique lors de la validation
        input.addEventListener("invalid", () => {
          window.hapticFeedback.errorFeedback();
        });

        // Retour haptique lors de la sélection d'options
        if (input.tagName === "SELECT") {
          input.addEventListener("change", () => {
            window.hapticFeedback.lightFeedback();
          });
        }
      });

      // Boutons de soumission
      const submitButtons = form.querySelectorAll(
        'button[type="submit"], input[type="submit"]'
      );
      submitButtons.forEach((button) => {
        button.addEventListener("click", () => {
          window.hapticFeedback.strongFeedback();
        });
      });
    });

    // Contrôles de contraste
    const contrastControls = document.querySelectorAll(".contrast-option");
    contrastControls.forEach((control) => {
      control.addEventListener("click", () => {
        window.hapticFeedback.mediumFeedback();
      });
    });

    // Bouton "Retour en haut"
    const backToTopButton = document.querySelector(".back-to-top");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", () => {
        window.hapticFeedback.mediumFeedback();
      });
    }
  }

  // Ajouter un retour haptique pour les messages d'erreur et de succès
  const originalConsoleError = console.error;
  console.error = function () {
    if (window.hapticFeedback) {
      window.hapticFeedback.errorFeedback();
    }
    originalConsoleError.apply(console, arguments);
  };

  // Observer les changements dans le DOM pour appliquer le retour haptique aux nouveaux éléments
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        // Vérifier si de nouveaux éléments interactifs ont été ajoutés
        setTimeout(() => {
          applyHapticFeedback();
        }, 100);
      }
    });
  });

  // Observer le body pour les changements
  observer.observe(document.body, { childList: true, subtree: true });
});
