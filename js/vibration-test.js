/**
 * spa-mobile - Vibration Test
 * Script simple pour tester l'API Vibration
 */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Test de vibration chargé");

  // Vérifier si l'API Vibration est disponible
  const hasVibrationSupport = "vibrate" in navigator;
  console.log("Support de vibration:", hasVibrationSupport);

  // Créer un conteneur pour les boutons de test
  const testContainer = document.createElement("div");
  testContainer.style.position = "fixed";
  testContainer.style.bottom = "200px";
  testContainer.style.left = "20px";
  testContainer.style.zIndex = "9998";
  testContainer.style.display = "flex";
  testContainer.style.flexDirection = "column";
  testContainer.style.gap = "10px";
  testContainer.style.alignItems = "flex-start";
  testContainer.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  testContainer.style.padding = "10px";
  testContainer.style.borderRadius = "5px";
  testContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  testContainer.style.border = "1px solid #ddd";
  testContainer.style.maxWidth = "200px";

  // Créer un titre pour les boutons de test
  const testTitle = document.createElement("div");
  testTitle.textContent = "Tests Haptiques";
  testTitle.style.color = "#333";
  testTitle.style.fontSize = "12px";
  testTitle.style.fontWeight = "bold";
  testTitle.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  testTitle.style.padding = "5px 10px";
  testTitle.style.borderRadius = "3px";
  testTitle.style.marginBottom = "5px";

  // Ajouter le titre au conteneur
  testContainer.appendChild(testTitle);

  // Créer un bouton pour masquer/afficher les tests
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "X";
  toggleButton.style.position = "absolute";
  toggleButton.style.top = "0";
  toggleButton.style.right = "0";
  toggleButton.style.backgroundColor = "#999";
  toggleButton.style.color = "white";
  toggleButton.style.border = "none";
  toggleButton.style.borderRadius = "50%";
  toggleButton.style.width = "20px";
  toggleButton.style.height = "20px";
  toggleButton.style.fontSize = "12px";
  toggleButton.style.display = "flex";
  toggleButton.style.alignItems = "center";
  toggleButton.style.justifyContent = "center";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.opacity = "0.7";
  toggleButton.style.transition = "opacity 0.3s ease";

  // Variable pour suivre l'état des boutons de test
  let testsVisible = true;

  // Ajouter l'événement de clic pour masquer/afficher les tests
  toggleButton.addEventListener("click", function () {
    testsVisible = !testsVisible;

    // Masquer/afficher les boutons de test
    testButton.style.display = testsVisible ? "block" : "none";
    patternButton.style.display = testsVisible ? "block" : "none";
    testTitle.style.display = testsVisible ? "block" : "none";

    // Changer le texte du bouton
    toggleButton.textContent = testsVisible ? "X" : "+";
  });

  // Ajouter le bouton au conteneur
  testContainer.appendChild(toggleButton);

  // Ajouter le conteneur au body
  document.body.appendChild(testContainer);

  // Créer un bouton de test de vibration
  const testButton = document.createElement("button");
  testButton.textContent = "Tester Vibration";
  // Pas besoin de position fixe car le bouton est dans le conteneur
  testButton.style.zIndex = "9999";
  testButton.style.padding = "10px 15px";
  testButton.style.backgroundColor = "#ff5722";
  testButton.style.color = "white";
  testButton.style.border = "none";
  testButton.style.borderRadius = "5px";
  testButton.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
  testButton.style.fontSize = "14px";
  testButton.style.opacity = "0.85";
  testButton.style.transition = "opacity 0.3s ease";

  // Ajouter des événements pour l'opacité
  testButton.addEventListener("mouseenter", function () {
    this.style.opacity = "1";
  });

  testButton.addEventListener("mouseleave", function () {
    this.style.opacity = "0.85";
  });

  // Ajouter l'événement de clic
  testButton.addEventListener("click", function () {
    console.log("Bouton de test cliqué");

    if (!hasVibrationSupport) {
      alert("Votre appareil ne prend pas en charge l'API Vibration");
      console.log("API Vibration non supportée");
      return;
    }

    try {
      console.log("Tentative de vibration forte (500ms)");
      navigator.vibrate(500);
      alert("Vibration envoyée! Avez-vous senti quelque chose?");
    } catch (e) {
      console.error("Erreur lors de la vibration:", e);
      alert("Erreur lors de la vibration: " + e.message);
    }
  });

  // Ajouter le bouton au conteneur
  testContainer.appendChild(testButton);

  // Créer un bouton de test de motif de vibration
  const patternButton = document.createElement("button");
  patternButton.textContent = "Tester Motif";
  // Pas besoin de position fixe car le bouton est dans le conteneur
  patternButton.style.zIndex = "9999";
  patternButton.style.padding = "10px 15px";
  patternButton.style.backgroundColor = "#4caf50";
  patternButton.style.color = "white";
  patternButton.style.border = "none";
  patternButton.style.borderRadius = "5px";
  patternButton.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
  patternButton.style.fontSize = "14px";
  patternButton.style.opacity = "0.85";
  patternButton.style.transition = "opacity 0.3s ease";

  // Ajouter des événements pour l'opacité
  patternButton.addEventListener("mouseenter", function () {
    this.style.opacity = "1";
  });

  patternButton.addEventListener("mouseleave", function () {
    this.style.opacity = "0.85";
  });

  // Ajouter l'événement de clic
  patternButton.addEventListener("click", function () {
    console.log("Bouton de test de motif cliqué");

    if (!hasVibrationSupport) {
      alert("Votre appareil ne prend pas en charge l'API Vibration");
      console.log("API Vibration non supportée");
      return;
    }

    try {
      console.log("Tentative de motif de vibration");
      // Motif: vibrer 200ms, pause 100ms, vibrer 400ms
      navigator.vibrate([200, 100, 400]);
      alert("Motif de vibration envoyé! Avez-vous senti quelque chose?");
    } catch (e) {
      console.error("Erreur lors de la vibration:", e);
      alert("Erreur lors de la vibration: " + e.message);
    }
  });

  // Ajouter le bouton au conteneur
  testContainer.appendChild(patternButton);
});
