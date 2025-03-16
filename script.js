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

// Incrementar el contador al hacer clic, guardar el valor y mostrar el modal
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', function() {
        // Obtener el valor actual del contador
        let count = parseInt(this.getAttribute('data-count'));
        
        // Incrementar el contador
        count++;
        
        // Actualizar el atributo data-count y el texto del contador
        this.setAttribute('data-count', count);
        this.querySelector('.count').textContent = count;

        // Guardar el valor en LocalStorage
        saveCounter(this.id, count);

        // Mostrar el modal de agradecimiento
        showThankYouModal();
    });
});

// Función para reiniciar los contadores
function resetCounters() {
    const password = prompt("Ingrese la contraseña para reiniciar los contadores:");
    if (password === "llabv2025") {
        document.querySelectorAll('.box').forEach(box => {
            box.setAttribute('data-count', 0); // Reiniciar el contador
            box.querySelector('.count').textContent = 0; // Actualizar el texto
            localStorage.removeItem(box.id); // Eliminar el valor del LocalStorage
        });
        alert("Contadores reiniciados correctamente.");
    } else {
        alert("Contraseña incorrecta. No se reiniciaron los contadores.");
    }
}

// Mapeo de nombres personalizados
const nombresPersonalizados = {
    box1: "La Libertad Avanza",
    box2: "UCR - V.C.",
    box3: "UxP - Peronismo C.",
    box4: "UCR - eCo"
};

// Función para ver los conteos actuales
function viewCounts() {
    const password = prompt("Ingrese la contraseña para ver los conteos:");
    if (password === "llabv2025") {
        let countsMessage = "Conteos actuales:\n\n";
        document.querySelectorAll('.box').forEach(box => {
            const id = box.id;
            const nombre = nombresPersonalizados[id] || id; // Usar el nombre personalizado o el ID si no existe
            const count = box.getAttribute('data-count');
            countsMessage += `${nombre}: ${count}\n`;
        });
        alert(countsMessage);
    } else {
        alert("Contraseña incorrecta. No se pueden ver los conteos.");
    }
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

// Función para alternar el modo pantalla completa
function toggleFullscreen() {
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

// Cambiar el texto del botón según el estado de pantalla completa
function updateFullscreenButton() {
    const fullscreenButton = document.getElementById('fullscreenButton');
    if (fullscreenButton) {
        if (document.fullscreenElement) {
            fullscreenButton.textContent = 'Salir de Pantalla Completa';
        } else {
            fullscreenButton.textContent = 'Pantalla Completa';
        }
    }
}

// Asignar la función al botón de pantalla completa
const fullscreenButton = document.getElementById('fullscreenButton');
if (fullscreenButton) {
    fullscreenButton.addEventListener('click', toggleFullscreen);
}

// Actualizar el botón cuando cambia el estado de pantalla completa
document.addEventListener('fullscreenchange', updateFullscreenButton);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
      });
  }