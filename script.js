document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const items = document.querySelectorAll('.gift-item');
    const emoji_finale = document.querySelector('.happy'); 

    // Questa riga mancava! Dice al computer qual è il valore massimo dello slider
    const sliderMax = parseFloat(rangeInput.max);

    rangeInput.addEventListener('input', () => {
        const maxPrice = parseFloat(rangeInput.value);
        priceValue.textContent = maxPrice;

        // 1. GESTIONE FILTRO PRODOTTI
        items.forEach(item => {
            const priceElement = item.querySelector('.gift-price');
            // Puliamo il prezzo da simboli e spazi per farlo diventare un numero
            const priceText = priceElement.textContent.replace('€', '').replace(',', '.').trim();
            const price = parseFloat(priceText);

            if (price <= maxPrice) {
                item.classList.remove('out-of-budget');
            } else {
                item.classList.add('out-of-budget');
            }
        });

       // 2. GESTIONE EMOJI DINAMICA
        const decimo = sliderMax / 10; // Calcoliamo quanto vale il 10% (es. 10€ se il max è 100)
        
        // Calcoliamo quanti cuori mostrare (da 1 a 10)
        // Math.floor serve per evitare numeri decimali
        let numeroCuori = Math.floor(maxPrice / decimo);
        
        // Se il prezzo è zero, mettiamo almeno un cuore di base
        if (numeroCuori < 1) numeroCuori = 1;

        if (maxPrice >= sliderMax) {
            emoji_finale.textContent = "❤️".repeat(10);
        } else {
            // Ripete il cuore in base al budget raggiunto
            emoji_finale.textContent = "❤️".repeat(numeroCuori);
        }

        const secretBoss = document.getElementById('secret-boss');

        if (maxPrice >= sliderMax) {
            // Quando lo slider è al massimo
            secretBoss.style.display = "flex"; // Lo mostriamo
            secretBoss.classList.remove('out-of-budget'); // Ci assicuriamo che non sia sfocato
        } else {
            // In tutti gli altri casi
            secretBoss.style.display = "none"; // Sparisce completamente
        }
    });
});
