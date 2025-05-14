// Función para guardar el valor de un contador en LocalStorage
function saveCounter(id, value) {
    localStorage.setItem(id, value);
}

// Función para cargar el valor de un contador desde LocalStorage
function loadCounter(id) {
    return parseInt(localStorage.getItem(id)) || 0;
}

// Cargar los valores de los contadores al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.box').forEach(box => {
        const id = box.id;
        const count = loadCounter(id); // Cargar el valor guardado
        box.setAttribute('data-count', count); // Actualizar el atributo data-count
        box.querySelector('.count').textContent = count; // Actualizar el texto del contador
    });
});

// Función para mostrar el modal de agradecimiento
function showThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.style.display = 'flex'; // Mostrar el modal
    }
}

// Función para ocultar el modal
function hideThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.style.display = 'none'; // Ocultar el modal
    }
}

// Asignar la función para cerrar el modal al botón "Aceptar"
const closeModalButton = document.getElementById('closeModalButton');
if (closeModalButton) {
    closeModalButton.addEventListener('click', hideThankYouModal);
}

// Mapeo de nombres personalizados
const nombresPersonalizados = {
    box1: "La Libertad Avanza",
    box2: "UCR - Vamos Corrientes",
    box3: "UxP - Peronismo Correntino",
    box4: "UCR - eCo"
};

const coloresPartidos = {
    box1: '#4e2a9f', // La Libertad Avanza
    box2: '#bd182a', // UCR - Vamos Corrientes
    box3: '#18bfdb', // UxP - Peronismo Correntino
    box4: '#2fb33f'  // UCR - eCo
};


function promptPassword(callback) {
    const modal = document.getElementById('passwordModal');
    const input = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordButton');

    input.value = ''; // Limpiar campo
    modal.style.display = 'flex';

    // Previene duplicar listeners
    const handler = function () {
        const password = input.value.trim();
        if (password === "llabv2025") {
            modal.style.display = 'none';
            callback(); // Ejecutar la acción protegida
        } else {
            alert("Contraseña incorrecta.");
        }
    };

    submitButton.onclick = handler;

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') handler();
    });

    // Botón cerrar
    document.getElementById('closePasswordModal').onclick = () => {
        modal.style.display = 'none';
    };
}

// Acción de ver conteos
function viewCounts() {
    promptPassword(() => {
        const voteCountsContent = document.getElementById('voteCountsContent');
        voteCountsContent.innerHTML = '';

        document.querySelectorAll('.box').forEach(box => {
            const id = box.id;
            const nombre = nombresPersonalizados[id] || id;
            const count = box.getAttribute('data-count');

            const fila = document.createElement('div');
            fila.classList.add('voto-fila');

            const nombreElem = document.createElement('span');
            nombreElem.classList.add('voto-nombre', id); // Clase + ID
            nombreElem.textContent = nombre;

            const cantidadElem = document.createElement('span');
            cantidadElem.classList.add('voto-cantidad');
            cantidadElem.textContent = count;

            fila.appendChild(nombreElem);
            fila.appendChild(cantidadElem);
            voteCountsContent.appendChild(fila);
        });

        document.getElementById('voteCountsModal').style.display = 'flex';
    });
}

// Acción de reiniciar contadores
function resetCounters() {
    promptPassword(() => {
        document.querySelectorAll('.box').forEach(box => {
            box.setAttribute('data-count', 0);
            box.querySelector('.count').textContent = 0;
            localStorage.removeItem(box.id);
        });
        alert("Contadores reiniciados correctamente.");
    });
}


// Cerrar modal de conteos
const closeVoteCountsX = document.getElementById('closeVoteCountsModal');
const closeVoteCountsButton = document.getElementById('closeVoteCountsButton');
const voteCountsModal = document.getElementById('voteCountsModal');

if (closeVoteCountsX && closeVoteCountsButton && voteCountsModal) {
    closeVoteCountsX.addEventListener('click', () => {
        voteCountsModal.style.display = 'none';
    });
    closeVoteCountsButton.addEventListener('click', () => {
        voteCountsModal.style.display = 'none';
    });
}


