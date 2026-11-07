
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const success = document.getElementById('success');

// Crear corazones flotantes
const heartsContainer = document.getElementById('hearts');

const symbols = ['💕', '💗', '♡', '💖', '🌸'];

for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');

    heart.className = 'heart';
    heart.textContent = symbols[
        Math.floor(Math.random() * symbols.length)
    ];

    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (15 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (7 + Math.random() * 9) + 's';
    heart.style.animationDelay = (Math.random() * 12) + 's';

    heartsContainer.appendChild(heart);
}

// Botón NO fugitivo
let attempts = 0;

function escapeButton() {
    const margin = 12;

    const maxX = window.innerWidth - noButton.offsetWidth - margin;
    const maxY = window.innerHeight - noButton.offsetHeight - margin;

    let x = margin + Math.random() * Math.max(0, maxX - margin);
    let y = margin + Math.random() * Math.max(0, maxY - margin);

    // Evitar que quede encima del botón SÍ
    const yesRect = yesButton.getBoundingClientRect();

    if (
        x < yesRect.right + 20 &&
        x + noButton.offsetWidth > yesRect.left - 20 &&
        y < yesRect.bottom + 20 &&
        y + noButton.offsetHeight > yesRect.top - 20
    ) {
        x = x > window.innerWidth / 2 ? margin : maxX;
    }

    noButton.style.position = 'fixed';
    noButton.style.left = x + 'px';
    noButton.style.top = y + 'px';

    attempts++;

    if (attempts === 3) {
        noButton.textContent = '¿Segura? 🥺';
    }

    if (attempts === 6) {
        noButton.textContent = '¡Piénsalo! 💗';
    }

    if (attempts === 9) {
        noButton.textContent = 'No te creo 🙈';
    }

    // El SÍ crece progresivamente
    const scale = Math.min(1 + attempts * 0.035, 1.35);
    yesButton.style.transform = `scale(${scale})`;
}

// Computadores
noButton.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') {
        escapeButton();
    }
});

// Celulares
noButton.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') {
        event.preventDefault();
        escapeButton();
    }
});

// Evitar que el NO se active normalmente
noButton.addEventListener('click', (event) => {
    event.preventDefault();
    escapeButton();
});

// Respuesta SÍ
yesButton.addEventListener('click', () => {
    success.classList.add('show');

    // Explosión de corazones
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('span');

        heart.textContent = '💗';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = '25px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '30';
        heart.style.animation = 'appear .7s ease';

        success.appendChild(heart);
    }
});

// Ajustar el botón al cambiar orientación
window.addEventListener('resize', () => {
    if (noButton.style.position === 'fixed') {
        const maxX = window.innerWidth - noButton.offsetWidth - 12;
        const maxY = window.innerHeight - noButton.offsetHeight - 12;

        noButton.style.left =
            Math.max(12, Math.min(parseFloat(noButton.style.left), maxX)) + 'px';

        noButton.style.top =
            Math.max(12, Math.min(parseFloat(noButton.style.top), maxY)) + 'px';
    }
});
