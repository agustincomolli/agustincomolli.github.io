const PROVINCES = [
    "Buenos Aires",
    "Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida, ...",
    "Tucumán",
]

let provinceSelector = document.querySelector("#province");
let contactForm = document.querySelector("#contact-form");
let alertModal = new bootstrap.Modal(document.querySelector("#alert-modal"), {
    backdrop: 'static', // No permitir cerrar el modal al hacer clic fuera de él.
});

// Cuando el DOM esté completamente cargado.
document.addEventListener("DOMContentLoaded", Initialize);

function Initialize() {
    fillProvinces();
    contactForm.addEventListener("submit", submitForm);
}

/**
 * Función para llenar el elemento <select> con las opciones de las provincias
 * Itera sobre el array PROVINCES y agrega una nueva opción <option> por cada provincia
 */
function fillProvinces() {
    for (let province of PROVINCES) {
        provinceSelector.innerHTML += `<option>${province}</option>`;
    }
};

async function submitForm(event) {
    // Prevenir el envío del formulario para evitar una recarga de página.
    event.preventDefault();

    // Obtener referencia al formulario.
    const form = event.target;

    // Obtener los datos del formulario.
    const dataContact = new FormData(form);

    // Inicializar variables para el título y el mensaje de la alerta.
    let alertTitle = "";
    let alertMessage = "";

    // Enviar los datos del formulario al servidor de manera asíncrona.
    const response = await fetch(form.action, {
        method: form.method,
        body: dataContact,
        headers: {
            "Accept": "application/json"
        }
    });

    // Verificar si la respuesta del servidor es exitosa (código de respuesta 200).
    if (response.ok) {
        // Restablecer el formulario después de un envío exitoso.
        form.reset();
        alertTitle = "Su mensaje ha sido enviado exitosamente";
        alertMessage = "¡Gracias por contactarte con nosotros 😀!<br> Pronto nos comunicaremos con usted.";
    } else {
        alertTitle = "Su mensaje no pudo enviarse";
        alertMessage = "¡Ups! Hubo un problema al enviar su formulario 😥";
    }

    document.querySelector("#alert-title").innerHTML = alertTitle;
    document.querySelector("#alert-message").innerHTML = alertMessage;
    alertModal.show();
}
