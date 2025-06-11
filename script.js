// --- Script Bilingüe + Navegación + Reveal + Modo Nocturno ---

// Variables y Funciones para el Modo Nocturno
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function applyDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️';
            darkModeToggle.style.color = '#ffd700'; // Dorado para el sol
        }
    } else {
        body.classList.remove('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.textContent = '🌙';
            darkModeToggle.style.color = 'var(--color-white)'; // Blanco para la luna
        }
    }
}

function toggleDarkMode() {
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'disabled');
    } else {
        localStorage.setItem('darkMode', 'enabled');
    }
    applyDarkModePreference(); // Aplica la preferencia inmediatamente
}

// Variables y Funciones para el Sistema de Idiomas
let idiomaActual = localStorage.getItem('idioma') || 'es';

function cambiarIdioma() {
    const elementos = document.querySelectorAll('.lang');
    idiomaActual = idiomaActual === 'es' ? 'en' : 'es';

    elementos.forEach(el => {
        const nuevoTexto = el.dataset[idiomaActual];
        if (nuevoTexto) {
            el.textContent = nuevoTexto;
        }
    });

    const btn = document.querySelector('.lang-button');
    if (btn) {
        btn.textContent = idiomaActual === 'es' ? 'EN' : 'ES';
    }

    localStorage.setItem('idioma', idiomaActual);
}

// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplicar preferencias al cargar la página (idioma y modo oscuro)
    cambiarIdioma(); // Aplica el idioma guardado
    applyDarkModePreference(); // Aplica el modo oscuro guardado

    // 2. Listener para el botón de Modo Nocturno
    if (darkModeToggle) { // Asegúrate de que el botón existe en la página actual
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // 3. Manejar enlaces de navegación (para transiciones suaves si no son enlaces externos)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita el comportamiento por defecto del enlace
            const target = this.getAttribute('href');

            if (target && !target.startsWith("http")) { // Si es una ruta interna
                window.location.href = target;
            } else if (target) { // Si es un enlace externo
                window.open(target, "_blank");
            }
        });
    });

    // 4. Script para manejar el envío del formulario de contacto (simulado)
    // Solo si estás en contacto.html y el formulario existe
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío real del formulario

            formStatus.style.display = 'block';
            formStatus.style.backgroundColor = 'var(--color-green-success-bg)'; // Usa variable CSS
            formStatus.style.color = 'var(--color-green-success-text)'; // Usa variable CSS
            formStatus.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';

            // Limpiar el formulario y ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                contactForm.reset();
                formStatus.style.display = 'none';
            }, 3000);
        });
    }

    // 5. Funcionalidad para revelar elementos al hacer scroll
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

    // 6. Funcionalidad para el modal de imágenes (Si tienes una galería con modal)
    // Asume que tienes un modal con ID 'myModal' y un botón de cierre con clase 'cerrar-modal'
    // Y que tus imágenes clickeables tienen la clase 'open-modal-img' o similar y el atributo 'data-img-src'
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImage');
    const closeModalBtn = document.querySelector('.cerrar-modal');

    // Abre el modal al hacer clic en una imagen (ej. certificados o proyectos)
    document.querySelectorAll('.open-modal-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            modalImg.src = this.dataset.imgSrc || this.src; // Usa data-img-src si existe, sino src
        });
    });

    // Cierra el modal al hacer clic en el botón de cerrar
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Cierra el modal al hacer clic fuera de la imagen
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});