// Asignar la función de reinicio al botón
const resetButton = document.getElementById('resetButton');
if (resetButton) {
    resetButton.addEventListener('click', resetCounters);
}

// Asignar la función de ver conteos al botón
const viewCountsButton = document.getElementById('viewCountsButton');
if (viewCountsButton) {
    viewCountsButton.addEventListener('click', viewCounts);
}

// Función para detectar si estamos en Cordova
function isCordova() {
    return !!window.cordova; // Devuelve true si está en Cordova, false si está en un navegador
}

// Función para alternar el modo pantalla completa
function toggleFullscreen() {
    if (isCordova()) {
        // Código para Cordova
        if (window.AndroidFullScreen) {
            AndroidFullScreen.immersiveMode(); // Habilita el modo inmersivo
        } else {
            alert("El plugin de pantalla completa no está disponible.");
        }
    } else {
        // Código para navegador web
        if (!document.fullscreenElement) {
            // Entrar en modo pantalla completa
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error al intentar entrar en modo pantalla completa: ${err.message}`);
            });
        } else {
            // Salir del modo pantalla completa
            document.exitFullscreen();
        }
    }
}

// Cambiar el texto del botón según el estado de pantalla completa
function updateFullscreenButton() {
    const fullscreenButton = document.getElementById('fullscreenSlidebarButton');
    if (fullscreenButton) {
        if (isCordova()) {
            // Cambiar el texto y el ícono para Cordova
            fullscreenButton.innerHTML = '<i class="fas fa-compress"></i> Cerrar Pantalla Completa';
        } else {
            // Cambiar el texto y el ícono para navegador web
            if (document.fullscreenElement) {
                fullscreenButton.innerHTML = '<i class="fas fa-compress"></i> Cerrar Pantalla Completa';
            } else {
                fullscreenButton.innerHTML = '<i class="fas fa-expand"></i> Pantalla Completa';
            }
        }
    }
}

// Asignar la función al botón de pantalla completa
const fullscreenButton = document.getElementById('fullscreenSlidebarButton');
if (fullscreenButton) {
    fullscreenButton.addEventListener('click', toggleFullscreen);
}

// Actualizar el botón cuando cambia el estado de pantalla completa
document.addEventListener('fullscreenchange', updateFullscreenButton);

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
            console.log('Error al registrar el Service Worker:', error);
        });
}

// Slidebar y modales
document.addEventListener('DOMContentLoaded', function () {
    const slidebar = document.getElementById('slidebar');
    const slidebarButton = document.getElementById('slidebarButton');
    const closeSlidebarButton = document.getElementById('closeSlidebarButton');
    const infoButton = document.getElementById('infoButton');
    const exitButton = document.getElementById('exitButton');
    const infoModal = document.getElementById('infoModal');
    const closeInfoModalButton = document.getElementById('closeInfoModalButton');
    const overlay = document.getElementById('overlay');
    const closeMenuButton = document.getElementById('closeMenuButton');

    // >>> NUEVO CÓDIGO AYUDA <<<
const helpButton = document.getElementById('helpButton');
const helpModal = document.getElementById('helpModal'); // Seleccionamos el nuevo modal de ayuda
const helpModalTitle = helpModal.querySelector('h2');
const helpModalContent = document.getElementById('helpModalContent'); // Seleccionamos el contenedor de contenido del modal de ayuda
const closeHelpModalButton = document.getElementById('closeHelpModalButton'); // Seleccionamos el botón de cerrar del modal de ayuda

if (helpButton && helpModal) {
    helpButton.addEventListener('click', function () {
        helpModalTitle.innerHTML = 'Ayuda<br>¿Qué hace cada botón?';
        helpModalContent.innerHTML = '';

        const buttonExplanations = {
            'toggleVoteModeButton': `
                <b>Modo de Votación:</b> Cambia la forma de votar entre tocar cualquier parte de la imagen de los candidatos (predeterminado) y tocar únicamente la mitad inferior, ideal para evitar votos no intencionados o prevenir que toquen a los referentes que se muestra arriba de la imagen del candidato.<br><br>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                    <div style="display: flex; flex-direction: column; align-items: center; width: 48%;">
                        <span class="titulo-ayuda1">Tocar Cualquier parte</span>
                        <img src="img/ejemploVotar1.png" alt="Ejemplo Modo Completo" style="max-width: 100%; height: auto; cursor: pointer;" class="enlargeable-image">
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; width: 48%;">
                        <span class="titulo-ayuda2">Tocar parte inferior</span>
                        <img src="img/ejemploVotar2.png" alt="Ejemplo Modo Mitad Inferior" style="max-width: 100%; height: auto; cursor: pointer;" class="enlargeable-image">
                    </div>
                </div>
            `,
            'infoButton': '<b>Información de la App:</b> Muestra detalles sobre esta aplicación, su desarrollo y la versión actual.',
            'fullscreenSlidebarButton': '<b>Pantalla Completa:</b> Abre el contenido principal de la aplicación en modo de pantalla completa.',
            'helpButton': '<b>Ayuda:</b> Muestra esta explicación de los botones.',
            'downloadAppButton': `
            <b>Descargar App (Android):</b> Permite descargar la aplicación en dispositivos Android para usarla sin necesidad de conexión a internet. 
            Al hacer clic, se abrirá un enlace externo para descargar el archivo APK. Una vez instalada, la aplicación funciona completamente offline, 
            lo que la hace ideal para usar en lugares con poca o ninguna conectividad.`,
            'closeMenuButton': '<b>Cerrar Menú:</b> Cierra este menú lateral.',
            'exitButton': '<b>Salir de la App:</b> Cierra la aplicación por completo (puede no funcionar en todos los navegadores o entornos como App Movil).',
            
        };

        for (const buttonId in buttonExplanations) {
            const button = document.getElementById(buttonId);
            if (button) {
                const explanationTitle = document.createElement('h3');
                let titleText = button.textContent.replace(/<i[^>]*>.*?<\/i>/g, '').trim();

                if (buttonId === 'toggleVoteModeButton') {
                    titleText = 'Alternar Modo de Votación';
                }

                explanationTitle.textContent = titleText;
                const explanationParagraph = document.createElement('p');
                explanationParagraph.innerHTML = buttonExplanations[buttonId];
                helpModalContent.appendChild(explanationTitle);
                helpModalContent.appendChild(explanationParagraph);
            }
        }

        // --- NUEVO CÓDIGO PARA EL LIGHTBOX ---
        const enlargeableImages = helpModalContent.querySelectorAll('.enlargeable-image');
        enlargeableImages.forEach(img => {
            img.addEventListener('click', function () {
                const imageUrl = this.src;
                createLightbox(imageUrl);
            });
        });
        // --- FIN NUEVO CÓDIGO PARA EL LIGHTBOX ---

        helpModal.style.display = 'flex';
        slidebar.classList.remove('open');
        overlay.style.display = 'none';
    });
}
    
    // Función para crear el lightbox
// Función para crear el lightbox
function createLightbox(imageUrl) {
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.classList.add('lightbox-overlay');

    const lightboxImage = document.createElement('img');
    lightboxImage.src = imageUrl;
    lightboxImage.classList.add('lightbox-image');

    // Crear el botón de cerrar
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('lightbox-close-button');

    lightboxOverlay.appendChild(lightboxImage);
    lightboxOverlay.appendChild(closeButton);
    document.body.appendChild(lightboxOverlay);

    // Cerrar el lightbox al hacer clic fuera de la imagen
    lightboxOverlay.addEventListener('click', function (event) {
        if (event.target === lightboxOverlay) {
            document.body.removeChild(lightboxOverlay);
        }
    });

    // Cerrar el lightbox al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', function () {
        document.body.removeChild(lightboxOverlay);
    });

    // Cerrar el lightbox al presionar la tecla Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.body.removeChild(lightboxOverlay);
        }
    });

    lightboxImage.style.width = '90vw'; // 90% del ancho de la ventana
    lightboxImage.style.height = '90vh'; // 90% del alto de la ventana
}

    // Agregamos un event listener para cerrar el nuevo modal de ayuda
    if (closeHelpModalButton) {
        closeHelpModalButton.addEventListener('click', function () {
            helpModal.style.display = 'none';
        });
    }
    // >>> FIN NUEVO CÓDIGO AYUDA <<<

    // Abrir y cerrar el slidebar (tu código existente)
    slidebarButton.addEventListener('click', function () {
        slidebar.classList.add('open');
        overlay.style.display = 'block';
    });

    closeSlidebarButton.addEventListener('click', function () {
        slidebar.classList.remove('open');
        overlay.style.display = 'none';
    });

    // Cerrar el slidebar con el botón "Cerrar Menú" (tu código existente)
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', function () {
            slidebar.classList.remove('open');
            overlay.style.display = 'none';
        });
    }

    // Mostrar modal de información (tu código existente)
    infoButton.addEventListener('click', function () {
        infoModal.style.display = 'flex';
        slidebar.classList.remove('open');
        overlay.style.display = 'none';
    });

    // Cerrar modal de información (tu código existente)
    closeInfoModalButton.addEventListener('click', function () {
        infoModal.style.display = 'none';
    });

    // Salir de la aplicación (tu código existente)
    if (exitButton) {
        exitButton.addEventListener('click', function () {
            if (confirm("¿Estás seguro de que deseas salir de la aplicación?")) {
                window.close(); // Cierra la ventana (funciona en algunas configuraciones)
            }
        });
    }
});

// Modo de votación
document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box');
    const toggleVoteModeButton = document.getElementById('toggleVoteModeButton');
    let voteMode = 'full'; // 'full' para tocar cualquier parte, 'half' para tocar solo la mitad inferior

    // Función para manejar el clic en toda la imagen
    function handleFullClick(event) {
        const box = event.currentTarget;
        let count = parseInt(box.getAttribute('data-count'));
        count += 1;
        box.setAttribute('data-count', count);
        box.querySelector('.count').textContent = count;
        saveCounter(box.id, count); // Guardar en LocalStorage
        showThankYouModal(); // Mostrar el modal de agradecimiento
    }

    // Función para manejar el clic en la mitad inferior
    function handleHalfClick(event) {
        const box = event.currentTarget.closest('.box');
        let count = parseInt(box.getAttribute('data-count'));
        count += 1;
        box.setAttribute('data-count', count);
        box.querySelector('.count').textContent = count;
        saveCounter(box.id, count); // Guardar en LocalStorage
        showThankYouModal(); // Mostrar el modal de agradecimiento
    }

    // Función para actualizar el modo de votación
    function updateVoteMode() {
        const boxes = document.querySelectorAll('.box');
        const halfBottoms = document.querySelectorAll('.half-bottom');
        const modeButtonIcon = document.getElementById('voteModeIcon'); // Obtener el elemento del icono

        if (voteMode === 'full') {
            // Modo: Tocar cualquier parte de la imagen
            boxes.forEach(box => {
                box.style.cursor = 'pointer';
                box.removeEventListener('click', handleHalfClick);
                box.addEventListener('click', handleFullClick);
            });
            halfBottoms.forEach(half => {
                half.classList.remove('active');
                half.removeEventListener('click', handleHalfClick);
            });
            toggleVoteModeButton.textContent = 'Modo: Tocar Cualquier Parte';
            toggleVoteModeButton.classList.remove('modo-inactivo');
            toggleVoteModeButton.classList.add('modo-activo');

            // Cambiar el icono al modo "Tocar Cualquier Parte"
            if (modeButtonIcon) {
                modeButtonIcon.classList.remove('fa-hand-pointer');
                modeButtonIcon.classList.add('fa-mouse-pointer');
            }
        } else {
            // Modo: Tocar solo la mitad inferior
            boxes.forEach(box => {
                box.style.cursor = 'default';
                box.removeEventListener('click', handleFullClick);
                const halfBottom = box.querySelector('.half-bottom');
                if (halfBottom) {
                    halfBottom.classList.add('active');
                    halfBottom.addEventListener('click', handleHalfClick);
                }
            });
            toggleVoteModeButton.textContent = 'Modo: Tocar Mitad Inferior';
            toggleVoteModeButton.classList.remove('modo-activo');
            toggleVoteModeButton.classList.add('modo-inactivo');

            // Cambiar el icono al modo "Tocar Mitad Inferior"
            if (modeButtonIcon) {
                modeButtonIcon.classList.remove('fa-mouse-pointer');
                modeButtonIcon.classList.add('fa-hand-pointer');
            }
        }
    }

    // Alternar entre modos al hacer clic en el botón
    toggleVoteModeButton.addEventListener('click', function () {
        voteMode = (voteMode === 'full') ? 'half' : 'full'; // Cambia el modo
        updateVoteMode(); // Actualiza los eventos y la interfaz
    });

    // Inicializar el modo de votación
    updateVoteMode();
});

// Cerrar modal de información con la "X"
const closeInfoModalX = document.querySelector('#infoModal .close-button');
if (closeInfoModalX) {
    closeInfoModalX.addEventListener('click', function () {
        document.getElementById('infoModal').style.display = 'none';
    });
}

// Cerrar modal de ayuda con la "X"
const closeHelpModalX = document.querySelector('#helpModal .close-button');
if (closeHelpModalX) {
    closeHelpModalX.addEventListener('click', function () {
        document.getElementById('helpModal').style.display = 'none';
    });
}

// 1. Mostrar estadísticas al hacer clic en el botón
document.getElementById('showStats').addEventListener('click', () => {
    document.getElementById('voteCountsModal').style.display = 'none';
    document.getElementById('statsModal').style.display = 'flex';
    renderCharts(); // Función para generar gráficos
});

// 2. Cerrar el modal de estadísticas
document.querySelector('#statsModal .close-button').addEventListener('click', () => {
    document.getElementById('statsModal').style.display = 'none';
});

// También puedes agregar cierre al hacer clic fuera del contenido
document.getElementById('statsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

// 3. Función para renderizar gráficos (usa Chart.js o similar)
function renderCharts() {
    const chartsContainer = document.getElementById('chartsContainer');
    if (!chartsContainer) {
        console.error("No se encontró el contenedor de gráficos");
        return;
    }
    chartsContainer.innerHTML = '';

    // 1. Crear y agregar elementos canvas
    const pieCanvas = document.createElement('canvas');
    pieCanvas.id = 'pieChart';
    chartsContainer.appendChild(pieCanvas);

    const barCanvas = document.createElement('canvas');
    barCanvas.id = 'barChart';
    chartsContainer.appendChild(barCanvas);

    // 2. Obtener y validar datos
    const votes = Array.from(document.querySelectorAll('.box')).map(box => {
        const count = parseInt(box.getAttribute('data-count'));
        return isNaN(count) ? 0 : count;
    });
    const totalVotes = votes.reduce((sum, count) => sum + count, 0);

    // 3. Configurar datos con colores personalizados
    const data = {
        labels: Object.values(nombresPersonalizados),
        datasets: [{
            data: votes,
            backgroundColor: Object.keys(nombresPersonalizados).map(id => coloresPartidos[id]),
            borderColor: '#fff',
            borderWidth: 1
        }]
    };

    // 4. Función para etiquetas con votos y porcentaje
    const formatLabel = (value) => {
        if (totalVotes === 0) return '0 votos (0%)';
        const percentage = ((value / totalVotes) * 100).toFixed(1);
        return `${value} votos (${percentage}%)`;
    };

    // 5. Renderizar gráficos
    new Chart(pieCanvas, {
        type: 'pie',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    color: 'white',
                    font: { weight: 'bold' },
                    formatter: formatLabel
                }
            }
        }
    });

    new Chart(barCanvas, {
        type: 'bar',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
            plugins: {
                datalabels: {
                    color: '#333',
                    anchor: 'end',
                    align: 'top',
                    formatter: formatLabel
                }
            }
        }
    });
}