/**
 * spa-mobile - Vibration Test
 * Script simple pour tester l'API Vibration
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Test de vibration chargé');
    
    // Vérifier si l'API Vibration est disponible
    const hasVibrationSupport = 'vibrate' in navigator;
    console.log('Support de vibration:', hasVibrationSupport);
    
    // Créer un bouton de test de vibration
    const testButton = document.createElement('button');
    testButton.textContent = 'Tester Vibration';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '150px';
    testButton.style.right = '20px';
    testButton.style.zIndex = '9999';
    testButton.style.padding = '15px';
    testButton.style.backgroundColor = '#ff5722';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '5px';
    testButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    testButton.style.fontSize = '16px';
    
    // Ajouter l'événement de clic
    testButton.addEventListener('click', function() {
        console.log('Bouton de test cliqué');
        
        if (!hasVibrationSupport) {
            alert('Votre appareil ne prend pas en charge l\'API Vibration');
            console.log('API Vibration non supportée');
            return;
        }
        
        try {
            console.log('Tentative de vibration forte (500ms)');
            navigator.vibrate(500);
            alert('Vibration envoyée! Avez-vous senti quelque chose?');
        } catch (e) {
            console.error('Erreur lors de la vibration:', e);
            alert('Erreur lors de la vibration: ' + e.message);
        }
    });
    
    // Ajouter le bouton au body
    document.body.appendChild(testButton);
    
    // Créer un bouton de test de motif de vibration
    const patternButton = document.createElement('button');
    patternButton.textContent = 'Tester Motif';
    patternButton.style.position = 'fixed';
    patternButton.style.bottom = '200px';
    patternButton.style.right = '20px';
    patternButton.style.zIndex = '9999';
    patternButton.style.padding = '15px';
    patternButton.style.backgroundColor = '#4caf50';
    patternButton.style.color = 'white';
    patternButton.style.border = 'none';
    patternButton.style.borderRadius = '5px';
    patternButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    patternButton.style.fontSize = '16px';
    
    // Ajouter l'événement de clic
    patternButton.addEventListener('click', function() {
        console.log('Bouton de test de motif cliqué');
        
        if (!hasVibrationSupport) {
            alert('Votre appareil ne prend pas en charge l\'API Vibration');
            console.log('API Vibration non supportée');
            return;
        }
        
        try {
            console.log('Tentative de motif de vibration');
            // Motif: vibrer 200ms, pause 100ms, vibrer 400ms
            navigator.vibrate([200, 100, 400]);
            alert('Motif de vibration envoyé! Avez-vous senti quelque chose?');
        } catch (e) {
            console.error('Erreur lors de la vibration:', e);
            alert('Erreur lors de la vibration: ' + e.message);
        }
    });
    
    // Ajouter le bouton au body
    document.body.appendChild(patternButton);
});
